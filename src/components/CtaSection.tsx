import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
export default function CtaSection() {
  return (
    <section className="contact-band">
      <div className="shell">
        <Reveal className="contact-band-inner">
          <div>
            <span className="eyebrow">Votre prochain projet commence ici</span>
            <h2>
              Passons de l’idée
              <br />à la production.
            </h2>
          </div>
          <Link className="button button-light" href="/contact">
            Échangeons sur votre besoin <ArrowUpRight size={20} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
