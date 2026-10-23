export const machineFamilies = [
  {
    slug: "injection-plastique",
    title: "Injection plastique",
    shortTitle: "Injection",
    image: "/images/shibaura-injection.jpg",
    alt: "Outillage d’injection plastique Shibaura Machine",
    intro: "Transformer le polymère en pièce finie.",
    description:
      "Des presses à injecter tout-électriques pour la production de pièces techniques, d’emballages et de biens de consommation.",
    source: "https://shibaura-machine.com/injection-molding-machines/",
    sourceLabel: "Gamme injection Shibaura Machine",
    ranges: [
      {
        name: "Presses tout-électriques EC-SXIII",
        description:
          "Une gamme couvrant plusieurs formats de production. Le modèle et l’unité d’injection se définissent selon la pièce, la matière et le moule.",
      },
      {
        name: "Commande INJECTVISOR-V70",
        description:
          "Une interface de pilotage pour le réglage et le suivi du procédé d’injection.",
      },
    ],
    needs:
      "Matière utilisée, poids et géométrie de la pièce, dimensions du moule et cadence visée.",
  },
  {
    slug: "fonderie-sous-pression",
    title: "Fonderie sous pression",
    shortTitle: "Fonderie",
    image: "/images/shibaura-die-casting.jpg",
    alt: "Équipement de fonderie sous pression Shibaura Machine",
    intro: "Donner forme aux alliages métalliques.",
    description:
      "Des machines de fonderie sous pression à chambre froide pour les projets de pièces en aluminium et en magnésium.",
    source: "https://shibaura-machine.com/die-casting-machines/",
    sourceLabel: "Gamme fonderie Shibaura Machine",
    ranges: [
      {
        name: "Petits formats",
        description:
          "Des presses de fonderie sous pression pour la production de pièces de dimensions réduites.",
      },
      {
        name: "Formats intermédiaires",
        description:
          "Des presses configurées pour votre pièce, votre alliage et vos conditions de production.",
      },
      {
        name: "Grands formats",
        description:
          "Des solutions pour les projets nécessitant une capacité de fermeture et un volume d’injection plus importants.",
      },
      {
        name: "Série E",
        description:
          "Les machines de fonderie sous pression de la série E pour vos applications industrielles.",
      },
    ],
    needs:
      "Alliage, dimensions et masse de la pièce, empreintes, outillage et cadence attendue.",
  },
  {
    slug: "machines-outils",
    title: "Machines-outils",
    shortTitle: "Usinage",
    image: "/images/shibaura-machine-tools.jpg",
    alt: "Opération d’usinage sur machine-outil Shibaura Machine",
    intro: "L’exigence de précision, dans la matière.",
    description:
      "Alésage, tournage et centres d’usinage : les technologies Shibaura Machine pour vos pièces et vos outillages de précision.",
    source: "https://shibaura-machine.com/machine-tools/",
    sourceLabel: "Gamme machines-outils Shibaura Machine",
    ranges: [
      {
        name: "Aléseuses horizontales",
        description:
          "Des aléseuses horizontales pour l’alésage et l’usinage de vos pièces industrielles.",
      },
      {
        name: "Tours et aléseuses verticaux",
        description:
          "Une architecture verticale pour vos opérations de tournage et d’alésage.",
      },
      {
        name: "Centres d’usinage à portique",
        description:
          "Des architectures à double colonne pour les projets de pièces et d’outillages de grandes dimensions.",
      },
      {
        name: "Centres d’usinage horizontaux",
        description:
          "Des centres d’usinage horizontaux pour les opérations et l’organisation de votre production.",
      },
      {
        name: "Centres d’usinage de haute précision",
        description:
          "Une gamme destinée aux applications d’usinage aux exigences de précision élevées.",
      },
    ],
    needs:
      "Plan de pièce, matière, dimensions, opérations, tolérances et organisation de la production.",
  },
  {
    slug: "robotique-industrielle",
    title: "Robotique industrielle",
    shortTitle: "Robotique",
    image: "/images/shibaura-robotics.jpg",
    alt: "Robot industriel Shibaura Machine TV800 en application",
    intro: "Le geste juste, au cœur de votre ligne.",
    description:
      "Robots SCARA, polyarticulés et cartésiens pour la manipulation de pièces et l’automatisation de votre atelier.",
    source: "https://www.tmrobotics.com/",
    sourceLabel: "Robotique Shibaura Machine avec TM Robotics",
    ranges: [
      {
        name: "Robots SCARA",
        description:
          "Des robots SCARA pour vos opérations de manipulation et d’assemblage.",
      },
      {
        name: "Robots à six axes",
        description:
          "Une architecture polyarticulée pour les tâches nécessitant une liberté d’orientation du mouvement.",
      },
      {
        name: "Robots cartésiens",
        description:
          "Des robots à mouvements linéaires pour le transfert et la manipulation de vos pièces.",
      },
    ],
    needs:
      "Tâche à automatiser, charge utile, portée, trajectoire, temps de cycle et interfaces de la ligne.",
  },
];

// Nomenclature reprise du tableau LINE UP du constructeur, sans inventer de spécifications.
// EC30 appartient à la génération SXII ; il ne doit pas être présenté comme un SXIII.
export const injectionLineupSource =
  "https://www.shibaura-machine.co.jp/en/product/shashutsu/lineup/ecsx3/";
export const injectionModelGroups = [
  {
    label: "Formats compacts",
    models: ["EC30SXII", "EC50SXIII", "EC75SXIII", "EC100SXIII"],
  },
  {
    label: "Formats intermédiaires",
    models: [
      "EC130SXIII",
      "EC180SXIII",
      "EC230SXIII",
      "EC280SXIII",
      "EC350SXIII",
    ],
  },
  {
    label: "Grands formats",
    models: [
      "EC450SXIII",
      "EC550SXIII",
      "EC650SXIII",
      "EC850SXIII",
      "EC1000SXIII",
      "EC1300SXIII",
    ],
  },
  {
    label: "Très grands formats",
    models: [
      "EC1300SXIIIW",
      "EC1600SXIII",
      "EC1600SXIIIW",
      "EC1800SXIII",
      "EC2500SXIII",
      "EC3000SXIII",
    ],
  },
];
