"use client";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/content";

export default function TestimonialsSection() {
  return (
    <section
      className="py-32 lg:py-40 relative overflow-hidden"
      style={{ background: "rgba(90,112,64,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl mb-12"
        >
          <h2
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[0.02em] text-[#2A3E1A]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            What Coachella Valley residents say.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className="bg-[#F5EFE3] border border-[#D8D0C4] p-8"
            >
              <blockquote
                className="text-base italic leading-[1.8] text-[#1A1A14]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 pt-6 border-t border-[#D8D0C4]">
                <p className="text-sm font-semibold text-[#2A3E1A]">{t.name}</p>
                <p className="text-xs text-[#6B7560] tracking-[0.05em] mt-1">
                  {t.city}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
