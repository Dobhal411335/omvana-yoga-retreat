import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";

export function CtaSection() {
  return (
    <Section spacing="sm" className="bg-background border-b border-gray-300">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-black">
              Ready when you are
            </p>
            <h2 className="mt-5 font-heading text-5xl leading-[1.1] text-black md:text-6xl">
              Why choose
              <br />
              <em className="italic text-primary">Omvana.</em>
            </h2>
            <p className="mt-7 text-justify text-sm leading-[1.9] text-black font-ui">
              Omvana isn&apos;t seasonal, and it isn&apos;t complicated. There&apos;s no &quot;batch&quot; to wait for, you choose your dates, any month of the year, and we make the space ready.
              <br />
              What you&apos;ll find here: real yoga and meditation practice, food made with care, a room that feels like your own, and prices that don&apos;t ask you to choose between a retreat and a holiday. No performance, no polish for its own sake just what a good retreat actually needs.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-button)] bg-primary px-7 font-body text-sm text-white transition-colors hover:bg-primary-hover"
              >
                Start an enquiry
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex h-11 items-center rounded-[var(--radius-button)] border border-black px-7 font-body text-sm text-black transition-colors hover:border-heading/30 hover:bg-surface"
              >
                See the pace
              </Link>
            </div>
          </div>

          <div className="relative h-96 lg:h-[400px]">
            {/* YouTube Short 1 */}
            <div className="absolute left-[12%] top-0 h-72 w-48 overflow-hidden rounded-[var(--radius-image)] bg-border lg:h-80 lg:w-56">
              <iframe
                src="https://www.youtube.com/embed/X8UrBz_7wOE"
                title="Omvana yoga retreat short"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            {/* YouTube Short 2 */}
            <div className="absolute bottom-0 right-[12%] h-72 w-48 overflow-hidden rounded-[var(--radius-image)] bg-muted/20 lg:h-80 lg:w-56">
              <iframe
                src="https://www.youtube.com/embed/iOtok5BJ1s8"
                title="Omvana yoga retreat second short"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
