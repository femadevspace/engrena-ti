import NextImage from "next/image";
import { Section } from "~/components/ui/section";
import HeroSectionImage from "../../../../public/hero-page.png";

export function HeroSection() {
  return (
    <Section
      id="hero"
      full
      className="relative min-h-screen lg:flex-row"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #001540 0%, #011224 100%)",
      }}
    >
      <div className="flex flex-col justify-center px-6 py-12 text-white sm:px-12 lg:w-1/2 lg:px-16 xl:px-24">
        <h1 className="font-mono leading-tight font-black tracking-[3.2px] sm:text-[48px] lg:text-[64px]">
          <span className="mb-0" aria-hidden="true">
            Nã0 ap=nas
          </span>
          <br />
          <span className="mb-0" aria-hidden="true">
            {"use a Te<no/og!a."}
          </span>
          <br />
          <span className="text-accent" aria-hidden="true">
            Crie.
          </span>
          <span className="sr-only">Não apenas use a Tecnologia. Crie.</span>
        </h1>
        <p className="mt-8 text-justify text-sm sm:text-lg lg:max-w-[616px] lg:text-xl">
          Um curso intensivo de 8 semana que leva você, aluno do ensino médio,
          do zero absoluto à criação do seu próprio projeto de tecnologia.
        </p>
      </div>

      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2 lg:px-8">
        <div className="relative aspect-920/606 w-full max-w-[600px] lg:max-w-none">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <NextImage
              alt="Imagem ilustrativa de uma pessoa interagindo com elementos de tecnologia"
              className="absolute top-[-35.04%] left-[-17.07%] h-[155.07%] w-[136.2%] max-w-none"
              src={HeroSectionImage}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
