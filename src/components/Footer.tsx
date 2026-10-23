import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AzharLogo from "./AzharLogo";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <AzharLogo />
            <p>
              La technologie japonaise.
              <br />
              L’ambition industrielle française.
            </p>
          </div>
          <div>
            <span className="eyebrow">Explorer</span>
            <Link href="/machines">Machines Shibaura</Link>
            <Link href="/matieres-premieres">Matières premières</Link>
            <Link href="/applications">Applications</Link>
          </div>
          <div>
            <span className="eyebrow">Échanger</span>
            <Link href="/contact">
              Présenter votre projet <ArrowUpRight size={16} />
            </Link>
            <a
              href="mailto:contact@azharplastics.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              contact@azharplastics.com
            </a>
            <Link href="/expertise">Notre approche</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Azhar Plastics</span>
          <span>Représentant exclusif Shibaura Machine en France</span>
          <Link href="/contact#confidentialite">Confidentialité</Link>
          <Link href="/credits-photos">Crédits photos</Link>
        </div>
      </div>
    </footer>
  );
}
