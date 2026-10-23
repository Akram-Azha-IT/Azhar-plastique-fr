"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Scoped choreography; every animation reverts when the route unmounts. */
export default function HomeMotion({
  children,
}: {
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 55,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-curtain]").forEach((el) => {
          gsap.from(el, {
            clipPath: "inset(12% 0 12% 0)",
            scale: 0.96,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
        gsap.utils
          .toArray<HTMLElement>("[data-reading-word]")
          .forEach((el, i) => {
            gsap.fromTo(
              el,
              { color: "#c0c5ce" },
              {
                color: "#101b2e",
                ease: "none",
                scrollTrigger: {
                  trigger: "[data-reading]",
                  start: () => "top " + (85 - i * 1.4) + "%",
                  end: () => "top " + (62 - i * 1.4) + "%",
                  scrub: true,
                },
              },
            );
          });
      }, scope);
      return () => ctx.revert();
    });
    media.add(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      () => {
        const flow = gsap.context(() => {
          gsap.utils
            .toArray<HTMLElement>("[data-section-flow]")
            .forEach((section) => {
              gsap.fromTo(
                section,
                { clipPath: "inset(6% 2% 0% 2% round 35px)" },
                {
                  clipPath: "inset(0% 0% 0% 0% round 0px)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 95%",
                    end: "top 30%",
                    scrub: 0.8,
                  },
                },
              );
            });
        }, scope);
        const story = scope.querySelector<HTMLElement>("[data-story]");
        if (!story) return () => flow.revert();
        story.dataset.ready = "true";
        story.dataset.active = "0";
        const triggers = Array.from(
          story.querySelectorAll<HTMLElement>("[data-chapter]"),
        ).map((chapter, i) =>
          ScrollTrigger.create({
            trigger: chapter,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: () => {
              story.dataset.active = String(i);
            },
            onEnterBack: () => {
              story.dataset.active = String(i);
            },
          }),
        );
        return () => {
          flow.revert();
          triggers.forEach((t) => t.kill());
          delete story.dataset.ready;
          delete story.dataset.active;
        };
      },
    );
    // Font swaps and late image decoding must not leave stale trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    const resize = new ResizeObserver(refresh);
    resize.observe(scope);
    scope
      .querySelectorAll("img")
      .forEach((img) => img.addEventListener("load", refresh));
    let disposed = false;
    document.fonts.ready.then(() => {
      if (!disposed) refresh();
    });
    return () => {
      disposed = true;
      resize.disconnect();
      media.revert();
      scope
        .querySelectorAll("img")
        .forEach((img) => img.removeEventListener("load", refresh));
    };
  }, []);
  return <div ref={root}>{children}</div>;
}
