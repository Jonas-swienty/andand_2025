export default async function sitemap() {
  const baseUrl = "https://andand.space";

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
}
