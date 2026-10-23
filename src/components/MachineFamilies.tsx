"use client";
import {
  useId,
  useState,
  useSyncExternalStore,
  useRef,
  useEffect,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { machineFamilies } from "@/data/machineFamilies";
import styles from "./MachineFamilies.module.css";

const desktopQuery = "(min-width: 1001px)";
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const getSnapshot = () => window.matchMedia(desktopQuery).matches;

export default function MachineFamilies() {
  const desktop = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const [active, setActive] = useState(0);
  const id = useId();
  const strip = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ previous: false, next: true });
  useEffect(() => {
    const node = strip.current;
    if (!node) return;
    const update = () => {
      const previous = node.scrollLeft > 3;
      const next = node.scrollLeft + node.clientWidth < node.scrollWidth - 3;
      setEdges((old) =>
        old.previous === previous && old.next === next
          ? old
          : { previous, next },
      );
    };
    update();
    node.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(node);
    return () => {
      node.removeEventListener("scroll", update);
      resize.disconnect();
    };
  }, []);
  const move = (direction: number) => {
    const node = strip.current;
    if (!node) return;
    const card = node.querySelector("article");
    if (!card) return;
    node.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 16),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };
  return (
    <div className={styles.explorer}>
      <div className={styles.swipeToolbar}>
        <span>Faites glisser pour explorer</span>
        <div>
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={!edges.previous}
            aria-label="Famille précédente"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={!edges.next}
            aria-label="Famille suivante"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <div
        className={styles.families}
        ref={strip}
        aria-label="Familles de machines Shibaura"
      >
        {machineFamilies.map((family, index) => {
          const selected = active === index;
          return (
            <article
              key={family.slug}
              className={styles.panel}
              data-active={selected}
              onPointerEnter={(event) => {
                if (
                  event.pointerType === "mouse" &&
                  !event.currentTarget.contains(document.activeElement)
                ) {
                  // Keep a keyboard-focused family stable while the pointer crosses another panel.
                  if (
                    !event.currentTarget.parentElement?.contains(
                      document.activeElement,
                    )
                  )
                    setActive(index);
                }
              }}
            >
              <Image
                src={family.image}
                alt={family.alt}
                fill
                sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 55vw"
                className={styles.photo}
              />
              <div className={styles.shade} />
              <div className={styles.content}>
                <h3>
                  {desktop ? (
                    <button
                      type="button"
                      id={id + "-trigger-" + family.slug}
                      aria-expanded={selected}
                      aria-label={"Afficher la famille " + family.title}
                      aria-controls={id + "-content-" + family.slug}
                      onFocus={() => setActive(index)}
                      onClick={() => setActive(index)}
                      onKeyDown={(event) => {
                        if (
                          !["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                            event.key,
                          )
                        )
                          return;
                        event.preventDefault();
                        const next =
                          event.key === "Home"
                            ? 0
                            : event.key === "End"
                              ? machineFamilies.length - 1
                              : (index +
                                  (event.key === "ArrowRight" ? 1 : -1) +
                                  machineFamilies.length) %
                                machineFamilies.length;
                        setActive(next);
                        document
                          .getElementById(
                            id + "-trigger-" + machineFamilies[next].slug,
                          )
                          ?.focus();
                      }}
                    >
                      <span>
                        {desktop && !selected
                          ? family.shortTitle
                          : family.title}
                      </span>
                      <ArrowUpRight size={21} />
                    </button>
                  ) : (
                    <Link
                      id={id + "-trigger-" + family.slug}
                      href={"/machines?famille=" + family.slug}
                      className={styles.titleLink}
                    >
                      <span>{family.title}</span>
                      <ArrowUpRight size={21} />
                    </Link>
                  )}
                </h3>
                <div
                  className={styles.details}
                  id={id + "-content-" + family.slug}
                  aria-labelledby={id + "-trigger-" + family.slug}
                  aria-hidden={desktop && !selected}
                  inert={desktop && !selected}
                >
                  <p>{family.intro}</p>
                  <Link
                    href={"/machines?famille=" + family.slug}
                    className={styles.link}
                  >
                    Explorer cette famille <ArrowUpRight size={17} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
