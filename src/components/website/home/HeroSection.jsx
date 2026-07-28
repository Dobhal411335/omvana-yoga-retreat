import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-end overflow-hidden bg-image-dark">
      {/* Hero background image — replace this div with next/image in Phase 2 */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-image-dark via-image-dark/60 to-image-dark/20"
        aria-hidden="true"
      />

      <div className="container relative z-10 pb-20 pt-40">
        <p className="font-ui text-xs uppercase tracking-[0.3em] text-white/60">
          Rishikesh · Uttarakhand
        </p>

        <h1 className="mt-5 max-w-4xl font-heading text-6xl leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[5.5rem]">
          Find your stillness{" "}
          <em className="italic">where the Ganga sings.</em>
        </h1>

        <p className="mt-7 max-w-lg font-body text-base leading-[1.8] text-white/70">
          Omvana is a quiet sanctuary in the Himalayan foothills — built for
          travellers who want to slow down, sit with themselves, and return
          softer than they came.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/retreats"
            className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-button)] bg-primary px-7 font-body text-sm text-white transition-colors hover:bg-primary-hover"
          >
            Explore retreats
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-button)] border border-white/30 px-7 font-body text-sm text-white/90 transition-colors hover:border-white/60 hover:bg-white/10"
          >
            Plan a visit
          </Link>
        </div>
      </div>
    </section>
  );
}
