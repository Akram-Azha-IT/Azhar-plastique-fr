import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import s from "./IndustrialPage.module.css";

type Props = {
  theme: "machines" | "applications" | "expertise";
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  position: string;
  mobilePosition: string;
  caption: string;
  action: string;
  contentId: string;
  children: ReactNode;
};

export default function IndustrialPage({
  theme,
  eyebrow,
  title,
  accent,
  description,
  image,
  position,
  mobilePosition,
  caption,
  action,
  contentId,
  children,
}: Props) {
  const style = {
    "--hero-focal": position,
    "--hero-mobile-focal": mobilePosition,
  } as CSSProperties;
  return (
    <div className={s.page} data-theme={theme} style={style}>
      <section className={s.hero} aria-labelledby={theme + "-hero-title"}>
        <div className={s.heroMedia} data-flow-image>
          <Image
            src={image}
            alt=""
            fill
            preload
            sizes="100vw"
            className={s.heroImage}
          />
        </div>
        <div className={s.heroVeil} />
        <div className={`shell ${s.heroInner}`}>
          <div className={s.heroCopy}>
            <span className="eyebrow">{eyebrow}</span>
            <h1 id={theme + "-hero-title"}>
              {title} <span>{accent}</span>
            </h1>
            <p>{description}</p>
            <a href={"#" + contentId} className={s.heroAction}>
              {action} <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
          <span className={s.caption}>{caption}</span>
        </div>
      </section>
      <div className={s.field} id={contentId}>
        {children}
      </div>
    </div>
  );
}
