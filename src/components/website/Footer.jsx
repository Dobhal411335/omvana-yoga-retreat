"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

import { Logo } from "@/components/common/Logo";
import { websiteNavigation } from "@/constants/navigation";
import { site } from "@/constants/site";
import { useCompanyBasicInfo } from "@/providers/CompanyBasicInfoProvider";

function formatPhone(number) {
  const digits = String(number || "").replace(/\D/g, "");
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return number;
}
function Facebook({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Instagram({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function Youtube({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM10 15.5V8.5L16 12l-6 3.5Z" />
    </svg>
  );
}
export function Footer() {
  const year = new Date().getFullYear();
  const company = useCompanyBasicInfo();

  const companyName = company?.companyName || site.name;
  const footerLogoSrc =
    company?.footerLogo?.url || company?.mainLogo?.url || undefined;

  const addresses = company?.officeAddresses?.length
    ? company.officeAddresses
    : company?.googleAddress
      ? [company.googleAddress]
      : [];
  const phones = company?.contactNumbers || [];
  const emails = company?.emails || [];
  const instagramLink = company?.instagramLink || "";
  const facebookLink = company?.facebookLink || "";
  const youtubeLink = company?.youtubeLink || "";

  const contactItems = [
    ...addresses.map((text) => ({ icon: MapPin, text })),
    ...phones.map((number) => ({
      icon: Phone,
      text: formatPhone(number),
      href: `tel:${String(number).replace(/\D/g, "")}`,
    })),
    ...emails.map((email) => ({
      icon: Mail,
      text: email,
      href: `mailto:${email}`,
    })),
    ...(instagramLink
      ? [{ icon: Instagram, text: "Instagram", href: instagramLink }]
      : []),
    ...(facebookLink
      ? [{ icon: Facebook, text: "Facebook", href: facebookLink }]
      : []),
    ...(youtubeLink
      ? [{ icon: Youtube, text: "Youtube", href: youtubeLink }]
      : []),
  ];

  return (
    <footer className="bg-footer text-white" aria-label="Site footer">
      <div className="container p-5 md:p-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Logo tone="light" name={companyName} imageSrc={footerLogoSrc} />
            <p className="mt-6 max-w-xs font-body text-sm leading-7 text-white">
              A spiritual habitat in Rishikesh for those returning home to
              themselves.
            </p>
          </div>
          <div>
            <h3 className="font-ui text-xs uppercase tracking-[0.2em] text-white">
              Explore
            </h3>
            <ul className="mt-6 space-y-4">
              {websiteNavigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-ui text-xs uppercase tracking-[0.2em] text-white">
              Find us
            </h3>
            {contactItems.length > 0 ? (
              <ul className="mt-6 space-y-4">
                {contactItems.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <item.icon
                      className="mt-1 size-4 shrink-0 text-white"
                      aria-hidden="true"
                    />
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="font-body text-sm leading-6 text-white transition-colors hover:text-surface break-all"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="font-body text-sm leading-6 text-white">
                        {item.text}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-10 border-t border-white pt-8 text-center">
          <p className="font-ui text-xs text-white">
            © {year} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
