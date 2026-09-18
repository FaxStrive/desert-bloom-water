"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const SERVICES = [
  {
    eyebrow: "K8 IONIZER",
    heading: "Eight Plates. Infinite Applications.",
    body: "Eight platinum-coated titanium plates produce alkaline drinking water, beauty water, and powerful cleaning water from a single countertop unit.",
    img: "/images/product/k8-ionizer.jpg",
    alt: "Enagic K8 ionizer unit",
    layout: "left" as const,
  },
  {
    eyebrow: "SHOWER FILTER",
    heading: "Softer Water. Better Skin.",
    body: "Desert municipal water contains chlorine your skin absorbs directly. A Desert Bloom shower filter removes it at the source, leaving noticeably softer water on skin and hair.",
    img: "/images/product/shower-filter.jpg",
    alt: "Shower filter for home installation",
    layout: "right" as const,
  },
  {
    eyebrow: "PROFESSIONAL INSTALLATION",
    heading: "Installation Included.",
    body: "Our installer comes to your home, sets up the system in under two hours, and walks you through every setting.",
    img: "/images/lifestyle/palm-springs-desert.jpg",
    alt: "Coachella Valley desert at dusk",
    layout: "full" as const,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#0D0D0B]">
      {/* Section header */}
      <div className="py-48 lg:py-64 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.35em] uppercase text-white/35 mb-8"
        >
          What We Offer
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.25em] uppercase text-white"
        >
          Our Systems
        </motion.h2>
      </div>

      {/* Section 1: text LEFT, image fills RIGHT half */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative min-h-[85vh] flex items-stretch"
      >
        {/* Text side */}
        <div className="relative z-10 w-full lg:w-1/2 flex items-center bg-[#0D0D0B] px-8 lg:px-16 py-24 lg:py-32">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-white/40 mb-8">
              {SERVICES[0].eyebrow}
            </p>
            <h3 className="text-4xl md:text-5xl font-light tracking-[0.2em] uppercase text-white leading-[1.2] max-w-lg">
              {SERVICES[0].heading}
            </h3>
            <p className="mt-10 text-base text-white/75 leading-[1.85] max-w-md font-light">
              {SERVICES[0].body}
            </p>
            <a
              href="#contact"
              className="inline-block mt-12 text-xs font-light tracking-[0.3em] uppercase px-10 py-4 border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
        {/* Image side */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <Image
            src={SERVICES[0].img}
            alt={SERVICES[0].alt}
            fill
            className="object-cover"
            sizes="50vw"
            style={{ filter: "brightness(0.55) saturate(0.7)" }}
          />
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="h-32 lg:h-48 bg-[#0D0D0B]" />

      {/* Section 2: image fills LEFT half, text RIGHT */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative min-h-[85vh] flex items-stretch"
      >
        {/* Image side */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <Image
            src={SERVICES[1].img}
            alt={SERVICES[1].alt}
            fill
            className="object-cover"
            sizes="50vw"
            style={{ filter: "brightness(0.55) saturate(0.7)" }}
          />
        </div>
        {/* Text side */}
        <div className="relative z-10 w-full lg:w-1/2 flex items-center bg-[#0D0D0B] px-8 lg:px-16 py-24 lg:py-32">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-white/40 mb-8">
              {SERVICES[1].eyebrow}
            </p>
            <h3 className="text-4xl md:text-5xl font-light tracking-[0.2em] uppercase text-white leading-[1.2] max-w-lg">
              {SERVICES[1].heading}
            </h3>
            <p className="mt-10 text-base text-white/75 leading-[1.85] max-w-md font-light">
              {SERVICES[1].body}
            </p>
            <a
              href="#contact"
              className="inline-block mt-12 text-xs font-light tracking-[0.3em] uppercase px-10 py-4 border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="h-32 lg:h-48 bg-[#0D0D0B]" />

      {/* Section 3: full-width image background, minimal centered text overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative min-h-[85vh] flex items-center justify-center"
      >
        <Image
          src={SERVICES[2].img}
          alt={SERVICES[2].alt}
          fill
          className="object-cover"
          sizes="100vw"
          style={{ filter: "brightness(0.45) saturate(0.65) contrast(1.1)" }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.35em] uppercase text-white/45 mb-8">
            {SERVICES[2].eyebrow}
          </p>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] uppercase text-white leading-[1.2]">
            {SERVICES[2].heading}
          </h3>
          <a
            href="#contact"
            className="inline-block mt-12 text-xs font-light tracking-[0.3em] uppercase px-10 py-4 border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300"
          >
            Book Installation
          </a>
        </div>
      </motion.div>
    </section>
  );
}
