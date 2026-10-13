// slug.ts
//
// One slug function, shared by every route that turns a service name into a
// URL segment and back. A system named "Aquonyx RO System" becomes
// "aquonyx-ro-system": lowercase, every run of non-alphanumeric characters
// collapsed to a single hyphen, no leading or trailing hyphen.

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
