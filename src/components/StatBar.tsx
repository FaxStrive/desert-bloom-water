"use client";
import { motion } from "framer-motion";
import { STATS } from "@/lib/content";

export default function StatBar() {
  return (
    <section className="bg-[#1A2810] py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#F5EFE3]/20">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="px-6 py-4 first:pl-0 last:pr-0 text-center lg:text-left"
            >
              <div
                className="text-3xl lg:text-4xl font-bold tracking-[0.06em] text-[#F5EFE3]"
                style={{
                  fontFamily: "var(--font-jetbrains), 'Courier New', monospace",
                }}
              >
                {stat.number}
              </div>
              <div className="text-xs tracking-[0.08em] uppercase text-[#F5EFE3]/60 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
