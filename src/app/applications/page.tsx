import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sectors } from "@/data/catalog";
import IndustrialPage from "@/components/IndustrialPage";
import CtaSection from "@/components/CtaSection";
export const metadata = {
  title: "Applications en plasturgie | Azhar Plastics France",
};
export default function Page() {
  return (
    <IndustrialPage
      theme="applications"
      eyebrow="Applications industrielles"
      title="Vos contraintes"
      accent="guident nos solutions."
      description="Le choix d’une machine et d’une matière doit répondre à une application concrète. Nous vous aidons à formuler le besoin technique avant de sélectionner une solution."
      image="/images/application-automotive-factory.jpg"
      position="68% 50%"
      mobilePosition="52% 50%"
      caption="Des solutions ancrées dans la production"
      action="Explorer les applications"
      contentId="univers-applications"
    >
      <div className="shell page-content">
        {sectors.map((s, i) => (
          <section id={"secteur-" + i} className="application-row" key={s.name}>
            <div className="application-image">
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                sizes="(max-width:800px) 100vw, 50vw"
                className="cover-photo"
                style={{ objectPosition: s.imagePosition }}
              />
            </div>
            <div>
              <span className="eyebrow">Application industrielle</span>
              <h2>{s.name}</h2>
              <p>{s.text}</p>
              <p>
                Partagez la géométrie de votre pièce, vos contraintes matière et
                vos objectifs de production. Notre équipe vous accompagne dans
                le choix des machines et des matières pour votre application.
              </p>
              <Link className="text-link" href="/contact">
                Parlons de votre application <ArrowUpRight size={18} />
              </Link>
            </div>
          </section>
        ))}
      </div>
      <CtaSection />
    </IndustrialPage>
  );
}
