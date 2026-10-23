import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import HomeMotion from "./HomeMotion";
import MachineFamilies from "./MachineFamilies";
import ProductHero from "./ProductHero";
import ApproachOrbit from "./ApproachOrbit";
import { materialGroups, sectors } from "@/data/catalog";
import s from "./HomeExperience.module.css";
const reading =
  "La performance naît de la rencontre entre la bonne machine et la bonne matière.";
export default function IndustrialHome() {
  return (
    <HomeMotion>
      <ProductHero />
      <section id="vision" className={s.vision}>
        <div className="shell">
          <div className={s.visionTop}>
            <span className="eyebrow">UNE VISION D’ENSEMBLE</span>
            <span className={s.smallNote}>MACHINE + MATIÈRE + APPLICATION</span>
          </div>
          <h2 className={s.reading} data-reading>
            {reading.split(" ").map((word, i) => (
              <span data-reading-word key={i}>
                {word}{" "}
              </span>
            ))}
          </h2>
          <div className={s.visionBottom} data-reveal>
            <span className={s.visionMark}>
              Une vision commune<span>machine et matière</span>
            </span>
            <p>
              Représentant exclusif Shibaura Machine en France, nous vous
              accompagnons dans vos projets d’équipement et fournissons les
              matières premières pour votre production.
            </p>
          </div>
        </div>
      </section>
      <section id="expertises" className={s.story} data-story>
        <div className={s.storyInner}>
          <div className={s.storyStage}>
            <div className={s.stageMachine}>
              <span className={s.stageLabel}>TECHNOLOGIE SHIBAURA</span>
              <div className={s.stageMachineImage}>
                <Image
                  src="/images/ec230sx3.jpg"
                  alt="Presse Shibaura Machine EC230SXIII"
                  fill
                  sizes="(max-width:900px) 90vw, 52vw"
                  className={s.stageProduct}
                />
              </div>
              <div className={s.stageCaption}>
                <span>EC-SXIII</span>
                <small>INJECTION TOUT-ÉLECTRIQUE</small>
              </div>
            </div>
            <div className={s.stageMaterial}>
              <Image
                src="/images/materials-editorial.png"
                alt="Illustration de granulés polymères blancs et bleus"
                fill
                sizes="(max-width:900px) 90vw, 52vw"
                className={s.materialPhoto}
              />
              <span className={s.stageLabel}>MATIÈRES PREMIÈRES</span>
              <div className={s.stageCaption}>
                <span>La matière, maîtrisée.</span>
                <small>COMMODITÉ / TECHNIQUES</small>
              </div>
            </div>
          </div>
          <div className={s.storyChapters}>
            <article className={s.chapter} data-chapter>
              <span className="eyebrow">MACHINES SHIBAURA</span>
              <h2>
                La force de
                <br />
                la précision.
              </h2>
              <p>
                La technologie d’injection tout-électrique Shibaura Machine. Une
                sélection guidée par votre application, votre outillage et vos
                objectifs de production.
              </p>
              <ul>
                <li>
                  <Plus size={14} />
                  Série EC-SXIII tout-électrique
                </li>
                <li>
                  <Plus size={14} />
                  Commande INJECTVISOR-V70
                </li>
                <li>
                  <Plus size={14} />
                  Représentation exclusive en France
                </li>
              </ul>
              <Link href="/machines" className="button button-dark">
                Explorer les machines <ArrowUpRight size={18} />
              </Link>
            </article>
            <article className={s.chapter} data-chapter>
              <span className="eyebrow">MATIÈRES PREMIÈRES</span>
              <h2>
                Tout commence
                <br />
                par la matière.
              </h2>
              <p>
                Polymères de commodité ou plastiques techniques : nous vous
                orientons selon les propriétés recherchées, le procédé et
                l’usage final de vos pièces.
              </p>
              <div className={s.polymerChips}>
                {materialGroups.map((group) => (
                  <Link href={"/matieres-premieres#" + group.id} key={group.id}>
                    {group.shortLabel}
                    <ArrowUpRight size={13} />
                  </Link>
                ))}
              </div>
              <Link href="/matieres-premieres" className="button button-dark">
                Trouver votre matière <ArrowUpRight size={18} />
              </Link>
            </article>
          </div>
        </div>
      </section>
      <section className={s.catalog} data-section-flow>
        <div className="shell">
          <div className={s.sectionTitle} data-reveal>
            <div>
              <span className="eyebrow">LES UNIVERS SHIBAURA MACHINE</span>
              <h2>
                Plusieurs savoir-faire
                <br />
                <span>Une même exigence.</span>
              </h2>
            </div>
            <Link href="/machines" className="text-link">
              Toutes les machines <ArrowUpRight size={18} />
            </Link>
          </div>
          <div data-reveal>
            <MachineFamilies />
          </div>
        </div>
      </section>
      <section className={s.materialBanner} data-curtain>
        <Image
          src="/images/materials-editorial.png"
          alt="Composition illustrative de granulés de polymères"
          fill
          sizes="100vw"
          className={s.bannerPhoto}
        />
        <div className={s.bannerShade} />
        <div className="shell">
          <div className={s.bannerCopy} data-reveal>
            <span className="eyebrow">L’EXIGENCE À L’ÉCHELLE DU GRANULÉ</span>
            <h2>
              Petite matière.
              <br />
              Grandes possibilités.
            </h2>
            <p>
              Chaque application a ses exigences.
              <br />
              Chaque polymère a son rôle à jouer.
            </p>
            <Link className="button button-blue" href="/matieres-premieres">
              Explorer nos polymères <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className={s.sectors} data-section-flow>
        <div className="shell">
          <div className={s.sectionTitle} data-reveal>
            <div>
              <span className="eyebrow">APPLICATIONS INDUSTRIELLES</span>
              <h2>
                Votre industrie.
                <br />
                <span>Notre terrain d’action.</span>
              </h2>
            </div>
            <p>
              Des solutions pour
              <br />
              vos contraintes de transformation.
            </p>
          </div>
          <div className={s.sectorList}>
            {sectors.map((sector, i) => (
              <Link
                href={"/applications#secteur-" + i}
                className={s.sectorRow}
                key={sector.name}
                data-reveal
              >
                <div className={s.sectorImage}>
                  <Image
                    src={sector.image}
                    alt={sector.imageAlt}
                    fill
                    sizes="(max-width:600px) 80vw, 220px"
                    className={s.sectorPhoto}
                    style={{ objectPosition: sector.imagePosition }}
                  />
                </div>
                <div className={s.sectorText}>
                  <h3>{sector.name}</h3>
                  <p>{sector.text}</p>
                </div>
                <span className={s.sectorArrow}>
                  <ArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={s.approach} data-section-flow>
        <div className="shell">
          <div className={s.sectionTitle} data-reveal>
            <div>
              <span className="eyebrow">NOTRE APPROCHE</span>
              <h2>
                L’écoute d’abord.
                <br />
                La solution ensuite.
              </h2>
            </div>
            <Link href="/expertise" className="text-link">
              Découvrir Azhar Plastics <ArrowUpRight size={18} />
            </Link>
          </div>
          <ApproachOrbit />
        </div>
      </section>
      <section className={s.finalCta} data-section-flow>
        <div className="shell">
          <div className={s.ctaTop}>
            <span className="eyebrow">
              ET SI ON PARLAIT DE VOTRE PROCHAIN PROJET ?
            </span>
            <span className="eyebrow">FRANCE / AZHAR PLASTICS</span>
          </div>
          <Link href="/contact" className={s.bigCta} data-reveal>
            <span>
              Passons à<br />
              la production.
            </span>
            <span className={s.ctaArrow}>
              <ArrowUpRight />
            </span>
          </Link>
          <div className={s.ctaBottom}>
            <p>
              Un besoin d’équipement. Une matière à sélectionner.
              <br />
              Commençons par un échange.
            </p>
            <a
              href="mailto:contact@azharplastics.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              contact@azharplastics.com <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </HomeMotion>
  );
}
