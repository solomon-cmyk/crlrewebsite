#!/usr/bin/env python3
"""Sync property listings from crlre.com into src/lib/listings-data.ts."""

from __future__ import annotations

import json
import re
import subprocess
import sys
from html import unescape
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/lib/listings-data.ts"


def fetch(url: str) -> str:
    return subprocess.check_output(
        ["curl", "-sL", "-A", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", url],
        text=True,
    )


def clean_text(value: str) -> str:
    value = unescape(re.sub(r"<[^>]+>", "", value))
    return re.sub(r"\s+", " ", value).strip()


def format_location(raw: str) -> str:
    raw = clean_text(raw)
    if not raw:
        return ""
    parts = [part.strip() for part in raw.split(",") if part.strip()]
    if len(parts) >= 2:
        return f"{parts[0]} · {parts[-1]}"
    return raw


def ts(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def parse_archive_page(page_num: int) -> list[dict]:
    url = "https://crlre.com/properties/" if page_num == 1 else f"https://crlre.com/properties/page/{page_num}/"
    html = fetch(url)
    items: list[dict] = []

    for block in re.findall(r'<article id="property-\d+".*?</article>', html, re.S):
        href_m = re.search(r'<a class="content-thumb" href="([^"]+)"', block)
        img_m = re.search(r'<img[^>]+src="([^"]+)"[^>]*class="attachment-property-thumb', block)
        title_m = re.search(r'class="property-title">\s*<a[^>]+>(.*?)</a>', block, re.S)
        loc_m = re.search(r"</a>\s*<small>(.*?)</small>", block, re.S)
        price_m = re.search(r'class="property-price">\s*<span>\s*(.*?)\s*</span>', block, re.S)
        excerpt_m = re.search(r'class="property-fullwidth-excerpt">(.*?)</p>', block, re.S)
        area_m = re.search(r'class="area".*?class="property-meta">(.*?)</span>', block, re.S)
        bed_m = re.search(r'class="bedrooms".*?class="property-meta">(.*?)</span>', block, re.S)
        bath_m = re.search(r'class="bathrooms".*?class="property-meta">(.*?)</span>', block, re.S)
        cats = [clean_text(item) for item in re.findall(r'rel="tag">([^<]+)</a>', block)]
        labels = [clean_text(item) for item in re.findall(r'class="property-label[^"]*">\s*([^<]+?)\s*</span>', block)]
        class_m = re.search(r'<article id="property-\d+" class="([^"]+)"', block)
        classes = class_m.group(1) if class_m else ""

        if not href_m or not title_m:
            continue

        title = clean_text(title_m.group(1))
        location = format_location(loc_m.group(1)) if loc_m else ""
        if not location:
            loc_bits = []
            for cls in classes.split():
                if cls.startswith("property_location-"):
                    loc_bits.append(cls.replace("property_location-", "").replace("-", " ").title())
                elif cls.startswith("property_sub_location-"):
                    loc_bits.append(cls.replace("property_sub_location-", "").replace("-", " ").title())
            location = format_location(", ".join(dict.fromkeys(loc_bits)))

        price_raw = clean_text(price_m.group(1)) if price_m else ""
        price = price_raw if price_raw.startswith("$") else (f"${price_raw}" if price_raw else "Contact for price")
        tag = next((cat for cat in cats if cat.lower() != "featured"), cats[0] if cats else (labels[0] if labels else "Listing"))
        sold = "property_label-sold" in classes or any(label.lower() == "sold" for label in labels)

        specs: list[dict[str, str]] = []
        if bed_m and clean_text(bed_m.group(1)):
            specs.append({"label": clean_text(bed_m.group(1)), "suffix": " beds"})
        if bath_m and clean_text(bath_m.group(1)):
            specs.append({"label": clean_text(bath_m.group(1)), "suffix": " baths"})
        if area_m and clean_text(area_m.group(1)):
            specs.append({"label": clean_text(area_m.group(1)), "suffix": ""})

        slug = unquote(href_m.group(1).rstrip("/").split("/")[-1])
        items.append(
            {
                "slug": slug,
                "tag": "Sold" if sold else tag,
                "image": img_m.group(1) if img_m else "",
                "alt": title,
                "location": location or "Costa Rica",
                "title": title,
                "price": price,
                "specs": specs,
                "excerpt": clean_text(excerpt_m.group(1)) if excerpt_m else "",
                "sold": sold,
                "featured": "featured-property" in classes or "property_category-featured" in classes,
                "sourceUrl": href_m.group(1),
            }
        )

    return items


def parse_detail(item: dict) -> dict:
    html = fetch(item["sourceUrl"])

    pf_start = html.find('property-featured clearfix')
    pf_end = html.find("similar-property", pf_start if pf_start >= 0 else 0)
    gallery_block = html[pf_start:pf_end] if pf_start >= 0 and pf_end >= 0 else html

    images: list[str] = []
    for href in re.findall(r'class="noo-lightbox-item"[^>]*href="([^"]+)"', gallery_block):
        if href not in images:
            images.append(href)

    if not images:
        og = re.search(r'og:image" content="([^"]+)"', html)
        if og:
            images = [og.group(1)]
        elif item["image"]:
            images = [item["image"]]

    content_m = re.search(
        r'class="property-content">\s*(.*?)\s*</div>\s*</div>\s*</div>\s*</div>\s*<div class="property-feature',
        html,
        re.S,
    )
    description: list[str] = []
    if content_m:
        for paragraph in re.findall(r"<p[^>]*>(.*?)</p>", content_m.group(1), re.S):
            text = clean_text(paragraph)
            if text:
                description.append(text)

    if not description and item["excerpt"]:
        description = [item["excerpt"]]

    feat_m = re.search(r'class="property-feature-content">(.*?)</div>\s*</div>', html, re.S)
    features: list[str] = []
    if feat_m:
        features = [
            clean_text(feature)
            for feature in re.findall(r'class="has">\s*<i[^>]*></i>\s*(.*?)\s*</div>', feat_m.group(1), re.S)
            if clean_text(feature)
        ]

    h1 = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.S)
    if h1:
        detail_title = clean_text(h1.group(1))
        if detail_title:
            item["title"] = detail_title
            item["alt"] = detail_title

    item["image"] = images[0] if images else item["image"]
    item["images"] = images
    item["description"] = description
    item["features"] = features
    return item


def render_ts(items: list[dict]) -> str:
    lines = [
        "// Auto-synced from crlre.com/properties. Re-run: python3 scripts/sync-listings.py",
        'import type { Listing } from "./listings";',
        "",
        "export const LISTINGS_DATA = [",
    ]

    for item in items:
        spec_parts = ", ".join(
            f'{{ label: {ts(spec["label"])}, suffix: {ts(spec["suffix"])} }}' for spec in item["specs"]
        )
        image_parts = ", ".join(ts(image) for image in item["images"])
        description_parts = ", ".join(ts(paragraph) for paragraph in item["description"])
        feature_parts = ", ".join(ts(feature) for feature in item["features"])

        lines.extend(
            [
                "  {",
                f'    slug: {ts(item["slug"])},',
                f'    tag: {ts(item["tag"])},',
                f'    image: {ts(item["image"])},',
                f'    alt: {ts(item["alt"])},',
                f'    location: {ts(item["location"])},',
                f'    title: {ts(item["title"])},',
                f'    price: {ts(item["price"])},',
                f"    specs: [{spec_parts}],",
                f'    excerpt: {ts(item["excerpt"])},',
                f'    sold: {"true" if item["sold"] else "false"},',
                f'    featured: {"true" if item["featured"] else "false"},',
                f"    images: [{image_parts}],",
                f"    description: [{description_parts}],",
                f"    features: [{feature_parts}],",
                "  },",
            ]
        )

    lines.extend(["] satisfies readonly Listing[];", ""])
    return "\n".join(lines)


def main() -> int:
    all_items: list[dict] = []
    seen: set[str] = set()

    for page in range(1, 10):
        page_items = parse_archive_page(page)
        new_items = [item for item in page_items if item["sourceUrl"] not in seen]
        if page > 1 and not new_items:
            break
        for item in new_items:
            seen.add(item["sourceUrl"])
            all_items.append(item)
        print(f"archive page {page}: +{len(new_items)} total {len(all_items)}")

    for index, item in enumerate(all_items, start=1):
        print(f"detail {index}/{len(all_items)}: {item['slug']}")
        parse_detail(item)
        del item["sourceUrl"]

    all_items.sort(key=lambda entry: (entry["sold"], not entry["featured"], entry["title"].lower()))
    OUT.write_text(render_ts(all_items), encoding="utf-8")
    print(f"wrote {len(all_items)} listings to {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
