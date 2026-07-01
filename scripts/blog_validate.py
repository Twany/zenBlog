#!/usr/bin/env python3
"""Validate zenBlog bilingual posts against content-production metadata."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any


PROJECT_ROOT = Path(__file__).resolve().parents[1]
BLOG_ROOT = PROJECT_ROOT / "src" / "content" / "blog"
TEMPLATES_PATH = PROJECT_ROOT / "src" / "data" / "articleTemplates.json"


def split_frontmatter(text: str) -> tuple[list[str], str]:
    if not text.startswith("---\n"):
        raise ValueError("Markdown file is missing frontmatter.")
    end = text.find("\n---\n", 4)
    if end == -1:
        raise ValueError("Markdown file has unterminated frontmatter.")
    return text[4:end].splitlines(), text[end + 5 :]


def parse_frontmatter(lines: list[str]) -> dict[str, Any]:
    data: dict[str, Any] = {}
    key: str | None = None
    for line in lines:
        if key and isinstance(data.get(key), list):
            quoted_items = re.findall(r'"([^"]+)"', line)
            if quoted_items:
                data[key].extend(quoted_items)
                continue
        if line.startswith("  - ") and key:
            data.setdefault(key, []).append(yaml_scalar(line[4:].strip()))
            continue
        if ":" not in line:
            continue
        raw_key, raw_value = line.split(":", 1)
        key = raw_key.strip()
        value = raw_value.strip()
        if value == "":
            data[key] = []
        elif value.startswith("["):
            data[key] = re.findall(r"""['"]([^'"]+)['"]""", value)
        else:
            data[key] = yaml_scalar(value)
    return data


def yaml_scalar(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
        return value[1:-1]
    return value


def load_post(lang: str, slug: str) -> tuple[Path, dict[str, Any], str]:
    path = BLOG_ROOT / lang / f"{slug}.md"
    if not path.exists():
        raise FileNotFoundError(f"Missing post: {path}")
    lines, body = split_frontmatter(path.read_text(encoding="utf-8"))
    return path, parse_frontmatter(lines), body


def headings(body: str) -> list[str]:
    return [
        match.group(1).strip().lower()
        for match in re.finditer(r"^##+\s+(.+)$", body, flags=re.MULTILINE)
    ]


def contains_any_heading(post_headings: list[str], candidates: list[str]) -> bool:
    normalized = [candidate.lower() for candidate in candidates]
    return any(
        any(candidate in heading for candidate in normalized)
        for heading in post_headings
    )


def validate_post(lang: str, slug: str, templates: dict[str, Any]) -> tuple[list[str], list[str]]:
    path, frontmatter, body = load_post(lang, slug)
    errors: list[str] = []
    warnings: list[str] = []
    title = str(frontmatter.get("title", "")).strip()
    description = str(frontmatter.get("description", "")).strip()
    template = str(frontmatter.get("template", "")).strip()
    social_summary = str(frontmatter.get("socialSummary", "")).strip()
    tags = frontmatter.get("tags", [])

    if not title:
        errors.append(f"{path}: missing title")
    if len(description) < 50:
        errors.append(f"{path}: description should be at least 50 characters")
    if template not in templates:
        errors.append(f"{path}: template must be one of {', '.join(sorted(templates))}")
    if not social_summary:
        errors.append(f"{path}: missing socialSummary")
    if len(social_summary) > 220:
        errors.append(f"{path}: socialSummary must be 220 characters or fewer")
    if not isinstance(tags, list) or len(tags) < 4:
        errors.append(f"{path}: expected at least 4 useful tags")

    post_headings = headings(body)
    if len(post_headings) < 4:
        errors.append(f"{path}: expected at least 4 section headings")

    if template in templates:
        required = templates[template]["requiredSections"][lang]
        matched = sum(
            1 for candidate in required if contains_any_heading(post_headings, [candidate])
        )
        if matched < 2:
            warnings.append(
                f"{path}: template '{template}' should visibly include at least 2 of: "
                + ", ".join(required)
            )

    return errors, warnings


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate paired zh/en zenBlog posts.")
    parser.add_argument("slug", help="Shared slug for src/content/blog/{zh,en}/<slug>.md")
    args = parser.parse_args()

    templates = json.loads(TEMPLATES_PATH.read_text(encoding="utf-8"))
    errors = []
    warnings = []
    for lang in ("zh", "en"):
        post_errors, post_warnings = validate_post(lang, args.slug, templates)
        errors.extend(post_errors)
        warnings.extend(post_warnings)

    for warning in warnings:
        print(f"WARNING {warning}")
    if errors:
        for error in errors:
            print(f"ERROR {error}")
        return 1

    print(json.dumps({"ok": True, "slug": args.slug, "checked": ["zh", "en"]}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
