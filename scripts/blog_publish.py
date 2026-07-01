#!/usr/bin/env python3
"""Publish a reviewed zenBlog draft and optionally deploy to Cloudflare."""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess
from datetime import date
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
BLOG_ROOT = PROJECT_ROOT / "src" / "content" / "blog"
CODEX_DEPS = Path.home() / ".cache" / "codex-runtimes" / "codex-primary-runtime" / "dependencies"
CODEX_BIN = CODEX_DEPS / "bin"
CODEX_NODE_BIN = CODEX_DEPS / "node" / "bin"


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


def update_post(path: Path, *, publish_date: str | None, dry_run: bool) -> None:
    text = path.read_text(encoding="utf-8")
    lines, body = split_frontmatter(text)
    lines = set_field(lines, "draft", "false")
    if publish_date:
        lines = set_field(lines, "pubDate", publish_date)
    next_text = "---\n" + "\n".join(lines) + "\n---\n" + body
    if not dry_run:
        path.write_text(next_text, encoding="utf-8")


def run(command: list[str], *, dry_run: bool) -> None:
    printable = " ".join(command)
    if dry_run:
        print(f"[dry-run] {printable}")
        return
    subprocess.run(command, cwd=PROJECT_ROOT, check=True, env=command_env())


def main() -> int:
    parser = argparse.ArgumentParser(description="Publish a reviewed zh/en blog draft.")
    parser.add_argument("slug", help="Shared slug for src/content/blog/{zh,en}/<slug>.md")
    parser.add_argument("--dry-run", action="store_true", help="Show actions without writing or deploying.")
    parser.add_argument("--skip-deploy", action="store_true", help="Run checks/build but do not deploy.")
    parser.add_argument("--keep-date", action="store_true", help="Keep existing pubDate instead of setting today.")
    args = parser.parse_args()

    paths = [BLOG_ROOT / "zh" / f"{args.slug}.md", BLOG_ROOT / "en" / f"{args.slug}.md"]
    missing = [str(path) for path in paths if not path.exists()]
    if missing:
        raise FileNotFoundError("Missing draft file(s): " + ", ".join(missing))

    publish_date = None if args.keep_date else date.today().isoformat()
    for path in paths:
        update_post(path, publish_date=publish_date, dry_run=args.dry_run)
        print(f"{'Would publish' if args.dry_run else 'Published'} {path}")

    run(package_command("lint"), dry_run=args.dry_run)
    run(package_command("check"), dry_run=args.dry_run)
    run(package_command("build"), dry_run=args.dry_run)
    if not args.skip_deploy:
        run(wrangler_command(), dry_run=args.dry_run)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
