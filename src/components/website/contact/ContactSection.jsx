"use client";

import { Phone, Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { EnquiryForm } from "./EnquiryForm";
import Image from "next/image";
import { useCompanyBasicInfo } from "@/providers/CompanyBasicInfoProvider";
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
/* ── Contact detail block ─────────────────────────── */
function ContactBlock({ label, children }) {
  return (
    <div>
      <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

/* ── Main section ─────────────────────────────────── */
export function ContactSection() {
  const companyInfo = useCompanyBasicInfo();

  const contactNumbers = companyInfo?.contactNumbers?.length > 0 ? companyInfo.contactNumbers : ["+91 98765 43210"];
  const emails = companyInfo?.emails?.length > 0 ? companyInfo.emails : ["hello@omvana.in"];
  const officeAddresses = companyInfo?.officeAddresses?.length > 0 ? companyInfo.officeAddresses : ["Tapovan, Rishikesh, Uttarakhand, India"];

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-[5fr_7fr] lg:gap-20">
          {/* ── Left — contact info ───────────────────── */}
          <div>
            {/* Eyebrow */}
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Reach out
            </p>

            {/* Heading */}
            <h1 className="mt-4 font-heading text-5xl leading-[1.05] text-heading md:text-6xl">
              Begin with a <em className="italic text-primary">quiet hello.</em>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-sm font-body text-sm leading-[1.85] text-foreground">
              Send us a note, call us, or WhatsApp if it&apos;s easier. We
              answer ourselves — no bots, no rush.
            </p>

            {/* Contact details */}
            <div className="mt-10 flex flex-col gap-8">
              {/* WhatsApp / Call */}
              <ContactBlock label="WhatsApp / Call">
                <div className="flex flex-col gap-5">
                  {contactNumbers.map((num, i) => {
                    const waPhone = num.replace(/\D/g, "");
                    const telPhone = num.replace(/\s+/g, "");
                    return (
                      <div key={i}>
                        <p className="text-lg font-medium text-heading">
                          {num}
                        </p>
                        <div className="mt-2 flex items-center gap-5">
                          <a
                            href={`https://wa.me/${waPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-body text-sm text-foreground transition-colors hover:text-primary"
                          >
                            <MessageCircle
                              className="size-3.5 text-primary"
                              aria-hidden="true"
                            />
                            WhatsApp
                          </a>
                          <a
                            href={`tel:${telPhone}`}
                            className="inline-flex items-center gap-1.5 font-body text-sm text-foreground transition-colors hover:text-primary"
                          >
                            <PhoneCall
                              className="size-3.5 text-primary"
                              aria-hidden="true"
                            />
                            Call
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ContactBlock>

              {/* Email */}
              <ContactBlock label="Write to us">
                <div className="flex flex-col gap-3">
                  {emails.map((email, i) => (
                    <a
                      key={i}
                      href={`mailto:${email}`}
                      className="inline-flex items-center gap-2 font-body text-base text-heading transition-colors hover:text-primary"
                    >
                      <Mail className="size-4 text-primary" aria-hidden="true" />
                      {email}
                    </a>
                  ))}
                </div>
              </ContactBlock>

              {/* Address */}
              <ContactBlock label="Find us">
                <div className="flex flex-col gap-4">
                  {officeAddresses.map((addr, i) => (
                    <address key={i} className="flex items-start gap-2 font-body text-sm not-italic leading-relaxed text-foreground">
                      <MapPin
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {addr}
                    </address>
                  ))}
                </div>
              </ContactBlock>

              {/* Social Media */}
              {(companyInfo?.facebookLink || companyInfo?.instagramLink || companyInfo?.youtubeLink) && (
                <ContactBlock label="Social Media">
                  <div className="flex items-center gap-4">
                    {companyInfo.facebookLink && (
                      <a
                        href={companyInfo.facebookLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-body text-sm text-heading transition-colors hover:text-primary"
                      >
                        <Facebook className="size-4 text-primary" aria-hidden="true" />
                        Facebook
                      </a>
                    )}
                    {companyInfo.instagramLink && (
                      <a
                        href={companyInfo.instagramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-body text-sm text-heading transition-colors hover:text-primary"
                      >
                        <Instagram className="size-4 text-primary" aria-hidden="true" />
                        Instagram
                      </a>
                    )}
                    {companyInfo.youtubeLink && (
                      <a
                        href={companyInfo.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-body text-sm text-heading transition-colors hover:text-primary"
                      >
                        <Youtube className="size-4 text-primary" aria-hidden="true" />
                        YouTube
                      </a>
                    )}
                  </div>
                </ContactBlock>
              )}
            </div>

            <div className="relative mt-10 h-52 w-full overflow-hidden rounded-[var(--radius-image)] bg-border">
              <Image
                src="/cta1.png"
                alt="Warmth close-up"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* ── Right — enquiry form ──────────────────── */}
          <div className="lg:pt-20">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
