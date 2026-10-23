export const contactEmail = "contact@azharplastics.com";

export function buildContactEmail(data: FormData, kind: string) {
  const field = (name: string) => {
    const value = data.get(name);
    return typeof value === "string" ? value : "";
  };
  const body = [
    "Nom : " + field("name"),
    "Entreprise : " + field("company"),
    "Email : " + field("email"),
    "Téléphone : " + field("phone"),
    "Besoin : " +
      (kind === "matiere" ? "Matière première" : "Machine Shibaura"),
    "Référence : " + field("reference"),
    "",
    field("message"),
  ].join("\n");
  return (
    "mailto:" +
    contactEmail +
    "?subject=" +
    encodeURIComponent("Projet plasturgie  " + field("company")) +
    "&body=" +
    encodeURIComponent(body)
  );
}
