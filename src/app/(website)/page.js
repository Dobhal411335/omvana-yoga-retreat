import { HeroSection } from "@/components/website/home/HeroSection";
import { PhilosophySection } from "@/components/website/home/PhilosophySection";
import { RetreatsSection } from "@/components/website/home/RetreatsSection";
import { QuoteBanner } from "@/components/website/home/QuoteBanner";
import { CtaSection } from "@/components/website/home/CtaSection";
import PopUpBanner from "@/components/website/home/PopUpBanner";
import AboutUsSection from "@/components/website/home/AboutUsSection";
import Banner from "@/components/website/home/Banner";
import RandomTourPackageSection from "@/components/website/home/RandomTourPackageSection";
import InstaBlog from "@/components/website/home/InstaBlog";

export const metadata = {
  title: {
    absolute:
      "Omvana Yoga Retreat — Find your stillness where the Ganga sings",
  },
  description:
    "A quiet sanctuary in the Himalayan foothills. Yoga, meditation, temple walks, and Ganga Aarti — built for travellers who want to return softer than they came.",
};

export default function HomePage() {
  return (
    <>
      <PopUpBanner />
      <HeroSection />
      <PhilosophySection />
      <AboutUsSection/>
      <Banner/>
      <RandomTourPackageSection/>
      <InstaBlog/>
      <RetreatsSection />
      <QuoteBanner />
      <CtaSection />
    </>
  );
}
