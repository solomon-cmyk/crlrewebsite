import { getAdminSessionFromCookies } from "@/lib/admin/auth";
import type { Listing } from "@/lib/listings";
import {
  deleteListing,
  getMergedListingBySlug,
  saveListing,
} from "@/lib/listings/store";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

function revalidateListingPaths(slug: string) {
  revalidatePath("/");
  revalidatePath("/listings");
  revalidatePath(`/listings/${slug}`);
  revalidatePath("/sitemap.xml");
}

export async function GET(_request: Request, context: RouteContext) {
  if (!(await getAdminSessionFromCookies())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  const listing = await getMergedListingBySlug(slug);
  if (!listing) {
    return NextResponse.json({ ok: false, error: "Listing not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, listing });
}

export async function PUT(request: Request, context: RouteContext) {
  if (!(await getAdminSessionFromCookies())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  let body: Partial<Listing>;
  try {
    body = (await request.json()) as Partial<Listing>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const existing = await getMergedListingBySlug(slug);
  if (!existing && !body.title) {
    return NextResponse.json({ ok: false, error: "Listing not found" }, { status: 404 });
  }

  const nextSlug = (body.slug?.trim() || slug).toLowerCase();
  const listing: Listing = {
    slug: nextSlug,
    tag: body.tag?.trim() || existing?.tag || "Sale",
    image: body.image || body.images?.[0] || existing?.image || "",
    alt: body.alt?.trim() || body.title?.trim() || existing?.alt || "",
    location: body.location?.trim() ?? existing?.location ?? "",
    title: body.title?.trim() || existing?.title || "",
    price: body.price?.trim() || existing?.price || "Contact for price",
    specs: body.specs ?? existing?.specs ?? [],
    excerpt: body.excerpt?.trim() ?? existing?.excerpt ?? "",
    sold: body.sold ?? existing?.sold ?? false,
    featured: body.featured ?? existing?.featured ?? false,
    images: body.images ?? existing?.images ?? [],
    description: body.description ?? existing?.description ?? [],
    features: body.features ?? existing?.features ?? [],
  };

  if (!listing.title) {
    return NextResponse.json({ ok: false, error: "Title is required" }, { status: 400 });
  }

  try {
    if (nextSlug !== slug) {
      await deleteListing(slug);
    }
    const saved = await saveListing(listing);
    revalidateListingPaths(slug);
    revalidateListingPaths(saved.slug);
    return NextResponse.json({ ok: true, listing: saved });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save listing";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await getAdminSessionFromCookies())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  try {
    await deleteListing(slug);
    revalidateListingPaths(slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete listing";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
