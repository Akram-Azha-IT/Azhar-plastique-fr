export const heroSlides = [
  {
    id: "injection",
    nav: "Injection",
    label: "Presses à injecter Shibaura Machine",
    title: "Injection",
    accent: "tout-électrique.",
    description:
      "La gamme EC-SXIII associe motorisation tout-électrique et précision de moulage pour vos pièces techniques, emballages et biens de consommation.",
    details: [
      { label: "À l’image", value: "EC3000SXIII, gamme EC-SXIII" },
      {
        label: "Votre projet",
        value: "Du choix de la presse à son équipement",
      },
    ],
    image: "/images/hero-injection-hd.jpg",
    visual: "machine",
    position: "60% 58%",
    mobilePosition: "63% 43%",
    href: "/machines?famille=injection-plastique",
    action: "Découvrir les presses à injecter",
  },
  {
    id: "robotique",
    nav: "Robotique",
    label: "Robots industriels Shibaura Machine",
    title: "Automatiser",
    accent: "vos opérations.",
    description:
      "Des robots SCARA, articulés et cartésiens pour la manutention, l’assemblage et le chargement de vos équipements.",
    details: [
      { label: "À l’image", value: "TVM900, robot articulé" },
      { label: "Applications", value: "Manipulation, assemblage, chargement" },
    ],
    image: "/images/hero-robotics-hd.png",
    visual: "robot",
    position: "90% 50%",
    mobilePosition: "100% 10%",
    href: "/machines?famille=robotique-industrielle",
    action: "Découvrir les robots industriels",
  },
  {
    id: "polymere",
    nav: "Matières",
    label: "Matières premières pour la plasturgie",
    title: "Polymères",
    accent: "pour vos pièces.",
    description:
      "Des matières de commodité aux polymères techniques, nous sélectionnons avec vous les grades adaptés à votre procédé et aux exigences de vos pièces.",
    details: [
      { label: "Commodité", value: "PE, PP, PET, PVC" },
      {
        label: "Techniques",
        value: "PA6 / PA66, ABS, PC / ABS et autres familles",
      },
    ],
    image: "/images/hero-polymers-hd.jpg",
    visual: "material",
    position: "55% 50%",
    mobilePosition: "60% 45%",
    href: "/matieres-premieres",
    action: "Parcourir les matières premières",
  },
] as const;
