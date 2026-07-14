export const NAV_LINKS = [
  { href: "/#marave", label: "Maravé" },
  { href: "/#collections", label: "Residences" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#reserve", label: "Reserve" },
  { href: "/listings", label: "Listings" },
  { href: "/#contact", label: "Contact" },
] as const;

/** Featured strip only — each image may also appear in the gallery, nowhere else. */
export const MARQUEE_ITEMS = [
  {
    src: "/media/marave/images/aerial-estate.webp",
    alt: "Aerial view of Maravé estate",
    label: "Aerial Estate",
    href: "/#gallery",
  },
  {
    src: "/media/marave/images/villas-general.webp",
    alt: "Villas among the canopy",
    label: "Villas · Canopy",
    href: "/#collections",
  },
  {
    src: "/media/marave/images/beach-club-solarium.webp",
    alt: "Beach club solarium",
    label: "Beach Club · Solarium",
    href: "/#gallery",
  },
  {
    src: "/media/marave/images/beach-club-pool.webp",
    alt: "Beach club pool",
    label: "Beach Club · Pool",
    href: "/#gallery",
  },
  {
    src: "/media/marave/images/spa.webp",
    alt: "Spa amenity",
    label: "Spa",
    href: "/#gallery",
  },
  {
    src: "/media/marave/images/speakeasy.webp",
    alt: "Speakeasy lounge",
    label: "Speakeasy",
    href: "/#gallery",
  },
  {
    src: "/media/marave/images/kids-club.webp",
    alt: "Kids club",
    label: "Kids Club",
    href: "/#gallery",
  },
  {
    src: "/media/marave/images/wildlife.webp",
    alt: "Local wildlife",
    label: "Wildlife",
    href: "/#gallery",
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
    image: "/media/marave/images/condo-a-living.webp",
    video: "/media/marave/videos/collection-condominiums.mp4?v=3",
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
    image: "/media/marave/images/villa-pool.webp",
    video: "/media/marave/videos/collection-villas.mp4?v=3",
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
    image: "/media/marave/images/penthouse-balcony.webp",
    video: "/media/marave/videos/collection-penthouses.mp4?v=3",
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

export type GalleryCategory = "exteriors" | "residences" | "beach-club" | "lifestyle";

export type GalleryItem = {
  href: string;
  src: string;
  alt: string;
  label: string;
  category: GalleryCategory;
  hero?: boolean;
};

export const GALLERY_CATEGORIES: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "exteriors", label: "Exteriors" },
  { id: "residences", label: "Residences" },
  { id: "beach-club", label: "Beach Club" },
  { id: "lifestyle", label: "Lifestyle" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { href: "/media/marave/images/aerial-estate.webp", src: "/media/marave/images/aerial-estate.webp", alt: "Aerial view of Maravé estate", label: "Aerial Estate", category: "exteriors", hero: true },
  { href: "/media/marave/images/hero-aerial-sunset.webp", src: "/media/marave/images/hero-aerial-sunset.webp", alt: "Aerial sunset over the Pacific", label: "Pacific Sunset", category: "exteriors" },
  { href: "/media/marave/images/birdseye.webp", src: "/media/marave/images/birdseye.webp", alt: "Bird's-eye view of the residences", label: "Bird's Eye", category: "exteriors" },
  { href: "/media/marave/images/villas-day.webp", src: "/media/marave/images/villas-day.webp", alt: "Villas exterior by day", label: "The Villas", category: "exteriors" },
  { href: "/media/marave/images/villas-general.webp", src: "/media/marave/images/villas-general.webp", alt: "Villas among the canopy", label: "Villas · Canopy", category: "exteriors" },
  { href: "/media/marave/images/villas-close-up.webp", src: "/media/marave/images/villas-close-up.webp", alt: "Villa close-up exterior", label: "Villa · Detail", category: "exteriors" },
  { href: "/media/marave/images/villas-pool-aerial.webp", src: "/media/marave/images/villas-pool-aerial.webp", alt: "Aerial of villa plunge pools", label: "Villas · Pools", category: "exteriors" },
  { href: "/media/marave/images/villa-pool.webp", src: "/media/marave/images/villa-pool.webp", alt: "Villa private plunge pool", label: "Villa · Plunge Pool", category: "residences" },
  { href: "/media/marave/images/villa-living.webp", src: "/media/marave/images/villa-living.webp", alt: "Villa living room", label: "Villa · Living", category: "residences" },
  { href: "/media/marave/images/villa-bedroom.webp", src: "/media/marave/images/villa-bedroom.webp", alt: "Villa primary bedroom", label: "Villa · Bedroom", category: "residences" },
  { href: "/media/marave/images/villa-bathroom.webp", src: "/media/marave/images/villa-bathroom.webp", alt: "Villa bathroom", label: "Villa · Bath", category: "residences" },
  { href: "/media/marave/images/villa-foyer.webp", src: "/media/marave/images/villa-foyer.webp", alt: "Villa foyer", label: "Villa · Foyer", category: "residences" },
  { href: "/media/marave/images/condo-drop-off.webp", src: "/media/marave/images/condo-drop-off.webp", alt: "Condominium arrival court", label: "Condo · Arrival", category: "exteriors" },
  { href: "/media/marave/images/condo-detail.webp", src: "/media/marave/images/condo-detail.webp", alt: "Condominium exterior detail", label: "Condo · Exterior", category: "exteriors" },
  { href: "/media/marave/images/condo-a-living.webp", src: "/media/marave/images/condo-a-living.webp", alt: "Condominium living room by day", label: "Condo · Living", category: "residences" },
  { href: "/media/marave/images/condo-a-living-sunset.webp", src: "/media/marave/images/condo-a-living-sunset.webp", alt: "Condominium living at sunset", label: "Condo · Sunset", category: "residences" },
  { href: "/media/marave/images/condo-a-kitchen.webp", src: "/media/marave/images/condo-a-kitchen.webp", alt: "Condominium kitchen", label: "Condo · Kitchen", category: "residences" },
  { href: "/media/marave/images/condo-a-bedroom.webp", src: "/media/marave/images/condo-a-bedroom.webp", alt: "Condominium bedroom", label: "Condo · Bedroom", category: "residences" },
  { href: "/media/marave/images/condo-a-bathroom.webp", src: "/media/marave/images/condo-a-bathroom.webp", alt: "Condominium bathroom", label: "Condo · Bath", category: "residences" },
  { href: "/media/marave/images/condo-a-balcony.webp", src: "/media/marave/images/condo-a-balcony.webp", alt: "Condominium balcony", label: "Condo · Balcony", category: "residences" },
  { href: "/media/marave/images/penthouse-living.webp", src: "/media/marave/images/penthouse-living.webp", alt: "Penthouse living room", label: "Penthouse · Living", category: "residences" },
  { href: "/media/marave/images/penthouse-kitchen.webp", src: "/media/marave/images/penthouse-kitchen.webp", alt: "Penthouse kitchen", label: "Penthouse · Kitchen", category: "residences" },
  { href: "/media/marave/images/penthouse-bedroom.webp", src: "/media/marave/images/penthouse-bedroom.webp", alt: "Penthouse bedroom", label: "Penthouse · Bedroom", category: "residences" },
  { href: "/media/marave/images/penthouse-bathroom.webp", src: "/media/marave/images/penthouse-bathroom.webp", alt: "Penthouse bathroom", label: "Penthouse · Bath", category: "residences" },
  { href: "/media/marave/images/penthouse-balcony.webp", src: "/media/marave/images/penthouse-balcony.webp", alt: "Penthouse balcony", label: "Penthouse · Balcony", category: "residences" },
  { href: "/media/marave/images/beach-club-pool.webp", src: "/media/marave/images/beach-club-pool.webp", alt: "Beach club pool", label: "Beach Club · Pool", category: "beach-club" },
  { href: "/media/marave/images/beach-club-pool-alt.webp", src: "/media/marave/images/beach-club-pool-alt.webp", alt: "Beach club pool terrace", label: "Beach Club · Terrace", category: "beach-club" },
  { href: "/media/marave/images/beach-club-solarium.webp", src: "/media/marave/images/beach-club-solarium.webp", alt: "Beach club solarium", label: "Beach Club · Solarium", category: "beach-club" },
  { href: "/media/marave/images/beach-club-yard.webp", src: "/media/marave/images/beach-club-yard.webp", alt: "Beach club lawn", label: "Beach Club · Lawn", category: "beach-club" },
  { href: "/media/marave/images/beach-club-yard-lifestyle.webp", src: "/media/marave/images/beach-club-yard-lifestyle.webp", alt: "Beach club lifestyle", label: "Beach Club · Life", category: "beach-club" },
  { href: "/media/marave/images/beach-club-aerial.webp", src: "/media/marave/images/beach-club-aerial.webp", alt: "Aerial of the beach club", label: "Beach Club · Aerial", category: "beach-club" },
  { href: "/media/marave/images/lxr-beach.webp", src: "/media/marave/images/lxr-beach.webp", alt: "Pacific beachfront", label: "Pacific Beachfront", category: "exteriors" },
  { href: "/media/marave/images/pacific-coast.webp", src: "/media/marave/images/pacific-coast.webp", alt: "Pacific coastline", label: "Pacific Coast", category: "lifestyle" },
  { href: "/media/marave/images/spa.webp", src: "/media/marave/images/spa.webp", alt: "Spa amenity", label: "Spa", category: "beach-club" },
  { href: "/media/marave/images/speakeasy.webp", src: "/media/marave/images/speakeasy.webp", alt: "Speakeasy lounge", label: "Speakeasy", category: "beach-club" },
  { href: "/media/marave/images/kids-club.webp", src: "/media/marave/images/kids-club.webp", alt: "Kids club", label: "Kids Club", category: "beach-club" },
  { href: "/media/marave/images/hummingbird.webp", src: "/media/marave/images/hummingbird.webp", alt: "Hummingbird on the grounds", label: "Wildlife · Hummingbird", category: "lifestyle" },
  { href: "/media/marave/images/wildlife.webp", src: "/media/marave/images/wildlife.webp", alt: "Local wildlife", label: "Wildlife", category: "lifestyle" },
  { href: "/media/marave/images/manuel-antonio-park.webp", src: "/media/marave/images/manuel-antonio-park.webp", alt: "Manuel Antonio National Park", label: "Manuel Antonio", category: "lifestyle" },
  { href: "/media/marave/images/hidden-waterfall.webp", src: "/media/marave/images/hidden-waterfall.webp", alt: "Hidden waterfall nearby", label: "Hidden Waterfall", category: "lifestyle" },
  { href: "/media/marave/images/yoga.webp", src: "/media/marave/images/yoga.webp", alt: "Yoga and meditation", label: "Yoga", category: "lifestyle" },
  { href: "/media/marave/images/whale-watching.webp", src: "/media/marave/images/whale-watching.webp", alt: "Whale watching", label: "Whale Watching", category: "lifestyle" },
  { href: "/media/marave/images/catamaran.webp", src: "/media/marave/images/catamaran.webp", alt: "Catamaran cruise", label: "Catamaran", category: "lifestyle" },
  { href: "/media/marave/images/snorkeling.webp", src: "/media/marave/images/snorkeling.webp", alt: "Snorkeling", label: "Snorkeling", category: "lifestyle" },
  { href: "/media/marave/images/kayak.webp", src: "/media/marave/images/kayak.webp", alt: "Kayaking", label: "Kayak", category: "lifestyle" },
  { href: "/media/marave/images/fishing.webp", src: "/media/marave/images/fishing.webp", alt: "Sport fishing", label: "Fishing", category: "lifestyle" },
  { href: "/media/marave/images/zipline.webp", src: "/media/marave/images/zipline.webp", alt: "Twin zipline", label: "Zipline", category: "lifestyle" },
  { href: "/media/marave/images/rafting.webp", src: "/media/marave/images/rafting.webp", alt: "White water rafting", label: "Rafting", category: "lifestyle" },
  { href: "/media/marave/images/coffee-farm.webp", src: "/media/marave/images/coffee-farm.webp", alt: "Coffee and chocolate farm", label: "Coffee Farm", category: "lifestyle" },
  { href: "/media/marave/images/damus-island.webp", src: "/media/marave/images/damus-island.webp", alt: "Damas Island", label: "Damas Island", category: "lifestyle" },
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
    href: "/#contact",
    image: "/images/headshots/mark-dalton.webp",
    name: "Mark Dalton",
    role: "Founder · Developer",
    bio: "Owner of Costa Rica Luxury Real Estate and developer of Maravé, with 35+ years in real estate.",
  },
  {
    href: "/#contact",
    image: "/images/headshots/gladis-galindo.webp",
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
