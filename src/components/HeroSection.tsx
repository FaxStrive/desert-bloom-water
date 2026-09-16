"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Video background with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/hero-desert-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-desert.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-black/58" />

      {/* Centered content: wordmark + headline + one CTA */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-widest uppercase text-white leading-none"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Desert
            <br />
            Bloom
            <br />
            Water
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-8 text-xs tracking-[0.35em] uppercase text-white/60"
        >
          Pure Water for the Coachella Valley
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-10"
        >
          <a
            href="#contact"
            className="inline-block text-xs font-semibold tracking-widest uppercase px-10 py-4 border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300"
          >
            Schedule a Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
