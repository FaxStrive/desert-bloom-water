import type { Metadata } from "next";
import { facts } from "@/lib/facts";
import { slugify } from "@/lib/slug";
import LeadForm from "@/components/forms/LeadForm";

// This is the seed's own home route: plain, and self-sufficient from
// @/lib/facts alone. A fresh scaffold made from nothing but a facts file has
// no section library, no @/components/interactive/*, no
// src/lib/systemImages.ts and no src/lib/systemCopy.json, so this route
// imports none of them - only @/lib/facts, @/lib/slug and the seed's own
// @/components/forms/LeadForm. The rich version lives at
// templates/components/routes/home.tsx and is copied over this file by the
// BUILD stage once those prerequisites exist - see
// personas/sites-stages/build.md, "The service detail route". Until that
// overlay runs, this is what the home page is.

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

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  const companyName = facts.companyName ?? "";
  const phoneDigits = facts.phone ? facts.phone.replace(/[^0-9]/g, "") : undefined;

  return (
    <main>
      <section className="section">
        <div className="shell">
          <p className="eyebrow">{companyName}</p>
          <h1 style={{ marginTop: "18px", maxWidth: "20ch" }}>
            {companyName ? `${companyName}` : "Welcome"}
          </h1>
          {phoneDigits ? (
            <p className="lede" style={{ marginTop: "28px" }}>
              <a href={`tel:${phoneDigits}`} className="font-semibold">
                Call {facts.phone}
              </a>
            </p>
          ) : null}
        </div>
      </section>

      {facts.services.length > 0 ? (
        <section className="section on-alt">
          <div className="shell">
            <h2 style={{ maxWidth: "18ch" }}>Services</h2>
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
              {facts.services.map((service) => (
                <li key={service.name} style={{ borderTop: "1px solid var(--color-border)", paddingTop: "18px" }}>
                  <a href={`/services/${slugify(service.name)}`} className="font-semibold">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {facts.serviceAreas.length > 0 ? (
        <section className="section">
          <div className="shell">
            <h2 style={{ maxWidth: "18ch" }}>Where we work</h2>
            <p className="lede" style={{ marginTop: "28px" }}>
              {facts.serviceAreas.map((area) => `${area.city}, ${area.state}`).join(" | ")}
            </p>
          </div>
        </section>
      ) : null}

      <section className="section on-alt">
        <div className="shell max-w-2xl">
          <h2 style={{ maxWidth: "18ch" }}>Get in touch</h2>
          <div style={{ marginTop: "28px" }}>
            <LeadForm />
          </div>
        </div>
      </section>
    </main>
  );
}
