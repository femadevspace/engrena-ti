import { CurlyBrackets, DecorativeText } from "~/components/ui/decorative-text";
import {
  MacOSCard,
  MacOSCardContent,
  MacOSCardTitlebar,
} from "~/components/ui/macos-card";
import { Section } from "~/components/ui/section";

export function BenefitsSection() {
  return (
    <Section id="benefits">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-center">
          <DecorativeText leading="=>" trailing="?">
            O que <CurlyBrackets>você</CurlyBrackets> vai conquistar em{" "}
            <CurlyBrackets>8 semanas</CurlyBrackets>
          </DecorativeText>
        </h2>
        <p className="text-muted max-w-lg text-center text-base">
          Transforme sua curiosidade em competência.
        </p>
      </div>

      <div className="grid grid-cols-4 grid-rows-4 gap-6">
        <MacOSCard className="row-span-3 row-start-1 h-full w-full">
          <MacOSCardTitlebar>Pense como um Programador</MacOSCardTitlebar>
          <MacOSCardContent>
            Desenvolva raciocínio lógico e habilidade de resolver problemas
            complexos - competências para qualquer área da sua vida.
          </MacOSCardContent>
        </MacOSCard>

        <MacOSCard className="row-span-3 row-start-2 h-full w-full">
          <MacOSCardTitlebar>Construa Projetos Reais</MacOSCardTitlebar>
          <MacOSCardContent>
            Aprenda na prática, construindo projetos reais que você pode
            adicionar ao seu portfólio.
          </MacOSCardContent>
        </MacOSCard>

        <MacOSCard className="row-span-3 row-start-1 h-full w-full">
          <MacOSCardTitlebar>Explore Tecnologias de Ponta</MacOSCardTitlebar>
          <MacOSCardContent>
            Tenha seu primeiro contato com o que há de mais moderno: Visão
            Computacional, IA e Computação Gráfica.
          </MacOSCardContent>
        </MacOSCard>

        <MacOSCard className="row-span-3 row-start-2 h-full w-full">
          <MacOSCardTitlebar>Amplie seu Network</MacOSCardTitlebar>
          <MacOSCardContent>
            Aprenda a trabalhar em equipe e em um ambiente colaborativo,
            dinâmico e prepare-se para o mercado de trabalho.
          </MacOSCardContent>
        </MacOSCard>
      </div>
    </Section>
  );
}
