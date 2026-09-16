"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { SERVICE_CITIES, PHONE } from "@/lib/content";

export default function ServiceArea() {
  return (
    <section
      id="service-area"
      className="py-32 lg:py-40 relative overflow-hidden bg-[#F5EFE3]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: heading + city grid */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-80px" }}
              className="mb-10"
            >
              <h2
                className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[0.02em] text-[#2A3E1A]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Coachella Valley, in its entirety.
              </h2>
              <p className="text-lg text-[#6B7560] leading-[1.7] mt-4">
                From Palm Springs to Coachella -- if it&apos;s in the valley, we serve it.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {SERVICE_CITIES.map((city, i) => (
                <motion.div
                  key={city}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  viewport={{ once: true, margin: "-60px" }}
                  className="border-l-2 border-[#5A7040] pl-3 py-1"
                >
                  <span className="text-sm font-medium tracking-[0.02em] text-[#2A3E1A]">
                    {city}
                  </span>
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-[#6B7560] mt-10">
              Don&apos;t see your community?{" "}
              <a
                href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
                className="text-[#1A4475] hover:underline"
              >
                Call us
              </a>{" "}
              -- we may still cover your area.
            </p>
          </div>

          {/* Right: desert landscape image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/lifestyle/palm-springs-desert.jpg"
                alt="Greater Palm Springs desert landscape at sunset"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ filter: "brightness(0.82) contrast(1.12) saturate(0.7)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2810]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p
                  className="text-[#F5EFE3] text-lg font-bold leading-tight"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Greater Palm Springs
                </p>
                <p className="text-[#F5EFE3]/70 text-sm mt-1">
                  Coachella Valley service area
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
