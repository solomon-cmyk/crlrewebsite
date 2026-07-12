import { getAdminSessionFromCookies } from "@/lib/admin/auth";
import type { Listing } from "@/lib/listings";
import { getMergedListings, saveListing, slugifyTitle, storageMode } from "@/lib/listings/store";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function revalidateListingPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/listings");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/listings/${slug}`);
}

export async function GET() {
  if (!(await getAdminSessionFromCookies())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const listings = await getMergedListings();
  return NextResponse.json({ ok: true, storage: storageMode(), listings });
}

export async function POST(request: Request) {
  if (!(await getAdminSessionFromCookies())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<Listing>;
  try {
    body = (await request.json()) as Partial<Listing>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const title = body.title?.trim() ?? "";
  if (!title) {
    return NextResponse.json({ ok: false, error: "Title is required" }, { status: 400 });
  }

  const slug = (body.slug?.trim() || slugifyTitle(title)).toLowerCase();
  if (!slug) {
    return NextResponse.json({ ok: false, error: "Slug is required" }, { status: 400 });
  }

  const listing: Listing = {
    slug,
    tag: body.tag?.trim() || "Sale",
    image: body.image || body.images?.[0] || "",
    alt: body.alt?.trim() || title,
    location: body.location?.trim() || "",
    title,
    price: body.price?.trim() || "Contact for price",
    specs: body.specs ?? [],
    excerpt: body.excerpt?.trim() || "",
    sold: Boolean(body.sold),
    featured: Boolean(body.featured),
    images: body.images ?? [],
    description: body.description ?? [],
    features: body.features ?? [],
  };

  try {
    const saved = await saveListing(listing);
    revalidateListingPaths(saved.slug);
    return NextResponse.json({ ok: true, listing: saved });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save listing";
    const status = message.includes("already exists") ? 409 : 500;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
