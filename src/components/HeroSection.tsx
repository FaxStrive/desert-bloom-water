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
      className="relative h-screen w-full overflow-hidden flex items-end pb-24"
    >
      {/* Video is PRIMARY - always the background */}
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
      {/* Gradient overlay ON TOP of video for text legibility only */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(26,40,16,0.15)] via-transparent to-[rgba(26,40,16,0.45)]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <motion.h1
          initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#F5EFE3] max-w-3xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Your Water,
          <br />
          Elevated.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10"
        >
          <a
            href="#contact"
            className="text-sm font-semibold px-6 py-3 bg-[#F5EFE3] text-[#2A3E1A] hover:bg-[#E8703A] hover:text-[#F5EFE3] transition-colors duration-400 tracking-wide text-center"
          >
            Schedule a complimentary consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
