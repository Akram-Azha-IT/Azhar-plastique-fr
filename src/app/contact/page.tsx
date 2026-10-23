"use client";
import { useState, useEffect, useLayoutEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Mail, Check } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildContactEmail } from "@/lib/contactEmail";

gsap.registerPlugin(ScrollTrigger);

function Form() {
  const search = useSearchParams();
  const [kind, setKind] = useState("machine");
  const [draft, setDraft] = useState<string | null>(null);
  const aside = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const node = aside.current;
    if (!node) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(node, {
          y: 50,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 92%", once: true },
        });
      }, node);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  useEffect(() => {
    setKind(search.get("type") === "matiere" ? "matiere" : "machine");
    setDraft(null);
  }, [search]);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = buildContactEmail(new FormData(e.currentTarget), kind);
    window.open(email, "_blank", "noopener,noreferrer");
    setDraft(email);
  }
  return (
    <div className="contact-layout" data-contact-form>
      <form onSubmit={submit} className="quote-form">
        <fieldset>
          <legend>Votre projet concerne</legend>
          <div className="segmented">
            {[
              ["machine", "Machines Shibaura"],
              ["matiere", "Matières premières"],
            ].map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="type"
                  value={value}
                  checked={kind === value}
                  onChange={() => {
                    setKind(value);
                    setDraft(null);
                  }}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="form-grid">
          <label>
            Nom et prénom *
            <input
              name="name"
              autoComplete="name"
              required
              placeholder="Votre nom"
            />
          </label>
          <label>
            Entreprise *
            <input
              name="company"
              autoComplete="organization"
              required
              placeholder="Nom de votre société"
            />
          </label>
          <label>
            Email professionnel *
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="vous@entreprise.fr"
            />
          </label>
          <label>
            Téléphone
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="Votre numéro"
            />
          </label>
        </div>
        <label key={kind + search.toString()}>
          {" "}
          {kind === "machine"
            ? "Modèle ou besoin d’équipement"
            : "Polymère ou grade recherché"}
          <input
            name="reference"
            defaultValue={
              kind === "machine"
                ? search.get("machine") || ""
                : search.get("material") || ""
            }
            placeholder={
              kind === "machine"
                ? "Ex. EC230SXIII, nouvelle ligne d’injection…"
                : "Ex. PP injection, PA renforcé…"
            }
          />
        </label>
        <label>
          Votre cahier des charges *
          <textarea
            name="message"
            required
            minLength={10}
            rows={5}
            placeholder="Application, matière, dimensions, cadence ou volumes : décrivez votre projet."
          />
        </label>
        <p className="form-help">
          Ce formulaire prépare un email et ouvre votre messagerie séparément.
          Le site reste ouvert. Vous pourrez vérifier et envoyer votre demande
          depuis votre messagerie.
        </p>
        <button className="button button-dark" type="submit">
          Préparer ma demande par email <ArrowUpRight size={18} />
        </button>
        {draft && (
          <p className="form-feedback" role="status">
            <Check size={18} />
            <span>
              Demande préparée. Terminez l’envoi dans votre messagerie.{" "}
              <a href={draft} target="_blank" rel="noopener noreferrer">
                Ouvrir ma messagerie
              </a>{" "}
              si elle ne s’est pas ouverte automatiquement.
            </span>
          </p>
        )}
      </form>
      <aside ref={aside} className="contact-aside">
        <span className="eyebrow">Contact commercial / France</span>
        <h2>
          Construisons
          <br />
          votre projet.
        </h2>
        <p>
          Équipements Shibaura ou matières premières : notre équipe en France
          est à votre écoute pour vos projets de production.
        </p>
        <a
          className="text-link"
          href="mailto:contact@azharplastics.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail size={18} />
          contact@azharplastics.com
        </a>
        <div className="aside-note">
          <h3>Pour avancer efficacement</h3>
          <p>
            Machines : application, moule, matière et cadence.
            <br />
            <br />
            Matières : polymère, propriétés, procédé et volumes.
          </p>
        </div>
      </aside>
    </div>
  );
}
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Parlons de votre prochain projet."
        description="Contactez notre équipe pour vos machines Shibaura et vos matières premières de plasturgie."
      />
      <div className="shell page-content">
        <Suspense fallback={<p>Chargement du formulaire…</p>}>
          <Form />
        </Suspense>
        <div className="privacy-note" id="confidentialite">
          <h2>Vos informations</h2>
          <p>
            Les champs saisis servent à préparer votre email. Ce formulaire ne
            les enregistre pas sur le serveur du site. L’envoi s’effectue depuis
            votre messagerie, à votre initiative. Pour toute question concernant
            vos données, contactez contact@azharplastics.com.
          </p>
        </div>
      </div>
    </>
  );
}
