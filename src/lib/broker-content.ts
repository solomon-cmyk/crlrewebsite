export const NAV_LINKS = [
  { href: "/#marave", label: "Maravé" },
  { href: "/#collections", label: "Residences" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#reserve", label: "Reserve" },
  { href: "/listings", label: "Listings" },
  { href: "/#contact", label: "Contact" },
] as const;

export const MARQUEE_ITEMS = [
  {
    src: "/media/marave/images/villa-pool.webp",
    alt: "Maravé villa with plunge pool",
    label: "Villa · Plunge Pool",
  },
  {
    src: "/media/marave/images/condo-a-living.webp",
    alt: "Maravé condominium living",
    label: "Condominium · Living",
  },
  {
    src: "/media/marave/images/villas-day.webp",
    alt: "Maravé villas exterior",
    label: "The Villas",
  },
  {
    src: "/media/marave/images/penthouse-balcony.webp",
    alt: "Maravé penthouse balcony",
    label: "Penthouse · Balcony",
  },
  {
    src: "/media/marave/images/beach-club-pool.webp",
    alt: "Maravé beach club",
    label: "Beach Club",
  },
  {
    src: "/media/marave/images/lxr-beach.webp",
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
      "/media/marave/images/condo-a-living.webp",
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
      "/media/marave/images/villa-pool.webp",
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
      "/media/marave/images/penthouse-balcony.webp",
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
  hero?: boolean;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    href: "/media/marave/images/aerial-estate.webp",
    src: "/media/marave/images/aerial-estate.webp",
    alt: "Aerial estate",
    label: "Aerial Estate",
    hero: true,
  },
  {
    href: "/media/marave/images/condo-a-living.webp",
    src: "/media/marave/images/condo-a-living.webp",
    alt: "Condominium living",
    label: "Condo · Living",
  },
  {
    href: "/media/marave/images/penthouse-balcony.webp",
    src: "/media/marave/images/penthouse-balcony.webp",
    alt: "Penthouse balcony",
    label: "Penthouse · Balcony",
  },
  {
    href: "/media/marave/images/villa-pool.webp",
    src: "/media/marave/images/villa-pool.webp",
    alt: "Villa plunge pool",
    label: "Villa · Plunge Pool",
  },
  {
    href: "/media/marave/images/beach-club-pool.webp",
    src: "/media/marave/images/beach-club-pool.webp",
    alt: "Beach club",
    label: "Beach Club",
  },
  {
    href: "/media/marave/images/lxr-beach.webp",
    src: "/media/marave/images/lxr-beach.webp",
    alt: "Pacific beachfront",
    label: "Pacific Beachfront",
  },
];

export const RESERVE_STEPS = [
  {
    title: "Reserve your unit",
    body: "A $10,000 reservation deposit locks your chosen residence at today's pre-construction price.",
  },
  {
    title: "Receive the documents",
    body: "The full package includes the Sales & Purchase Agreement and supporting project documentation.",
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

export const TEAM = [
  {
    href: "https://crlre.com/agents/mark-dalton-2/",
    image: "/listings/uploads/MARK.webp",
    name: "Mark Dalton",
    role: "Founder · Developer",
    bio: "Owner of Costa Rica Luxury Real Estate and developer of Maravé, with 35+ years in real estate.",
  },
  {
    href: "https://crlre.com/agents/gladis-b-galindo-2/",
    image: "/listings/uploads/GLADIS.webp",
    name: "Gladis B. Galindo",
    role: "Advisor · Attorney",
    bio: "A registered lawyer based in Costa Rica, with deep knowledge of property and administrative law.",
  },
] as const;

export const CREDIBILITY_POINTS = [
  {
    title: "Developer and broker in one",
    detail:
      "Costa Rica Luxury Real Estate develops Maravé and represents it exclusively, so you speak with the team behind the project from day one.",
  },
  {
    title: "Decades on the coast",
    detail:
      "Mark Dalton brings more than 35 years of development and sales experience across Costa Rica's most sought-after Pacific addresses.",
  },
  {
    title: "Beyond a single project",
    detail:
      "CRLRE also curates exclusive estates, land, and new construction from Manuel Antonio to Uvita when you want context beyond Maravé.",
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
