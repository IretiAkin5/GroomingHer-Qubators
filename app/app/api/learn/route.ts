import { NextResponse } from "next/server";
import { ARTICLES, forTier } from "@/lib/learn";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const tier = q.get("tier") ?? "all";
  const slug = q.get("slug") ?? "";
  if (slug) {
    const a = ARTICLES.find((x) => x.slug === slug);
    if (!a) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ article: a });
  }
  return NextResponse.json({ articles: forTier(tier).map(({ slug, tier, title }) => ({ slug, tier, title })) });
}
