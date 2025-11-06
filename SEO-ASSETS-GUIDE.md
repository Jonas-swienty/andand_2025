# SEO Assets Guide

This guide will help you create the necessary image assets for your website's SEO optimization.

## Required Image Assets

### 1. OG Image (Social Media Preview)
**File:** `images/og-image.jpg`
**Dimensions:** 1200 x 630 pixels
**Format:** JPG or PNG
**Purpose:** This image appears when your website is shared on Facebook, LinkedIn, Twitter, etc.

**How to create:**
1. Create an image in your design software (Photoshop, Figma, Canva, etc.)
2. Use your && branding
3. Keep important content in the center (safe zone: 1200 x 600px)
4. Export as JPG at 80-90% quality
5. Save to `images/og-image.jpg`

**Design tips:**
- Use a simple, bold design with your && logo
- Add text like "Experience-Based Spatial Design"
- Use your brand colors
- Keep file size under 1MB

---

### 2. Favicon
**File:** `favicon.ico`
**Dimensions:** 16x16 and 32x32 pixels (multi-size ICO file)
**Format:** ICO
**Purpose:** The small icon that appears in browser tabs

**How to create:**
1. Design a simple && logo at 32x32 pixels
2. Use a favicon generator like https://favicon.io/ or https://realfavicongenerator.net/
3. Upload your logo and download the generated `favicon.ico`
4. Place it in the root directory (same level as index.html)

**Design tips:**
- Keep it simple - just the && symbol works well
- Use high contrast colors
- Test at small sizes to ensure readability

---

### 3. Apple Touch Icon
**File:** `apple-touch-icon.png`
**Dimensions:** 180 x 180 pixels
**Format:** PNG
**Purpose:** Icon used when users add your site to their iPhone/iPad home screen

**How to create:**
1. Create a 180x180px PNG with your && logo
2. Add padding around the logo (about 10-20px)
3. Use a solid background color
4. Export as PNG
5. Save to root directory as `apple-touch-icon.png`

**Design tips:**
- iOS will automatically round the corners
- Don't add rounded corners yourself
- Use a solid background color that matches your brand

---

### 4. Logo for Structured Data
**File:** `images/logo.png`
**Dimensions:** Minimum 112 x 112 pixels (recommended: 500 x 500 pixels or larger)
**Format:** PNG
**Purpose:** Used by Google in search results and Knowledge Graph

**How to create:**
1. Export your && logo at 500x500px or larger
2. Use transparent background or white background
3. Export as PNG
4. Save to `images/logo.png`

---

## Quick Creation Methods

### Option 1: Use Online Tools (Easiest)
1. **Favicon Generator:** https://favicon.io/
   - Upload a PNG of your && logo
   - Download and extract all files
   - Use the `favicon.ico` and `apple-touch-icon.png`

2. **OG Image Generator:** https://www.opengraph.xyz/
   - Design your social preview image
   - Download as og-image.jpg

### Option 2: Use Design Software
- **Photoshop/Illustrator:** Create at exact dimensions
- **Figma:** Use frames at specified sizes
- **Canva:** Use custom dimensions template

### Option 3: Simple && Logo Images
Since your logo is just "&&", you can create simple text-based images:

**Quick Method:**
1. Open any design tool
2. Create a canvas with the required dimensions
3. Add "&&" text in AkkuratPro-Bold font
4. Center it
5. Use white text on black background or vice versa
6. Export at the required dimensions

---

## After Creating the Files

1. Place files in the correct locations:
   ```
   /favicon.ico
   /apple-touch-icon.png
   /images/logo.png
   /images/og-image.jpg
   ```

2. Commit and push to GitHub

3. Deploy to Vercel (automatic)

4. Test your SEO:
   - **Favicon:** Visit your site and check the browser tab
   - **OG Image:** Share your URL on Facebook/LinkedIn and check preview
   - **Apple Touch Icon:** Add site to iPhone home screen
   - **Google Structured Data:** Use https://search.google.com/test/rich-results

---

## File Checklist

- [ ] `favicon.ico` created and placed in root directory
- [ ] `apple-touch-icon.png` created and placed in root directory
- [ ] `images/logo.png` created
- [ ] `images/og-image.jpg` created
- [ ] All files committed to GitHub
- [ ] Changes deployed to Vercel
- [ ] Tested favicon in browser
- [ ] Tested OG image preview on social media
- [ ] Submitted sitemap to Google Search Console

---

## Testing Tools

- **OG Preview:** https://www.opengraph.xyz/url/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Google Rich Results:** https://search.google.com/test/rich-results
- **Favicon Checker:** https://realfavicongenerator.net/favicon_checker

---

## Need Help?

If you need help creating these assets:
1. I can provide you with example code to generate simple text-based images
2. You can hire a designer on Fiverr/Upwork for $5-20
3. You can use the && text logo on a solid background as a simple solution
