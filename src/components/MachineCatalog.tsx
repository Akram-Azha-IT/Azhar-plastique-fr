"use client";
import { useId, useLayoutEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, X, SlidersHorizontal } from "lucide-react";
import { machineFamilies, injectionModelGroups } from "@/data/machineFamilies";
import { machines } from "@/data/catalog";
import { filterInjectionGroups } from "@/lib/catalogFilters";
import s from "./MachineCatalog.module.css";

export default function MachineCatalog() {
  const id = useId();
  const [slug, setSlug] = useState(machineFamilies[0].slug);
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState("all");
  useLayoutEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      const requested = params.get("famille");
      setSlug(
        machineFamilies.find((f) => f.slug === requested)?.slug ||
          machineFamilies[0].slug,
      );
      setQuery(params.get("modele") || "");
      const savedFormat = params.get("format");
      setFormat(
        injectionModelGroups.some((group) => group.label === savedFormat)
          ? savedFormat!
          : "all",
      );
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const family =
    machineFamilies.find((f) => f.slug === slug) || machineFamilies[0];
  const groups = useMemo(
    () => filterInjectionGroups(injectionModelGroups, query, format),
    [query, format],
  );
  const count = groups.reduce((total, group) => total + group.models.length, 0);
  const updateFilters = (nextQuery: string, nextFormat: string) => {
    setQuery(nextQuery);
    setFormat(nextFormat);
    const url = new URL(window.location.href);
    if (nextQuery) url.searchParams.set("modele", nextQuery);
    else url.searchParams.delete("modele");
    if (nextFormat !== "all") url.searchParams.set("format", nextFormat);
    else url.searchParams.delete("format");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  };
  const choose = (next: string) => {
    if (next === slug) return;
    setSlug(next);
    setQuery("");
    setFormat("all");
    const url = new URL(window.location.href);
    url.searchParams.set("famille", next);
    url.searchParams.delete("modele");
    url.searchParams.delete("format");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    window.requestAnimationFrame(() => {
      const panel = document.getElementById(id + "-panel");
      const nav = document.getElementById(id + "-navigation");
      if (!panel) return;
      const header =
        document.querySelector(".site-header")?.getBoundingClientRect()
          .height || 78;
      const top =
        panel.getBoundingClientRect().top +
        window.scrollY -
        header -
        (nav?.getBoundingClientRect().height || 0);
      window.scrollTo({
        top: Math.max(0, top),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  };
  const reset = () => updateFilters("", "all");
  return (
    <div className={s.catalog}>
      <div className={s.familyNav} id={id + "-navigation"}>
        <div
          className={s.familyTabs}
          role="tablist"
          aria-label="Famille de machines"
        >
          {machineFamilies.map((item, i) => (
            <button
              type="button"
              key={item.slug}
              role="tab"
              id={id + "-tab-" + item.slug}
              aria-controls={id + "-panel"}
              aria-selected={slug === item.slug}
              tabIndex={slug === item.slug ? 0 : -1}
              onClick={() => choose(item.slug)}
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
                      : (i +
                          (event.key === "ArrowRight" ? 1 : -1) +
                          machineFamilies.length) %
                        machineFamilies.length;
                choose(machineFamilies[next].slug);
                document
                  .getElementById(id + "-tab-" + machineFamilies[next].slug)
                  ?.focus();
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      <div
        role="tabpanel"
        id={id + "-panel"}
        aria-labelledby={id + "-tab-" + family.slug}
        className={s.familyPanel}
        data-family={family.slug}
      >
        <div className={s.familySummary}>
          <div className={s.familyImage}>
            <Image
              src={family.image}
              alt={family.alt}
              fill
              sizes="(max-width:700px) 90vw, 36vw"
              className={s.photo}
            />
          </div>
          <div className={s.familyCopy}>
            <span className="eyebrow">Shibaura Machine</span>
            <h2>{family.title}</h2>
            <p>{family.description}</p>
            <div className={s.familyActions}>
              <Link
                className="button button-blue"
                href={"/contact?machine=" + encodeURIComponent(family.title)}
              >
                Décrire mon besoin <ArrowUpRight size={17} />
              </Link>
              <Link
                href={"/machines/familles/" + family.slug}
                className={s.secondaryLink}
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
        {slug === "injection-plastique" ? (
          <section
            className={s.modelSection}
            aria-label="Modèles de presses à injecter"
          >
            <div className={s.modelHeading}>
              <div>
                <h3>Trouvez votre presse</h3>
                <p>Demandez un devis directement depuis le modèle.</p>
              </div>
              <a
                className={s.adviceLink}
                href="/contact?machine=Choix%20d%E2%80%99une%20presse%20%C3%A0%20injecter"
              >
                Besoin d’aide au choix ? <ArrowUpRight size={15} />
              </a>
            </div>
            <div className={s.filters}>
              <label className={s.searchLabel}>
                <span>Rechercher un modèle</span>
                <div>
                  <Search size={18} aria-hidden="true" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) =>
                      updateFilters(event.target.value, format)
                    }
                    placeholder="Ex. EC230"
                    autoComplete="off"
                    aria-controls={id + "-models"}
                  />
                  {query && (
                    <button
                      type="button"
                      aria-label="Effacer la recherche"
                      onClick={() => updateFilters("", format)}
                    >
                      <X size={17} />
                    </button>
                  )}
                </div>
              </label>
              <label className={s.selectLabel}>
                <span>Format de presse</span>
                <div>
                  <SlidersHorizontal size={17} aria-hidden="true" />
                  <select
                    value={format}
                    onChange={(event) =>
                      updateFilters(query, event.target.value)
                    }
                    aria-controls={id + "-models"}
                  >
                    <option value="all">Tous les formats</option>
                    {injectionModelGroups.map((group) => (
                      <option key={group.label} value={group.label}>
                        {group.label}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </div>
            <div className={s.resultBar}>
              <p role="status" aria-live="polite">
                {count === 0
                  ? "Aucun modèle trouvé"
                  : count + " référence" + (count > 1 ? "s" : "")}
              </p>
              {(query || format !== "all") && (
                <button type="button" onClick={reset}>
                  Réinitialiser
                </button>
              )}
            </div>
            <div id={id + "-models"} className={s.modelGroups}>
              {groups.length ? (
                groups.map((group) => (
                  <section key={group.label} className={s.modelGroup}>
                    <h4>{group.label}</h4>
                    <ul>
                      {group.models.map((model) => {
                        const detail = machines.find((m) => m.name === model);
                        return (
                          <li key={model} className={s.modelRow}>
                            <div className={s.modelName}>
                              <strong>{model}</strong>
                              <span>
                                {model === "EC30SXII"
                                  ? "Série SXII"
                                  : "Série SXIII"}
                              </span>
                            </div>
                            <div className={s.rowActions}>
                              {detail && (
                                <Link
                                  href={"/machines/" + detail.slug}
                                  className={s.detailLink}
                                  aria-label={"Fiche du modèle " + model}
                                >
                                  Fiche
                                </Link>
                              )}
                              <Link
                                href={
                                  "/contact?machine=" +
                                  encodeURIComponent(model)
                                }
                                className={s.quoteLink}
                                aria-label={"Demander un devis pour " + model}
                              >
                                Devis <ArrowUpRight size={15} />
                              </Link>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))
              ) : (
                <div className={s.empty}>
                  <h4>Essayez une autre recherche</h4>
                  <p>
                    Utilisez une référence comme EC230 ou consultez tous les
                    formats.
                  </p>
                  <button
                    type="button"
                    className="button button-dark"
                    onClick={reset}
                  >
                    Afficher tous les modèles
                  </button>
                </div>
              )}
            </div>
            <p className={s.availability}>
              Notre équipe en France vous accompagne dans le choix du modèle, de
              ses options et des conditions de fourniture.
            </p>
          </section>
        ) : (
          <section
            className={s.solutions}
            aria-label={"Solutions " + family.title}
          >
            <h3>Choisissez votre application</h3>
            <p>
              Consultez-nous directement pour la solution qui vous intéresse.
            </p>
            <div className={s.solutionGrid}>
              {family.ranges.map((range) => (
                <article key={range.name}>
                  <h4>{range.name}</h4>
                  <p>{range.description}</p>
                  <Link
                    className={s.solutionQuote}
                    href={
                      "/contact?machine=" +
                      encodeURIComponent(family.title + " / " + range.name)
                    }
                  >
                    Demander un devis <ArrowUpRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
