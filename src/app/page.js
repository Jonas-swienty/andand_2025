import { client } from "@/sanity/client";
import HomeClient from "./HomeClient";

export const revalidate = 60;

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  aboutText,
  officeLabel,
  email,
  phone,
  addresses
}`;

const defaultSettings = {
  officeLabel: "&&",
  email: "office@andand.space",
  phone: "+45 20640262",
  addresses: [],
  aboutText:
    "&& is an interior design firm and spatial design practice based in Copenhagen and New York. We operate across commercial interior design, architecture, and installations, specializing in creating transformative office interiors, retail spaces, restaurants, and hospitality environments. We create meaningful spatial experiences that translate a brand's identity and seasonal narratives into immersive environments. At our core we create meaningful connections between people and brands. From early concept through delivery, we protect this core purpose, turning complex briefs into enduring, context-led spaces.",
};

async function getSiteSettings() {
  try {
    const settings = await client.fetch(SITE_SETTINGS_QUERY);
    return { ...defaultSettings, ...settings };
  } catch {
    // Sanity project not configured yet — fall back to the current static copy.
    return defaultSettings;
  }
}

export default async function Home() {
  const settings = await getSiteSettings();

  return <HomeClient {...settings} />;
}
