import { useEffect, useRef, useState, type MouseEvent } from "react";

export interface NavItem {
  id: string;
  label: string;
}

export const useHeaderScrollSpy = (
  items: NavItem[],
  defaultSection: string,
) => {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const [hasScrolled, setHasScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    let frameId: number;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        visibleEntries.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        );
        setActiveSection(visibleEntries[0]!.target.id);
      } else if (window.scrollY === 0) {
        setActiveSection(defaultSection);
      }
    };

    const initObserver = () => {
      const headerHeight = headerEl.offsetHeight;
      if (headerHeight === 0) {
        frameId = requestAnimationFrame(initObserver);
        return;
      }

      const sectionElements = items
        .map(({ id }) => document.getElementById(id))
        .filter((el): el is HTMLElement => el?.tagName === "SECTION");

      observerRef.current = new IntersectionObserver(observerCallback, {
        rootMargin: `-${headerHeight}px 0px -50% 0px`,
        threshold: 0,
      });

      sectionElements.forEach((el) => observerRef.current?.observe(el));
    };

    initObserver();

    window.addEventListener("scroll", () => setHasScrolled(window.scrollY > 0));

    return () => {
      cancelAnimationFrame(frameId);
      observerRef.current?.disconnect();
      window.removeEventListener("scroll", () =>
        setHasScrolled(window.scrollY > 0),
      );
    };
  }, [items, defaultSection]);

  const scrollToSection = (
    e: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    const headerEl = headerRef.current;
    if (!element || !headerEl) return;

    setActiveSection(sectionId);

    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerEl.offsetHeight;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  return { scrollToSection, hasScrolled, activeSection, headerRef };
};
