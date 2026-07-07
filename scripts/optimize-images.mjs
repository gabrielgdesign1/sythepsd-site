import sharp from "sharp";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";

const ROOT = "C:/Users/Admin/Downloads/Sythe Site";
const OUT = join(process.cwd(), "public", "work");
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const jobs = [];

// Gaming thumbnails 1-8
for (let i = 1; i <= 8; i++) {
  jobs.push({
    src: join(ROOT, "Gaming Thumbnails", `${i}.jpg`),
    out: join(OUT, `gaming-${i}.webp`),
    w: 1280,
  });
}
// IRL thumbnails 1-3
for (let i = 1; i <= 3; i++) {
  jobs.push({
    src: join(ROOT, "IRL thumbnails", `${i}.jpg`),
    out: join(OUT, `irl-${i}.webp`),
    w: 1280,
  });
}

// Logo / profile picture (square)
jobs.push({
  src: join(ROOT, "Profile Picture.jpg"),
  out: join(process.cwd(), "public", "logo.webp"),
  w: 640,
});
// Larger portrait for about section
jobs.push({
  src: join(ROOT, "Profile Picture.jpg"),
  out: join(process.cwd(), "public", "portrait.webp"),
  w: 900,
});

const run = async () => {
  for (const j of jobs) {
    await sharp(j.src)
      .resize({ width: j.w, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(j.out);
    console.log("wrote", j.out);
  }
  console.log("done", jobs.length, "images");
};
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
