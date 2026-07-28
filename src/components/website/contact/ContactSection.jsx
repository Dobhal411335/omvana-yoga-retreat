import { Phone, Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { EnquiryForm } from "./EnquiryForm";

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
              Begin with a{" "}
              <em className="italic text-primary">quiet hello.</em>
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
                <p className="font-heading text-3xl text-heading">
                  +91 98765 43210
                </p>
                <div className="mt-3 flex items-center gap-5">
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body text-sm text-foreground transition-colors hover:text-primary"
                  >
                    <MessageCircle className="size-3.5 text-primary" aria-hidden="true" />
                    WhatsApp
                  </a>
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center gap-1.5 font-body text-sm text-foreground transition-colors hover:text-primary"
                  >
                    <PhoneCall className="size-3.5 text-primary" aria-hidden="true" />
                    Call
                  </a>
                </div>
              </ContactBlock>

              {/* Email */}
              <ContactBlock label="Write to us">
                <a
                  href="mailto:hello@omvana.in"
                  className="inline-flex items-center gap-2 font-body text-base text-heading transition-colors hover:text-primary"
                >
                  <Mail className="size-4 text-primary" aria-hidden="true" />
                  hello@omvana.in
                </a>
              </ContactBlock>

              {/* Address */}
              <ContactBlock label="Find us">
                <address className="flex items-start gap-2 font-body text-sm not-italic leading-relaxed text-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  Tapovan, Rishikesh, Uttarakhand, India
                </address>
              </ContactBlock>

            </div>

            {/* Chai image placeholder — replace with next/image in Phase 2 */}
            <div
              className="mt-10 h-52 w-full overflow-hidden rounded-[var(--radius-image)] bg-gradient-to-br from-amber-900/30 via-amber-700/20 to-amber-500/10"
              aria-hidden="true"
            >
              <div className="flex h-full items-center justify-center">
                <span className="font-body text-xs text-muted/50">Photo · chai at Omvana</span>
              </div>
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
