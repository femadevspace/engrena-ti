import {
  BenefitsSection,
  ContactSection,
  FAQSection,
  FooterSection,
  Header,
  HeroSection,
  JourneySection,
} from "~/components/layout/home";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <JourneySection />
      <FAQSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
