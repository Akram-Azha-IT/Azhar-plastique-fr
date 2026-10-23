import IndustrialPage from "@/components/IndustrialPage";
import CtaSection from "@/components/CtaSection";
import ApproachExplorer from "@/components/ApproachExplorer";
import ExpertisePositioning from "@/components/ExpertisePositioning";
export const metadata = {
  title: "Représentant exclusif Shibaura Machine en France | Azhar Plastics",
};
export default function Page() {
  return (
    <IndustrialPage
      theme="expertise"
      eyebrow="L’expertise Azhar Plastics"
      title="Un interlocuteur"
      accent="pour voir plus loin."
      description="Représentant exclusif de Shibaura Machine en France, nous réunissons machines industrielles et matières premières pour accompagner votre production."
      image="/images/factory_tech.jpg"
      position="70% 48%"
      mobilePosition="60% 48%"
      caption="Comprendre le procédé pour guider le choix"
      action="Découvrir notre approche"
      contentId="approche-azhar"
    >
      <div className="shell page-content">
        <ExpertisePositioning />
        <ApproachExplorer />
      </div>
      <CtaSection />
    </IndustrialPage>
  );
}
