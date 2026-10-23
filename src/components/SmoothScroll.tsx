"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerPageScroller } from "@/lib/pageScroll";

gsap.registerPlugin(ScrollTrigger);
export default function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference) and (pointer: fine)",
    );
    let destroy: (() => void) | undefined;
    const configure = () => {
      destroy?.();
      destroy = undefined;
      if (!media.matches) return;
      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        anchors: { offset: -100 },
        prevent: (node) => node.hasAttribute("data-lenis-prevent"),
      });
      const unregister = registerPageScroller((top, immediate) => {
        lenis.scrollTo(top, { immediate });
      });
      const update = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(update);
      const sync = () => {
        if (document.body.style.overflow === "hidden") lenis.stop();
        else lenis.start();
      };
      const observer = new MutationObserver(sync);
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["style"],
      });
      sync();
      destroy = () => {
        unregister();
        observer.disconnect();
        gsap.ticker.remove(update);
        lenis.destroy();
      };
    };
    configure();
    media.addEventListener("change", configure);
    return () => {
      destroy?.();
      media.removeEventListener("change", configure);
    };
  }, [pathname]);
  return null;
}
