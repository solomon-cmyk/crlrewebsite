export const NAV_LINKS = [
  { href: "#marave", label: "Maravé" },
  { href: "#collections", label: "Residences" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reserve", label: "Reserve" },
  { href: "#listings", label: "Listings" },
  { href: "#contact", label: "Contact" },
] as const;

export const MARQUEE_ITEMS = [
  {
    src: "https://www.maraveresidences.com/Marave%20Final%20Renders/Villa/H_OC_Exterior_18_Villas_Pool.jpg",
    alt: "Maravé villa with plunge pool",
    label: "Villa · Plunge Pool",
  },
  {
    src: "https://www.maraveresidences.com/Marave%20Final%20Renders/Condo%20A/H_OC_Interior_CondoA_Living_Day.jpg",
    alt: "Maravé condominium living",
    label: "Condominium · Living",
  },
  {
    src: "https://www.maraveresidences.com/Marave%20Final%20Renders/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_14_Villas%20Day_b.jpg",
    alt: "Maravé villas exterior",
    label: "The Villas",
  },
  {
    src: "https://www.maraveresidences.com/Marave%20Final%20Renders/Condo%20F/H_OC_Interior_CondoF_Balcony.jpg",
    alt: "Maravé penthouse balcony",
    label: "Penthouse · Balcony",
  },
  {
    src: "https://www.maraveresidences.com/Marave%20Final%20Renders/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_05_Beach_Club_Pool_V1_06-2.jpg",
    alt: "Maravé beach club",
    label: "Beach Club",
  },
  {
    src: "https://www.maraveresidences.com/Marave%20Final%20Renders/Exterior%20Shots%20and%20Beach%20Hero/LXR%20Beach%20Image.webp",
    alt: "Maravé Pacific beachfront",
    label: "Pacific Beachfront",
  },
] as const;

export const MARAVE_STATS = [
  { value: "116", label: "Branded Residences" },
  { value: "40", label: "Acres of Land" },
  { value: "650 ft", label: "Pacific Beachfront" },
  { value: "LXR", label: "Hotels & Resorts" },
] as const;

export const PLACE_POINTS = [
  { title: "A beloved national park", detail: "Among the most visited in Costa Rica" },
  { title: "Rainforest meets the sea", detail: "Jungle canopy over Pacific coves" },
  { title: "Extraordinary wildlife", detail: "Sloths, monkeys, toucans & macaws" },
  { title: "Easy to reach", detail: "Minutes from Quepos & its airport" },
] as const;

export const COLLECTIONS = [
  {
    num: "I",
    kind: "46 Residences",
    title: "Condominiums",
    image:
      "https://www.maraveresidences.com/Marave%20Final%20Renders/Condo%20A/H_OC_Interior_CondoA_Living_Day.jpg",
    alt: "Maravé condominium",
    specs: [
      { label: "1 to 3", suffix: " bed" },
      { label: "1,400+", suffix: " sq ft" },
      { label: "Rooftop pool", suffix: "" },
    ],
    price: "$1,000,000 to $1,700,000",
  },
  {
    num: "II",
    kind: "66 Estates",
    title: "The Villas",
    image:
      "https://www.maraveresidences.com/Marave%20Final%20Renders/Villa/H_OC_Exterior_18_Villas_Pool.jpg",
    alt: "Maravé villa",
    specs: [
      { label: "4,000+", suffix: " sq ft" },
      { label: "Private plunge pool", suffix: "" },
      { label: "Mass timber", suffix: "" },
    ],
    price: "$1,950,000 to $3,250,000",
  },
  {
    num: "III",
    kind: "Only 4 Available",
    title: "Penthouses",
    image:
      "https://www.maraveresidences.com/Marave%20Final%20Renders/Condo%20F/H_OC_Interior_CondoF_Balcony.jpg",
    alt: "Maravé penthouse",
    specs: [
      { label: "4,000+", suffix: " sq ft" },
      { label: "Rooftop terrace", suffix: "" },
      { label: "Panoramic", suffix: "" },
    ],
    price: "$3,500,000 to $5,500,000",
  },
] as const;

export const FINISHES = [
  {
    title: "Interior",
    items: [
      "Stone marble flooring throughout",
      "Custom millwork in primary suites",
      "Integrated smart-home controls",
      "Pre-wired high-speed connectivity",
    ],
  },
  {
    title: "Kitchen & Bath",
    items: [
      "Premium appliance package",
      "Stone marble countertops",
      "Rainfall shower systems",
      "Freestanding soaking tubs (select)",
      "Dual vanities, backlit mirrors",
    ],
  },
  {
    title: "Exterior & Structure",
    items: [
      "Slip-resistant marble terraces",
      "Private plunge pool at every villa",
      "Generous condo & penthouse balconies",
      "Individually landscaped arrival court",
      "Mass-timber villa construction",
    ],
  },
] as const;

export type GalleryItem = {
  href: string;
  src: string;
  alt: string;
  label: string;
  wide?: boolean;
  tall?: boolean;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    href: "https://www.maraveresidences.com/Marave%20Final%20Renders/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_17_Aerial_03.jpg",
    src: "https://www.maraveresidences.com/Marave%20Final%20Renders/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_17_Aerial_03.jpg",
    alt: "Aerial estate",
    label: "Aerial Estate",
    wide: true,
    tall: true,
  },
  {
    href: "https://www.maraveresidences.com/Marave%20Final%20Renders/Condo%20A/H_OC_Interior_CondoA_Living_Day.jpg",
    src: "https://www.maraveresidences.com/Marave%20Final%20Renders/Condo%20A/H_OC_Interior_CondoA_Living_Day.jpg",
    alt: "Condominium living",
    label: "Condo · Living",
  },
  {
    href: "https://www.maraveresidences.com/Marave%20Final%20Renders/Condo%20F/H_OC_Interior_CondoF_Balcony.jpg",
    src: "https://www.maraveresidences.com/Marave%20Final%20Renders/Condo%20F/H_OC_Interior_CondoF_Balcony.jpg",
    alt: "Penthouse balcony",
    label: "Penthouse · Balcony",
  },
  {
    href: "https://www.maraveresidences.com/Marave%20Final%20Renders/Villa/H_OC_Exterior_18_Villas_Pool.jpg",
    src: "https://www.maraveresidences.com/Marave%20Final%20Renders/Villa/H_OC_Exterior_18_Villas_Pool.jpg",
    alt: "Villa plunge pool",
    label: "Villa · Plunge Pool",
    wide: true,
  },
  {
    href: "https://www.maraveresidences.com/Marave%20Final%20Renders/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_05_Beach_Club_Pool_V1_06-2.jpg",
    src: "https://www.maraveresidences.com/Marave%20Final%20Renders/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_05_Beach_Club_Pool_V1_06-2.jpg",
    alt: "Beach club",
    label: "Beach Club",
  },
  {
    href: "https://www.maraveresidences.com/Marave%20Final%20Renders/Exterior%20Shots%20and%20Beach%20Hero/LXR%20Beach%20Image.webp",
    src: "https://www.maraveresidences.com/Marave%20Final%20Renders/Exterior%20Shots%20and%20Beach%20Hero/LXR%20Beach%20Image.webp",
    alt: "Pacific beachfront",
    label: "Pacific Beachfront",
    wide: true,
  },
  {
    href: "https://www.maraveresidences.com/Marave%20Final%20Renders/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_14_Villas%20Day_b.jpg",
    src: "https://www.maraveresidences.com/Marave%20Final%20Renders/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_14_Villas%20Day_b.jpg",
    alt: "Villas by day",
    label: "The Villas",
  },
  {
    href: "https://www.maraveresidences.com/Marave%20Final%20Renders/Extra%20Images/Manuel%20Antonio%20Park.jpg",
    src: "https://www.maraveresidences.com/Marave%20Final%20Renders/Extra%20Images/Manuel%20Antonio%20Park.jpg",
    alt: "Manuel Antonio National Park",
    label: "National Park",
  },
];

