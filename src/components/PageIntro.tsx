"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(node.children, {
          y: 35,
          opacity: 0,
          duration: 0.95,
          stagger: 0.12,
          ease: "power3.out",
        });
      }, node);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <div ref={root} className="page-intro shell">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
