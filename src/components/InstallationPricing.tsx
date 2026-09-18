"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const STEPS = [
  {
    number: "01",
    heading: "Schedule Your Consultation",
    body: "A Desert Bloom specialist comes to your home, walks you through the K8 system, and answers your questions. No commitment required.",
  },
  {
    number: "02",
    heading: "Professional Installation ($299)",
    body: "Once you decide to move forward, our certified installer sets up the K8 system at your sink. Most installations take 1 to 2 hours.",
  },
  {
    number: "03",
    heading: "Start Enjoying Your Water",
    body: "Your K8 is ready the same day. We walk you through the different water settings and what each one is best suited for.",
  },
];

export default function InstallationPricing() {
  return (
    <section className="py-32 lg:py-40 bg-[#F5EFE3]" style={{ background: "linear-gradient(135deg, #F5EFE3 0%, rgba(42,62,26,0.05) 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl mb-16"
        >
          <h2
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[0.02em] text-[#2A3E1A]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            From Consultation to Running Water in Three Steps
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className="border-t-2 border-[#2A3E1A] pt-6"
            >
              <div
                className="text-4xl font-bold tracking-[0.06em] text-[#D8D0C4] mb-4"
                style={{
                  fontFamily: "var(--font-jetbrains), 'Courier New', monospace",
                }}
              >
                {step.number}
              </div>
              <h3
                className="text-lg font-bold tracking-[-0.01em] text-[#2A3E1A] mb-3"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                {step.heading}
              </h3>
              <p className="text-sm leading-[1.7] text-[#1A1A14]">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Installation photos */}
        <div className="grid grid-cols-2 gap-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-60px" }}
            className="relative aspect-[16/9] overflow-hidden"
          >
            <Image
              src="/images/install/install-05.jpg"
              alt="K8 installation process in a desert home kitchen"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 33vw"
              style={{ filter: "brightness(0.85) contrast(1.1) saturate(0.7)" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-60px" }}
            className="relative aspect-[16/9] overflow-hidden"
          >
            <Image
              src="/images/lifestyle/kitchen-water.jpg"
              alt="Clean water flowing in a modern kitchen"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 33vw"
              style={{ filter: "brightness(0.85) contrast(1.1) saturate(0.75)" }}
            />
          </motion.div>
        </div>

        {/* Pricing block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-2xl">
          <div className="border border-[#D8D0C4] p-8 bg-[#F5EFE3]">
            <h3
              className="text-lg font-bold text-[#2A3E1A] mb-2"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Pay in Full
            </h3>
            <p className="text-sm text-[#6B7560] leading-[1.7]">
              Contact us for the full system price. Includes the Enagic K8 unit
              and professional installation in the Coachella Valley.
            </p>
            <a
              href="#contact"
              className="inline-block mt-6 text-sm font-semibold px-5 py-2 bg-[#2A3E1A] text-[#F5EFE3] hover:border hover:border-[#E8703A] transition-all duration-400"
            >
              Get a Quote
            </a>
          </div>
          <div className="border border-[#D8D0C4] p-8 bg-[#F5EFE3]">
            <h3
              className="text-lg font-bold text-[#2A3E1A] mb-2"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Financing Available
            </h3>
            <p className="text-sm text-[#6B7560] leading-[1.7]">
              Flexible financing options are available. Ask us about monthly
              payment plans during your complimentary consultation.
            </p>
            <a
              href="#contact"
              className="inline-block mt-6 text-sm font-semibold px-5 py-2 border border-[#2A3E1A] text-[#2A3E1A] hover:bg-[#2A3E1A] hover:text-[#F5EFE3] transition-all duration-400"
            >
              Ask About Financing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
