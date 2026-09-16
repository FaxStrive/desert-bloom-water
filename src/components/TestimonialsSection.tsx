"use client";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/content";

export default function TestimonialsSection() {
  return (
    <section className="py-40 lg:py-56 bg-[#F5EFE3]">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.35em] uppercase text-[#6B7560] mb-16 text-center"
        >
          What Coachella Valley Residents Say
        </motion.p>

        <div className="space-y-24">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className="border-t border-[#D8D0C4] pt-12"
            >
              <blockquote
                className="text-3xl md:text-4xl font-bold leading-[1.25] text-[#2A3E1A]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-8 h-px bg-[#2A3E1A]" />
                <div>
                  <p className="text-sm font-semibold text-[#2A3E1A] tracking-[0.05em]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#6B7560] tracking-[0.1em] uppercase mt-0.5">
                    {t.city}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
