import { Sunrise, Flame, Mountain, Landmark } from "lucide-react";

import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";

const features = [
  { icon: Sunrise, label: "Sunrise yoga" },
  { icon: Flame, label: "Ganga Aarti" },
  { icon: Mountain, label: "Himalayan hikes" },
  { icon: Landmark, label: "Temple visits" },
];

export function PhilosophySection() {
  return (
    <Section spacing="sm" className="bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-muted">
              Our Philosophy
            </p>
            <h2 className="mt-5 font-heading text-5xl leading-[1.1] text-heading md:text-6xl">
              Mindful travel,{" "}
              <em className="italic text-primary">unhurried</em> by design.
            </h2>
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-body text-base leading-[1.9] text-foreground">
              We believe a meaningful pause shouldn&apos;t demand a sabbatical.
              Omvana opens its doors to seekers, sceptics, and weekend
              escapees alike — offering the same depth, whether you stay a day
              or a season.
            </p>
            <p className="mt-5 font-body text-base leading-[1.9] text-foreground">
              Yoga at sunrise. Temple visits and slow ghats. Hikes into the
              foothills. The Ganga Aarti by dusk. A bowl of warm kichdi, eaten
              in silence. Nothing rushed. Nothing performed. Just space — to
              introspect, to grow, to remember who you are beneath the noise.
            </p>

            <div className="md:mt-10 mt-5 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.label} className="flex flex-col items-center gap-3 text-center">
                  <feature.icon
                    className="size-6 text-muted"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="font-ui text-xs text-muted">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
