#!/usr/bin/env python3
"""Copy listing images into public/ and rewrite listings-data.ts URLs.

Usage:

  python3 scripts/migrate-listing-images.py --source https://crlre.com/wp-content/uploads

  # If DNS still points at Vercel, target the live host directly:
  python3 scripts/migrate-listing-images.py \\
    --source https://crlre.com/wp-content/uploads \\
    --resolve 34.174.238.249

  # Or from a local uploads folder:
  python3 scripts/migrate-listing-images.py --uploads ~/Downloads/wp-content/uploads
"""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import quote, unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
LISTINGS_DATA = ROOT / "src/lib/listings-data.ts"
PUBLIC_UPLOADS = ROOT / "public/listings/uploads"
BROKER_CONTENT = ROOT / "src/lib/broker-content.ts"

WP_PREFIX = "https://crlre.com/wp-content/uploads/"
LOCAL_PREFIX = "/listings/uploads/"


def extract_urls(*files: Path) -> list[str]:
    urls: set[str] = set()
    for path in files:
        if not path.is_file():
            continue
        urls.update(re.findall(r"https://crlre\.com/wp-content/uploads/[^\"']+", path.read_text(encoding="utf-8")))
    return sorted(urls)


def relative_path_from_url(url: str) -> str:
    return unquote(urlparse(url).path.split("/uploads/")[-1])


def copy_local(uploads_dir: Path, rel_path: str) -> bool:
    src = uploads_dir / rel_path
    if not src.is_file():
        matches = list(uploads_dir.rglob(Path(rel_path).name))
        if not matches:
            return False
        src = matches[0]

    dest = PUBLIC_UPLOADS / rel_path
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)
    return True


def download_remote(base: str, rel_path: str, resolve_ip: str | None) -> bool:
    base = base.rstrip("/") + "/"
    parts = rel_path.split("/")
    encoded = "/".join(quote(part) for part in parts)
    url = base + encoded
    dest = PUBLIC_UPLOADS / rel_path

    cmd = ["curl", "-sfL", "-A", "Mozilla/5.0", "-o", str(dest), url]
    if resolve_ip:
        cmd[1:1] = ["--resolve", f"crlre.com:443:{resolve_ip}"]

    dest.parent.mkdir(parents=True, exist_ok=True)
    code = subprocess.call(cmd)
    return code == 0 and dest.is_file() and dest.stat().st_size > 0


def rewrite_wp_urls(text: str) -> str:
    return text.replace(WP_PREFIX, LOCAL_PREFIX)


def migrate_one(
    url: str,
    uploads_dir: Path | None,
    source: str | None,
    resolve_ip: str | None,
) -> tuple[str, bool]:
    rel_path = relative_path_from_url(url)
    if uploads_dir:
        return rel_path, copy_local(uploads_dir, rel_path)
    if source:
        return rel_path, download_remote(source, rel_path, resolve_ip)
    return rel_path, False


def main() -> int:
    parser = argparse.ArgumentParser(description="Migrate listing images into public/")
    parser.add_argument("--uploads", type=Path, help="Local wp-content/uploads directory")
    parser.add_argument("--source", help="Remote wp-content/uploads base URL")
    parser.add_argument("--resolve", help="IP to --resolve crlre.com:443 to (when DNS lags)")
    parser.add_argument("--workers", type=int, default=12)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not args.uploads and not args.source:
        parser.error("Provide --uploads (local folder) or --source (remote base URL)")

    if not LISTINGS_DATA.is_file():
        print(f"Missing {LISTINGS_DATA}", file=sys.stderr)
        return 1

    urls = extract_urls(LISTINGS_DATA, BROKER_CONTENT)
    print(f"Found {len(urls)} unique image URLs")

    if args.dry_run:
        for url in urls[:5]:
            print(f"  {relative_path_from_url(url)}")
        print("Dry run complete")
        return 0

    ok = 0
    missing: list[str] = []

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {
            pool.submit(migrate_one, url, args.uploads, args.source, args.resolve): url
            for url in urls
        }
        for index, future in enumerate(as_completed(futures), start=1):
            rel_path, success = future.result()
            if success:
                ok += 1
            else:
                missing.append(rel_path)
            if index % 100 == 0 or index == len(urls):
                print(f"progress {index}/{len(urls)} ({ok} ok)")

    print(f"Migrated {ok}/{len(urls)} images")
    if missing:
        print(f"Missing {len(missing)} files (first 10):")
        for name in missing[:10]:
            print(f"  - {name}")

    LISTINGS_DATA.write_text(rewrite_wp_urls(LISTINGS_DATA.read_text(encoding="utf-8")), encoding="utf-8")
    print(f"Updated {LISTINGS_DATA}")

    if BROKER_CONTENT.is_file():
        BROKER_CONTENT.write_text(rewrite_wp_urls(BROKER_CONTENT.read_text(encoding="utf-8")), encoding="utf-8")
        print(f"Updated {BROKER_CONTENT}")

    return 0 if not missing else 1


if __name__ == "__main__":
    raise SystemExit(main())
