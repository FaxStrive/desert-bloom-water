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
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              What Most Water Filters Miss
            </h2>
            <div className="text-base leading-[1.7] text-[#1A1A14] space-y-4">
              <p>
                Standard filtration removes particles. The Enagic K8 restructures water through electrolysis -- producing multiple pH levels from the same tap, suited to drinking, cooking, cleaning, and more.
              </p>
              <p>
                Eight platinum-coated titanium plates generate the electrical charge that separates minerals into alkaline and acidic streams. The result is water your household can actually use in different ways, from a single compact countertop unit.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-block mt-8 text-sm font-semibold px-6 py-3 bg-[#2A3E1A] text-[#F5EFE3] hover:bg-[#E8703A] transition-colors duration-300 tracking-wide"
            >
              Schedule a Consultation
            </a>
          </motion.div>

          {/* Images stacked */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative grid grid-cols-2 gap-4"
          >
            <div className="relative aspect-[3/4] overflow-hidden col-span-1">
              <Image
                src="/images/product/k8-ionizer.jpg"
                alt="Enagic K8 ionizer unit -- 8 platinum-coated titanium plates"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
                style={{ filter: "brightness(0.88) contrast(1.05) saturate(0.75)" }}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/images/install/install-01.jpg"
                  alt="K8 installation in a Coachella Valley home"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  style={{ filter: "brightness(0.85) contrast(1.1) saturate(0.7)" }}
                />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/images/lifestyle/water-glass.jpg"
                  alt="Fresh ionized water poured in a glass"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  style={{ filter: "brightness(0.88) contrast(1.05) saturate(0.75)" }}
                />
              </div>
            </div>
            <p className="col-span-2 text-xs text-[#6B7560] mt-1 tracking-[0.05em]">
              Enagic K8 -- 8 platinum-coated titanium plates, NSF/ANSI certified, 5-year warranty
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
