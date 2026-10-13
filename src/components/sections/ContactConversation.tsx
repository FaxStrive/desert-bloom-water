"use client";

// ContactConversation
//
// The /contact body: a lead form beside the client's real contact details. Client component because
// the form validates and submits. Every string arrives as a prop from copy.md. It never claims a
// lead was sent when no endpoint is configured: submitLead says so and the error line is shown.
// Library candidate for templates/components/sections.
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { submitLead } from "@/lib/submitLead";
import { CTA_ACTION } from "@/lib/industry";

export interface ContactConversationProps {
  eyebrow?: string;
  formHeading: string;
  labels: { name: string; phone: string; email: string; zip: string; message: string };
  placeholders: { name: string; phone: string; email: string; zip: string; message: string };
  submitLabel: string;
  submitSupport?: string;
  errors: { required: string; email: string; phone: string; zip: string; send: string };
  detailsHeading: string;
  details: { label: string; value: string; href?: string }[];
}

type FieldErrors = Partial<Record<"name" | "phone" | "email" | "zip", string>>;

const fieldStyle = { border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" } as const;

export default function ContactConversation({
  eyebrow,
  formHeading,
  labels,
  placeholders,
  submitLabel,
  submitSupport,
  errors,
  detailsHeading,
  details,
}: ContactConversationProps) {
  const router = useRouter();
  const [values, setValues] = useState({ name: "", phone: "", email: "", zip: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "failed">("idle");

  function set(key: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (values.name.trim().length === 0) next.name = errors.required;
    const digits = values.phone.replace(/\D/g, "");
    if (values.phone.trim().length === 0) next.phone = errors.required;
    else if (digits.length < 10) next.phone = errors.phone;
    if (values.email.trim().length === 0) next.email = errors.required;
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email.trim())) next.email = errors.email;
    if (values.zip.trim().length === 0) next.zip = errors.required;
    else if (!/^\d{5}$/.test(values.zip.trim())) next.zip = errors.zip;
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate();
    setFieldErrors(found);
    if (Object.keys(found).length > 0) return;
    setStatus("submitting");
    const result = await submitLead({
      name: values.name,
      phone: values.phone,
      email: values.email,
      message: values.message,
      extra: { zip: values.zip },
    });
    if (result.ok) {
      router.push("/thank-you");
      return;
    }
    setStatus("failed");
  }

  const fields: { key: "name" | "phone" | "email" | "zip"; type: string; autoComplete: string }[] = [
    { key: "name", type: "text", autoComplete: "name" },
    { key: "phone", type: "tel", autoComplete: "tel" },
    { key: "email", type: "email", autoComplete: "email" },
    { key: "zip", type: "text", autoComplete: "postal-code" },
  ];

  return (
    <section className="section">
      <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          <h2 className="mb-8">{formHeading}</h2>
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
            {fields.map((field) => (
              <div key={field.key} className="flex flex-col gap-2">
                <label htmlFor={`contact-${field.key}`} className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-ink-muted)" }}>
                  {labels[field.key]}
                </label>
                <input
                  id={`contact-${field.key}`}
                  name={field.key}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  inputMode={field.key === "zip" ? "numeric" : undefined}
                  placeholder={placeholders[field.key]}
                  value={values[field.key]}
                  onChange={(event) => set(field.key, event.target.value)}
                  aria-invalid={fieldErrors[field.key] ? true : undefined}
                  aria-describedby={fieldErrors[field.key] ? `contact-${field.key}-error` : undefined}
                  className="h-12 px-4"
                  style={fieldStyle}
                />
                {fieldErrors[field.key] ? (
                  <p id={`contact-${field.key}-error`} className="text-sm" style={{ color: "var(--color-accent-text)" }} role="alert">
                    {fieldErrors[field.key]}
                  </p>
                ) : null}
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-ink-muted)" }}>
                {labels.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder={placeholders.message}
                value={values.message}
                onChange={(event) => set("message", event.target.value)}
                className="px-4 py-3"
                style={fieldStyle}
              />
            </div>
            {status === "failed" ? (
              <p role="alert" style={{ color: "var(--color-accent-text)" }}>
                {errors.send}
              </p>
            ) : null}
            <div className="flex flex-col items-start gap-3">
              <button type="submit" disabled={status === "submitting"} className="btn btn-primary btn-sweep disabled:opacity-60" data-cta={CTA_ACTION}>
                <span>{submitLabel}</span>
              </button>
              {submitSupport ? (
                <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                  {submitSupport}
                </p>
              ) : null}
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <h3>{detailsHeading}</h3>
          {details.map((detail) => (
            <div key={detail.label}>
              {detail.href ? (
                <a href={detail.href} className="font-semibold" style={{ color: "var(--color-accent-text)" }}>
                  {detail.value}
                </a>
              ) : (
                <p className="font-semibold">{detail.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