export const RESERVE_STEPS = [
  {
    title: "Reserve your unit",
    body: "A $10,000 reservation deposit locks your chosen residence at today's pre-construction price.",
  },
  {
    title: "Receive the documents",
    body: "The full package: Sales & Purchase Agreement and all project documentation.",
  },
  {
    title: "Review & due diligence",
    body: "Approximately 30 days to review everything with your advisors, at your pace.",
  },
  {
    title: "Escrow on execution",
    body: "A 20% deposit goes into escrow, held securely until groundbreaking.",
  },
] as const;

export const OWNERSHIP_INCLUDES = [
  "Hilton Honors Diamond Status for ownership",
  "Optional Hilton-managed guest services",
  "Operated & managed by Remington Hospitality",
  "Hilton as the HOA management company",
  "Full LXR branding, standards & five-star furnishing",
] as const;

export const LISTINGS = [
  {
    href: "https://crlre.com/properties/",
    tag: "Estate",
    image: "https://crlre.com/wp-content/uploads/jasmine20.jpg",
    alt: "Casa Jasmine",
    location: "La Reserva · Manuel Antonio",
    title: "Casa Jasmine",
    price: "$3,550,000",
    specs: [
      { label: "8", suffix: " beds" },
      { label: "8.5", suffix: " baths" },
      { label: "930", suffix: " m²" },
    ],
  },
  {
    href: "https://crlre.com/properties/casa-manuel-antonio-under-construction-now/",
    tag: "New Build",
    image: "https://crlre.com/wp-content/uploads/MA41.png",
    alt: "Casa Manuel Antonio",
    location: "Manuel Antonio · Puntarenas",
    title: "Casa Manuel Antonio",
    price: "$9,500,000",
    specs: [
      { label: "11", suffix: " beds" },
      { label: "13", suffix: " baths" },
      { label: "15k+", suffix: " m²" },
    ],
  },
  {
    href: "https://crlre.com/properties/casa-vista-royal-luxury-villa-uvita-costa-rica/",
    tag: "Ocean View",
    image: "https://crlre.com/wp-content/uploads/VISTA-ROYAL-109-e1749845678253.jpg",
    alt: "Casa Vista Royal",
    location: "Uvita · Puntarenas",
    title: "Casa Vista Royal",
    price: "$3,250,000",
    specs: [
      { label: "6", suffix: " beds" },
      { label: "6", suffix: " baths" },
      { label: "10k", suffix: " m²" },
    ],
  },
  {
    href: "https://crlre.com/properties/brisas-del-golfo/",
    tag: "Private Home",
    image: "https://crlre.com/wp-content/uploads/Brisas_Del_Golfo_021.jpg",
    alt: "Casa Mel",
    location: "Palma Quemada · Matapalo",
    title: "Casa Mel",
    price: "$1,490,000",
    specs: [
      { label: "6", suffix: " beds" },
      { label: "6", suffix: " baths" },
      { label: "5k", suffix: " m²" },
    ],
  },
  {
    href: "https://crlre.com/properties/new-construction-gorgeous-tropical-home-in-exclusive-gated-community/",
    tag: "New Build",
    image: "https://crlre.com/wp-content/uploads/Casa-Blanca-Color.jpg",
    alt: "Casa Blanca",
    location: "Matapalo · Puntarenas",
    title: "Casa Blanca",
    price: "$1,295,000",
    specs: [
      { label: "5", suffix: " beds" },
      { label: "5", suffix: " baths" },
      { label: "5k", suffix: " m²" },
    ],
  },
  {
    href: "https://crlre.com/properties/casa-cielo-contemporary-home-plus-adjacent-lot-with-caretakers-house-for-sale-in-manuel-antonio-mls-7vr101/",
    tag: "Contemporary",
    image: "https://crlre.com/wp-content/uploads/transitional-1692243971.59889.jpg",
    alt: "Casa Cielo",
    location: "Manuel Antonio · Puntarenas",
    title: "Casa Cielo",
    price: "$729,000",
    specs: [
      { label: "6", suffix: " beds" },
      { label: "6", suffix: " baths" },
      { label: "7k", suffix: " sqft" },
    ],
  },
] as const;

