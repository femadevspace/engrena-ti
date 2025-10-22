import { BenefitsSection, HeroSection, JourneySection } from "~/components/layout/home";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <BenefitsSection />
      <JourneySection />
    </main>
  );
}
