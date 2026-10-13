"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { facts, salesModel } from "@/lib/facts";
import { hasConfiguredEndpoint, submitLead } from "@/lib/submitLead";

type Errors = {
  name?: string;
  contact?: string;
  message?: string;
};

export interface LeadFormProps {
  /**
   * "message" (the default) is a question or a quote request.
   * "call" books a phone call: the phone number is required, the visitor
   * picks the part of the day that suits them, and the button says so. Use it
   * when the record's salesModel.orderBy is "booked-call", where the order is
   * taken on that call rather than on the site. When the record's
   * salesModel.callVia is "zoom" the call is a Zoom call: the email is
   * required instead (the link goes there) and every label says Zoom.
   */
  mode?: "message" | "call";
  /** Pre-fills the message, e.g. the system the visitor came from. */
  defaultMessage?: string;
  /** The send button's label in "message" mode. A verb phrase that says what happens next. Defaults to "Send". */
  submitLabel?: string;
}

const CALL_TIMES = ["Morning", "Afternoon", "Evening"] as const;

export default function LeadForm({ mode = "message", defaultMessage = "", submitLabel = "Send" }: LeadFormProps) {
  const isCall = mode === "call";
  // salesModel.callVia (2026-09-30): a booked call is a phone call unless the
  // record says "zoom". Read loosely so a build whose record predates the field
  // still compiles.
  const isZoom = isCall && (salesModel as { callVia?: string | null }).callVia === "zoom";
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(defaultMessage);
  const [callTime, setCallTime] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "not-configured" | "network-error">("idle");

  function validate(): Errors {
    const next: Errors = {};

    if (name.trim().length === 0) {
      next.name = "Enter a name.";
    }

    if (isZoom) {
      if (email.trim().length === 0) {
        next.contact = "Enter the email to send the Zoom link to.";
      }
    } else if (isCall) {
      if (phone.trim().length === 0) {
        next.contact = "Enter the phone number to call.";
      }
    } else if (phone.trim().length === 0 && email.trim().length === 0) {
      next.contact = "Enter a phone number or an email address.";
    }

    if (!isCall && message.trim().length === 0) {
      next.message = "Say what you need help with.";
    }

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (!hasConfiguredEndpoint()) {
      setStatus("not-configured");
      return;
    }

    setStatus("submitting");

    const sent = isCall
      ? [isZoom ? "Zoom call request." : "Call request.", callTime ? "Best time for the call: " + callTime + "." : "", message.trim()].filter(Boolean).join("\n")
      : message;
    const result = await submitLead({ name, phone, email, message: sent });

    if (result.ok) {
      router.push("/thank-you");
      return;
    }

    setStatus(result.reason);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-2xl">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="border border-gray-400 px-3 py-2 rounded-none"
        />
        {errors.name ? <p className="text-sm text-red-600">{errors.name}</p> : null}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="border border-gray-400 px-3 py-2 rounded-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="border border-gray-400 px-3 py-2 rounded-none"
        />
        {errors.contact ? <p className="text-sm text-red-600">{errors.contact}</p> : null}
      </div>

      <div className="flex flex-col gap-1 sm:col-span-2">
        <label htmlFor="message" className="text-sm font-medium">
          {isCall ? "Which system, or what to cover on the call (optional)" : "What do you need help with"}
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={3}
          className="border border-gray-400 px-3 py-2 rounded-none"
        />
        {errors.message ? <p className="text-sm text-red-600">{errors.message}</p> : null}
      </div>

      {isCall ? (
        <fieldset className="flex flex-col gap-2 sm:col-span-2">
          <legend className="text-sm font-medium">{isZoom ? "Best time for the Zoom call" : "Best time to call"}</legend>
          <div className="flex flex-wrap gap-3">
            {CALL_TIMES.map((t) => (
              <label key={t} className="inline-flex min-h-[44px] items-center gap-2 border border-gray-400 px-4 py-2">
                <input type="radio" name="callTime" value={t} checked={callTime === t} onChange={() => setCallTime(t)} />
                {t}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {status === "not-configured" ? (
        <p className="text-sm text-red-700 sm:col-span-2" role="alert">
          This form is not connected to anything yet. Your details were not
          sent or received.{" "}
          {facts.phone
            ? `Call ${facts.phone} instead.`
            : "Call the number shown on this page instead, once it is set."}
        </p>
      ) : null}

      {status === "network-error" ? (
        <p className="text-sm text-red-700 sm:col-span-2" role="alert">
          The submission failed and your details were not received. Try
          again, or call {facts.phone ?? "the number shown on this page"}.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary btn-sweep justify-self-start disabled:opacity-60 sm:col-span-2"
      >
        <span>{status === "submitting" ? "Sending" : isZoom ? "Book my Zoom call" : isCall ? "Book my call" : submitLabel}</span>
      </button>
    </form>
  );
}
