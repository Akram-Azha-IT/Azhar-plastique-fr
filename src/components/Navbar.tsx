"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import AzharLogo from "./AzharLogo";
const links = [
  ["/machines", "Machines Shibaura"],
  ["/matieres-premieres", "Matières premières"],
  ["/applications", "Applications"],
  ["/expertise", "À propos"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const path = usePathname();
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (path !== "/") return;
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) {
      setOverHero(false);
      return;
    }
    let frame = 0;
    const update = () => {
      const height = header.current?.offsetHeight ?? 84;
      const bounds = hero.getBoundingClientRect();
      setOverHero(bounds.top < height && bounds.bottom > height);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(hero);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [path]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 801px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLAnchorElement>("a");
    first?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const nodes = panel.current?.querySelectorAll<HTMLAnchorElement>("a");
        if (!nodes?.length) return;
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          toggle.current?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggle.current?.focus();
        } else if (document.activeElement === toggle.current) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <header
      ref={header}
      className="site-header"
      data-home={path === "/"}
      data-overlay={path === "/" && overHero && !open}
    >
      <div className="header-inner">
        <AzharLogo />
        <nav className="desktop-nav" aria-label="Navigation principale">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={path.startsWith(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="button button-dark header-cta">
          Parlons de votre projet <ArrowUpRight size={16} />
        </Link>
        {path !== "/contact" && (
          <Link href="/contact" className="mobile-quote">
            Devis
          </Link>
        )}
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          ref={panel}
          className="mobile-nav"
          data-lenis-prevent
          aria-label="Navigation mobile"
        >
          {links.map(([href, label]) => (
            <Link href={href} key={href}>
              {label}
              <ArrowUpRight />
            </Link>
          ))}
          <Link href="/contact">
            Contact <ArrowUpRight />
          </Link>
          <p>Shibaura Machine · Représentation exclusive en France</p>
        </nav>
      )}
    </header>
  );
}
