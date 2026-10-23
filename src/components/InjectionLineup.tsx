import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  injectionModelGroups,
  injectionLineupSource,
} from "@/data/machineFamilies";
import { machines } from "@/data/catalog";
export default function InjectionLineup() {
  return (
    <section className="injection-lineup" id="gamme-injection">
      <div className="lineup-heading">
        <div>
          <span className="eyebrow">La gamme injection Shibaura Machine</span>
          <h2>
            Du format compact
            <br />
            aux grandes pièces.
          </h2>
        </div>
        <p>
          Découvrez les presses à injecter de la gamme EC et trouvez le modèle
          pour votre production. Notre équipe vous accompagne dans le choix de
          la presse et de ses options.
        </p>
      </div>
      <div className="lineup-groups">
        {injectionModelGroups.map((group) => (
          <div key={group.label} className="lineup-group">
            <h3>{group.label}</h3>
            <div>
              {group.models.map((model) => {
                const detail = machines.find(
                  (machine) => machine.name === model,
                );
                return (
                  <Link
                    key={model}
                    href={
                      detail
                        ? "/machines/" + detail.slug
                        : "/contact?machine=" + encodeURIComponent(model)
                    }
                    aria-label={
                      model +
                      (detail ? ", consulter la fiche" : ", demander un devis")
                    }
                  >
                    {model}
                    <ArrowUpRight size={15} />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="lineup-source">
        <p>
          EC30SXII appartient à la génération SXII. Les autres références
          présentées appartiennent à la série SXIII. Contactez notre équipe pour
          votre configuration et les conditions de fourniture.
        </p>
        <a
          className="text-link"
          href={injectionLineupSource}
          target="_blank"
          rel="noreferrer"
        >
          Découvrir la gamme Shibaura <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
