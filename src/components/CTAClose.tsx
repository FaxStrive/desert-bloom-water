"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { PHONE } from "@/lib/content";

export default function CTAClose() {
  return (
    <section
      id="contact"
      className="relative bg-[#0D0D0B] py-48 lg:py-64 overflow-hidden"
    >
      {/* Logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <Image
          src="/logo.png"
          alt=""
          width={400}
          height={400}
          className="opacity-[0.04] select-none"
          aria-hidden="true"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >
        <h2
          className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.2] tracking-[0.2em] uppercase text-white mb-8"
        >
          Ready for better water?
        </h2>
        <p className="text-base font-light leading-[1.85] text-white/50 max-w-xl mx-auto mb-14">
          Schedule a complimentary consultation. We assess your home, recommend
          the right system, and answer every question. No pressure, no
          commitment.
        </p>
        <a
          href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
          className="inline-block text-xs font-light tracking-[0.3em] uppercase px-12 py-5 border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-400"
        >
          Schedule Your Consultation
        </a>
        <div className="mt-10">
          <a
            href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
            className="text-xl tracking-[0.12em] text-white/40 hover:text-white/70 transition-colors font-light"
            style={{
              fontFamily: "var(--font-jetbrains), 'Courier New', monospace",
            }}
          >
            {PHONE}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
