#!/usr/bin/env node
/**
 * Re-pull Maravé Final Renders at full resolution and export sharp WebPs for the gallery.
 * Run: node scripts/refresh-marave-hires.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public/media/marave/images");
const TMP_DIR = path.join(ROOT, ".tmp/marave-hires");
const BASE = "https://www.maraveresidences.com/Marave%20Final%20Renders";

const MAX_EDGE = 2400;
const QUALITY = 88;

/** source path under Marave Final Renders → local webp basename */
const MAP = [
  ["Condo%20A/H_OC_Interior_CondoA_Balcony.jpg", "condo-a-balcony"],
  ["Condo%20A/H_OC_Interior_CondoA_Bathroom.jpg", "condo-a-bathroom"],
  ["Condo%20A/H_OC_Interior_CondoA_Bedroom.jpg", "condo-a-bedroom"],
  ["Condo%20A/H_OC_Interior_CondoA_Kitchen.jpg", "condo-a-kitchen"],
  ["Condo%20A/H_OC_Interior_CondoA_Living_Day.jpg", "condo-a-living"],
  ["Condo%20A/H_OC_Interior_CondoA_Living_Sunset.jpg", "condo-a-living-sunset"],
  ["Condo%20F/H_OC_Interior_CondoF_Balcony.jpg", "penthouse-balcony"],
  ["Condo%20F/H_OC_Interior_CondoF_Bathroom.jpg", "penthouse-bathroom"],
  ["Condo%20F/H_OC_Interior_CondoF_Bedroom_01.jpg", "penthouse-bedroom"],
  ["Condo%20F/H_OC_Interior_CondoF_Kitchen.jpg", "penthouse-kitchen"],
  ["Condo%20F/H_OC_Interior_CondoF_living.jpg", "penthouse-living"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_EXterior_12_Villas_Close_Up_V1_06.jpg", "villas-close-up"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_013_Site_dusk.jpg", "hero-aerial-sunset"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_016_Hummingbird_V1_10.jpg", "hummingbird"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_01_Condo_Drop_OFF_04.jpg", "condo-drop-off"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_02_Condo_Detail_V1_04.jpg", "condo-detail"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_05_Beach_Club_Pool_V1_06-2.jpg", "beach-club-pool"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_05_Beach_Club_Pool_V1_06_No_girl-2.jpg", "beach-club-pool-alt"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_06_Beach_Club_Solarium_05.jpg", "beach-club-solarium"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_07_Beach_Club_yard_02.jpg", "beach-club-yard"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_07_Beach_Club_yard_02_girl.jpg", "beach-club-yard-lifestyle"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_08_Beach_Club_Aerial.jpg", "beach-club-aerial"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_09_Birdeye.jpg", "birdseye"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_09_Birdeye_V1_13.jpg", "birdseye-alt"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_10_Villas_general_09_REILUM_07.jpg", "villas-general"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_14_Villas%20Day_b.jpg", "villas-day"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_17_Aerial_03.jpg", "aerial-estate"],
  ["Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_18_Villas%20pool_27.jpg", "villas-pool-aerial"],
  ["Exterior%20Shots%20and%20Beach%20Hero/LXR%20Beach%20Image.webp", "lxr-beach"],
  ["Villa/H_OC_Exterior_18_Villas_Pool.jpg", "villa-pool"],
  ["Villa/H_OC_Interior_Villa01_Bathroom.jpg", "villa-bathroom"],
  ["Villa/H_OC_Interior_Villa01_Bedroom.jpg", "villa-bedroom"],
  ["Villa/H_OC_Interior_Villa01_Living_Room.jpg", "villa-living"],
  ["Villa/H_OC_Interior_Villa01_foyer_02%20copy.jpg", "villa-foyer"],
  ["Extra%20Images/Manuel%20Antonio%20Park.jpg", "manuel-antonio-park"],
  ["Extra%20Images/Speakeasy.webp", "speakeasy"],
  ["Extra%20Images/kids%20club.webp", "kids-club"],
  ["Extra%20Images/spa.webp", "spa"],
  ["Extra%20Images/pacific%20coast.jpg", "pacific-coast"],
  ["Extra%20Images/wildlife.webp", "wildlife"],
  ["amenities%20images/Damus%20Island.webp", "damus-island"],
  ["amenities%20images/Hidden%20Waterfall.jpg", "hidden-waterfall"],
  ["amenities%20images/Whale-Watching.webp", "whale-watching"],
  ["amenities%20images/Yoga%20meditation.webp", "yoga"],
  ["amenities%20images/catamaran%20cruise.jpg", "catamaran"],
  ["amenities%20images/coffee%20and%20chocolate%20farm.jpg", "coffee-farm"],
  ["amenities%20images/fishing%20.jpg", "fishing"],
  ["amenities%20images/kayak.jpg", "kayak"],
  ["amenities%20images/snorkeling.jpg", "snorkeling"],
  ["amenities%20images/twin%20zipline.webp", "zipline"],
  ["amenities%20images/white%20water%20rafting.jpg", "rafting"],
];

function download(url, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  execFileSync("/usr/bin/curl", ["-sfL", "--max-time", "60", "-A", "Mozilla/5.0", "-o", dest, url], {
    stdio: "inherit",
  });
}

async function exportWebp(srcPath, destPath) {
  const image = sharp(srcPath, { failOn: "none", unlimited: true });
  const meta = await image.metadata();
  if (!meta.width || !meta.height) throw new Error(`No dimensions for ${srcPath}`);

  let pipeline = sharp(srcPath, { failOn: "none", unlimited: true });
  if (meta.width > MAX_EDGE || meta.height > MAX_EDGE) {
    pipeline = pipeline.resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  await pipeline.webp({ quality: QUALITY, effort: 5 }).toFile(destPath);
  const out = await sharp(destPath).metadata();
  return { srcW: meta.width, srcH: meta.height, outW: out.width, outH: out.height, kb: Math.round(fs.statSync(destPath).size / 1024) };
}

async function main() {
  fs.mkdirSync(TMP_DIR, { recursive: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let ok = 0;
  let fail = 0;

  for (const [rel, basename] of MAP) {
    const url = `${BASE}/${rel}`;
    const ext = path.extname(decodeURIComponent(rel)) || ".jpg";
    const tmp = path.join(TMP_DIR, `${basename}${ext}`);
    const dest = path.join(OUT_DIR, `${basename}.webp`);

    try {
      process.stdout.write(`↓ ${basename} ... `);
      download(url, tmp);
      const info = await exportWebp(tmp, dest);
      console.log(
        `${info.srcW}x${info.srcH} → ${info.outW}x${info.outH} (${info.kb}KB)`
      );
      ok += 1;
    } catch (err) {
      console.log(`FAIL ${err.message || err}`);
      fail += 1;
    }
  }

  console.log(`\nDone. exported=${ok} failed=${fail} maxEdge=${MAX_EDGE} quality=${QUALITY}`);
  console.log(`Output: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
