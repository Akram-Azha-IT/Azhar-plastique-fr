import Image from "next/image";
import { ArrowDown } from "lucide-react";
import MaterialExplorer from "@/components/MaterialExplorer";
import CtaSection from "@/components/CtaSection";
import s from "./materials.module.css";
export const metadata = {
  title: "Matières premières plasturgie en France | Azhar Plastics",
  description:
    "Matières de commodité : PE, PP, PET, PVC. Matières techniques : PA6, PA66, PPS, PPA, PBT, PET, ABS, PC/ABS, GPPS, HIPS, SAN et TPV. Sélection selon votre application.",
};
export default function Page() {
  return (
    <>
      <section
        className={s.hero}
        aria-labelledby="materials-hero-title"
        data-flow-image
      >
        <Image
          src="/images/materials-editorial.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className={s.heroImage}
        />
        <div className={s.heroVeil} />
        <div className={`shell ${s.heroInner}`}>
          <div className={s.heroCopy}>
            <span className="eyebrow">Matières premières / Plasturgie</span>
            <h1 id="materials-hero-title">
              La bonne matière.
              <br />
              <span>Tout commence ici.</span>
            </h1>
            <p>
              Des polymères de commodité aux matières techniques, donnons à
              votre application la matière qu’elle mérite.
            </p>
            <a href="#catalogue" className={s.heroAction}>
              Explorer les matières <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <div className={`shell ${s.content}`}>
        <MaterialExplorer />
        <div className="technical-panel">
          <h2>
            Votre matière.
            <br />
            Votre cahier des charges.
          </h2>
          <div>
            <p>
              Du choix du polymère à la définition du grade, nous vous
              accompagnons dans vos besoins de matières premières pour la
              plasturgie.
            </p>
            <p>
              Transmettez votre procédé, les propriétés recherchées et vos
              volumes. Notre équipe vous présente les grades, les fiches
              techniques et les conditions d’approvisionnement.
            </p>
          </div>
        </div>
      </div>
      <CtaSection />
    </>
  );
}
