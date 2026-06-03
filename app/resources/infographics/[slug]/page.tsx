import { notFound } from "next/navigation";
import { Metadata } from "next";
import { INFOGRAPHICS, getInfographicBySlug, getRelatedInfographics } from "@/data/infographics";
import InfographicDetailClient from "./InfographicDetailClient";

// ── Static params for all published infographics ─────────────────────────────
export async function generateStaticParams() {
  return INFOGRAPHICS.filter((i) => i.image).map((i) => ({ slug: i.slug }));
}

// ── Per-infographic SEO metadata ─────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getInfographicBySlug(slug);
  if (!item) return { title: "Not Found" };

  const title = `${item.title} Infographic | Free Download | SM Developers`;
  const description = item.longDescription.slice(0, 160);
  const url = `https://smdevs.in/resources/infographics/${item.slug}`;

  return {
    title,
    description,
    keywords: item.tags,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: item.image ? [{ url: item.image, width: 900, height: 1200, alt: item.alt }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: item.image ? [item.image] : [],
    },
  };
}

// ── Server Component shell ────────────────────────────────────────────────────
export default async function InfographicDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const item = getInfographicBySlug(slug);
  if (!item || !item.image) notFound();

  const related = getRelatedInfographics(item);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://smdevs.in" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://smdevs.in/resources/blogs" },
      { "@type": "ListItem", position: 3, name: "Infographics", item: "https://smdevs.in/resources/infographics" },
      { "@type": "ListItem", position: 4, name: item.title, item: `https://smdevs.in/resources/infographics/${item.slug}` },
    ],
  };

  const imageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: item.title,
    description: item.longDescription,
    contentUrl: item.image,
    url: `https://smdevs.in/resources/infographics/${item.slug}`,
    keywords: item.tags.join(", "),
    // Required fields
    author: { "@type": "Organization", name: "SM Developers", url: "https://smdevs.in" },
    copyrightHolder: { "@type": "Organization", name: "SM Developers", url: "https://smdevs.in" },
    copyrightYear: new Date().getFullYear(),
    license: "https://smdevs.in/resources/infographics",
    // Optional fields (previously missing)
    creditText: `${item.title} by SM Developers — smdevs.in`,
    creator: { "@type": "Organization", name: "SM Developers", url: "https://smdevs.in" },
    copyrightNotice: `© ${new Date().getFullYear()} SM Developers. Free to share with attribution. Source: smdevs.in/resources/infographics`,
    acquireLicensePage: "https://smdevs.in/resources/infographics",
  };

  const embedCode = `<a href="https://smdevs.in/resources/infographics/${item.slug}" title="${item.title} by SM Developers">
  <img src="${item.image}" alt="${item.alt}" style="max-width:100%;height:auto;" />
</a>
<p>Source: <a href="https://smdevs.in/resources/infographics">SM Developers Infographics Hub</a></p>`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }} />
      <InfographicDetailClient item={item} related={related} embedCode={embedCode} />
    </>
  );
}
