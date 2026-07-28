import { HeroSection } from "@/components/website/home/HeroSection";
import { PhilosophySection } from "@/components/website/home/PhilosophySection";
import { RetreatsSection } from "@/components/website/home/RetreatsSection";
import { QuoteBanner } from "@/components/website/home/QuoteBanner";
import { CtaSection } from "@/components/website/home/CtaSection";

export const metadata = {
  title: "Omvana Yoga Retreat — Find your stillness where the Ganga sings",
  description:
    "A quiet sanctuary in the Himalayan foothills. Yoga, meditation, temple walks, and Ganga Aarti — built for travellers who want to return softer than they came.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <RetreatsSection />
      <QuoteBanner />
      <CtaSection />
    </>
  );
}
