import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Crédits photos | Azhar Plastics",
  description:
    "Sources et crédits des photographies présentées sur le site Azhar Plastics.",
};

export default function PhotoCredits() {
  return (
    <>
      <PageIntro
        eyebrow="Azhar Plastics"
        title="Crédits photos"
        description="Sources et crédits des photographies présentées sur le site."
      />
      <div className={`shell page-content ${s.credits}`}>
        <section aria-labelledby="credits-machines">
          <h2 id="credits-machines">Visuels machines</h2>
          <p>
            Visuels officiels des presses EC-SXIII et du robot TVM900 : Shibaura
            Machine. Source :{" "}
            <a href="https://shibaura-machine.com/k-2025-press/">
              K-2025 Media Hub
            </a>
            .
          </p>
        </section>
        <section aria-labelledby="credits-polymeres">
          <h2 id="credits-polymeres">Photographie des polymères</h2>
          <p>
            <a href="https://commons.wikimedia.org/wiki/File:Pellet_azul.jpg">
              Pellet azul
            </a>
            , par ISIPLAST S.A de C.V., via Wikimedia Commons.
          </p>
          <p>
            Licence{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">
              Creative Commons Attribution, partage dans les mêmes conditions
              4.0 International (CC BY-SA 4.0)
            </a>
            . La photographie est recadrée pour les différents formats d’écran.
          </p>
        </section>
      </div>
    </>
  );
}
