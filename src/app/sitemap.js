export default async function sitemap() {
  const baseUrl = "https://andand.space";

  return [
    { url: `${baseUrl}/`, lastModified: new Date("2026-10-01"), changeFrequency: "monthly", priority: 1 },
  ];
}
