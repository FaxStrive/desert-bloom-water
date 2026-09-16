"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const SERVICES = [
  { name: "K8 Ionizer System", href: "/services/k8-ionizer" },
  { name: "Shower Filter", href: "/services/shower-filter" },
  { name: "Kangen Beef Line", href: "/services/kangen-beef-line" },
];

export default function NavDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 text-sm font-medium tracking-[0.04em] text-[#2A3E1A] hover:text-[#E8703A] transition-colors duration-300">
        Services <span className="text-xs">&#9662;</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
            className="absolute top-full left-0 mt-2 min-w-[200px] bg-[#F5EFE3] border border-[#D8D0C4] shadow-sm z-50"
          >
            {SERVICES.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="block px-4 py-3 text-sm text-[#2A3E1A] hover:bg-[#E8703A] hover:text-[#F5EFE3] transition-colors duration-200"
              >
                {s.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
