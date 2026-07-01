#!/usr/bin/env python3
"""Create paired zh/en blog markdown files for zenBlog."""

from __future__ import annotations

import argparse
import json
import math
import re
import sys
from datetime import date
from pathlib import Path
from typing import Any


PROJECT_ROOT = Path(__file__).resolve().parents[1]
BLOG_ROOT = PROJECT_ROOT / "src" / "content" / "blog"
TEMPLATES_PATH = PROJECT_ROOT / "src" / "data" / "articleTemplates.json"
DEFAULT_TEMPLATE = "workflow-tutorial"


def load_payload(raw: str) -> dict[str, Any]:
    raw = raw.strip()
    if not raw:
        raise ValueError("No JSON payload provided.")
    data = json.loads(raw)
    if not isinstance(data, dict):
        raise ValueError("Payload must be a JSON object.")
    return data


def slugify(value: str) -> str:
    lowered = value.lower()
    lowered = re.sub(r"[^a-z0-9]+", "-", lowered)
    lowered = re.sub(r"-{2,}", "-", lowered).strip("-")
    return lowered or f"codex-post-{date.today().isoformat()}"


def yaml_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def normalize_tags(value: Any) -> list[str]:
    if value is None:
        return []
    if not isinstance(value, list):
        raise ValueError("tags must be a list of strings.")
    tags = []
    for item in value:
        tag = str(item).strip()
        if tag and tag not in tags:
            tags.append(tag)
    return tags


def require_text(record: dict[str, Any], field: str) -> str:
    value = str(record.get(field, "")).strip()
    if not value:
        raise ValueError(f"Missing required field: {field}")
    return value


def load_templates() -> dict[str, Any]:
    return json.loads(TEMPLATES_PATH.read_text(encoding="utf-8"))


def normalize_template(value: Any, templates: dict[str, Any]) -> str:
    template = str(value or DEFAULT_TEMPLATE).strip()
    if template not in templates:
        allowed = ", ".join(sorted(templates))
        raise ValueError(f"template must be one of: {allowed}")
    return template


def estimate_read_time(body: str, lang: str) -> str:
    if lang == "zh":
        cjk_chars = len(re.findall(r"[\u4e00-\u9fff]", body))
        latin_words = len(re.findall(r"[A-Za-z0-9]+", body))
        minutes = max(1, math.ceil((cjk_chars + latin_words * 1.7) / 520))
        return f"{minutes} 分钟"
    words = len(re.findall(r"\b[\w'-]+\b", body))
    minutes = max(1, math.ceil(words / 225))
    return f"{minutes} min"


def frontmatter(
    *,
    title: str,
    description: str,
    pub_date: str,
    category: str,
    tags: list[str],
    read_time: str,
    lang: str,
    translation_key: str,
    template: str,
    social_summary: str,
    draft: bool,
) -> str:
    lines = [
        "---",
        f"title: {yaml_string(title)}",
        f"description: {yaml_string(description)}",
        f"pubDate: {pub_date}",
        f"category: {yaml_string(category)}",
    ]
    if tags:
        lines.append("tags:")
        lines.extend(f"  - {yaml_string(tag)}" for tag in tags)
    else:
        lines.append("tags: []")
    lines.extend(
        [
            f"readTime: {yaml_string(read_time)}",
            f"lang: {lang}",
            f"translationKey: {yaml_string(translation_key)}",
            f"template: {yaml_string(template)}",
            f"socialSummary: {yaml_string(social_summary)}",
            f"draft: {'true' if draft else 'false'}",
            "---",
            "",
        ]
    )
    return "\n".join(lines)


def write_post(path: Path, content: str, force: bool) -> None:
    if path.exists() and not force:
        raise FileExistsError(f"{path} already exists. Pass --force to overwrite.")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def build_post(
    payload: dict[str, Any],
    lang: str,
    slug: str,
    translation_key: str,
    pub_date: str,
    category: str,
    tags: list[str],
    template: str,
    draft: bool,
) -> tuple[Path, str]:
    record = payload.get(lang)
    if not isinstance(record, dict):
        raise ValueError(f"Missing required object: {lang}")

    title = require_text(record, "title")
    description = require_text(record, "description")
    body = require_text(record, "body")
    read_time = str(record.get("readTime", "")).strip() or estimate_read_time(body, lang)
    social_summary = str(record.get("socialSummary") or record.get("social_summary") or description).strip()
    if len(social_summary) > 220:
        raise ValueError(f"{lang}.socialSummary must be 220 characters or fewer.")
    path = BLOG_ROOT / lang / f"{slug}.md"
    content = (
        frontmatter(
            title=title,
            description=description,
            pub_date=pub_date,
            category=category,
            tags=tags,
            read_time=read_time,
            lang=lang,
            translation_key=translation_key,
            template=template,
            social_summary=social_summary,
            draft=draft,
        )
        + body.rstrip()
        + "\n"
    )
    return path, content


def main() -> int:
    parser = argparse.ArgumentParser(description="Create zh/en blog files.")
    parser.add_argument("--json", help="JSON payload. Defaults to stdin.")
    parser.add_argument("--dry-run", action="store_true", help="Print planned files without writing.")
    parser.add_argument("--force", action="store_true", help="Overwrite existing files.")
    parser.add_argument("--published", action="store_true", help="Write posts with draft: false.")
    args = parser.parse_args()

    payload = load_payload(args.json if args.json is not None else sys.stdin.read())
    templates = load_templates()
    en_title = require_text(payload.get("en", {}) if isinstance(payload.get("en"), dict) else {}, "title")
    slug = slugify(str(payload.get("slug") or payload.get("translationKey") or en_title))
    translation_key = slugify(str(payload.get("translationKey") or slug))
    pub_date = str(payload.get("pubDate") or date.today().isoformat())
    category = str(payload.get("category") or "AI Workflow").strip()
    tags = normalize_tags(payload.get("tags"))
    template = normalize_template(payload.get("template"), templates)
    draft = not args.published

    posts = [
        build_post(payload, "zh", slug, translation_key, pub_date, category, tags, template, draft),
        build_post(payload, "en", slug, translation_key, pub_date, category, tags, template, draft),
    ]

    result = {
        "slug": slug,
        "translationKey": translation_key,
        "template": template,
        "draft": draft,
        "files": [str(path) for path, _ in posts],
    }

    if args.dry_run:
        print(json.dumps({"dryRun": True, **result}, ensure_ascii=False, indent=2))
        return 0

    for path, content in posts:
        write_post(path, content, args.force)

    print(json.dumps({"ok": True, **result}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
