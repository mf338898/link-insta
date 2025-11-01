import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

async function run() {
  const publicDir = path.join(process.cwd(), "public", "images");
  const srcPng = path.join(publicDir, "honoraires.png");
  const outPng = path.join(publicDir, "honoraires.opt.png");
  const outWebp = path.join(publicDir, "honoraires.webp");

  if (!fs.existsSync(srcPng)) {
    console.error("Missing file:", srcPng);
    process.exit(1);
  }

  const image = sharp(srcPng).rotate();

  await image.png({ quality: 82, compressionLevel: 9, adaptiveFiltering: true }).toFile(outPng);
  await image.webp({ quality: 80 }).toFile(outWebp);

  console.log("Written:", outPng);
  console.log("Written:", outWebp);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});


