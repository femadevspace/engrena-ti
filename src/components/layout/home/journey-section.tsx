import { CurlyBrackets, DecorativeText } from "~/components/ui/decorative-text";
import { Section } from "~/components/ui/section";

type JourneyStep = {
  week: string;
  title: string;
};

const journeySteps: JourneyStep[] = [
  { week: "Semanas 1-2", title: "Primeiros Passos na Lógica e Programação" },
  { week: "Semanas 3-4", title: "Estruturas de Dados e Computação Gráfica" },
  { week: "Semanas 5-6", title: "Controladores e Conectividade" },
  { week: "Semanas 7-8", title: "Visão Computacional, IA e Projeto Final" },
] as const;

export function JourneySection() {
  return (
    <Section id="journey">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-center">
          <DecorativeText>
            Sua <CurlyBrackets>jornada</CurlyBrackets> do Zero ao{""}
            <CurlyBrackets>Projeto Final</CurlyBrackets>
          </DecorativeText>
        </h2>
        <p className="text-muted max-w-lg text-center text-base">
          Uma metologia pensada para você aprender fazendo, com aulas dinâmicas,
          muitos desafios e &quot;Momentos Curiosidades&quot; para uma aula mais
          descontraída porém educativa.
        </p>
      </div>

      <JourneySteps />
    </Section>
  );
}

export function JourneySteps() {
  return (
    <div className="relative w-full">
      <div className="bg-muted/30 absolute left-1/2 h-full w-0.5 -translate-x-1/2" />
      <div className="space-y-12">
        {journeySteps.map(({ week, title }, index) => {
          const isEven = index % 2 === 0;
          const Content = () => (
            <>
              <p className="text-accent text-base">{week}</p>
              <h3 className="text-xl font-bold">{title}</h3>
            </>
          );

          return (
            <div key={week} className="relative flex items-center">
              <div className="w-1/2 pr-8 text-right">
                {isEven && <Content />}
              </div>
              <div className="bg-accent border-background absolute left-1/2 size-4 -translate-x-1/2 rounded-full border-4" />
              <div className="w-1/2 pl-8 text-left">
                {!isEven && <Content />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
