import { v2 as cloudinary } from 'cloudinary';
import pg from 'pg';
import fs from 'fs';
import path from 'path';

// ─── CONFIG ────────────────────────────────────────────────────────────────
const CLOUDINARY_CLOUD_NAME = 'dkfj0zehx';
const CLOUDINARY_API_KEY    = '296562678135994';
const CLOUDINARY_API_SECRET = 'OsJh1GsThS4Z-adhb9RcBd9y1-s';
const DATABASE_URL = 'postgresql://neondb_owner:npg_K6ZfyJWGnBS4@ep-summer-rain-anjhb1ps.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require';
const IMAGE_PATH   = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\fc51764b-6f11-4040-a475-655196efa7c7\\seo_tools_guide_hero_1780396532654.png';

// ─── CLOUDINARY SETUP ──────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key:    CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// ─── BLOG CONTENT (HTML) ───────────────────────────────────────────────────
const blogContent = `
<p>Getting to page one of Google is not reserved for companies with $10,000-per-month SEO budgets. The tools that professional SEO agencies use daily are available to anyone—completely free, with no account required. The problem is that most people do not know which tools to use, in what order, or what to do with the results.</p>
<p>This guide fixes that. You will walk through a complete, practical SEO workflow using free tools covering every critical dimension of modern search optimization—from technical health to on-page structure, schema markup, keyword targeting, and content quality. Every tool can be used immediately, without entering your email address or subscribing to anything.</p>

<h2>Key Takeaways</h2>
<ul>
  <li><strong>Schema markup generates up to 30% higher click-through rates</strong> for pages with rich snippets in search results.</li>
  <li><strong>Technical errors are invisible killers.</strong> Most websites have at least three significant on-page SEO problems they are completely unaware of.</li>
  <li><strong>Search intent alignment is more important than keyword density</strong> in 2025.</li>
  <li><strong>You can perform a complete SEO audit in under one hour</strong> using free tools—without installing software or creating accounts.</li>
  <li><strong>AI-powered search</strong> (ChatGPT, Perplexity, Google AI Overviews) rewards the same structured, entity-rich content that traditional SEO rewards.</li>
</ul>

<h2>The State of Free SEO: What the Data Says</h2>
<ul>
  <li><strong>68%</strong> of all online experiences begin with a search engine.</li>
  <li>Pages with structured data markup achieve <strong>20–30% higher CTR</strong> than equivalent pages without it.</li>
  <li><strong>53%</strong> of mobile users abandon a site that takes more than 3 seconds to load.</li>
  <li>Only <strong>5.7%</strong> of newly published pages rank in the top 10 within a year—the difference is on-page optimization and intent alignment.</li>
</ul>

<h2>Phase 1: Technical Foundation — Fix What Search Engines Cannot Read</h2>

<h3>1. SEO Structure Analyzer</h3>
<p>The <a href="/tools/seo/seo-structure-analyzer">SEO Structure Analyzer</a> examines your heading hierarchy (H1–H6), meta tag presence, content structure quality, and overall structural SEO health. Google's crawlers read your page structure before they read your content. If your H1 is missing, duplicated, or misaligned with your page's topic, the crawler has no reliable signal for what your page is about.</p>
<p><strong>What to look for:</strong></p>
<ul>
  <li><strong>Missing H1:</strong> Every page must have exactly one H1 containing your primary keyword.</li>
  <li><strong>Broken heading hierarchy:</strong> An H3 should never appear without an H2 parent.</li>
  <li><strong>Meta title length:</strong> Optimal range is 50–60 characters.</li>
  <li><strong>Meta description:</strong> Should be 140–160 characters. Missing descriptions force Google to auto-generate them.</li>
</ul>

<h3>2. Schema Validator</h3>
<p>The <a href="/tools/seo/schema-validator">Schema Validator</a> validates your JSON-LD structured data, identifying errors that prevent your content from appearing as rich results in search. Pages with valid schema are eligible for star ratings, FAQ accordions, breadcrumbs, sitelinks, and event listings—driving 20–30% higher click-through rates.</p>
<p>In 2025, schema is also the primary mechanism through which AI systems (Google AI Overviews, ChatGPT, Perplexity) correctly interpret and attribute your content.</p>

<table>
  <thead><tr><th>Schema Type</th><th>Best For</th><th>Rich Result Unlocked</th></tr></thead>
  <tbody>
    <tr><td>Article / BlogPosting</td><td>Blog content</td><td>Byline, date, article rich results</td></tr>
    <tr><td>FAQPage</td><td>FAQ sections</td><td>Expandable accordion in SERP</td></tr>
    <tr><td>WebApplication</td><td>Online tools</td><td>App-specific rich results</td></tr>
    <tr><td>HowTo</td><td>Tutorial content</td><td>Step-by-step rich results</td></tr>
    <tr><td>BreadcrumbList</td><td>All pages</td><td>Structured breadcrumb trail in SERP</td></tr>
  </tbody>
</table>

<h3>3. Robots.txt Generator &amp; Sitemap Generator</h3>
<p>Use the <a href="/tools/seo/robots-txt-generator">Robots.txt Generator</a> to control which parts of your site crawlers can access. An incorrectly configured robots.txt is one of the most common causes of catastrophic ranking loss. Then use the <a href="/tools/seo/sitemap-generator">Sitemap Generator</a> to create an XML sitemap and submit it to Google Search Console for reliable page discovery.</p>

<h2>Phase 2: On-Page Optimization — Make Every Page Worth Ranking</h2>

<h3>4. Meta Tag Generator</h3>
<p>Your meta title is the single most important on-page SEO element—it is the clickable blue link in Google results. Use the <a href="/tools/seo/meta-tag-generator">Meta Tag Generator</a> to craft titles under 60 characters with your primary keyword in the first 55. Your meta description (140–160 characters) is your 150-character advertisement. Include the keyword naturally, add a soft CTA, and never repeat the title verbatim.</p>

<h3>5. On-Page SEO Checker</h3>
<p>The <a href="/tools/seo/on-page-seo-checker">On-Page SEO Checker</a> performs a comprehensive analysis covering keyword usage, content structure, internal links, image alt text, and page speed signals. Work through the report in priority order: Critical → Important → Recommended.</p>

<h3>6. Open Graph Generator</h3>
<p>When someone shares your page on LinkedIn or X (Twitter), Open Graph tags determine the image, title, and description shown in the preview card. A missing OG image means your share looks like a broken link. Use the <a href="/tools/seo/open-graph-generator">Open Graph Generator</a> and include a 1200×628px image for optimal display across all platforms.</p>

<h2>Phase 3: Keyword Research — Find What Your Audience Is Actually Searching</h2>

<h3>7. Keyword Intent Analyzer</h3>
<p>The <a href="/tools/seo/keyword-intent-analyzer">Keyword Intent Analyzer</a> is the most strategically important tool in this guide. It classifies keywords into four intent types:</p>
<ul>
  <li><strong>Informational:</strong> User wants to learn ("how," "what," "why"). Best format: blog posts, guides.</li>
  <li><strong>Commercial:</strong> User is comparing options ("best X," "X vs Y"). Best format: comparison pages, reviews.</li>
  <li><strong>Transactional:</strong> User is ready to act ("buy," "download," "sign up"). Best format: product pages, tool landing pages.</li>
  <li><strong>Navigational:</strong> User wants a specific site. Best format: branded pages.</li>
</ul>
<p>Publishing a guide-format article for a keyword with transactional intent will not rank—regardless of content quality. Check intent before you write, not after.</p>

<h3>8. Keyword Density Checker &amp; Volume Estimator</h3>
<p>Use the <a href="/tools/seo/keyword-density-checker">Keyword Density Checker</a> to target 1–2% primary keyword density and avoid both under-optimization (below 0.5%) and keyword stuffing (above 3%). Then use the <a href="/tools/seo/keyword-volume-estimator">Keyword Volume Estimator</a> to prioritize targets by balancing search opportunity against competition difficulty.</p>

<h2>Phase 4: Content Quality — Ensure What You Publish Earns Its Ranking</h2>

<h3>9. AI Content Detector</h3>
<p>Google's Helpful Content guidelines reward "first-hand expertise and depth of knowledge." The <a href="/tools/seo/ai-content-detector">AI Content Detector</a> identifies which sections of your content lack human editorial voice. When sections are flagged, rewrite them to include your personal perspective, a specific example, or an opinion based on firsthand knowledge.</p>

<h3>10. Content Humanizer</h3>
<p>The <a href="/tools/seo/content-humanizer">Content Humanizer</a> rewrites robotic-sounding text to make it more natural and editorial. Content that sounds mechanical fails on two dimensions: it scores poorly in detection tools and—more importantly—real readers stop reading within seconds, driving up bounce rates that suppress your rankings over time.</p>

<h2>Phase 5: Link Intelligence</h2>

<h3>11. Link Profile Analyzer &amp; Authority Score</h3>
<p>Backlinks remain a top-three ranking factor. The <a href="/tools/seo/link-profile-analyzer">Link Profile Analyzer</a> reveals your anchor text distribution, link source quality, and toxic link patterns—without requiring an expensive Ahrefs subscription. Pair this with the <a href="/tools/seo/authority-score">Authority Score</a> tool to set realistic ranking timelines based on your domain's current standing versus competitors.</p>

<h2>The Complete 4-Week SEO Workflow</h2>
<p><strong>Week 1:</strong> Technical audit — Structure Analyzer, Schema Validator, Robots.txt, Sitemap.<br>
<strong>Week 2:</strong> On-page — Meta Tag Generator, On-Page Checker, Open Graph.<br>
<strong>Week 3:</strong> Content &amp; keywords — Intent Analyzer, Density Checker, Volume Estimator.<br>
<strong>Week 4:</strong> Quality — AI Detector, Content Humanizer, Link Profile analysis.</p>
<p>Repeat monthly on pages not ranking as expected. SEO is a continuous process, not a one-time event.</p>

<h2>Common Mistakes That Sabotage SEO Results</h2>
<ol>
  <li><strong>Treating tools as a replacement for strategy.</strong> Tools surface data. Strategy determines what to do with it.</li>
  <li><strong>Auditing once and moving on.</strong> Search results are dynamic. Competitor pages improve. Run audits quarterly.</li>
  <li><strong>Focusing exclusively on technical SEO while ignoring content quality.</strong> A technically perfect page with thin content will not rank for competitive keywords.</li>
  <li><strong>Publishing for search engines instead of humans.</strong> Write for a specific human reader first. Then optimize the technical signals.</li>
  <li><strong>Ignoring schema markup.</strong> This remains the most underutilized high-ROI action in SEO. Schema makes your content readable to AI systems, not just search crawlers.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details><summary>Do I need to use all tools on every page?</summary><p>No. Match the tool to the problem. For new content: start with keyword intent analysis and meta tag generation. For existing content not ranking: start with the SEO Structure Analyzer and On-Page SEO Checker.</p></details>
<details><summary>How often should I audit my site?</summary><p>Quarterly for established sites. Monthly for sites actively publishing or experiencing ranking fluctuations. Immediately after any significant website changes.</p></details>
<details><summary>Are free SEO tools as accurate as paid tools?</summary><p>For on-page technical analysis, free tools are functionally equivalent to paid alternatives. For backlink databases and historical volume, paid tools have larger data sets. Use free tools for the foundational 80% of your workflow.</p></details>
<details><summary>What is the single most impactful SEO change I can make today?</summary><p>Validate and implement proper schema markup on your most important pages. The ROI—rich result eligibility, CTR improvement, and AI retrieval readiness—is higher than virtually any other single action.</p></details>
<details><summary>Will these tools help with AI search results?</summary><p>Yes. The same structural signals that help Google—clear heading hierarchy, proper schema, well-structured entities—are the signals AI systems use to retrieve and cite content. Content structured well for traditional search is structured well for AI retrieval.</p></details>

<h2>Start Your SEO Audit Today</h2>
<p>Open the <a href="/tools/seo/seo-structure-analyzer">SEO Structure Analyzer</a> and run your most important page. Fix the first issue it finds. Run the <a href="/tools/seo/schema-validator">Schema Validator</a> next. Fix what is broken there. That is how every high-ranking site started—not with a grand strategy, but with the first audit.</p>
<p><a href="/tools/seo"><strong>Explore all 18+ free SEO tools on SM Developers →</strong></a></p>
`;

