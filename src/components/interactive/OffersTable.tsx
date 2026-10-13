// OffersTable
//
// The pricing surface for a client whose pricing is reviewed in person. Adapted from the library's
// PricingTable: it prints only the offers the record holds, one row each, and every string is a prop
// from copy.md. No rate, term, partner or total appears unless the caller passes it. Renders null
// with no rows. Marked data-tool="pricing-comparison" so the style gate finds the tool on its route.
export interface OfferRow {
  name: string;
  value: string;
}

export interface OffersTableProps {
  headline: string;
  note?: string;
  columns: { offer: string; terms: string };
  rows: OfferRow[];
  ctaLabel?: string;
  ctaHref?: string;
}

export default function OffersTable({ headline, note, columns, rows, ctaLabel, ctaHref }: OffersTableProps) {
  if (rows.length === 0) {
    return null;
  }
  return (
    <section className="section on-alt" data-tool="pricing-comparison" data-density="dense">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2>{headline}</h2>
            {note ? <p className="lede mt-4">{note}</p> : null}
          </div>
          <div className="lg:col-span-7">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">{headline}</caption>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-ink)" }}>
                  <th scope="col" className="py-3 pr-4 text-sm font-semibold uppercase tracking-wide">
                    {columns.offer}
                  </th>
                  <th scope="col" className="py-3 text-sm font-semibold uppercase tracking-wide">
                    {columns.terms}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <th scope="row" className="py-4 pr-4 font-semibold">
                      {row.name}
                    </th>
                    <td className="py-4">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {ctaLabel && ctaHref ? (
              <div className="mt-8">
                <a href={ctaHref} className="btn btn-primary btn-sweep" data-cta="quote">
                  <span>{ctaLabel}</span>
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
