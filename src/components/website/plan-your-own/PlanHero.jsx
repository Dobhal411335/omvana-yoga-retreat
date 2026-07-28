export function PlanHero() {
  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-image-dark">
      {/* Hero background — replace with next/image in Phase 2 */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-image-dark/90 via-image-dark/50 to-transparent"
        aria-hidden="true"
      />
      {/* Warm amber overlay for the dusk/diya mood */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-image-dark/80 via-transparent to-image-dark/20"
        aria-hidden="true"
      />

      <div className="container relative z-10 pb-16 pt-32">
        {/* Eyebrow */}
        <p className="flex items-center gap-2 font-ui text-xs uppercase tracking-[0.3em] text-white/60">
          <span className="text-primary/80" aria-hidden="true">✦</span>
          Design your own retreat
        </p>

        {/* Heading */}
        <h1 className="mt-5 max-w-3xl font-heading text-5xl leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
          Tell us your <em className="not-italic italic text-white/90">rhythm.</em>{" "}
          We&apos;ll shape the stay around it.
        </h1>

        {/* Subtitle */}
        <p className="mt-7 max-w-md font-body text-sm leading-[1.85] text-white/65">
          If our Day, Week or Month plans don&apos;t quite match your dates or
          your hopes — sketch your own. Pick a date range, the experiences
          you&apos;d like, and we&apos;ll craft a quiet itinerary that&apos;s
          yours alone.
        </p>
      </div>
    </section>
  );
}
