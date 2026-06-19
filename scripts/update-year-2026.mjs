/**
 * update-year-2026.mjs
 * Fetches all 5 blog posts from the live DB, replaces every "2025" with "2026"
 * across all text fields, and PUTs them back via the API.
 */

const API_BASE = 'https://smdevs.in/api/blogs';

const SLUGS = [
  'how-to-use-free-ai-content-detector-tool',
  'what-is-on-page-seo-checker-and-how-to-use-it',
  'how-to-calculate-risk-reward-ratio-in-trading',
  'pivot-point-calculator-intraday-trading-guide',
  'how-to-generate-seo-meta-tags-for-your-website',
];

// Fields to update with year replacement
const TEXT_FIELDS = [
  'title', 'content', 'excerpt', 'tldr',
  'metaTitle', 'metaDescription', 'focusKeyphrase',
];

function replace2025(obj) {
  const updated = { ...obj };
  for (const field of TEXT_FIELDS) {
    if (typeof updated[field] === 'string') {
      updated[field] = updated[field]
        .replace(/2025/g, '2026')
        .replace(/in 2025/gi, 'in 2026')
        .replace(/for 2025/gi, 'for 2026')
        .replace(/\(2025\)/g, '(2026)');
    }
  }
  return updated;
}

async function fetchBlog(slug) {
  // We fetch all blogs then find by slug
  const res = await fetch(API_BASE);
  const blogs = await res.json();
  return blogs.find(b => b.slug === slug);
}

async function updateBlog(slug, data) {
  const res = await fetch(`${API_BASE}?slug=${slug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function main() {
  console.log('🔄 Updating all blog posts: 2025 → 2026\n');
  console.log(`📡 API: ${API_BASE}\n`);

  // Fetch all blogs once
  const res = await fetch(API_BASE);
  const allBlogs = await res.json();

  for (const slug of SLUGS) {
    process.stdout.write(`  Updating "${slug}"... `);
    const blog = allBlogs.find(b => b.slug === slug);

    if (!blog) {
      console.log(`❌ Not found`);
      continue;
    }

    const updated = replace2025(blog);
    
    // Count replacements made
    let count = 0;
    for (const field of TEXT_FIELDS) {
      if (typeof blog[field] === 'string') {
        const matches = blog[field].match(/2025/g);
        if (matches) count += matches.length;
      }
    }

    try {
      const result = await updateBlog(slug, updated);
      if (result.success) {
        console.log(`✅ (${count} replacements)`);
        console.log(`     🔗 https://smdevs.in/resources/blogs/${slug}`);
      } else {
        console.log(`❌ ${result.error}`);
      }
    } catch (err) {
      console.log(`❌ ${err.message}`);
    }

    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n✨ All blog posts updated to 2026!');
}

main().catch(console.error);
