"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
const approaches = [
  {
    id: "ecoute",
    title: "Partir de votre réalité",
    label: "Écoute",
    image: "/images/factory_tech.jpg",
    alt: "Environnement de production industrielle",
    description:
      "Votre application est notre point de départ. Nous définissons avec vous les équipements et les matières qui répondent à vos objectifs de production.",
  },
  {
    id: "precision",
    title: "Donner du sens au choix",
    label: "Précision",
    image: "/images/ec650sx3.jpg",
    alt: "Presse à injecter Shibaura Machine EC650SXIII",
    description:
      "En tant que représentant exclusif Shibaura Machine en France, nous vous accompagnons dans le choix de votre équipement, de ses options et des matières pour votre production.",
  },
  {
    id: "coherence",
    title: "Voir le procédé dans son ensemble",
    label: "Cohérence",
    image: "/images/materials-editorial.png",
    alt: "Illustration de granulés polymères blancs et bleus",
    description:
      "Machine, moule et polymère : nous réunissons ces trois dimensions dans une offre construite pour votre application. Un même interlocuteur pour vos équipements et vos matières premières.",
  },
];
export default function ApproachExplorer() {
  const [active, setActive] = useState(0);
  return (
    <section className="approach-explorer">
      <div className="explorer-visual">
        <div
          className={
            "explorer-image " + (active === 1 ? "explorer-machine" : "")
          }
          key={approaches[active].id}
        >
          <Image
            src={approaches[active].image}
            alt={approaches[active].alt}
            fill
            sizes="(max-width:800px) 90vw, 48vw"
            className="cover-photo"
          />
        </div>
        <span className="explorer-caption">{approaches[active].label}</span>
      </div>
      <div className="explorer-content">
        <span className="eyebrow">La méthode Azhar Plastics</span>
        <h2>
          La bonne réponse
          <br />
          commence par l’écoute.
        </h2>
        <div className="explorer-options">
          {approaches.map((item, i) => (
            <div
              className="explorer-option"
              key={item.id}
              data-open={active === i}
            >
              <h3>
                <button
                  type="button"
                  id={"approach-trigger-" + item.id}
                  aria-expanded={active === i}
                  aria-controls={"approach-panel-" + item.id}
                  onClick={() => setActive(i)}
                >
                  {item.title}
                  {active === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              </h3>
              <div
                className="explorer-panel"
                id={"approach-panel-" + item.id}
                role="region"
                aria-labelledby={"approach-trigger-" + item.id}
                aria-hidden={active !== i}
              >
                <div>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link className="text-link" href="/contact">
          Parlons de votre projet <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
