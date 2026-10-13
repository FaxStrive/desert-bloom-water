// robots.ts
//
// Every site this builder shipped returned 404 on /robots.txt, because the
// seed had a sitemap but nothing serving robots. A crawler that asks a site
// how to read it and gets a 404 is told nothing, and the sitemap the build
// does generate is never announced. This is the file that answers.
//
// ORIGIN. The sitemap line is built from resolveSiteUrl(), never from a typed
// literal. Two demos once shipped a sitemap.xml whose every <loc> aimed at a
// made up origin nobody could reach, which is why @/lib/siteUrl exists and why
// bin/assert-site-url.mjs gates it. robots.ts has the identical failure mode,
// so it uses the identical resolver rather than repeating the mistake in a
// second file.
//
// THANK YOU. /thank-you already carries robots:{index:false,follow:false} in
// its own page metadata. Disallowing it here as well keeps the two statements
// in agreement instead of letting a crawler read one and not the other.
//
// FIXTURE CLIENTS ARE NOT INDEXED. A fixture record says of itself that it is
// never to be published, monitored, ranked or invoiced. Its build is still
// deployed to a review URL so a human can look at it, and a review copy that
// is reachable is not the same thing as a review copy that is indexable. When
// the record is a fixture the build carries isFixture through to facts.ts and
// this file closes the whole site to crawlers. The flag is read through an
// optional property rather than a required field on ClientFacts, so a build
// generated before the flag existed still compiles.
//
// TEST URLS ARE NOT INDEXED EITHER. Added 2026-10-02. A review deployment of a
// real client on a vercel.app address used to answer "allow everything", so a
// search engine could index a duplicate of the client's site under the wrong
// address. robots.txt now disallows everything unless NEXT_PUBLIC_SITE_URL names
// a host that is not a test host (siteIsIndexable in @/lib/siteUrl), and the
// seed layout puts noindex on every page the same way. A closed site does not
// announce its sitemap. A real launch sets NEXT_PUBLIC_SITE_URL to the client's
// own domain and gets the ordinary allow-everything file below, unchanged.
// bin/assert-indexing.mjs (gate 23) fails a build whose robots.txt, page heads
// and origin disagree.

import type { MetadataRoute } from "next";
import { facts } from "@/lib/facts";
import { resolveSiteUrl, siteIsIndexable } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  const isFixture = (facts as { isFixture?: boolean }).isFixture === true;

  if (isFixture || !siteIsIndexable()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/thank-you"] }],
    sitemap: resolveSiteUrl() + "/sitemap.xml",
  };
}
