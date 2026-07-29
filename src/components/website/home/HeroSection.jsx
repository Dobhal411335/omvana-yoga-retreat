import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-end overflow-hidden bg-image-dark">
      {/* Background photo */}
      <Image
        src="/hero.jpg"
        alt="Ganga river at sunset, Rishikesh"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark gradient overlay so text stays readable */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-image-dark via-image-dark/55 to-image-dark/10"
        aria-hidden="true"
      />

      <div className="container relative z-10 px-10 pb-20 pt-40 lg:px-20">
        <p className="font-ui text-[11px] uppercase tracking-[0.35em] text-white/55">
          Rishikesh · Uttarakhand
        </p>

        <h1 className="mt-4 max-w-3xl font-heading text-[2.75rem] leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[4rem]">
          Find your stillness{" "}
          <em className="italic">where the Ganga sings.</em>
        </h1>

        <p className="mt-6 max-w-md font-body text-base leading-[1.85] text-white/65 lg:text-lg">
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
