import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { machines, manufacturerSource } from "@/data/catalog";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import CtaSection from "@/components/CtaSection";
export function generateStaticParams() {
  return machines.map((m) => ({ slug: m.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = machines.find((x) => x.slug === slug);
  return {
    title: m
      ? m.name + " | Shibaura Machine France  Azhar Plastics"
      : "Machine non trouvée",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = machines.find((x) => x.slug === slug);
  if (!m) notFound();
  return (
    <>
      <section className="shell detail-section">
        <Link href="/machines" className="text-link">
          <ArrowLeft size={16} />
          Toutes les machines
        </Link>
        <div className="detail-grid">
          <div className="detail-image">
            <Image
              src={m.image}
              alt={m.name}
              fill
              preload
              sizes="(max-width:800px) 100vw, 60vw"
              className="machine-photo"
            />
          </div>
          <div>
            <span className="eyebrow">Shibaura Machine / {m.size}</span>
            <h1>{m.name}</h1>
            <p>{m.description}</p>
            <dl className="spec-list">
              <div>
                <dt>Gamme</dt>
                <dd>EC-SXIII</dd>
              </div>
              <div>
                <dt>Entraînement</dt>
                <dd>Tout-électrique</dd>
              </div>
              <div>
                <dt>Commande</dt>
                <dd>INJECTVISOR-V70</dd>
              </div>
              <div>
                <dt>Configuration</dt>
                <dd>Selon votre application</dd>
              </div>
            </dl>
            <Link
              className="button button-dark"
              href={"/contact?machine=" + m.name}
            >
              Demander un devis <ArrowUpRight size={18} />
            </Link>
            <a
              className="source-link"
              href={manufacturerSource}
              target="_blank"
              rel="noreferrer"
            >
              Découvrir la gamme EC-SXIII ↗
            </a>
          </div>
        </div>
        <div className="technical-panel">
          <h2>
            Le bon équipement
            <br />
            se définit avec votre procédé.
          </h2>
          <p>
            Communiquez les dimensions de votre moule, le poids de la pièce, le
            polymère utilisé et la cadence visée. Notre équipe définit avec vous
            la presse, l’unité d’injection et les options pour votre production.
          </p>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