const blogPost = {
  title: 'How to Use Free SEO Tools to Rank Higher in 2025 — The Complete Beginner\'s Guide',
  slug: 'how-to-use-free-seo-tools-rank-higher',
  content: blogContent,
  excerpt: 'Learn how to use 10+ free SEO tools—no signup required—to audit your website, fix technical errors, and climb Google rankings. A complete step-by-step workflow covering schema validation, on-page SEO, keyword intent analysis, and content quality optimization.',
  tldr: 'Schema markup increases CTR by up to 30%\nMost websites have 3+ hidden technical SEO problems\nSearch intent alignment matters more than keyword density in 2025\nComplete SEO audit possible in under 1 hour using free tools\nAI search (ChatGPT, Perplexity) rewards the same structured content Google rewards',
  focusKeyphrase: 'free SEO tools',
  metaTitle: 'How to Use Free SEO Tools to Rank Higher in 2025 (Complete Guide)',
  metaDescription: 'Learn how to use 10+ free SEO tools—no signup required—to audit your site, fix technical errors, and climb Google rankings. Step-by-step beginner\'s workflow.',
  category: 'SEO',
  author: 'SM Dev Team',
  featuredImageAlt: 'Free SEO tools dashboard showing schema validator, meta tag generator, keyword analyzer and link profile tools with Google SERP rich snippets',
  customSchema: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Use Free SEO Tools to Rank Higher in 2025 — The Complete Beginner's Guide",
    "description": "Learn how to use 10+ free SEO tools to audit your website, fix technical errors, and climb Google rankings.",
    "author": { "@type": "Organization", "name": "SM Developers", "url": "https://smdevs.in" },
    "publisher": { "@type": "Organization", "name": "SM Developers", "logo": { "@type": "ImageObject", "url": "https://smdevs.in/icon.png" } },
    "url": "https://smdevs.in/resources/blogs/how-to-use-free-seo-tools-rank-higher",
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "keywords": ["free SEO tools", "SEO audit", "schema validator", "keyword intent", "meta tag generator", "on-page SEO"],
    "articleSection": "SEO"
  }),
  publishDate: new Date().toISOString(),
  status: 'published'
};

