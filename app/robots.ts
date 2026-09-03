import type { MetadataRoute } from "next";

// La capa privada no se indexa: ni sus páginas ni su API. El resto sí.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/cerebro", "/api/"] }],
  };
}
