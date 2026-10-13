// submitLead.ts
//
// TODO before this client goes live: this seed ships with no working form
// endpoint on purpose, so it can never silently swallow a lead the way a
// placeholder key from a different client's account did in a prior
// incident. Set ONE of the following, from this client's own account,
// before deploy:
//   - NEXT_PUBLIC_FORM_ENDPOINT_URL  (this client's own form provider endpoint)
//   - NEXT_PUBLIC_GHL_ENDPOINT_URL   (this client's GoHighLevel webhook URL)
// Document both in README.md and .env.example. Never reuse an endpoint or
// key that belongs to a different client.

export type LeadInput = {
  name: string;
  phone: string;
  email: string;
  message: string;
  /** Anything the client's form asks beyond the four above, e.g. a preferred
   *  time or an emergency flag. Merged into the posted body. A key that clashes
   *  with one of the four is ignored, so an extra can never overwrite them. */
  extra?: Record<string, string>;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "network-error" };

const FORM_ENDPOINT_URL = process.env.NEXT_PUBLIC_FORM_ENDPOINT_URL ?? "";
const GHL_ENDPOINT_URL = process.env.NEXT_PUBLIC_GHL_ENDPOINT_URL ?? "";

export function hasConfiguredEndpoint(): boolean {
  return FORM_ENDPOINT_URL.length > 0 || GHL_ENDPOINT_URL.length > 0;
}

// Sends the lead only if a real endpoint has been configured for this
// client. If nothing is configured, it returns { ok: false, reason:
// "not-configured" } rather than pretending to send. The caller is
// responsible for telling the visitor the truth in that case.
export async function submitLead(input: LeadInput): Promise<SubmitResult> {
  const endpoint = GHL_ENDPOINT_URL || FORM_ENDPOINT_URL;

  if (!endpoint) {
    return { ok: false, reason: "not-configured" };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(input.extra ?? {}),
        name: input.name,
        phone: input.phone,
        email: input.email,
        message: input.message,
      }),
    });
    return response.ok ? { ok: true } : { ok: false, reason: "network-error" };
  } catch {
    return { ok: false, reason: "network-error" };
  }
}
