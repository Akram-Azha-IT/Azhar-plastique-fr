"use client";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { heroSlides } from "@/data/heroSlides";
import {
  getHeroActiveSlide,
  getHeroJourneyProgress,
  getHeroScrollTarget,
  getHeroSlideProgress,
} from "@/lib/heroCarousel";
import { scrollPageTo } from "@/lib/pageScroll";
import s from "./ProductHero.module.css";

type Mode = "static" | "native" | "fallback" | "reduced";

export default function ProductHero() {
  const journey = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<Mode>("static");
  const navigate = useCallback((index: number) => {
    const node = scroller.current;
    const track = journey.current;
    const section = root.current;
    if (!node || !track || !section) return;
    const left = getHeroScrollTarget(
      index,
      node.clientWidth,
      heroSlides.length,
    );
    const distance = Math.max(0, track.offsetHeight - section.offsetHeight);
    const top = track.getBoundingClientRect().top + window.scrollY;
    const maximum = node.scrollWidth - node.clientWidth;
    scrollPageTo(
      top + (maximum > 0 ? left / maximum : 0) * distance,
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useLayoutEffect(() => {
    const section = root.current;
    const node = scroller.current;
    if (!section || !node) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let currentMode: Mode = "static";
    let context: gsap.Context | undefined;
    let timelines: Array<{
      image: gsap.core.Timeline;
      text: gsap.core.Timeline;
    }> = [];
    let frame = 0;

    const update = () => {
      const width = node.clientWidth;
      const index = getHeroActiveSlide(
        node.scrollLeft,
        width,
        heroSlides.length,
      );
      setActive(index);
      if (currentMode === "fallback")
        timelines.forEach((animation, i) => {
          const value = getHeroSlideProgress(node.scrollLeft, width, i);
          animation.image.progress(value.image);
          animation.text.progress(value.text);
        });
      if (currentMode !== "native" && progress.current) {
        const distance = Math.max(1, node.scrollWidth - width);
        const value = Math.max(0, Math.min(1, node.scrollLeft / distance));
        progress.current.style.transform =
          "scaleX(" + (1 / 3 + (value * 2) / 3) + ")";
      }
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const configure = () => {
      context?.revert();
      context = undefined;
      timelines = [];
      currentMode = preference.matches
        ? "reduced"
        : "ScrollTimeline" in window &&
            "ViewTimeline" in window &&
            CSS.supports("timeline-scope", "--azhar-slide-1") &&
            CSS.supports("animation-timeline", "--azhar-slide-1") &&
            CSS.supports("view-timeline", "--azhar-slide-1 x") &&
            CSS.supports("animation-range-start", "30cqw")
          ? "native"
          : "fallback";
      if (currentMode === "native")
        progress.current?.style.removeProperty("transform");
      if (currentMode === "fallback")
        context = gsap.context(() => {
          const images =
            section.querySelectorAll<HTMLElement>("[data-scene-image]");
          const captions = section.querySelectorAll<HTMLElement>(
            "[data-scene-caption]",
          );
          images.forEach((image, i) => {
            const picture = gsap
              .timeline({ paused: true })
              .fromTo(
                image,
                {
                  xPercent: 70,
                  scale: 0.15,
                  clipPath: "inset(0% 25% round 35cqmin)",
                },
                {
                  xPercent: 0,
                  scale: 1,
                  clipPath: "inset(0% 0% round 0cqmin)",
                  duration: 0.5875,
                  ease: "none",
                },
                0,
              )
              .to(
                image,
                { xPercent: -24, scale: 1.5, duration: 0.4125, ease: "none" },
                0.5875,
              );
            const text = gsap.timeline({ paused: true });
            captions[i]
              .querySelectorAll<HTMLElement>("[data-caption-part]")
              .forEach((part) => {
                const headline = part.hasAttribute("data-caption-headline");
                const y = headline ? 205 : 50;
                const skew = headline ? 6 : 1.5;
                text
                  .fromTo(
                    part,
                    { yPercent: y, skewY: skew },
                    { yPercent: 0, skewY: 0, duration: 0.5, ease: "none" },
                    0,
                  )
                  .to(
                    part,
                    { yPercent: y, skewY: skew, duration: 0.5, ease: "none" },
                    0.5,
                  )
                  .fromTo(
                    part,
                    { opacity: 0 },
                    { opacity: 0, duration: 0.25 },
                    0,
                  )
                  .to(part, { opacity: 1, duration: 0.25, ease: "none" }, 0.25)
                  .to(part, { opacity: 0, duration: 0.25, ease: "none" }, 0.5)
                  .to(part, { opacity: 0, duration: 0.25 }, 0.75);
              });
            const label = captions[i].querySelector("[data-caption-label]");
            text
              .fromTo(
                label,
                { yPercent: 105, opacity: 0.5 },
                { yPercent: 105, opacity: 0.5, duration: 0.25 },
                0,
              )
              .to(
                label,
                { yPercent: 0, opacity: 1, duration: 0.25, ease: "none" },
                0.25,
              )
              .to(
                label,
                { yPercent: -105, opacity: 0.5, duration: 0.25, ease: "none" },
                0.5,
              )
              .to(
                label,
                { yPercent: -105, opacity: 0.5, duration: 0.25 },
                0.75,
              );
            timelines.push({ image: picture, text });
          });
        }, section);
      setMode(currentMode);
      update();
    };
    configure();
    const resize = new ResizeObserver(schedule);
    resize.observe(node);
    node.addEventListener("scroll", schedule, { passive: true });
    preference.addEventListener("change", configure);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      node.removeEventListener("scroll", schedule);
      preference.removeEventListener("change", configure);
      context?.revert();
    };
  }, []);

  useEffect(() => {
    const track = journey.current;
    const section = root.current;
    const node = scroller.current;
    if (!track || !section || !node) return;
    let frame = 0;
    let assignedLeft = node.scrollLeft;
    let top = 0;
    let distance = 0;
    let maximum = 0;
    const syncFromPage = () => {
      const value = getHeroJourneyProgress(window.scrollY, top, distance);
      assignedLeft = value * maximum;
      node.scrollLeft = assignedLeft;
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncFromPage);
    };
    const measure = () => {
      top = track.getBoundingClientRect().top + window.scrollY;
      distance = Math.max(0, track.offsetHeight - section.offsetHeight);
      maximum = Math.max(0, node.scrollWidth - node.clientWidth);
      syncFromPage();
    };
    const syncFromSwipe = () => {
      // Ignore the horizontal scroll event produced by our own vertical update.
      if (
        Math.abs(node.scrollLeft - assignedLeft) < 1 ||
        maximum <= 0 ||
        distance <= 0
      )
        return;
      cancelAnimationFrame(frame);
      assignedLeft = node.scrollLeft;
      const value = Math.max(0, Math.min(1, node.scrollLeft / maximum));
      scrollPageTo(top + value * distance, true);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(section);
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    node.addEventListener("scroll", syncFromSwipe, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      node.removeEventListener("scroll", syncFromSwipe);
    };
  }, []);

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    let pointer: number | null = null,
      x = 0,
      left = 0;
    const down = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      pointer = event.pointerId;
      x = event.clientX;
      left = node.scrollLeft;
    };
    const move = (event: PointerEvent) => {
      if (pointer !== event.pointerId || Math.abs(event.clientX - x) < 5)
        return;
      if (!node.hasPointerCapture(event.pointerId))
        node.setPointerCapture(event.pointerId);
      node.dataset.dragging = "true";
      event.preventDefault();
      node.scrollLeft = left - (event.clientX - x);
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
    node.addEventListener("pointercancel", up);
    window.addEventListener("pointerup", up);
    return () => {
      node.removeEventListener("pointerdown", down);
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointercancel", up);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div
      ref={journey}
      className={s.journey}
      data-hero-scroll
      data-enhanced={mode !== "static"}
    >
      <section
        className={s.hero}
        ref={root}
        data-hero
        data-carousel="codrops-demo-1"
        data-mode={mode}
        aria-roledescription="carrousel"
        aria-label="Machines Shibaura et matières premières"
      >
        <h1 className={s.srOnly}>
          Machines Shibaura et matières premières pour la plasturgie en France
        </h1>
        <div className={s.sceneImages} aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={s.sceneImage}
              data-scene-image
              data-visual={slide.visual}
              data-active={active === index}
              style={
                {
                  "--scene-timeline": "--azhar-slide-" + (index + 1),
                  "--scene-position": slide.position,
                  "--scene-mobile-position": slide.mobilePosition,
                } as CSSProperties
              }
            >
              <Image
                src={slide.image}
                alt=""
                fill
                preload={index === 0}
                loading={index === 0 ? undefined : "eager"}
                quality={90}
                sizes="(max-width: 800px) 160vw, 125vw"
                className={s.photo}
                draggable={false}
              />
            </div>
          ))}
        </div>
        <div className={s.veil} />
        <div
          ref={scroller}
          className={s.scroller}
          data-scene-scroller
          tabIndex={0}
          role="group"
          aria-label="Faites défiler la page, balayez ou utilisez les flèches pour parcourir les trois univers"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              navigate(active + (event.key === "ArrowRight" ? 1 : -1));
            }
          }}
        >
          <div className={s.scrollTrack} aria-hidden="true">
            {heroSlides.map((slide) => (
              <div key={slide.id} className={s.scrollItem} />
            ))}
          </div>
        </div>
        <div className={s.captions}>
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={s.caption}
              data-scene-caption
              data-active={active === index}
              aria-hidden={active !== index}
              inert={active !== index}
              style={
                {
                  "--scene-timeline": "--azhar-slide-" + (index + 1),
                } as CSSProperties
              }
            >
              <div className={s.captionBody}>
                <div className={s.labelMask}>
                  <span className={s.label} data-caption-label>
                    {slide.label}
                  </span>
                </div>
                <div className={s.headlineMask}>
                  <p
                    className={s.headline}
                    data-caption-part
                    data-caption-headline
                  >
                    {slide.title}
                    <em>{slide.accent}</em>
                  </p>
                </div>
                <div className={s.copyMask}>
                  <div data-caption-part>
                    <p className={s.description}>{slide.description}</p>
                    <dl className={s.details}>
                      {slide.details.map((detail) => (
                        <div key={detail.label}>
                          <dt>{detail.label}</dt>
                          <dd>{detail.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className={s.linkMask}>
                  <Link
                    href={slide.href}
                    className={s.action}
                    data-caption-part
                  >
                    {slide.action}
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={s.footer}>
          <div className={s.navigation}>
            <nav aria-label="Choisir un univers">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-pressed={active === index}
                  onClick={() => navigate(index)}
                >
                  {slide.nav}
                </button>
              ))}
            </nav>
            <div className={s.progress} aria-hidden="true">
              <span ref={progress} />
            </div>
          </div>
        </div>
        <span className={s.srOnly} role="status" aria-live="polite">
          {heroSlides[active].label}
        </span>
      </section>
    </div>
  );
}
