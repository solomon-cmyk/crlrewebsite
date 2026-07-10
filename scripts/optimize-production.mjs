#!/usr/bin/env node
/**
 * Final media optimization pass for production.
 * Recompresses oversized WebPs, converts logos, removes unused originals.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function recompressWebp(file, { maxEdge, quality }) {
  const tmp = `${file}.tmp.webp`;
  const before = fs.statSync(file).size;
  await sharp(file, { failOn: "none" })
    .resize({ width: maxEdge, height: maxEdge, fit: "inside", withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(tmp);
  const after = fs.statSync(tmp).size;
  if (after < before * 0.98) {
    fs.renameSync(tmp, file);
    return before - after;
  }
  fs.unlinkSync(tmp);
  return 0;
}

async function walkWebp(dir, opts) {
  if (!fs.existsSync(dir)) return 0;
  let saved = 0;
  let count = 0;
  const files = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith(".webp")) files.push(full);
    }
  };
  walk(dir);

  const batch = 24;
  for (let i = 0; i < files.length; i += batch) {
    const slice = files.slice(i, i + batch);
    const results = await Promise.all(
      slice.map(async (file) => {
        const size = fs.statSync(file).size;
        // Only touch files that are still heavy
        if (size < opts.minBytes) return 0;
        return recompressWebp(file, opts);
      })
    );
    saved += results.reduce((a, b) => a + b, 0);
    count += slice.length;
    if (count % 240 === 0 || count >= files.length) {
      console.log(`  ${path.basename(dir)}: ${count}/${files.length}`);
    }
  }
  console.log(`  saved ${(saved / 1024 / 1024).toFixed(1)} MB in ${dir}`);
  return saved;
}

async function convertLogo(src, dest, width) {
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 90, effort: 6, alphaQuality: 100 })
    .toFile(dest);
  console.log(`logo ${path.basename(dest)} ${(fs.statSync(dest).size / 1024).toFixed(0)}KB`);
}

async function main() {
  console.log("Recompressing listing images...");
  await walkWebp(path.join(ROOT, "public/listings/uploads"), {
    maxEdge: 1200,
    quality: 64,
    minBytes: 140 * 1024,
  });

  console.log("Recompressing Maravé images...");
  await walkWebp(path.join(ROOT, "public/media/marave/images"), {
    maxEdge: 1400,
    quality: 72,
    minBytes: 120 * 1024,
  });

  console.log("Converting logos...");
  await convertLogo(
    path.join(ROOT, "public/logos/crlre-wordmark.png"),
    path.join(ROOT, "public/logos/crlre-wordmark.webp"),
    900
  );
  await convertLogo(
    path.join(ROOT, "public/logos/marave-logo-horizontal-white.png"),
    path.join(ROOT, "public/logos/marave-logo-horizontal-white.webp"),
    1200
  );

  // Remove unused heavy originals already covered by media/marave webps
  const unused = [
    "public/images/gallery/marave-gallery-primary-bedroom.jpg",
    "public/images/gallery/marave-gallery-beach-club.jpg",
    "public/images/gallery/marave-gallery-villa-pool.jpg",
    "public/images/gallery/marave-gallery-infinity-pool.jpg",
    "public/images/gallery/marave-gallery-great-room.jpg",
    "public/images/hero/marave-hero-aerial-sunset-pacific.jpg",
    "public/images/Headshots/WhatsApp Image 2026-07-08 at 14.35.44.jpeg",
    "public/images/Headshots/WhatsApp Image 2026-07-08 at 18.43.49.jpeg",
    "public/images/Headshots/mark-dalton.jpeg",
    "public/images/Headshots/gladis-galindo.jpeg",
  ];
  let removed = 0;
  for (const rel of unused) {
    const full = path.join(ROOT, rel);
    if (fs.existsSync(full)) {
      removed += fs.statSync(full).size;
      fs.unlinkSync(full);
      console.log(`removed ${rel}`);
    }
  }
  console.log(`removed ${(removed / 1024 / 1024).toFixed(1)} MB unused originals`);

  // Point assets hero at webp copy
  const heroWebp = path.join(ROOT, "public/media/marave/images/hero-aerial-sunset.webp");
  if (fs.existsSync(heroWebp)) {
    fs.mkdirSync(path.join(ROOT, "public/images/hero"), { recursive: true });
    fs.copyFileSync(heroWebp, path.join(ROOT, "public/images/hero/marave-hero-aerial-sunset-pacific.webp"));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
