"use client";
import { motion } from "framer-motion";

export default function TextAnimate({ text, className = "", duration = 0.8 }: { text: string; className?: string; duration?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {text}
    </motion.span>
  );
}
