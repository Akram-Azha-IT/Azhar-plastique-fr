import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import s from "./ExpertisePositioning.module.css";

const offers = [
  {
    id: "machines",
    label: "Machines Shibaura",
    title: "La technologie japonaise. Votre production.",
    text: "Injection plastique, fonderie sous pression, machines-outils et robotique. Les solutions Shibaura Machine avec un interlocuteur en France.",
    image: "/images/shibaura-injection.jpg",
    alt: "Outillage d’injection plastique Shibaura Machine",
    href: "/machines",
    action: "Explorer les machines",
    tags: ["Équipements", "Automatisation"],
  },
  {
    id: "matieres",
    label: "Matières premières",
    title: "Le bon polymère. Pour chaque application.",
    text: "Polymères de commodité et matières techniques. Nous fournissons les familles de résines pour vos procédés de transformation et vos besoins de production.",
    image: "/images/materials-editorial.png",
    alt: "Illustration de granulés polymères blancs et bleus",
    href: "/matieres-premieres",
    action: "Découvrir les matières",
    tags: ["Commodité", "Techniques"],
  },
];

export default function ExpertisePositioning() {
  return (
    <section
      className={s.positioning}
      aria-labelledby="positioning-title"
      data-content-reveal
    >
      <header className={s.heading}>
        <span className="eyebrow">Votre partenaire industriel en France</span>
        <h2 id="positioning-title">
          Shibaura Machine.
          <br />
          <span>La proximité en France.</span>
        </h2>
        <p>
          Représentant exclusif de Shibaura Machine en France, Azhar Plastics
          réunit les équipements et les matières premières pour faire avancer
          votre production.
        </p>
      </header>
      <div className={s.offers}>
        {offers.map((offer) => (
          <Link
            className={s.offer}
            href={offer.href}
            key={offer.id}
            data-offer={offer.id}
          >
            <div className={s.visual} data-flow-image>
              <Image
                src={offer.image}
                alt={offer.alt}
                fill
                sizes="(max-width:800px) 82vw, 46vw"
                className={s.photo}
              />
            </div>
            <div className={s.copy}>
              <span className={s.label}>{offer.label}</span>
              <h3>{offer.title}</h3>
              <p>{offer.text}</p>
              <div className={s.tags}>
                {offer.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <span className={s.action}>
                {offer.action}
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
