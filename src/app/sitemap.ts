import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/siteUrl";

// The site's own published route list. The origin comes from the one resolver (src/lib/siteUrl.ts):
// the client's domain once NEXT_PUBLIC_SITE_URL is set at launch, otherwise the host the build runs on.
// A local build with neither falls back to this client's review project, a vercel.app test host, which
// keeps the site closed to crawlers.
function origin(): string {
  try {
    return resolveSiteUrl();
  } catch {
    return "https://nbm-desert-bloom-gen.vercel.app";
  }
}

const BASE = origin();

const ROUTES = [
  "/",
  "/services",
  "/services/k8-water-system",
  "/about",
  "/service-areas",
  "/gallery",
  "/faq",
  "/contact",
  "/learn/how-it-works",
  "/learn/your-water",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({ url: BASE + route }));
}
