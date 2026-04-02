import { MetadataRoute } from "next";
import { wixClientServer } from "@/lib/wixClientServer";

const BASE_URL = "https://watchfusionkenya.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/deals`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic product pages
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const wixClient = await wixClientServer();
    const products = await wixClient.products
      .queryProducts()
      .limit(100)
      .find();

    productPages = products.items.map((product) => ({
      url: `${BASE_URL}/${product.slug}`,
      lastModified: product.lastUpdated
        ? new Date(product.lastUpdated)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error generating product sitemap:", error);
  }

  return [...staticPages, ...productPages];
}
