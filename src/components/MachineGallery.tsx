"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { machines } from "@/data/catalog";
import s from "./HomeExperience.module.css";
export default function MachineGallery() {
  const [selected, setSelected] = useState(0);
  const machine = machines[selected];
  return (
    <div className={s.gallery}>
      <div className={s.galleryToolbar}>
        <div
          className={s.galleryTabs}
          role="tablist"
          aria-label="Modèles Shibaura"
        >
          {machines.map((m, i) => (
            <button
              type="button"
              key={m.slug}
              role="tab"
              id={"tab-" + m.slug}
              aria-controls="machine-panel"
              aria-selected={selected === i}
              tabIndex={selected === i ? 0 : -1}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const next =
                    (selected +
                      (e.key === "ArrowRight" ? 1 : -1) +
                      machines.length) %
                    machines.length;
                  setSelected(next);
                  document
                    .getElementById("tab-" + machines[next].slug)
                    ?.focus();
                }
              }}
            >
              {m.name}
            </button>
          ))}
        </div>
        <span className={s.modelCounter}>Tout-électrique</span>
      </div>
      <div
        id="machine-panel"
        role="tabpanel"
        aria-labelledby={"tab-" + machine.slug}
        tabIndex={0}
        className={s.galleryPanel}
      >
        <div className={s.galleryCopy} key={machine.slug + "-copy"}>
          <span className="eyebrow">SHIBAURA MACHINE / {machine.size}</span>
          <h3>
            {machine.name}
            <span>
              La précision,
              <br />à votre échelle.
            </span>
          </h3>
          <p>{machine.description}</p>
          <div className={s.galleryTags}>
            <span>Tout-électrique</span>
            <span>INJECTVISOR-V70</span>
          </div>
          <Link
            href={"/machines/" + machine.slug}
            className="button button-dark"
          >
            Découvrir ce modèle <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className={s.galleryImage} key={machine.slug}>
          <Image
            src={machine.image}
            alt={machine.name + "  presse à injecter Shibaura Machine"}
            fill
            sizes="(max-width:900px) 90vw, 58vw"
            className={s.galleryMachine}
          />
          <span className={s.galleryImageLabel}>
            EC-SXIII / SHIBAURA MACHINE
          </span>
        </div>
      </div>
      <div className={s.galleryBottom}>
        <p>Votre équipement Shibaura, configuré pour votre production.</p>
        <div>
          <button
            type="button"
            aria-label="Modèle précédent"
            onClick={() =>
              setSelected((selected - 1 + machines.length) % machines.length)
            }
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Modèle suivant"
            onClick={() => setSelected((selected + 1) % machines.length)}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
