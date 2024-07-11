import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account/", "/cart/", "/orders/", "/wishlist/"],
    },
    sitemap: "https://triumphify.com/sitemap.xml",
  };
}
