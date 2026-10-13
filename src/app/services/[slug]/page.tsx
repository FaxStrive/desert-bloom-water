import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { facts } from "@/lib/facts";
import { slugify } from "@/lib/slug";

// This is the seed's own service detail route: plain, and self-sufficient
// from @/lib/facts alone. A fresh scaffold made from nothing but a facts
// file has no section library, no src/lib/systemImages.ts and no
// src/lib/systemCopy.json, so this route imports none of them. The rich
// version lives at templates/components/routes/service-detail.tsx and is
// copied over this file by the BUILD stage once those three prerequisites
// exist - see personas/sites-stages/build.md, "The service detail route".
// Until that overlay runs, this is what every service page is.

// No image file is named here, and none should ever be added directly to
// this route. A photograph belongs to exactly one client, so a shared
// template that every build starts from can never hardcode a path -
// bin/assert-pre-ship gate 10 fails any image it cannot resolve through
// public/credits.json, and a literal path here would be another client's
// photo on this one's site.

// No money amount appears on this page, ever. A dollar figure, a monthly
// payment or a financing percentage is that client's own commercial term,
// never a template default - it comes from the client's own record at
// build time, in the BUILD-stage overlay, not from this file.

interface ServicePageParams {
  slug: string;
}

function findService(slug: string) {
  return facts.services.find((service) => slugify(service.name) === slug);
}

export function generateStaticParams(): ServicePageParams[] {
  return facts.services.map((service) => ({ slug: slugify(service.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ServicePageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) {
    return { title: "Service not found" };
  }
  return {
    title: service.name,
    description: service.description,
  };
}

const phoneDigits = facts.phone ? facts.phone.replace(/[^0-9]/g, "") : undefined;

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<ServicePageParams>;
}) {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) {
    notFound();
  }

  const otherServices = facts.services.filter((entry) => entry.name !== service.name);

  return (
    <main>
      <section className="section">
        <div className="shell">
          <p className="eyebrow">Services</p>
          <h1 style={{ marginTop: "18px", maxWidth: "20ch" }}>{service.name}</h1>
          <p className="lede" style={{ marginTop: "28px", maxWidth: "54ch" }}>
            {service.description}
          </p>
          <div style={{ marginTop: "40px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a className="btn btn-primary" href="/contact">
              Get in touch
            </a>
            {phoneDigits ? (
              <a className="btn" href={`tel:${phoneDigits}`}>
                Call {facts.phone}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {otherServices.length > 0 ? (
        <section className="section on-alt">
          <div className="shell">
            <h2 style={{ maxWidth: "18ch" }}>Other services</h2>
            <ul
              style={{
                marginTop: "40px",
                display: "grid",
                gap: "16px",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                listStyle: "none",
                padding: 0,
              }}
            >
              {otherServices.map((other) => (
                <li key={other.name} style={{ borderTop: "1px solid var(--color-border)", paddingTop: "18px" }}>
                  <a href={`/services/${slugify(other.name)}`} className="font-semibold">
                    {other.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}
