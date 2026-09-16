import Image from "next/image";
import Link from "next/link";
import { SERVICES, PHONE, EMAIL, SERVICE_CITIES } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-[#F5EFE3] pt-16 pb-8 border-t border-[#D8D0C4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Col 1 */}
          <div>
            <Image
              src="/logo.png"
              alt="Desert Bloom Water Solutions"
              width={50}
              height={50}
              className="mb-4"
            />
            <p
              className="text-sm italic text-[#6B7560]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Ionized water for the desert lifestyle.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <p className="text-xs tracking-[0.1em] uppercase font-semibold text-[#2A3E1A] mb-4">
              Services
            </p>
            <ul className="space-y-2">
              {SERVICES.map((svc) => (
                <li key={svc.href}>
                  <a
                    href={svc.href}
                    className="text-sm text-[#6B7560] hover:text-[#2A3E1A] transition-colors"
                  >
                    {svc.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#service-area"
                  className="text-sm text-[#6B7560] hover:text-[#2A3E1A] transition-colors"
                >
                  Service Area
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-[#6B7560] hover:text-[#2A3E1A] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <p className="text-xs tracking-[0.1em] uppercase font-semibold text-[#2A3E1A] mb-4">
              Service Area
            </p>
            <div className="columns-2 gap-2">
              {SERVICE_CITIES.slice(0, 8).map((city) => (
                <p key={city} className="text-sm text-[#6B7560] mb-1">
                  {city}
                </p>
              ))}
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <p className="text-xs tracking-[0.1em] uppercase font-semibold text-[#2A3E1A] mb-4">
              Contact
            </p>
            <a
              href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
              className="text-sm text-[#6B7560] hover:text-[#2A3E1A] transition-colors block mb-2"
            >
              {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm text-[#6B7560] hover:text-[#2A3E1A] transition-colors block"
            >
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="border-t border-[#D8D0C4] mt-12 pt-6 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-[#6B7560]">
            &copy; 2026 Desert Bloom Water Solutions
          </p>
          <p className="text-xs text-[#6B7560] leading-[1.6] max-w-lg">
            Enagic K8 is certified to applicable NSF/ANSI standards. Desert
            Bloom Water Solutions is an independent Enagic distributor.
          </p>
        </div>
      </div>
    </footer>
  );
}
