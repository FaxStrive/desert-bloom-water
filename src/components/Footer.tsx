import Image from "next/image";
import { PHONE, EMAIL } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0B] border-t border-white/10 py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Desert Bloom Water Solutions"
            width={36}
            height={36}
            className="opacity-70"
          />
          <span
            className="text-xs tracking-[0.25em] uppercase text-white/40 font-light"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Desert Bloom Water Solutions
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <a
            href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
            className="text-xs tracking-[0.15em] text-white/50 hover:text-white/80 transition-colors font-light"
          >
            {PHONE}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="text-xs tracking-[0.15em] text-white/50 hover:text-white/80 transition-colors font-light"
          >
            {EMAIL}
          </a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 mt-10 pt-6 border-t border-white/8">
        <p className="text-xs text-white/25 font-light">
          &copy; 2026 Desert Bloom Water Solutions. Independent Enagic distributor.
        </p>
      </div>
    </footer>
  );
}
