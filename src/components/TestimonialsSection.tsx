"use client";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/content";

export default function TestimonialsSection() {
  return (
    <section className="py-48 lg:py-64 bg-[#0D0D0B]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.35em] uppercase text-white/30 mb-20 text-center"
        >
          Coachella Valley Residents
        </motion.p>

        <div className="space-y-20">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-80px" }}
              className="border-t border-white/10 pt-12"
            >
              <blockquote
                className="text-3xl md:text-4xl font-light leading-[1.3] tracking-[0.08em] text-white uppercase"
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-8 h-px bg-white/30" />
                <div>
                  <p className="text-xs font-light tracking-[0.2em] uppercase text-white/60">
                    {t.name}
                  </p>
                  <p className="text-xs text-white/35 tracking-[0.15em] uppercase mt-1">
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
