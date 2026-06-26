import { readFileSync } from "fs";

const BASE_URL = "https://smdevs.in";

const IMAGES = [
  {
    file: "C:/Users/Admin/.gemini/antigravity/brain/93059cc6-29b7-4b9c-b489-c8e2ea171324/schema_markup_blog_hero_1782286075143.png",
    slug: "what-is-schema-markup-complete-guide",
    alt: "What is schema markup - structured data and JSON-LD guide",
  },
  {
    file: "C:/Users/Admin/.gemini/antigravity/brain/93059cc6-29b7-4b9c-b489-c8e2ea171324/keyword_density_blog_hero_1782286087967.png",
    slug: "what-is-keyword-density-complete-seo-guide",
    alt: "What is keyword density - SEO content optimization guide",
  },
];

async function uploadImage(filePath, filename) {
  const buffer = readFileSync(filePath);
  const blob = new Blob([buffer], { type: "image/png" });
  const form = new FormData();
  form.append("file", blob, filename);

  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    body: form,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.url; // The uploaded image URL
}

async function patchBlog(slug, imageUrl, imageAlt) {
  // First GET the blog to read existing fields
  const getRes = await fetch(`${BASE_URL}/api/blogs`);
  const blogs = await getRes.json();
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) throw new Error(`Blog not found: ${slug}`);

  // PUT with image updated
  const res = await fetch(`${BASE_URL}/api/blogs?slug=${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...blog, featuredImage: imageUrl, featuredImageAlt: imageAlt }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Update failed");
  return imageUrl;
}

for (const { file, slug, alt } of IMAGES) {
  try {
    const filename = slug + ".png";
    console.log(`Uploading ${filename}...`);
    const url = await uploadImage(file, filename);
    console.log(`  → Uploaded to: ${url}`);
    await patchBlog(slug, url, alt);
    console.log(`  ✅ Blog updated: ${slug}`);
  } catch (err) {
    console.error(`  ❌ Error for ${slug}:`, err.message);
  }
}
