# && — andand.space

One-page Next.js site, deployed on Vercel. Every push to `main` redeploys.

## Changing pictures and videos

The homepage halves cycle through the files in:

- `public/media/left/`
- `public/media/right/`

On github.com, open the folder → **Add file → Upload files** to add, or open a file → **⋯ → Delete file** to remove. Commit, and the site updates in about a minute.

- Files show in filename order, so start names with a number: `01-…`, `02-…`.
- The rest of the name becomes the alt text (used by Google and screen readers; capitals are kept): `03-exhibition-design-for-Lise-Vester.jpg` → "Exhibition design for Lise Vester". `andand` turns into `&&`.
- Images: `.jpg .jpeg .png .webp .avif .gif`. Videos: `.mp4 .webm .mov`.
- Photos: upload the full-size export, at least **1440px wide and 1800px tall** (about 3000px on the long side is ideal, under ~5 MB). The site resizes them for each screen and serves them as AVIF/WebP at 85% quality automatically.
- A photo smaller than 1440×1800 would look blurry on large screens, so the update stops: Vercel shows a failed deploy (the error names the file) and the current site stays online. Replace the file with a bigger version and it goes through.
- Videos are sent as-is, so compress them before uploading: about 1080px wide, no sound, ideally under 3 MB. GitHub's web upload limit is 25 MB per file. With ffmpeg:
  `ffmpeg -i in.mp4 -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart -vf "scale='min(1080,iw)':-2" 03-name.mp4`
- Give each video a still frame with the same name plus `.poster.jpg` (`03-name.mp4` → `03-name.poster.jpg`). It shows while the video loads. Make one with:
  `ffmpeg -i 03-name.mp4 -frames:v 1 -q:v 3 03-name.poster.jpg`
- The site only switches to a photo or video once it has fully loaded, so a slow file delays its turn instead of showing a blank frame.

## Changing text

Edit `src/content/site.json` on github.com (pencil icon). It holds everything on the About page:

- `email`, `phone`, `address`: the contact lines at the bottom of the Office half.
- `office`: the Office text, one entry per paragraph.
- `people`: one entry per person, each with a `name` (shown in capitals) and a `bio`. Add, remove or reorder people by editing this list.

Keep the quotes and commas as they are; GitHub highlights a mistake before you commit.

## Running locally

```bash
npm install
npm run dev
```

`_legacy/` holds the old static site and a backup of the former Sanity content (`_legacy/sanity-backup/`).
