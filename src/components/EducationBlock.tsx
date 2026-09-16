"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EducationBlock() {
  return (
    <section id="k8-system" className="py-32 lg:py-40 bg-[#F5EFE3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[0.02em] text-[#2A3E1A] mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              What Most Water Filters Miss
            </h2>
            <div className="text-base leading-[1.7] text-[#1A1A14] space-y-4">
              <p>
                Standard filtration removes particles. The Enagic K8 restructures water through electrolysis, producing multiple pH levels suited to different uses.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-block mt-8 text-sm font-semibold px-6 py-3 bg-[#2A3E1A] text-[#F5EFE3] hover:border hover:border-[#E8703A] transition-all duration-400 tracking-wide"
            >
              Learn how K8 works
            </a>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/install/install-01.jpg"
                alt="Enagic K8 -- 8 platinum-coated titanium plates, NSF/ANSI certified"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ filter: "brightness(0.85) contrast(1.1) saturate(0.7)" }}
              />
            </div>
            <p className="text-xs text-[#6B7560] mt-3 tracking-[0.05em]">
              Enagic K8 -- 8 platinum-coated titanium plates, NSF/ANSI certified
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
