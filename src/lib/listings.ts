import { LISTINGS_DATA } from "@/lib/listings-data";

export type ListingSpec = {
  label: string;
  suffix: string;
};

export type Listing = {
  slug: string;
  tag: string;
  image: string;
  alt: string;
  location: string;
  title: string;
  price: string;
  specs: ListingSpec[];
  excerpt: string;
  sold: boolean;
  featured: boolean;
  images: string[];
  description: string[];
  features: string[];
};

export function getAllListings(): Listing[] {
  return [...LISTINGS_DATA];
}

export function getActiveListings(): Listing[] {
  return LISTINGS_DATA.filter((listing) => !listing.sold);
}

export function getFeaturedListings(limit = 6): Listing[] {
  const active = getActiveListings();
  const featured = active.filter((listing) => listing.featured);
  const rest = active.filter((listing) => !listing.featured);
  return [...featured, ...rest].slice(0, limit);
}

export function getListingBySlug(slug: string): Listing | undefined {
  return LISTINGS_DATA.find((listing) => listing.slug === slug);
}
