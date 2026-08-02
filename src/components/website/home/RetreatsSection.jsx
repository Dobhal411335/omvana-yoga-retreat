import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { cn } from "@/lib/utils";

export function RetreatsSection() {
  return (
    <Section spacing="sm" className="bg-background">
      <Container>
        <div className="mt-4 flex flex-col items-start justify-between gap-6 rounded-card bg-footer p-10 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles
                className="size-4 text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="font-ui text-xs uppercase tracking-[0.2em] text-surface/50">
                Bespoke Retreat
              </span>
            </div>
            <h3 className="mt-3 font-heading text-3xl text-surface md:text-4xl">
              None of these fit?{" "}
              <em className="italic text-primary">Design your own.</em>
            </h3>
            <p className="mt-3 max-w-md font-body text-sm leading-7 text-surface/60">
              Pick your own date range, choose the experiences you want — yoga,
              hikes, temples, aarti, ayurveda — and we&apos;ll shape a private
              itinerary just for you.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-button)] bg-primary px-7 py-3 font-body text-sm text-white transition-colors hover:bg-primary-hover"
          >
            Plan your own retreat
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}