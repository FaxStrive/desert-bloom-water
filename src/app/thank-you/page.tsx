import type { Metadata } from "next";
import { facts, fulfilment, salesModel } from "@/lib/facts";
import { CurvedSeam, CutCorner, GiantNumeral, OverlapFigure } from "@/components/shapes";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

/* The thank-you page is measured by the same gate as every other page, so it
   carries the same scale: one h1, a real section headline, body copy at the
   house size, and sections using the .section and .container classes. A page
   that quietly opts out of the scale fails house_look_drift, which is what
   this page did before 2026-09-21.

   THE POST-SUBMIT STORY IS READ OFF THE RECORD, NOT WRITTEN HERE. Until
   2026-09-30 this page hardcoded "we agree a time that suits you and confirm it
   before we come out" for every client. That is a lie on the site of a client
   whose salesModel.kind is "online-only": there is no van, no crew, no showroom
   and no appointment, so nobody is coming out. The seed ships verbatim into the
   build, so the lie reached a production page.

   So the three beats below are derived from salesModel.kind and the fulfilment
   block, the same record fields bin/assert-sales-model.mjs (gate 14) reads:

     - "online-only"  the order is confirmed, it ships to the door, what
                      arrives and roughly when, how to reach support, and the
                      returns window ONLY IF fulfilment.returnsWindowDays
                      states one.
     - anything else  the appointment story, which is true for a dealer with a
                      territory.
     - kind === null  neither story. A person read it and a person will reply.
                      No visit is promised and no shipment is promised.

   Every string is still generic: no client's wording, no city, no state, no
   county, no service radius, and for an online-only record none of the phrases
   gate 14 bans ("service area", "in-home", "consultation", "our technicians",
   "we come to", and the rest). The build stage may rewrite this copy in the
   client's own voice, but it inherits the right STORY by default rather than
   having to remember to replace the wrong one. */

type Beat = { title: string; body: string };

function nextBeats(): Beat[] {
  if (salesModel.kind === "online-only" && salesModel.orderBy === "booked-call") {
    // The order is taken on a booked call, so this page follows a call request.
    // salesModel.callVia "zoom" makes it a Zoom call: the link goes by email.
    const zoom = (salesModel as { callVia?: string | null }).callVia === "zoom";
    return [
      {
        title: zoom ? "Your Zoom call request is in" : "Your call request is in",
        body: zoom
          ? "We have your email and the time that suits you. A person reads it, not an automated system."
          : "We have your number and the time that suits you. A person reads it, not an automated system.",
      },
      {
        title: zoom ? "We send your Zoom link" : "We call you",
        body: zoom
          ? "On the Zoom call we confirm the right system for your water and take the order."
          : "On the call we confirm the right system for your water and take the order.",
      },
      {
        title: "Then it ships",
        body: salesModel.shipsTo
          ? `Nothing ships until you order on the call. We ship to ${salesModel.shipsTo.replace(/^All\b/, "all")}.`
          : "Nothing ships until you order on the call.",
      },
    ];
  }

  if (salesModel.kind === "online-only") {
    // This page follows the lead form (LeadForm pushes here), and on an
    // online-only site the lead form is a question, not an order: there is no
    // checkout in the seed. Until 2026-09-30 this branch said "your order is
    // confirmed" and promised tracking details, neither of which had happened
    // and neither of which the record states. It now tells the story the form
    // actually started: a question, answered through the record's channels.
    const beats: Beat[] = [
      {
        title: "Your message is in",
        body: "We have your message and the details you sent. A person reads it, not an automated system.",
      },
    ];
    const supportBody =
      fulfilment.supportNote ||
      (fulfilment.supportChannels.length
        ? `We answer by ${fulfilment.supportChannels.join(" or ")}.`
        : null);
    beats.push({
      title: "You get an answer",
      body: supportBody || "We reply using the details you gave us.",
    });
    beats.push({
      title: "Then you decide",
      body: salesModel.shipsTo
        ? `Nothing ships until you confirm the system. We ship to ${salesModel.shipsTo.replace(/^All\b/, "all")}.`
        : "Nothing ships until you confirm the system.",
    });
    return beats;
  }

  if (salesModel.kind) {
    return [
      {
        title: "We read your request",
        body: "A person reads what you sent, not an automated system.",
      },
      {
        title: "We get in touch",
        body: "We contact you using the details you gave us to confirm what you need.",
      },
      {
        title: "We book a time",
        body: "We agree a time that suits you and confirm it before we come out.",
      },
    ];
  }

  return [
    {
      title: "We read your request",
      body: "A person reads what you sent, not an automated system.",
    },
    {
      title: "We get in touch",
      body: "We contact you using the details you gave us to confirm what you need.",
    },
    {
      title: "We confirm the details",
      body: "We write back with the next step and everything you need to decide.",
    },
  ];
}

