import { ListingEditor } from "@/components/admin/ListingEditor";
import { getMergedListingBySlug } from "@/lib/listings/store";
import { notFound } from "next/navigation";

type EditListingPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditListingPage({ params }: EditListingPageProps) {
  const { slug } = await params;
  const listing = await getMergedListingBySlug(decodeURIComponent(slug));
  if (!listing) notFound();
  return <ListingEditor mode="edit" initial={listing} />;
}
