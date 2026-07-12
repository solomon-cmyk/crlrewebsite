import { LISTINGS_DATA } from "@/lib/listings-data";
import { getMergedListingBySlug, getMergedListings } from "@/lib/listings/store";

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

/** Sync fallback used only when storage is unavailable. */
export function getStaticListings(): Listing[] {
  return [...LISTINGS_DATA];
}

export async function getAllListings(): Promise<Listing[]> {
  return getMergedListings();
}

export async function getActiveListings(): Promise<Listing[]> {
  const listings = await getAllListings();
  return listings.filter((listing) => !listing.sold);
}

export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  const listings = await getAllListings();
  const active = listings.filter((listing) => !listing.sold);
  const featured = active.filter((listing) => listing.featured);
  const rest = active.filter((listing) => !listing.featured);
  return [...featured, ...rest].slice(0, limit);
}

export async function getListingBySlug(slug: string): Promise<Listing | undefined> {
  return getMergedListingBySlug(slug);
}
