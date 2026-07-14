#!/usr/bin/env node
/**
 * Download Maravé media + optimize all site images for local hosting.
 * Run: node scripts/setup-local-media.mjs
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LISTINGS_DIR = path.join(ROOT, "public/listings/uploads");
const MARAVE_DIR = path.join(ROOT, "public/media/marave");
const LISTINGS_DATA = path.join(ROOT, "src/lib/listings-data.ts");
const BROKER_CONTENT = path.join(ROOT, "src/lib/broker-content.ts");

const MARAVE_BASE = "https://www.maraveresidences.com/Marave%20Final%20Renders";

const MARAVE_DOWNLOADS = [
  { url: `${MARAVE_BASE}/Villa/H_OC_Exterior_18_Villas_Pool.jpg`, dest: "images/villa-pool.jpg" },
  {
    url: `${MARAVE_BASE}/Condo%20A/H_OC_Interior_CondoA_Living_Day.jpg`,
    dest: "images/condo-a-living.jpg",
  },
  {
    url: `${MARAVE_BASE}/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_14_Villas%20Day_b.jpg`,
    dest: "images/villas-day.jpg",
  },
  {
    url: `${MARAVE_BASE}/Condo%20F/H_OC_Interior_CondoF_Balcony.jpg`,
    dest: "images/penthouse-balcony.jpg",
  },
  {
    url: `${MARAVE_BASE}/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_05_Beach_Club_Pool_V1_06-2.jpg`,
    dest: "images/beach-club-pool.jpg",
  },
  {
    url: `${MARAVE_BASE}/Exterior%20Shots%20and%20Beach%20Hero/LXR%20Beach%20Image.webp`,
    dest: "images/lxr-beach.webp",
  },
  {
    url: `${MARAVE_BASE}/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_17_Aerial_03.jpg`,
    dest: "images/aerial-estate.jpg",
  },
  {
    url: `${MARAVE_BASE}/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_07_Beach_Club_yard_02.jpg`,
    dest: "images/beach-club-yard.jpg",
  },
  {
    url: `${MARAVE_BASE}/Extra%20Images/Manuel%20Antonio%20Park.jpg`,
    dest: "images/manuel-antonio-park.jpg",
  },
  {
    url: `${MARAVE_BASE}/videos/residences-hero.mp4`,
    dest: "videos/residences-hero.mp4",
  },
  {
    url: `${MARAVE_BASE}/videos/hero.mp4`,
    dest: "videos/hero.mp4",
  },
  {
    url: `${MARAVE_BASE}/videos/hero-mobile.mp4`,
    dest: "videos/hero-mobile.mp4",
  },
];

const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

async function downloadMarave() {
  fs.mkdirSync(path.join(MARAVE_DIR, "images"), { recursive: true });
  fs.mkdirSync(path.join(MARAVE_DIR, "videos"), { recursive: true });

  for (const item of MARAVE_DOWNLOADS) {
    const dest = path.join(MARAVE_DIR, item.dest);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      console.log(`skip ${item.dest}`);
      continue;
    }
    execSync(`curl -sfL -A "Mozilla/5.0" -o "${dest}" "${item.url}"`, { stdio: "inherit" });
    console.log(`downloaded ${item.dest}`);
  }
}

async function optimizeImage(filePath, maxEdge = 2400) {
  const ext = path.extname(filePath).toLowerCase();
  const base = filePath.slice(0, -ext.length);
  const outPath = `${base}.webp`;

  const image = sharp(filePath, { failOn: "none" });
  const meta = await image.metadata();
  if (!meta.width || !meta.height) return { saved: 0, converted: false };

  const resize =
    meta.width > maxEdge || meta.height > maxEdge
      ? { width: maxEdge, height: maxEdge, fit: "inside", withoutEnlargement: true }
      : null;

  let pipeline = sharp(filePath, { failOn: "none" });
  if (resize) pipeline = pipeline.resize(resize);

  await pipeline.webp({ quality: 88, effort: 5 }).toFile(outPath);

  const before = fs.statSync(filePath).size;
  const after = fs.statSync(outPath).size;

  if (outPath !== filePath) {
    fs.unlinkSync(filePath);
  }

  return { saved: before - after, converted: true, outPath };
}

async function optimizeTree(dir, label) {
  if (!fs.existsSync(dir)) {
    console.log(`skip missing ${dir}`);
    return;
  }

  const files = [];
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (IMAGE_EXT.test(entry.name) && !entry.name.endsWith(".webp")) files.push(full);
    }
  };
  walk(dir);

  console.log(`optimizing ${files.length} ${label} images...`);
  let done = 0;
  let saved = 0;

  const batchSize = 24;
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const results = await Promise.all(batch.map((file) => optimizeImage(file)));
    for (const result of results) {
      if (result.converted) {
        done += 1;
        saved += Math.max(0, result.saved);
      }
    }
    if ((i + batchSize) % 240 === 0 || i + batchSize >= files.length) {
      console.log(`  ${label}: ${Math.min(i + batchSize, files.length)}/${files.length}`);
    }
  }

  console.log(`  ${label}: converted ${done}, saved ${(saved / 1024 / 1024).toFixed(1)} MB`);
}

function rewriteExtensions(filePath) {
  if (!fs.existsSync(filePath)) return;
  let text = fs.readFileSync(filePath, "utf8");
  const before = text;
  text = text
    .replace(/\/listings\/uploads\/([^"']+)\.jpe?g/gi, "/listings/uploads/$1.webp")
    .replace(/\/listings\/uploads\/([^"']+)\.png/gi, "/listings/uploads/$1.webp");
  if (text !== before) {
    fs.writeFileSync(filePath, text);
    console.log(`updated extensions in ${path.basename(filePath)}`);
  }
}

function patchBrokerContent() {
  const maraveUrl = "https://www.maraveresidences.com/Marave%20Final%20Renders";
  const replacements = [
    [`${maraveUrl}/Villa/H_OC_Exterior_18_Villas_Pool.jpg`, "/media/marave/images/villa-pool.webp"],
    [
      `${maraveUrl}/Condo%20A/H_OC_Interior_CondoA_Living_Day.jpg`,
      "/media/marave/images/condo-a-living.webp",
    ],
    [
      `${maraveUrl}/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_14_Villas%20Day_b.jpg`,
      "/media/marave/images/villas-day.webp",
    ],
    [
      `${maraveUrl}/Condo%20F/H_OC_Interior_CondoF_Balcony.jpg`,
      "/media/marave/images/penthouse-balcony.webp",
    ],
    [
      `${maraveUrl}/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_05_Beach_Club_Pool_V1_06-2.jpg`,
      "/media/marave/images/beach-club-pool.webp",
    ],
    [
      `${maraveUrl}/Exterior%20Shots%20and%20Beach%20Hero/LXR%20Beach%20Image.webp`,
      "/media/marave/images/lxr-beach.webp",
    ],
    [
      `${maraveUrl}/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_17_Aerial_03.jpg`,
      "/media/marave/images/aerial-estate.webp",
    ],
    [
      `${maraveUrl}/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_07_Beach_Club_yard_02.jpg`,
      "/media/marave/images/beach-club-yard.webp",
    ],
    [
      `${maraveUrl}/Extra%20Images/Manuel%20Antonio%20Park.jpg`,
      "/media/marave/images/manuel-antonio-park.webp",
    ],
    [`${maraveUrl}/videos/residences-hero.mp4`, "/media/marave/videos/residences-hero.mp4"],
  ];

  let text = fs.readFileSync(BROKER_CONTENT, "utf8");
  for (const [from, to] of replacements) {
    text = text.split(from).join(to);
  }
  fs.writeFileSync(BROKER_CONTENT, text);
  console.log("patched broker-content.ts maravé URLs");
}

async function optimizeMaraveImages() {
  await optimizeTree(path.join(MARAVE_DIR, "images"), "maravé");
}

async function main() {
  await downloadMarave();
  await optimizeTree(LISTINGS_DIR, "listing");
  await optimizeMaraveImages();
  rewriteExtensions(LISTINGS_DATA);
  rewriteExtensions(BROKER_CONTENT);
  patchBrokerContent();

  const listingsSize = execSync(`du -sh "${LISTINGS_DIR}"`, { encoding: "utf8" }).trim();
  const maraveSize = execSync(`du -sh "${MARAVE_DIR}"`, { encoding: "utf8" }).trim();
  const publicSize = execSync(`du -sh "${path.join(ROOT, "public")}"`, { encoding: "utf8" }).trim();
  console.log(`\nSizes:\n  listings: ${listingsSize}\n  maravé:   ${maraveSize}\n  public:   ${publicSize}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
