import { DecorativeText } from "~/components/ui/decorative-text";
import { Section } from "~/components/ui/section";
import { api } from "~/trpc/server";

export async function FAQSection() {
  const faq = await api.faq.list();

  return (
    <Section id="faq">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-center">
          <DecorativeText leading="~$ {" trailing="} //">
            Perguntas Frequentes
          </DecorativeText>
        </h2>
      </div>

      <div className="max-w-2xl space-y-4">
        {faq.length === 0 && (
          <p className="text-muted text-center">
            Nenhuma pergunta frequente cadastrada.
          </p>
        )}

        {faq.map(({ question, answer }, index) => (
          <div key={index}>
            <h3 className="font-semibold">{question}</h3>
            <p className="text-muted text-base">{answer}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