const ONLINE_ONLY_LEDE =
  "Your message has been sent. We reply before anything ships or anything is charged.";
const CALL_LEDE =
  "Your call request has been sent. Nothing is ordered or charged until we speak.";
const ZOOM_LEDE =
  "Your Zoom call request has been sent. Nothing is ordered or charged until we speak.";
const VISIT_LEDE =
  "Your request has been sent. Someone will be in touch to confirm the details and arrange a time that works for you.";
const NEUTRAL_LEDE =
  "Your request has been sent. Someone will read it and be in touch to confirm the details.";

export default function ThankYou() {
  const isOnlineOnly = salesModel.kind === "online-only";
  const beats = nextBeats();
  const isCallOrder = isOnlineOnly && salesModel.orderBy === "booked-call";
  const isZoomCall = isCallOrder && (salesModel as { callVia?: string | null }).callVia === "zoom";
  const eyebrow = isZoomCall ? "Zoom call requested" : isCallOrder ? "Call requested" : isOnlineOnly ? "Message received" : "Request received";
  const lede = isZoomCall ? ZOOM_LEDE : isCallOrder ? CALL_LEDE : isOnlineOnly ? ONLINE_ONLY_LEDE : salesModel.kind ? VISIT_LEDE : NEUTRAL_LEDE;

  return (
    <main>
      <section className="section">
        <div className="shell">
          <p className="eyebrow">{eyebrow}</p>
          <h1 style={{ marginTop: "18px", maxWidth: "16ch" }}>Thank you</h1>
          <p className="lede" style={{ marginTop: "28px", maxWidth: "54ch" }}>
            {lede}
          </p>
        </div>
      </section>

      {fulfilment.returnsWindowDays !== null ? (
        <OverlapFigure variant="numeral" numeral={String(fulfilment.returnsWindowDays)} numeralLabel="day returns" overlap={48} />
      ) : (
        <OverlapFigure variant="numeral" numeral={String(beats.length)} numeralLabel="steps from here" overlap={48} />
      )}

      <GiantNumeral numeral={String(beats.length)} corner="right" tone="alt" minHeight={320}>
        <h2 style={{ maxWidth: "18ch" }}>What happens next</h2>
        <ol
          style={{
            marginTop: "40px",
            display: "grid",
            gap: "32px",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {beats.map((beat) => (
            <li key={beat.title} style={{ borderTop: "1px solid var(--color-border)", paddingTop: "22px" }}>
              <h3>{beat.title}</h3>
              <p style={{ marginTop: "12px", color: "var(--color-ink-muted)" }}>{beat.body}</p>
            </li>
          ))}
        </ol>
      </GiantNumeral>

      <CurvedSeam direction="down" curvature="convex" fillTone="light" />

      <CutCorner
        corner="top-right"
        tone="light"
        eyebrow="In the meantime"
        headline="Something to add?"
        body={
          facts.phone
            ? `Call ${facts.phone}, or send another message from the contact page.`
            : "Send another message from the contact page."
        }
      />

      <section className="section">
        <div className="shell">
          <a className="btn btn-primary" href="/">
            Back to the homepage
          </a>
        </div>
      </section>
    </main>
  );
}
