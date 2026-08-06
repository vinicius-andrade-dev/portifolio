import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://viniciusandrade-dev.vercel.app";
  const locales = ["", "/en", "/es"];

  return locales.map((locale) => ({
    url: `${siteUrl}${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "" ? 1.0 : 0.8,
  }));
}
