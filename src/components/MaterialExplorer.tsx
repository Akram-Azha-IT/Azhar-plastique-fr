"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MoveHorizontal,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { materialGroups, materials } from "@/data/catalog";
import { resolveMaterialSelection } from "@/lib/materialSelection";
import {
  getMaterialGalleryState,
  getMaterialGalleryStep,
} from "@/lib/materialGallery";
import s from "@/app/matieres-premieres/materials.module.css";

gsap.registerPlugin(ScrollTrigger);
type Family = (typeof materialGroups)[number];

function MaterialGallery({ family }: { family: Family }) {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({
    index: 0,
    atStart: true,
    atEnd: false,
  });
  const items = materials.filter((material) => material.category === family.id);

  useEffect(() => {
    const node = rail.current;
    if (!node) return;
    let frame = 0;
    const update = () => {
      const cards = Array.from(
        node.querySelectorAll<HTMLElement>("[data-material-card]"),
      );
      const first = cards[0]?.offsetLeft ?? 0;
      const max = Math.max(0, node.scrollWidth - node.clientWidth);
      const next = getMaterialGalleryState(
        cards.map((card) => card.offsetLeft - first),
        node.scrollLeft,
        max,
      );
      setPosition((previous) =>
        previous.index === next.index &&
        previous.atStart === next.atStart &&
        previous.atEnd === next.atEnd
          ? previous
          : next,
      );
      if (progress.current)
        progress.current.style.transform =
          "scaleX(" +
          (max > 0
            ? (node.clientWidth + Math.max(0, node.scrollLeft)) /
              node.scrollWidth
            : 1) +
          ")";
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(node);
    node.addEventListener("scroll", schedule, { passive: true });
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.removeEventListener("scroll", schedule);
    };
  }, []);

  useLayoutEffect(() => {
    const node = rail.current;
    const section = root.current;
    if (!node || !section) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(section.querySelector("[data-family-heading]"), {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 90%", once: true },
        });
        gsap.from(node, {
          clipPath: "inset(0 8% 0 0)",
          y: 32,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 93%", once: true },
        });
        node
          .querySelectorAll<HTMLElement>("[data-material-card]")
          .forEach((card) => {
            gsap.fromTo(
              card.querySelector("[data-art-photo]"),
              { xPercent: -9, scale: 1.16, rotation: -2 },
              {
                xPercent: 9,
                scale: 1.05,
                rotation: 2,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  scroller: node,
                  horizontal: true,
                  start: "left right",
                  end: "right left",
                  scrub: 0.5,
                },
              },
            );
            gsap.fromTo(
              card.querySelector("[data-art-code]"),
              { xPercent: 8 },
              {
                xPercent: -8,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  scroller: node,
                  horizontal: true,
                  start: "left right",
                  end: "right left",
                  scrub: 0.4,
                },
              },
            );
          });
      }, section);
      return () => context.revert();
    });
    let disposed = false;
    const refresh = () => {
      if (!disposed) ScrollTrigger.refresh();
    };
    section
      .querySelectorAll("img")
      .forEach((image) => image.addEventListener("load", refresh));
    document.fonts.ready.then(refresh);
    return () => {
      disposed = true;
      media.revert();
      section
        .querySelectorAll("img")
        .forEach((image) => image.removeEventListener("load", refresh));
    };
  }, []);

  useEffect(() => {
    const node = rail.current;
    if (!node) return;
    let startX = 0,
      startScroll = 0,
      pointer: number | null = null,
      dragged = false;
    const down = (event: PointerEvent) => {
      if (
        event.pointerType !== "mouse" ||
        event.button !== 0 ||
        (event.target as HTMLElement).closest("a, button")
      )
        return;
      startX = event.clientX;
      startScroll = node.scrollLeft;
      pointer = event.pointerId;
      dragged = false;
    };
    const move = (event: PointerEvent) => {
      if (pointer !== event.pointerId) return;
      const distance = event.clientX - startX;
      if (!dragged && Math.abs(distance) > 6) {
        dragged = true;
        node.setPointerCapture(event.pointerId);
        node.dataset.dragging = "true";
      }
      if (dragged) {
        event.preventDefault();
        node.scrollLeft = startScroll - distance;
      }
    };
    const up = (event: PointerEvent) => {
      if (pointer !== event.pointerId) return;
      if (node.hasPointerCapture(event.pointerId))
        node.releasePointerCapture(event.pointerId);
      pointer = null;
      delete node.dataset.dragging;
    };
    node.addEventListener("pointerdown", down);
    node.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    node.addEventListener("pointercancel", up);
    return () => {
      node.removeEventListener("pointerdown", down);
      node.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      node.removeEventListener("pointercancel", up);
    };
  }, []);

  const go = (index: number) => {
    const node = rail.current;
    if (!node) return;
    const cards = node.querySelectorAll<HTMLElement>("[data-material-card]");
    const card = cards[Math.max(0, Math.min(index, cards.length - 1))];
    if (!card) return;
    node.scrollTo({
      left: card.offsetLeft - cards[0].offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  const step = (direction: -1 | 1) => {
    const node = rail.current;
    if (!node) return;
    const cards = Array.from(
      node.querySelectorAll<HTMLElement>("[data-material-card]"),
    );
    const first = cards[0]?.offsetLeft ?? 0;
    node.scrollTo({
      left: getMaterialGalleryStep(
        cards.map((card) => card.offsetLeft - first),
        node.scrollLeft,
        direction,
        Math.max(0, node.scrollWidth - node.clientWidth),
      ),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <section
      ref={root}
      id={family.id}
      className={s.family}
      data-tone={family.id === "commodite" ? "light" : "blue"}
      aria-labelledby={family.id + "-title"}
    >
      <header className={s.familyHeader} data-family-heading>
        <div>
          <span className="eyebrow">
            {family.id === "commodite"
              ? "Les essentiels"
              : "L’exigence technique"}
          </span>
          <h3 id={family.id + "-title"}>{family.label}</h3>
        </div>
        <div className={s.galleryControls}>
          <span>
            <MoveHorizontal size={18} aria-hidden="true" /> Glissez pour
            découvrir
          </span>
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={position.atStart}
            aria-label={
              "Matière précédente dans les " + family.label.toLowerCase()
            }
          >
            <ArrowLeft size={19} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={position.atEnd}
            aria-label={
              "Matière suivante dans les " + family.label.toLowerCase()
            }
          >
            <ArrowRight size={19} />
          </button>
        </div>
      </header>
      <nav
        className={s.materialIndex}
        aria-label={"Accès direct aux " + family.label.toLowerCase()}
      >
        {items.map((material, index) => (
          <a
            key={material.id}
            href={"#" + material.id}
            aria-current={position.index === index ? "true" : undefined}
            onClick={(event) => {
              event.preventDefault();
              go(index);
              window.history.replaceState(null, "", "#" + material.id);
            }}
          >
            {material.code}
          </a>
        ))}
      </nav>
      <div
        ref={rail}
        className={s.rail}
        data-material-rail
        tabIndex={0}
        role="region"
        aria-label={"Galerie des " + family.label.toLowerCase()}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            step(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {items.map((material, index) => (
          <article
            key={material.id}
            id={material.id}
            className={s.materialCard}
            data-material-card
            aria-label={material.code + ", " + material.name}
          >
            <div className={s.cardArt} aria-hidden="true">
              <div className={s.artPhoto} data-art-photo>
                <Image
                  src="/images/materials-editorial.png"
                  alt=""
                  fill
                  sizes="(max-width:800px) 90vw, 48vw"
                  className={s.artImage}
                  style={{ objectPosition: 35 + (index % 4) * 18 + "% center" }}
                  draggable={false}
                />
              </div>
              <div className={s.artVeil} />
              <span
                className={s.artCode}
                data-art-code
                data-paired={material.code.includes(" / ")}
              >
                {material.code.split(" / ").map((code) => (
                  <span key={code}>{code}</span>
                ))}
              </span>
              <span className={s.artCaption}>Polymères</span>
            </div>
            <div className={s.cardCopy}>
              <span className={s.grade}>
                {material.types ?? "Grade défini selon votre application"}
              </span>
              <h4>{material.name}</h4>
              <p>
                {material.description ??
                  "Des polymères techniques pour vos applications industrielles. Notre équipe vous accompagne dans le choix du grade et votre approvisionnement."}
              </p>
              <Link
                href={
                  "/contact?type=matiere&material=" +
                  encodeURIComponent(material.code + " / " + material.name)
                }
                className={s.cardQuote}
                aria-label={"Demander un devis pour " + material.code}
              >
                Parlons de votre projet{" "}
                <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className={s.railFooter}>
        <span>{items[position.index]?.code}</span>
        <div className={s.progress} aria-hidden="true">
          <span ref={progress} />
        </div>
        <span>Glissez pour explorer</span>
      </div>
    </section>
  );
}

export default function MaterialExplorer() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const restore = () => {
      const material = resolveMaterialSelection(
        materials,
        window.location.hash,
      );
      if (!material) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const card = document.getElementById(material.id);
        const rail = card?.closest<HTMLElement>("[data-material-rail]");
        if (!card || !rail) return;
        const first = rail.querySelector<HTMLElement>("[data-material-card]");
        rail.scrollTo({
          left: card.offsetLeft - (first?.offsetLeft ?? 0),
          behavior: "instant",
        });
        document
          .getElementById(material.category)
          ?.scrollIntoView({ block: "start", behavior: "instant" });
      });
    };
    restore();
    window.addEventListener("hashchange", restore);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", restore);
    };
  }, []);
  return (
    <section
      id="catalogue"
      ref={root}
      className={s.explorer}
      aria-labelledby="catalogue-title"
    >
      <header className={s.explorerHeader}>
        <div>
          <span className="eyebrow">La matière en mouvement</span>
          <h2 id="catalogue-title">
            Explorer.
            <br />
            <span>Ressentir le potentiel.</span>
          </h2>
        </div>
        <p>
          Parcourez les familles de polymères. Chaque matière ouvre une nouvelle
          possibilité pour votre application.
        </p>
      </header>
      <nav className={s.familyLinks} aria-label="Familles de matières">
        {materialGroups.map((family) => (
          <a href={"#" + family.id} key={family.id}>
            {family.shortLabel} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
      </nav>
      {materialGroups.map((family) => (
        <MaterialGallery key={family.id} family={family} />
      ))}
    </section>
  );
}
