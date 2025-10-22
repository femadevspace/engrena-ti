import { Section } from "~/components/ui/section";

export function HeroSection() {
  return (
    <Section
      id="hero"
      full
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #001540 0%, #011224 100%)",
      }}
    >
      <h1>
        Engrena<span className="text-accent">TI</span>
      </h1>
    </Section>
  );
}
