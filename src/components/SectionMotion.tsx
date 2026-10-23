"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function SectionMotion({
  children,
}: {
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>(
            ".wide-image, .application-image, [data-flow-image]",
          )
          .forEach((image) => {
            gsap.fromTo(
              image,
              { clipPath: "inset(8% 3% 8% 3%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                scrollTrigger: {
                  trigger: image,
                  start: "top 95%",
                  end: "top 40%",
                  scrub: 0.7,
                },
              },
            );
            const photo = image.querySelector("img");
            if (photo)
              gsap.fromTo(
                photo,
                { scale: 1.12, yPercent: -5 },
                {
                  scale: 1,
                  yPercent: 5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: image,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.7,
                  },
                },
              );
          });
        gsap.utils
          .toArray<HTMLElement>(
            ".technical-panel, .process-item, .material-catalog-item, .approach-explorer, .contact-band-inner, [data-content-reveal]",
          )
          .forEach((section) => {
            gsap.from(section, {
              y: 50,
              opacity: 0,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 92%", once: true },
            });
          });
      }, node);
      return () => ctx.revert();
    });
    media.add(
      "(pointer: fine) and (min-width: 901px) and (prefers-reduced-motion: no-preference)",
      () => {
        const cleanups: Array<() => void> = [];
        const ctx = gsap.context(() => {
          node
            .querySelectorAll<HTMLElement>(".button, [data-magnetic]")
            .forEach((button) => {
              // The Suspense form owns its motion after its own hydration completes.
              if (button.closest("[data-contact-form]")) return;
              const x = gsap.quickTo(button, "x", {
                duration: 0.45,
                ease: "power3.out",
              });
              const y = gsap.quickTo(button, "y", {
                duration: 0.45,
                ease: "power3.out",
              });
              let bounds: DOMRect | undefined;
              const enter = () => {
                bounds = button.getBoundingClientRect();
              };
              const move = (event: PointerEvent) => {
                if (!bounds) return;
                x(
                  Math.max(
                    -6,
                    Math.min(
                      6,
                      (event.clientX - bounds.left - bounds.width / 2) * 0.08,
                    ),
                  ),
                );
                y(
                  Math.max(
                    -5,
                    Math.min(
                      5,
                      (event.clientY - bounds.top - bounds.height / 2) * 0.12,
                    ),
                  ),
                );
              };
              const reset = () => {
                bounds = undefined;
                x(0);
                y(0);
              };
              button.addEventListener("pointerenter", enter);
              button.addEventListener("pointermove", move);
              button.addEventListener("pointerleave", reset);
              button.addEventListener("blur", reset);
              cleanups.push(() => {
                button.removeEventListener("pointerenter", enter);
                button.removeEventListener("pointermove", move);
                button.removeEventListener("pointerleave", reset);
                button.removeEventListener("blur", reset);
              });
            });
        }, node);
        return () => {
          cleanups.forEach((cleanup) => cleanup());
          ctx.revert();
        };
      },
    );
    let disposed = false;
    const refresh = () => {
      if (!disposed) ScrollTrigger.refresh();
    };
    node
      .querySelectorAll("img")
      .forEach((img) => img.addEventListener("load", refresh));
    document.fonts.ready.then(refresh);
    return () => {
      disposed = true;
      media.revert();
      node
        .querySelectorAll("img")
        .forEach((img) => img.removeEventListener("load", refresh));
    };
  }, []);
  return (
    <div ref={root} className="section-motion-root">
      {children}
    </div>
  );
}