export const TEAM = [
  {
    href: "https://crlre.com/agents/mark-dalton-2/",
    image: "https://crlre.com/wp-content/uploads/MARK.png",
    name: "Mark Dalton",
    role: "Founder · Developer",
    bio: "Owner of Costa Rica Luxury Real Estate and developer of Maravé, with 35+ years in real estate.",
  },
  {
    href: "https://crlre.com/agents/gladis-b-galindo-2/",
    image: "https://crlre.com/wp-content/uploads/GLADIS.png",
    name: "Gladis B. Galindo",
    role: "Advisor · Attorney",
    bio: "A registered lawyer based in Costa Rica, with deep knowledge of property and administrative law.",
  },
] as const;

export const FOOTER_DISCLAIMER =
  'Pricing, square footage, projected values, and availability are estimates provided for informational purposes only, are subject to change, and are not a guarantee of future value or investment return. Renderings are artist\'s impressions. This is not an offer to sell or a solicitation to buy where prohibited. "LXR Hotels & Resorts" is a registered trademark of an affiliate of Hilton Worldwide Holdings Inc. ("Hilton"). The residences described herein are not owned, developed, or sold by Hilton, and Hilton makes no representations or warranties with respect to the residences. The developer uses the LXR brand under a limited, non-exclusive, non-transferable license that may be terminated or expire without renewal.';

export const COLLECTION_OPTIONS = [
  "No preference yet",
  "Condominium ($1M to $1.7M)",
  "Villa ($1.95M to $3.25M)",
  "Penthouse ($3.5M to $5.5M)",
  "CRLRE listing (not Maravé)",
] as const;
