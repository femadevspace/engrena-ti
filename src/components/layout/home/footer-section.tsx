import { Section } from "~/components/ui/section";

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <Section id="footer" className="py-8">
      <footer className="text-muted text-center">
        <p className="text-sm">
          © {year} Engrena TI. Todos os direitos reservados.
        </p>
        <p className="text-sm">Desenvolvido por alunos da FEMA.</p>
      </footer>
    </Section>
  );
}
