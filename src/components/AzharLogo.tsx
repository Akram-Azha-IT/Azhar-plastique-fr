import Link from "next/link";
export default function AzharLogo({
  className = "",
  withTagline = true,
}: {
  className?: string;
  withTagline?: boolean;
}) {
  return (
    <Link
      href="/"
      className={"brand " + className}
      aria-label="Azhar Plastics  Accueil"
    >
      <span className="brand-name">azhar</span>
      <span className="brand-meta">
        PLASTICS{withTagline && <small>Machines & matières</small>}
      </span>
    </Link>
  );
}
