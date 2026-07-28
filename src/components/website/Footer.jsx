import Link from "next/link";
import { MapPin, Phone, Mail, AtSign } from "lucide-react";

import { Logo } from "@/components/common/Logo";
import { websiteNavigation } from "@/constants/navigation";

const contactInfo = [
  { icon: MapPin, text: "Tapovan, Rishikesh, Uttarakhand, India" },
  { icon: Phone, text: "+91 98765 43210" },
  { icon: Mail, text: "hello@omvana.in" },
  { icon: AtSign, text: "@omvana.retreat" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer text-surface" aria-label="Site footer">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs font-body text-sm leading-7 text-surface/60">
              A spiritual habitat in Rishikesh for those returning home to
              themselves.
            </p>
          </div>

          <div>
            <h3 className="font-ui text-xs uppercase tracking-[0.2em] text-surface/40">
              Explore
            </h3>
            <ul className="mt-6 space-y-4">
              {websiteNavigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-surface/60 transition-colors hover:text-surface"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-ui text-xs uppercase tracking-[0.2em] text-surface/40">
              Find us
            </h3>
            <ul className="mt-6 space-y-4">
              {contactInfo.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <item.icon
                    className="mt-0.5 size-4 shrink-0 text-surface/40"
                    aria-hidden="true"
                  />
                  <span className="font-body text-sm leading-6 text-surface/60">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-surface/10 pt-8">
          <p className="font-ui text-xs text-surface/30">
            © {year} Omvana Yoga Retreat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
