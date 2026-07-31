import Image from "next/image";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Quote } from "lucide-react";

export function TestimonialsBanner() {
  return (
    <Section
      spacing="lg"
      className="relative overflow-hidden border-b border-border/40 bg-surface"
    >
      <div
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-secondary/30 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Stories from our guests
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-5xl font-medium leading-[1.1] text-heading md:text-6xl lg:text-7xl">
          Voices of <em className="font-normal italic text-primary">peace.</em>
        </h1>
        <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-muted md:text-lg">
          What people say after leaving Omvana matters more to us than anything
          we could say about ourselves.
        </p>
      </Container>
    </Section>
  );
}

function TestimonialCard({ testimonial, index }) {
  const imageUrl = testimonial?.image?.url;

  return (
    <article
      className="group border-b border-border/50 py-10 last:border-b-0 md:py-14"
      style={{ animationDelay: `${Math.min(index, 6) * 60}ms` }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:gap-10">
        {imageUrl ? (
          <div className="relative mx-auto size-18 shrink-0 overflow-hidden rounded-full border border-border/60 bg-surface shadow-sm md:mx-0 md:mt-1 md:size-20">
            <Image
              src={imageUrl}
              alt={testimonial.name || "Guest"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="96px"
            />
          </div>
        ) : (
          <div
            className="mx-auto flex size-20 shrink-0 items-center justify-center rounded-full bg-surface font-heading text-3xl text-primary/40 md:mx-0 md:size-24"
            aria-hidden="true"
          >
            <Quote className="size-6 text-primary" />
          </div>
        )}

        <div className="min-w-0 flex-1 text-center md:text-left">
          <span
            className="mb-3 block font-heading text-4xl leading-none text-primary/25 md:text-5xl"
            aria-hidden="true"
          >
            <Quote className="size-6 text-primary" />
          </span>
          <blockquote>
            <p className="font-heading text-2xl font-medium leading-snug text-heading md:text-3xl lg:text-[2rem] lg:leading-snug">
              {testimonial.title}
            </p>
          </blockquote>
          <footer className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-ui text-xs tracking-wide text-muted md:justify-start">
            <cite className="not-italic font-semibold uppercase tracking-[0.14em] text-heading">
              {testimonial.name}
            </cite>
            {testimonial.location ? (
              <>
                <span className="text-border" aria-hidden="true">
                  ·
                </span>
                <span>{testimonial.location}</span>
              </>
            ) : null}
          </footer>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsList({ testimonials = [] }) {
  if (!testimonials.length) {
    return (
      <Section spacing="lg">
        <Container>
          <div className="rounded-card border border-dashed border-border bg-surface/60 px-6 py-16 text-center">
            <p className="font-heading text-2xl text-heading">
              Stories are gathering.
            </p>
            <p className="mt-3 font-body text-sm text-muted">
              Guest testimonials will appear here soon.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section spacing="md" className="bg-background">
      <Container className="max-w-4xl">
        <div className="divide-y-0">
          {testimonials.map((item, index) => (
            <TestimonialCard
              key={item._id || index}
              testimonial={item}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
