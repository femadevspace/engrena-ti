import NextLink from "next/link";
import { Button } from "~/components/ui/button";
import { Section } from "~/components/ui/section";
import { auth } from "~/server/auth";

export async function FooterSection() {
  const session = await auth();
  const year = new Date().getFullYear();

  return (
    <Section id="footer" className="py-8">
      <footer className="text-muted text-center">
        <p className="text-sm">
          © {year} Engrena TI. Todos os direitos reservados.
        </p>
        <p className="text-sm">
          <span>Desenvolvido por alunos da FEMA.</span>{" "}
          <Button asChild variant="link">
            <NextLink href={!!session?.user ? "/admin" : "/admin/login"}>
              Acessar área administrativa
            </NextLink>
          </Button>
          .
        </p>
      </footer>
    </Section>
  );
}
