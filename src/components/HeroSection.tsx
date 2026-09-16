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
      <div className="absolute inset-0 z-[1] bg-black/50" />

      {/* Wordmark top-left */}
      <motion.div
        className="absolute top-0 left-0 z-10 px-6 lg:px-12 pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <span
          className="text-xs tracking-[0.35em] uppercase text-white/70 font-light"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Desert Bloom Water Solutions
        </span>
      </motion.div>

      {/* Centered content: headline + one outlined CTA */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-6xl md:text-8xl lg:text-[7rem] font-light tracking-[0.25em] uppercase text-white leading-[1.15]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Pure Water.
          <br />
          Desert Air.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16"
        >
          <a
            href="#contact"
            className="inline-block text-xs font-light tracking-[0.3em] uppercase px-12 py-5 border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-400"
          >
            Schedule a Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
