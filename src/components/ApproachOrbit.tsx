"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Pause, Play } from "lucide-react";
import gsap from "gsap";
import {
  createApproachTimeline,
  getApproachRotation,
} from "@/lib/approachOrbit";
import s from "./ApproachOrbit.module.css";

const steps = [
  {
    id: "comprendre",
    title: "Comprendre",
    focus: "Votre besoin",
    description:
      "Nous définissons avec vous les besoins de votre production : application, matière, moule et objectifs.",
  },
  {
    id: "selectionner",
    title: "Sélectionner",
    focus: "La solution adaptée",
    description:
      "Nous sélectionnons les machines Shibaura et les grades de polymères adaptés à votre procédé et aux exigences de vos pièces.",
  },
  {
    id: "concretiser",
    title: "Concrétiser",
    focus: "Votre projet prend forme",
    description:
      "Vous recevez une offre technique et commerciale claire pour votre projet d’équipement ou votre approvisionnement en matières.",
  },
] as const;

export default function ApproachOrbit() {
  const panels = useRef<HTMLDivElement>(null);
  const rotor = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const manual = useRef<gsap.core.Tween | null>(null);
  const selected = useRef(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);

  const arrive = useCallback((index: number) => {
    selected.current = index;
    setActive(index);
  }, []);

  useLayoutEffect(() => {
    const node = rotor.current;
    if (!node || !ready) return;
    manual.current?.kill();
    if (reduced) {
      gsap.set(node, { rotation: (selected.current * 360) / steps.length });
      return () => {
        manual.current?.kill();
      };
    }
    const animation = createApproachTimeline(
      node,
      selected.current,
      steps.length,
      arrive,
    );
    timeline.current = animation;
    return () => {
      animation.kill();
      manual.current?.kill();
      if (timeline.current === animation) timeline.current = null;
    };
  }, [ready, reduced, cycle, arrive]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    setReady(true);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = panels.current;
    if (!node) return;
    let inView = false;
    const sync = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.55;
        sync();
      },
      { threshold: [0, 0.55] },
    );
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const running = ready && visible && !paused && !reduced;
  useEffect(() => {
    timeline.current?.paused(!running);
  }, [running, ready, reduced, cycle]);

  const select = (index: number) => {
    setPaused(true);
    timeline.current?.kill();
    timeline.current = null;
    manual.current?.kill();
    const node = rotor.current;
    if (!node) return;
    const current = Number(gsap.getProperty(node, "rotation")) || 0;
    manual.current = gsap.to(node, {
      rotation: getApproachRotation(current, index, steps.length),
      duration: reduced ? 0 : 0.45,
      ease: "power2.inOut",
      onComplete: () => {
        arrive(index);
        setCycle((value) => value + 1);
      },
    });
  };

  return (
    <div
      className={s.experience}
      data-approach-orbit
      data-ready={ready}
      data-running={running}
    >
      <div className={s.orbitColumn}>
        <div className={s.orbit}>
          <div className={s.core} aria-hidden="true">
            <span className={s.coreEyebrow}>Votre projet</span>
            <strong>
              Machine
              <br />& matière
            </strong>
            <span className={s.coreLabel} key={steps[active].id}>
              {steps[active].focus}
            </span>
          </div>
          <div ref={rotor} className={s.rotor} aria-hidden="true">
            <span className={s.trail} />
            <span className={s.ball} />
          </div>
          <div
            className={s.stops}
            role="tablist"
            aria-label="Les étapes de notre approche"
          >
            {steps.map((step, index) => (
              <button
                key={step.id}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                id={"approach-tab-" + step.id}
                className={s.stop}
                data-orbit-stop={index}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls={"approach-panel-" + step.id}
                tabIndex={active === index ? 0 : -1}
                onFocus={() => setPaused(true)}
                onClick={() => select(index)}
                onKeyDown={(event) => {
                  let next = index;
                  if (event.key === "ArrowRight")
                    next = (index + 1) % steps.length;
                  else if (event.key === "ArrowLeft")
                    next = (index + steps.length - 1) % steps.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = steps.length - 1;
                  else return;
                  event.preventDefault();
                  select(next);
                  tabs.current[next]?.focus();
                }}
              >
                <span className={s.stopDot} aria-hidden="true" />
                <span className={s.stopLabel}>{step.title}</span>
              </button>
            ))}
          </div>
        </div>
        {ready && !reduced && (
          <button
            type="button"
            className={s.playback}
            aria-label={
              paused
                ? "Reprendre l’animation des étapes"
                : "Mettre l’animation des étapes en pause"
            }
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? (
              <Play size={13} aria-hidden="true" />
            ) : (
              <Pause size={13} aria-hidden="true" />
            )}
            {paused ? "Reprendre" : "Mettre en pause"}
          </button>
        )}
      </div>
      <div className={s.content}>
        <div
          className={s.panels}
          ref={panels}
          aria-live={running ? "off" : "polite"}
        >
          {steps.map((step, index) => (
            <article
              key={step.id}
              id={"approach-panel-" + step.id}
              className={s.panel}
              role={ready ? "tabpanel" : undefined}
              tabIndex={ready && active === index ? 0 : -1}
              onFocus={() => setPaused(true)}
              aria-labelledby={"approach-tab-" + step.id}
              aria-hidden={ready && active !== index}
              inert={ready && active !== index}
              data-active={active === index}
            >
              <span className={s.focus}>{step.focus}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
