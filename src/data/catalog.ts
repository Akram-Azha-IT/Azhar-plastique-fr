export const manufacturerSource =
  "https://www.shibaura-machine.co.jp/en/product/shashutsu/lineup/ecsx3/";
export const machines = [
  {
    slug: "ec230sxiii",
    name: "EC230SXIII",
    size: "Moyen tonnage",
    image: "/images/ec230sx3.jpg",
    description:
      "Une presse tout-électrique pour vos projets d’injection de pièces techniques, d’emballages et de biens de consommation.",
  },
  {
    slug: "ec650sxiii",
    name: "EC650SXIII",
    size: "Grand tonnage",
    image: "/images/ec650sx3.jpg",
    description:
      "Une presse tout-électrique de la gamme EC-SXIII pour la production de pièces de grandes dimensions.",
  },
];
export const materialGroups = [
  {
    id: "commodite",
    label: "Matières de commodité",
    shortLabel: "Commodité",
    description:
      "Les familles essentielles pour vos besoins de transformation.",
  },
  {
    id: "plastiques-techniques",
    label: "Matières techniques",
    shortLabel: "Techniques",
    description:
      "Des polymères techniques pour les exigences de vos applications industrielles.",
  },
] as const;

type Material = {
  id: string;
  category: (typeof materialGroups)[number]["id"];
  code: string;
  name: string;
  types?: string;
  description?: string;
  uses?: string;
};

export const materials: Material[] = [
  {
    id: "polyethylene",
    category: "commodite",
    code: "PE",
    name: "Polyéthylène",
    types: "PEHD, PEBD, PEBDL",
    description:
      "Des solutions pour le soufflage, l’extrusion et l’injection. Le grade se choisit selon la rigidité, la fluidité et l’usage de la pièce.",
    uses: "Films, contenants, pièces injectées",
  },
  {
    id: "polypropylene",
    category: "commodite",
    code: "PP",
    name: "Polypropylène",
    types: "Homopolymère, copolymère, random",
    description:
      "Du choix du grade à vos besoins d’approvisionnement, nous vous accompagnons dans vos applications en polypropylène.",
    uses: "Emballages, pièces techniques, biens de consommation",
  },
  {
    id: "pet",
    category: "commodite",
    code: "PET",
    name: "Polyéthylène téréphtalate",
    types: "Grades selon application",
    description:
      "Des résines pour les projets d’emballage et de transformation exigeant transparence et tenue mécanique, selon le grade retenu.",
    uses: "Préformes, bouteilles, emballages",
  },
  {
    id: "pvc",
    category: "commodite",
    code: "PVC",
    name: "Polychlorure de vinyle",
    types: "Grades selon application",
    description:
      "Des grades de PVC pour vos procédés de transformation, sélectionnés en fonction de l’usage final et des propriétés attendues.",
  },
  {
    id: "pa6-pa66",
    category: "plastiques-techniques",
    code: "PA6 / PA66",
    name: "Polyamides",
  },
  {
    id: "pps-ppa",
    category: "plastiques-techniques",
    code: "PPS / PPA",
    name: "PPS et PPA",
  },
  {
    id: "pbt-pet",
    category: "plastiques-techniques",
    code: "PBT / PET",
    name: "Polyesters techniques",
  },
  {
    id: "abs",
    category: "plastiques-techniques",
    code: "ABS",
    name: "Acrylonitrile butadiène styrène",
  },
  {
    id: "pc-abs",
    category: "plastiques-techniques",
    code: "PC / ABS",
    name: "Polycarbonate et ABS",
  },
  {
    id: "gpps",
    category: "plastiques-techniques",
    code: "GPPS",
    name: "Polystyrène cristal",
  },
  {
    id: "hips",
    category: "plastiques-techniques",
    code: "HIPS",
    name: "Polystyrène choc",
  },
  {
    id: "san",
    category: "plastiques-techniques",
    code: "SAN",
    name: "Styrène acrylonitrile",
  },
  {
    id: "tpv",
    category: "plastiques-techniques",
    code: "TPV",
    name: "Thermoplastiques vulcanisés",
  },
];
export const sectors = [
  {
    name: "Automobile & mobilité",
    image: "/images/application-automotive-factory.jpg",
    imageAlt:
      "Robots assemblant une carrosserie sur une chaîne de production automobile",
    imagePosition: "50% 52%",
    text: "Pièces techniques, composants fonctionnels et exigences de répétabilité.",
  },
  {
    name: "Emballage & consommation",
    image: "/images/application-packaging-line.jpg",
    imageAlt:
      "Bouteille en plastique sur un convoyeur de conditionnement en usine",
    imagePosition: "40% 48%",
    text: "Choix du procédé et de la matière selon la géométrie, l’usage et les cadences visées.",
  },
  {
    name: "Industrie & pièces techniques",
    image: "/images/application-components-factory.jpg",
    imageAlt: "Outil de fraisage usinant une pièce métallique en atelier",
    imagePosition: "48% 65%",
    text: "Des projets soumis à des contraintes mécaniques, thermiques et dimensionnelles.",
  },
];
