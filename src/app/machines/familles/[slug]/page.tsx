import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { machineFamilies } from "@/data/machineFamilies";
import InjectionLineup from "@/components/InjectionLineup";
import CtaSection from "@/components/CtaSection";
export function generateStaticParams() {
  return machineFamilies.map((family) => ({ slug: family.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const family = machineFamilies.find((item) => item.slug === slug);
  return {
    title: family
      ? family.title + " Shibaura Machine | Azhar Plastics France"
      : "Famille non trouvée",
    description: family?.description,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const family = machineFamilies.find((item) => item.slug === slug);
  if (!family) notFound();
  return (
    <>
      <div className="shell family-page">
        <Link href="/machines" className="text-link">
          <ArrowLeft size={16} />
          Toutes les familles
        </Link>
        <div className="family-page-title">
          <span className="eyebrow">Shibaura Machine</span>
          <h1>{family.title}</h1>
          <p>{family.intro}</p>
        </div>
        <div className="wide-image family-page-photo">
          <Image
            src={family.image}
            alt={family.alt}
            fill
            preload
            sizes="100vw"
            className="cover-photo"
          />
        </div>
        <div className="technical-panel">
          <div>
            <span className="eyebrow">Votre projet industriel</span>
            <h2>{family.intro}</h2>
          </div>
          <div>
            <p>{family.description}</p>
            <Link
              href={"/contact?machine=" + encodeURIComponent(family.title)}
              className="button button-dark"
            >
              Demander un devis <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <section className="family-ranges">
          <h2>Les solutions à explorer</h2>
          <div>
            {family.ranges.map((range) => (
              <Link
                href={
                  "/contact?machine=" +
                  encodeURIComponent(family.title + " / " + range.name)
                }
                key={range.name}
                className="family-range"
              >
                <h3>
                  {range.name}
                  <ArrowUpRight size={19} />
                </h3>
                <p>{range.description}</p>
                <span>Parlons de cette solution</span>
              </Link>
            ))}
          </div>
        </section>
        {family.slug === "injection-plastique" && <InjectionLineup />}
        <div className="technical-panel">
          <h2>
            Votre projet,
            <br />
            notre accompagnement
          </h2>
          <div>
            <p>{family.needs}</p>
            <p>
              Représentant exclusif Shibaura Machine en France, nous vous
              accompagnons dans le choix de vos équipements et vous présentons
              une offre adaptée à votre production.
            </p>
            <a
              className="text-link"
              href={family.source}
              target="_blank"
              rel="noreferrer"
            >
              {family.sourceLabel}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <nav
          className="other-families"
          aria-label="Autres familles de machines"
        >
          {machineFamilies
            .filter((item) => item.slug !== slug)
            .map((item) => (
              <Link href={"/machines/familles/" + item.slug} key={item.slug}>
                {item.title}
                <ArrowUpRight size={17} />
              </Link>
            ))}
        </nav>
      </div>
      <CtaSection />
    </>
  );
}
