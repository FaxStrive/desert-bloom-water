// siteUrl.ts
//
// The one place this site's own absolute URL is resolved. sitemap.ts used to
// hardcode a fake placeholder origin (a made up domain under the reserved
// dot-example TLD), and that is exactly what the live sitemap.xml shipped:
// every <loc> aimed at a domain nobody can reach. Anything that needs the
// site's own origin (sitemap, robots, canonical, metadataBase, openGraph.url)
// reads it from here instead of typing its own literal.
//
// Resolution order, most trusted first:
//   a. NEXT_PUBLIC_SITE_URL - this client's own configured domain, set in
//      the hosting provider's environment once they have one. See
//      .env.example.
//   b. Vercel's own deployment URL at build time: VERCEL_PROJECT_PRODUCTION_URL,
//      then VERCEL_URL, both host-only and prefixed https:// here. Vercel
//      sets one of these on every build it runs, preview or production, so
//      a client with no domain yet still gets a real, reachable origin
//      instead of a placeholder.
//   c. Neither is set. This only happens on a bare local build with no env
//      configured at all, and a placeholder literal is never acceptable, so
//      this throws instead of shipping one. Set NEXT_PUBLIC_SITE_URL locally
//      to build outside Vercel.

// INDEXING. A site reachable on a test URL must not be indexable. The first
// usa-water-company-gen deployment (a vercel.app project made for review) served
// a robots.txt that allowed everything, so a search engine was free to index a
// duplicate of a real client's site under the wrong address. The rule is one
// sentence: a site is indexable only when NEXT_PUBLIC_SITE_URL is set, by hand,
// to a host that is not a test host. No variable, or a vercel.app or local host,
// means closed: robots.ts disallows everything and every page carries noindex
// (the layout reads siteRobotsMeta below). A real launch sets
// NEXT_PUBLIC_SITE_URL to the client's own domain and nothing else changes.
//
// Vercel's own VERCEL_PROJECT_PRODUCTION_URL is deliberately NOT enough to open
// a site: it names whatever domain the project happens to have, including a
// vercel.app one, and opening a site must be somebody's decision.
//
// This list is mirrored in bin/lib/site-index.mjs (the gate reads it from there)
// and bin/assert-indexing.test.mjs fails if the two lists differ.
export const TEST_HOSTS = ["localhost", "127.0.0.1", "::1", ".vercel.app", ".localhost", ".local", ".test", ".example", "example.com", "example.org", "example.net"];

function isTestHost(host: string): boolean {
  const h = host.toLowerCase().replace(/^\[|\]$/g, "");
  return TEST_HOSTS.some((t) => (t.startsWith(".") ? h.endsWith(t) : h === t || h.endsWith("." + t)));
}

/** True only when NEXT_PUBLIC_SITE_URL is set to a host that is not a test host. */
export function siteIsIndexable(): boolean {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configured || configured.trim().length === 0) return false;
  try {
    return !isTestHost(new URL(configured.trim()).hostname);
  } catch {
    return false;
  }
}

/** The page-level robots metadata: noindex on a test URL, nothing at all on a launched site. */
export function siteRobotsMeta(): { index: false; follow: false } | undefined {
  return siteIsIndexable() ? undefined : { index: false, follow: false };
}

function normalise(url: string): string {
  return url.replace(/\/+$/, "");
}

export function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured && configured.trim().length > 0) {
    return normalise(configured.trim());
  }

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelHost && vercelHost.trim().length > 0) {
    return normalise("https://" + vercelHost.trim());
  }

  throw new Error(
    "siteUrl: no site URL is resolvable. Set NEXT_PUBLIC_SITE_URL in " +
      ".env.local for a local build, or build on Vercel where " +
      "VERCEL_PROJECT_PRODUCTION_URL or VERCEL_URL is set automatically."
  );
}
