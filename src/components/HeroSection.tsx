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
      {/* Background: video with CSS gradient fallback */}
      <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
        {/* CSS desert gradient background (always visible as fallback) */}
        <div
          className="absolute inset-0 scale-110"
          style={{
            background:
              "linear-gradient(160deg, #2A3E1A 0%, #4a6830 25%, #8B6914 55%, #C47A3A 80%, #1A2810 100%)",
          }}
        />
        {/* Video overlay - loads on top when available */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/hero-desert-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        >
          <source src="/videos/hero-desert.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(26,40,16,0.15)_0%,rgba(26,40,16,0.65)_100%)]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.12em] uppercase text-[#F5EFE3]/70 mb-4"
        >
          COACHELLA VALLEY WATER IONIZATION SPECIALIST
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#F5EFE3] max-w-3xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Your Water,
          <br />
          Elevated.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-base lg:text-lg leading-[1.7] text-[#F5EFE3]/80 max-w-xl mt-6 mb-8"
        >
          The Enagic K8 combines certified filtration with electrolysis -- backed
          by 50+ years of research. Professional installation starts at $299.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#contact"
            className="text-sm font-semibold px-6 py-3 bg-[#F5EFE3] text-[#2A3E1A] hover:bg-[#E8703A] hover:text-[#F5EFE3] transition-colors duration-400 tracking-wide text-center"
          >
            Schedule a complimentary consultation
          </a>
          <a
            href="#k8-system"
            className="text-sm font-semibold px-6 py-3 border border-[#F5EFE3] text-[#F5EFE3] hover:bg-[#F5EFE3] hover:text-[#2A3E1A] transition-colors duration-400 tracking-wide text-center"
          >
            Explore the K8 system
          </a>
        </motion.div>
      </div>
    </section>
  );
}
