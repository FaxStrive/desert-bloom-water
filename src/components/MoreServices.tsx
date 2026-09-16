"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MoreServices() {
  return (
    <section className="py-32 lg:py-40 bg-[#F5EFE3] border-t border-[#D8D0C4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Shower Filter */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-80px" }}
            className="group"
          >
            <div
              id="shower-filter"
              className="relative aspect-video overflow-hidden mb-6"
            >
              <Image
                src="/images/product/shower-filter.jpg"
                alt="Shower filter for home installation"
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ filter: "brightness(0.85) contrast(1.1) saturate(0.7)" }}
              />
            </div>
            <h3
              className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold tracking-[0.02em] text-[#2A3E1A] mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Better water. Better skin. Better mornings.
            </h3>
            <p className="text-base leading-[1.7] text-[#1A1A14] mb-6">
              Municipal water contains chlorine and other chemicals your skin
              absorbs directly during a shower. A Desert Bloom shower filter
              removes these at the source -- the result is noticeably softer
              water on skin and hair without changing your plumbing. Installation
              is straightforward and takes under an hour.
            </p>
            <a
              href="#contact"
              className="text-sm font-medium text-[#1A4475] inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
            >
              Learn More <span>&#8594;</span>
            </a>
          </motion.div>

          {/* Kangen Beef Line */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true, margin: "-80px" }}
            className="group"
          >
            <div
              id="kangen-beef"
              className="relative aspect-video overflow-hidden mb-6"
            >
              <Image
                src="/images/product/kangen-beef.jpg"
                alt="Premium beef preparation kitchen"
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ filter: "brightness(0.85) contrast(1.1) saturate(0.7)" }}
              />
            </div>
            <h3
              className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold tracking-[0.02em] text-[#2A3E1A] mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Water that makes better beef.
            </h3>
            <p className="text-base leading-[1.7] text-[#1A1A14] mb-6">
              Specific pH water levels have commercial applications in food
              processing -- including meat. Certain ionized water compositions
              are used to improve moisture retention and texture in meat
              preparation, a practice that has been part of commercial food
              processing for decades. The Kangen system brings that capability to
              a different context. Ask us to explain the science behind it.
            </p>
            <a
              href="#contact"
              className="text-sm font-medium text-[#1A4475] inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
            >
              Ask Us About It <span>&#8594;</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
