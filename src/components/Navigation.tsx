"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SERVICES, PHONE } from "@/lib/content";
import { ChevronDown } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 px-6 lg:px-12 flex items-center justify-between transition-all duration-500 ease-out ${
        scrolled
          ? "bg-[#F5EFE3]/95 backdrop-blur-sm shadow-[0_1px_0_0_#D8D0C4] text-[#2A3E1A]"
          : "bg-transparent text-[#F5EFE3]"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 flex-shrink-0">
        <Image
          src="/logo.png"
          alt="Desert Bloom Water Solutions"
          width={40}
          height={40}
          className="object-contain"
        />
        <span
          className={`font-heading text-sm font-bold tracking-tight hidden md:block ${
            scrolled ? "text-[#2A3E1A]" : "text-[#F5EFE3]"
          }`}
        >
          DESERT BLOOM
        </span>
      </Link>

      {/* Desktop nav */}
      <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
        <li>
          <Link href="/" className="hover:opacity-70 transition-opacity">
            Home
          </Link>
        </li>
        <li className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-1 hover:opacity-70 transition-opacity cursor-pointer"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            aria-expanded={servicesOpen}
          >
            Services <ChevronDown className="w-4 h-4" />
          </button>
          {servicesOpen && (
            <div
              className="absolute top-full left-0 mt-1 min-w-56 bg-[#F5EFE3] shadow-md border border-[#D8D0C4] py-2"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              {SERVICES.map((svc) => (
                <a
                  key={svc.href}
                  href={svc.href}
                  className="block px-4 py-2 text-[#2A3E1A] text-sm hover:bg-[#2A3E1A] hover:text-[#F5EFE3] transition-colors"
                >
                  {svc.name}
                </a>
              ))}
            </div>
          )}
        </li>
        <li>
          <a href="#about" className="hover:opacity-70 transition-opacity">
            About
          </a>
        </li>
        <li>
          <a
            href="#service-area"
            className="hover:opacity-70 transition-opacity"
          >
            Service Area
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:opacity-70 transition-opacity">
            Contact
          </a>
        </li>
      </ul>

      {/* Phone CTA */}
      <a
        href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
        className={`text-sm font-semibold px-4 py-2 border transition-all duration-400 tracking-wide ${
          scrolled
            ? "border-[#2A3E1A] text-[#2A3E1A] hover:bg-[#2A3E1A] hover:text-[#F5EFE3]"
            : "border-[#F5EFE3] text-[#F5EFE3] hover:bg-[#F5EFE3] hover:text-[#2A3E1A]"
        }`}
      >
        {PHONE}
      </a>
    </nav>
  );
}
