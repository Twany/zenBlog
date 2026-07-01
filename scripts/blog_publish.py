#!/usr/bin/env python3
"""Publish a reviewed zenBlog draft and optionally deploy to Cloudflare."""

from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import time
import urllib.request
from datetime import date, datetime, timezone
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
BLOG_ROOT = PROJECT_ROOT / "src" / "content" / "blog"
LOG_ROOT = PROJECT_ROOT / "logs"
CODEX_DEPS = Path.home() / ".cache" / "codex-runtimes" / "codex-primary-runtime" / "dependencies"
CODEX_BIN = CODEX_DEPS / "bin"
CODEX_NODE_BIN = CODEX_DEPS / "node" / "bin"
PUBLISH_EVENTS: list[dict[str, object]] = []


def command_env() -> dict[str, str]:
    env = os.environ.copy()
    extra_paths = [str(CODEX_NODE_BIN), str(CODEX_BIN)]
    env["PATH"] = os.pathsep.join(extra_paths + [env.get("PATH", "")])
    return env


def which(command: str) -> str | None:
    return shutil.which(command, path=command_env().get("PATH"))


def local_bin(command: str) -> str:
    path = PROJECT_ROOT / "node_modules" / ".bin" / command
    if not path.exists():
        raise RuntimeError(f"Missing local binary: {path}")
    return str(path)


def package_command(script: str) -> list[str]:
    if which("npm"):
        return ["npm", "run", script]
    direct_commands = {
        "lint": [local_bin("eslint"), "."],
        "check": [local_bin("astro"), "check"],
        "build": [local_bin("astro"), "build"],
    }
    if script in direct_commands:
        return direct_commands[script]
    if which("pnpm"):
        return ["pnpm", "run", script]
    raise RuntimeError("No package runner was found.")


def script_command(script: str, *args: str) -> list[str]:
    if which("npm"):
        return ["npm", "run", script, "--", *args]
    direct_commands = {
        "blog:validate": ["python3", "scripts/blog_validate.py", *args],
        "og:generate": ["node", "scripts/generate_og_images.mjs", *args],
    }
    if script in direct_commands:
        return direct_commands[script]
    if which("pnpm"):
        return ["pnpm", "run", script, "--", *args]
    raise RuntimeError(f"No runner was found for script: {script}")


def wrangler_command() -> list[str]:
    if which("npx"):
        return ["npx", "wrangler", "deploy"]
    if which("wrangler"):
        return ["wrangler", "deploy"]
    if which("pnpm"):
        return ["pnpm", "dlx", "wrangler", "deploy"]
    raise RuntimeError("No Wrangler-capable command found: expected npx, wrangler, or pnpm.")


def split_frontmatter(text: str) -> tuple[list[str], str]:
    if not text.startswith("---\n"):
        raise ValueError("Markdown file is missing frontmatter.")
    end = text.find("\n---\n", 4)
    if end == -1:
        raise ValueError("Markdown file has unterminated frontmatter.")
    raw = text[4:end]
    body = text[end + 5 :]
    return raw.splitlines(), body


def set_field(lines: list[str], key: str, value: str) -> list[str]:
    prefix = f"{key}:"
    updated = []
    changed = False
    for line in lines:
        if line.startswith(prefix):
            updated.append(f"{key}: {value}")
            changed = True
        else:
            updated.append(line)
    if not changed:
        updated.append(f"{key}: {value}")
    return updated


