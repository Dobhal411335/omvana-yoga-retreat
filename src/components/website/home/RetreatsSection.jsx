import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { cn } from "@/lib/utils";

const retreats = [
  {
    id: "day-sojourn",
    duration: "1 Day",
    name: "Day Sojourn",
    tagline: "A single sunrise to soften the noise.",
    price: "₹3,500",
    unit: "person",
    features: [
      "Morning Hatha & Pranayama by the Ganga",
      "Sattvic breakfast & herbal teas",
      "Guided temple walk (Trimbakeshwar / Tera Manzil)",
      "Evening Ganga Aarti at Parmarth",
    ],
    note: "Weekenders seeking a single, deep exhale.",
    href: "/contact",
  },
  {
    id: "week-of-stillness",
    duration: "7 Nights",
    name: "Week of Stillness",
    tagline: "Long enough for the mind to remember itself.",
    price: "₹28,000",
    unit: "person",
    features: [
      "Daily yoga, meditation & journalling sessions",
      "All sattvic meals & infusions",
      "Neelkanth & Kunjapuri sunrise hike",
      "Beatles Ashram + ghat sightseeing",
      "Two private Aarti experiences",
      "One Ayurvedic consultation",
    ],
    note: "Working professionals craving a true reset.",
    href: "/contact",
  },
  {
    id: "month-of-becoming",
    duration: "28 Nights",
    name: "Month of Becoming",
    tagline: "A season to lay down what you no longer carry.",
    price: "₹98,000",
    unit: "person",
    features: [
      "Full daily sadhana with a resident teacher",
      "Personal mentor & journalling practice",
      "Weekly hikes in the Himalayan foothills",
      "Karma yoga with local schools",
      "Vedic chanting & philosophy circles",
      "Two private therapies (Ayurveda / Sound)",
    ],
    note: "Seekers committing to lasting transformation.",
    href: "/contact",
  },
];

function RetreatCard({ retreat }) {
  return (
    <article className="flex flex-col rounded-[var(--radius-card)] border border-border bg-white p-8">
      <div className="flex items-start justify-between">
        <span className="font-ui text-xs uppercase tracking-[0.2em] text-muted">
          {retreat.duration}
        </span>
        <span className="font-ui text-xs text-muted">from</span>
      </div>

      <h3 className="mt-4 font-heading text-3xl text-primary">
        {retreat.name}
      </h3>
      <p className="mt-1 font-body text-sm italic text-primary/70">
        {retreat.tagline}
      </p>

      <div className="mt-6 border-t border-border pt-6">
        <p className="font-heading text-4xl text-primary">
          {retreat.price}
          <span className="ml-1 font-body text-sm text-muted">
            / {retreat.unit}
          </span>
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {retreat.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 font-body text-sm leading-6 text-foreground"
          >
            <span
              className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/40"
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>

      {retreat.note && (
        <p className="mt-6 font-body text-xs italic leading-6 text-muted">
          {retreat.note}
        </p>
      )}

      <Link
        href={retreat.href}
        className="mt-8 inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-border bg-transparent px-5 font-body text-sm text-heading transition-colors hover:border-heading/40 hover:bg-surface"
      >
        Reserve {retreat.name}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  );
}

export function RetreatsSection() {
  return (
    <Section spacing="lg" className="bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-muted">
              Retreats
            </p>
            <h2 className="mt-5 font-heading text-5xl leading-[1.1] text-heading md:text-6xl">
              Three rhythms,{" "}
              <em className="italic text-primary">one sanctuary</em>.
            </h2>
          </div>
          <p className="max-w-md font-body text-sm leading-[1.9] text-foreground lg:text-right">
            Whether you&apos;ve stolen a single morning or carved out a month,
            there is a shape of stay that fits.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {retreats.map((retreat) => (
            <RetreatCard key={retreat.id} retreat={retreat} />
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] bg-footer p-10 sm:flex-row sm:items-center">
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
