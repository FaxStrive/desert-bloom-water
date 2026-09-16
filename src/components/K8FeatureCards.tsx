"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const CARDS = [
  {
    eyebrow: "FILTRATION + ELECTROLYSIS",
    heading: "Two Stages, One System",
    body: "The K8 first filters contaminants, then electrolyzes the water through 8 platinum-coated titanium plates to produce multiple water types.",
    img: "/images/install/install-02.jpg",
    alt: "K8 system installed under kitchen counter, Coachella Valley",
  },
  {
    eyebrow: "NSF/ANSI CERTIFIED",
    heading: "Third-Party Verified",
    body: "The K8 is certified to applicable NSF/ANSI standards -- independent testing for performance and safety claims.",
    img: "/images/install/install-03.jpg",
    alt: "K8 water ionizer unit with display panel showing pH settings",
  },
  {
    eyebrow: "5-YEAR WARRANTY",
    heading: "Backed for the Long Run",
    body: "Every K8 includes a 5-year manufacturer warranty. Professional installation in the Coachella Valley for $299.",
    img: "/images/install/install-04.jpg",
    alt: "Clean desert kitchen with K8 system beside the sink",
  },
];

export default function K8FeatureCards() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5EFE3] border-t border-[#D8D0C4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.12em] uppercase text-[#E8703A] font-medium mb-3">
            THE K8 SYSTEM
          </p>
          <h2
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] text-[#2A3E1A]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Engineered for the long term.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.heading}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true, margin: "-80px" }}
              className="group border border-[#D8D0C4] hover:border-[#2A3E1A] transition-all duration-300 bg-[#F5EFE3]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={card.img}
                  alt={card.alt}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs tracking-[0.1em] uppercase text-[#E8703A] font-medium mb-2">
                  {card.eyebrow}
                </p>
                <h3
                  className="text-xl font-bold tracking-[-0.01em] text-[#2A3E1A] mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {card.heading}
                </h3>
                <p className="text-sm leading-[1.7] text-[#1A1A14]">
                  {card.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
