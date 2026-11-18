import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import site from "@/content/site.json";
import HomeClient from "./HomeClient";

// Every image/video in public/media/left and public/media/right is shown,
// sorted by filename. Name files like "01-exhibition-design-for-Lise-Vester.jpg":
// the number sets the order, the rest becomes the alt text.
// A video can have a still frame shown while it loads: "03-name.poster.jpg".
const IMAGE_EXT = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
const VIDEO_EXT = [".mp4", ".webm", ".mov"];
const POSTER_RE = /\.poster\.(jpe?g|png|webp|avif)$/i;

function altFromFilename(name) {
  const text = path
    .parse(name)
    .name.replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\bandand\b/gi, "&&")
    .trim();
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "&& spatial design";
}

// A tiny blurred version of the image, inlined in the HTML, shown until the real image arrives.
async function blurPlaceholder(file) {
  try {
    const buf = await sharp(file).resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
    return `data:image/webp;base64,${buf.toString("base64")}`;
  } catch {
    return undefined;
  }
}

async function loadMedia(side) {
  const dir = path.join(process.cwd(), "public", "media", side);
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  // The ?v= hash changes when a file's content changes, so a replaced photo shows up
  // right away even though browsers cache media for a long time.
  const url = (file) => {
    const hash = crypto.createHash("sha1").update(fs.readFileSync(path.join(dir, file))).digest("hex").slice(0, 8);
    return `/media/${side}/${encodeURIComponent(file)}?v=${hash}`;
  };
  const items = files
    .filter((file) => !POSTER_RE.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map(async (file) => {
      const ext = path.extname(file).toLowerCase();
      const alt = altFromFilename(file);
      if (IMAGE_EXT.includes(ext)) {
        return { type: "image", src: url(file), alt, blur: await blurPlaceholder(path.join(dir, file)) };
      }
      if (VIDEO_EXT.includes(ext)) {
        const stem = path.parse(file).name;
        const poster = files.find((f) => POSTER_RE.test(f) && f.slice(0, f.lastIndexOf(".poster.")) === stem);
        return { type: "video", src: url(file), alt, poster: poster ? url(poster) : undefined };
      }
      return null;
    });
  return (await Promise.all(items)).filter(Boolean);
}

export default async function Home() {
  const [leftMedia, rightMedia] = await Promise.all([loadMedia("left"), loadMedia("right")]);
  return <HomeClient {...site} leftMedia={leftMedia} rightMedia={rightMedia} />;
}