async function uploadImage() {
  console.log('📸 Uploading featured image to Cloudinary...');
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'smdevs_blog', format: 'webp', resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    fs.createReadStream(IMAGE_PATH).pipe(stream);
  });
}

async function publishBlog(featuredImageUrl) {
  console.log('💾 Connecting to Neon Postgres...');
  const client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();

  // Ensure table & columns exist
  await client.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      category TEXT DEFAULT 'General',
      author TEXT DEFAULT 'SM Dev Team',
      featured_image TEXT,
      publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'published'
    );
  `);
  await client.query(`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tldr TEXT;`);
  await client.query(`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS focus_keyphrase TEXT;`);
  await client.query(`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_title TEXT;`);
  await client.query(`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_description TEXT;`);
  await client.query(`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image_alt TEXT;`);
  await client.query(`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS custom_schema TEXT;`);

  // Check for duplicate
  const { rowCount } = await client.query('SELECT 1 FROM blog_posts WHERE slug = $1', [blogPost.slug]);
  if (rowCount > 0) {
    console.log('⚠️  Blog with this slug already exists. Updating instead...');
    await client.query(`
      UPDATE blog_posts SET
        title=$1, content=$2, excerpt=$3, category=$4, author=$5, featured_image=$6,
        publish_date=$7, status=$8, tldr=$9, focus_keyphrase=$10, meta_title=$11,
        meta_description=$12, featured_image_alt=$13, custom_schema=$14
      WHERE slug=$15
    `, [
      blogPost.title, blogPost.content, blogPost.excerpt, blogPost.category, blogPost.author,
      featuredImageUrl, blogPost.publishDate, blogPost.status, blogPost.tldr,
      blogPost.focusKeyphrase, blogPost.metaTitle, blogPost.metaDescription,
      blogPost.featuredImageAlt, blogPost.customSchema, blogPost.slug
    ]);
    console.log('✅ Blog post updated successfully!');
  } else {
    await client.query(`
      INSERT INTO blog_posts (
        title, slug, content, excerpt, category, author, featured_image,
        publish_date, created_at, status, tldr, focus_keyphrase, meta_title,
        meta_description, featured_image_alt, custom_schema
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
    `, [
      blogPost.title, blogPost.slug, blogPost.content, blogPost.excerpt,
      blogPost.category, blogPost.author, featuredImageUrl,
      blogPost.publishDate, new Date().toISOString(), blogPost.status,
      blogPost.tldr, blogPost.focusKeyphrase, blogPost.metaTitle,
      blogPost.metaDescription, blogPost.featuredImageAlt, blogPost.customSchema
    ]);
    console.log('✅ Blog post published successfully!');
  }

  await client.end();
  console.log(`\n🚀 Live at: https://smdevs.in/resources/blogs/${blogPost.slug}`);
  console.log(`📝 Local preview: http://localhost:3000/resources/blogs/${blogPost.slug}`);
}

(async () => {
  try {
    const imageUrl = await uploadImage();
    console.log(`✅ Image uploaded: ${imageUrl}`);
    await publishBlog(imageUrl);
  } catch (err) {
    console.error('❌ Error:', err.message || err);
    process.exit(1);
  }
})();
