// stagger
//
// Plain helper, not a client component: index * stepMs, so a caller (server
// or client) can offset a grid of Reveals. Kept out of Reveal.tsx because
// that file carries "use client" and Next.js treats every export of a
// "use client" module as a client reference, including a pure function -
// calling it from a server component throws at build time.

export function stagger(index: number, stepMs = 80): number {
  return index * stepMs;
}
