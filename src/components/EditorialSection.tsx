"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EditorialSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center">
      <Image
        src="/images/lifestyle/palm-springs-desert.jpg"
        alt="Coachella Valley desert at dusk, golden hour light"
        fill
        className="object-cover"
        sizes="100vw"
        style={{ filter: "brightness(0.45) saturate(0.8) contrast(1.1)" }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 py-40 lg:py-56">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.35em] uppercase text-white/50 mb-10"
        >
          Coachella Valley Water
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.2] tracking-[0.15em] uppercase text-white"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Hard water.
          <br />
          Harsh desert.
          <br />
          Your home
          <br />
          deserves better.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 text-lg leading-[1.85] text-white/75 max-w-xl"
        >
          The Enagic K8 transforms your tap into alkaline drinking water,
          beauty water, and powerful cleaning water from one countertop unit.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <a
            href="#contact"
            className="inline-block text-xs font-semibold tracking-widest uppercase px-10 py-4 border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}
