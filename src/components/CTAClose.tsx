"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { PHONE } from "@/lib/content";

export default function CTAClose() {
  return (
    <section
      id="contact"
      className="relative bg-[#1A2810] py-32 lg:py-40 overflow-hidden"
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
          className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1] tracking-[0.02em] text-[#F5EFE3] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Ready for better water?
        </h2>
        <p className="text-lg font-light leading-[1.7] text-[#F5EFE3]/75 max-w-2xl mx-auto mb-10">
          Schedule a complimentary consultation. We assess your home, recommend
          the right system, and answer every question -- no pressure, no
          commitment.
        </p>
        <a
          href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
          className="inline-block text-sm font-semibold tracking-[0.02em] px-8 py-4 bg-[#F5EFE3] text-[#1A2810] hover:bg-[#E8703A] hover:text-[#F5EFE3] transition-colors duration-400"
        >
          Schedule Your Consultation
        </a>
        <div className="mt-8">
          <a
            href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
            className="text-2xl tracking-[0.08em] text-[#F5EFE3]/70 hover:text-[#F5EFE3] transition-colors"
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
