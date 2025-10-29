"use client";

import NextLink from "next/link";
import { Section } from "~/components/ui/section";
import { useHeaderScrollSpy, type NavItem } from "~/hooks/header-scroll-spy";
import { cn } from "~/lib/class-name";

const navItems: NavItem[] = [
  { id: "hero", label: "Engrena TI" },
  { id: "benefits", label: "Benefícios" },
  { id: "journey", label: "Jornada" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contate-nos" },
] as const;

const navItemClassName =
  "font-bold text-white uppercase transition-colors duration-200";

export function Header() {
  const { activeSection, headerRef, scrollToSection, hasScrolled } =
    useHeaderScrollSpy(navItems, navItems[0]!.id);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-250",
        hasScrolled && "bg-background/75 backdrop-blur-lg",
      )}
    >
      <Section id="header" full className="items-start py-12">
        <nav>
          <ul className="flex items-center justify-between gap-20 p-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={cn(
                    navItemClassName,
                    activeSection === item.id && "text-accent",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}

            <li>
              <NextLink href={"/aulas"} className={navItemClassName}>
                Aulas
              </NextLink>
            </li>
          </ul>
        </nav>
      </Section>
    </header>
  );
}
