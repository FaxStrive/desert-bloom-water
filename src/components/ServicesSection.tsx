"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const SERVICES = [
  {
    eyebrow: "K8 IONIZER",
    heading: "Eight Plates. Infinite Applications.",
    body: "Eight platinum-coated titanium plates produce alkaline drinking water, beauty water, powerful cleaning water, and more. NSF/ANSI certified. One device serves your whole home.",
    img: "/images/install/install-01.jpg",
    alt: "Enagic K8 ionizer installed in a Coachella Valley kitchen",
  },
  {
    eyebrow: "SHOWER FILTER",
    heading: "Softer Water. Better Skin.",
    body: "Desert municipal water contains chlorine your skin absorbs directly. A Desert Bloom shower filter removes it at the source, leaving noticeably softer water on skin and hair. Installed in under an hour.",
    img: "/images/product/shower-filter.jpg",
    alt: "Shower filter for home installation",
  },
  {
    eyebrow: "PROFESSIONAL INSTALLATION",
    heading: "Same-Day Setup. $299.",
    body: "Our certified installer comes to your home, sets up the system in 1 to 2 hours, and walks you through every setting before leaving. Serving all of the Coachella Valley.",
    img: "/images/install/install-05.jpg",
    alt: "Professional K8 water system installation",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#0D0D0B]">
      {/* Section header */}
      <div className="py-40 lg:py-56 text-center">
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
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.08em] uppercase text-white"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Our Systems
        </motion.h2>
      </div>

      {/* Full-bleed image panels stacked vertically */}
      {SERVICES.map((service) => (
        <motion.div
          key={service.eyebrow}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative min-h-[75vh] flex items-end"
        >
          <Image
            src={service.img}
            alt={service.alt}
            fill
            className="object-cover"
            sizes="100vw"
            style={{ filter: "brightness(0.5) saturate(0.65) contrast(1.1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full pb-20 lg:pb-28">
            <p className="text-xs tracking-[0.35em] uppercase text-white/45 mb-5">
              {service.eyebrow}
            </p>
            <h3
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {service.heading}
            </h3>
            <p className="mt-5 text-base text-white/65 leading-[1.85] max-w-lg">
              {service.body}
            </p>
            <a
              href="#contact"
              className="inline-block mt-10 text-xs font-semibold tracking-widest uppercase px-10 py-4 border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300"
            >
              Get Started
            </a>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