def yaml_scalar(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
        return value[1:-1]
    return value


def update_post(path: Path, *, publish_date: str | None, dry_run: bool) -> None:
    text = path.read_text(encoding="utf-8")
    lines, body = split_frontmatter(text)
    lines = set_field(lines, "draft", "false")
    if publish_date:
        lines = set_field(lines, "pubDate", publish_date)
    next_text = "---\n" + "\n".join(lines) + "\n---\n" + body
    if not dry_run:
        path.write_text(next_text, encoding="utf-8")


def read_title(path: Path) -> str:
    lines, _body = split_frontmatter(path.read_text(encoding="utf-8"))
    for line in lines:
        if line.startswith("title:"):
            return yaml_scalar(line.split(":", 1)[1])
    return ""


def record_event(
    step: str,
    status: str,
    *,
    command: list[str] | None = None,
    duration_ms: int | None = None,
    detail: str | None = None,
) -> None:
    event: dict[str, object] = {
        "step": step,
        "status": status,
        "time": datetime.now(timezone.utc).isoformat(),
    }
    if command:
        event["command"] = command
    if duration_ms is not None:
        event["durationMs"] = duration_ms
    if detail:
        event["detail"] = detail
    PUBLISH_EVENTS.append(event)


def write_publish_log(*, slug: str, status: str, started_at: str, error: str | None = None) -> Path:
    LOG_ROOT.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    path = LOG_ROOT / f"publish-{slug}-{timestamp}.json"
    payload = {
        "slug": slug,
        "status": status,
        "startedAt": started_at,
        "finishedAt": datetime.now(timezone.utc).isoformat(),
        "events": PUBLISH_EVENTS,
    }
    if error:
        payload["error"] = error
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Publish log: {path}")
    return path


def run(command: list[str], *, dry_run: bool, step: str) -> None:
    printable = " ".join(command)
    if dry_run:
        print(f"[dry-run] {printable}")
        record_event(step, "dry-run", command=command)
        return
    print(f"[{step}] {printable}")
    started = time.perf_counter()
    try:
        subprocess.run(command, cwd=PROJECT_ROOT, check=True, env=command_env())
    except subprocess.CalledProcessError as exc:
        duration_ms = int((time.perf_counter() - started) * 1000)
        record_event(
            step,
            "failed",
            command=command,
            duration_ms=duration_ms,
            detail=f"exit code {exc.returncode}",
        )
        raise
    duration_ms = int((time.perf_counter() - started) * 1000)
    record_event(step, "success", command=command, duration_ms=duration_ms)


def fetch_text(url: str, *, timeout: int = 20) -> tuple[int, str]:
    request = urllib.request.Request(url, headers={"User-Agent": "zenblog-publish-check/1.0"})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        raw = response.read(750_000)
        return response.status, raw.decode("utf-8", errors="replace")


def fetch_status(url: str, *, timeout: int = 20) -> int:
    request = urllib.request.Request(url, headers={"User-Agent": "zenblog-publish-check/1.0"})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        response.read(64)
        return response.status


def post_deploy_check(slug: str, titles: dict[str, str], *, dry_run: bool) -> None:
    targets = [
        ("article-en", f"https://twany.me/blog/{slug}/", titles["en"]),
        ("article-zh", f"https://twany.me/zh/blog/{slug}/", titles["zh"]),
        ("blog-index", "https://twany.me/blog/", "Blog"),
        ("llms", "https://twany.me/llms.txt", "## Recent English Articles"),
        ("rss-en", "https://twany.me/rss.xml", "<rss"),
        ("rss-zh", "https://twany.me/zh/rss.xml", "<rss"),
    ]
    og_targets = [
        ("og-en", f"https://twany.me/og/en/{slug}.png"),
        ("og-zh", f"https://twany.me/og/zh/{slug}.png"),
    ]

    if dry_run:
        record_event("post-deploy-check", "dry-run", detail=f"would check {len(targets) + len(og_targets)} URLs")
        return

    started = time.perf_counter()
    checked: list[str] = []
    try:
        for label, url, expected in targets:
            status, text = fetch_text(url)
            if status < 200 or status >= 300:
                raise RuntimeError(f"{label} returned {status}: {url}")
            if expected and expected not in text:
                raise RuntimeError(f"{label} did not contain expected text: {expected}")
            checked.append(label)

        for label, url in og_targets:
            status = fetch_status(url)
            if status < 200 or status >= 300:
                raise RuntimeError(f"{label} returned {status}: {url}")
            checked.append(label)
    except Exception as exc:
        duration_ms = int((time.perf_counter() - started) * 1000)
        record_event("post-deploy-check", "failed", duration_ms=duration_ms, detail=str(exc))
        raise

    duration_ms = int((time.perf_counter() - started) * 1000)
    record_event(
        "post-deploy-check",
        "success",
        duration_ms=duration_ms,
        detail=", ".join(checked),
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Publish a reviewed zh/en blog draft.")
    parser.add_argument("slug", help="Shared slug for src/content/blog/{zh,en}/<slug>.md")
    parser.add_argument("--dry-run", action="store_true", help="Show actions without writing or deploying.")
    parser.add_argument("--skip-deploy", action="store_true", help="Run checks/build but do not deploy.")
    parser.add_argument("--keep-date", action="store_true", help="Keep existing pubDate instead of setting today.")
    args = parser.parse_args()
    started_at = datetime.now(timezone.utc).isoformat()

    try:
        paths = [BLOG_ROOT / "zh" / f"{args.slug}.md", BLOG_ROOT / "en" / f"{args.slug}.md"]
        missing = [str(path) for path in paths if not path.exists()]
        if missing:
            raise FileNotFoundError("Missing draft file(s): " + ", ".join(missing))

        publish_date = None if args.keep_date else date.today().isoformat()
        titles = {"zh": read_title(paths[0]), "en": read_title(paths[1])}

        for path in paths:
            update_post(path, publish_date=publish_date, dry_run=args.dry_run)
            print(f"{'Would publish' if args.dry_run else 'Published'} {path}")
        record_event(
            "frontmatter",
            "dry-run" if args.dry_run else "success",
            detail=f"updated {len(paths)} post files",
        )

        run(script_command("blog:validate", args.slug), dry_run=args.dry_run, step="template-check")
        run(script_command("og:generate", f"--slug={args.slug}"), dry_run=args.dry_run, step="og-images")
        run(package_command("lint"), dry_run=args.dry_run, step="lint")
        run(package_command("check"), dry_run=args.dry_run, step="check")
        run(package_command("build"), dry_run=args.dry_run, step="build")
        if not args.skip_deploy:
            run(wrangler_command(), dry_run=args.dry_run, step="deploy")
            post_deploy_check(args.slug, titles, dry_run=args.dry_run)
        else:
            record_event("deploy", "skipped", detail="--skip-deploy")
    except Exception as exc:
        write_publish_log(slug=args.slug, status="failed", started_at=started_at, error=str(exc))
        raise

    write_publish_log(slug=args.slug, status="success", started_at=started_at)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
