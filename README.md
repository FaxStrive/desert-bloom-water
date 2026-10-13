# client-site-seed

A minimal, buildable Next.js 15 App Router + React 19 + TypeScript +
Tailwind v4 skeleton. It carries zero client assets, zero client strings and
no third party form keys.

## Why this exists

A prior client repo was created by copying another client's finished repo
(FaxStrive/usa-water-company, whose main branch begins with the commit
"Initial commit: Intiwater luxury water filtration site"). That copy
inherited Inti Water's branded install photographs, their 239 area code
service number, alt text reading "Intiwater install", and a Web3Forms access
key literally named after Inti Water that silently dropped every lead
submitted through it. Nobody noticed until leads had already been lost.

Copying a finished client repo is what caused that. Do not do it again.

## How a new client repo is created

A new client repo is created FROM THIS TEMPLATE, never by copying another
client's repo. Two ways to do it:

1. `gh repo create <new-client-slug> --private --clone` to make an empty
   repo, then copy the contents of this directory into it (not the `.git`
   folder), commit, and push.

   ```
   gh repo create <new-client-slug> --private --clone
   cp -R templates/seed/. <new-client-slug>/
   cd <new-client-slug>
   rm -rf .git
   git init
   git add src public package.json package-lock.json next.config.ts postcss.config.mjs tsconfig.json README.md .gitignore
   git commit -m "Initial commit: seed template, no client data yet"
   git remote add origin <the repo url gh printed>
   git push -u origin main
   ```

   Stage explicit paths, never the blanket form. This shop bans `git add`
   with a dot or with -A outright: a fresh working copy picks up whatever is
   sitting beside it, which on a build machine is node_modules, .next, a
   downloaded logo, a stray .env, or a photograph belonging to a different
   client. Naming the paths is one more line and it cannot stage a secret by
   accident.

2. Or `git init` directly inside a fresh copy of this directory and add the
   remote for the new client repo afterward.

Either way, the new repo's first commit carries nothing but this seed. The
build stage then fills in `src/lib/facts.ts` from the client's own
onboarding record, adds the client's own photos, and sets the client's own
form endpoint. It never starts from a copy of someone else's finished site.

Run `bin/assert-clean-seed` against `templates/seed/` before cutting a new
client repo, to confirm the seed itself has not picked up contamination.

## What is empty on purpose

- `src/lib/facts.ts` - every field is `null` or an empty array. The build
  stage fills it in from the client's onboarding record.
- `public/` - contains only `.gitkeep`. All photos and logos come from the
  client.
- The lead form has no working endpoint. See "Form endpoint" below.

## Form endpoint

`src/components/forms/LeadForm.tsx` and `src/lib/submitLead.ts` validate the
form client side, but do not send anything anywhere until one of these env
vars is set, in `.env.local` for local development and in the hosting
provider's environment settings for production:

- `NEXT_PUBLIC_FORM_ENDPOINT_URL` - this client's own form provider
  submission endpoint, from this client's own account.
- `NEXT_PUBLIC_GHL_ENDPOINT_URL` - this client's GoHighLevel inbound webhook
  URL, if that is the lead path instead.

See `.env.example`. Until one of these is set, the form tells the visitor
plainly that it is not connected to anything and their details were not
sent, and asks them to call the number on the page instead. It never claims
a submission was sent or received when it was not.

Never copy a key or endpoint URL from another client's account into this
project. That is exactly the mistake this template exists to prevent.

## Build

```
npm install
npm run build
```
