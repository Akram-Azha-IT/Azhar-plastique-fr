import IndustrialPage from "@/components/IndustrialPage";
import MachineCatalog from "@/components/MachineCatalog";
export const metadata = {
  title: "Catalogue machines Shibaura | Azhar Plastics France",
  description:
    "Choisissez une famille Shibaura, trouvez votre modèle et demandez un devis directement. Injection, fonderie, usinage et robotique.",
};
export default function Page() {
  return (
    <IndustrialPage
      theme="machines"
      eyebrow="Catalogue Shibaura Machine"
      title="Trouvez votre solution"
      accent="industrielle."
      description="Choisissez une famille, explorez les modèles et demandez un devis directement."
      image="/images/shibaura-injection.jpg"
      position="65% 50%"
      mobilePosition="62% 50%"
      caption="Au cœur du procédé d’injection"
      action="Parcourir le catalogue"
      contentId="catalogue-machines"
    >
      <div className="shell page-content">
        <MachineCatalog />
      </div>
    </IndustrialPage>
  );
}
