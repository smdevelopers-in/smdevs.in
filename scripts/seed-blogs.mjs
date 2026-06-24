/**
 * Seed script: POST 2 new blog posts to the production /api/blogs endpoint.
 * Targeting: "what is schema markup" + "what is keyword density"
 * Run: node scripts/seed-blogs.mjs
 */

const BASE_URL = "https://smdevs.in";

const blogs = [
  {
    title: "What Is Schema Markup? A Complete Guide to Structured Data",
    slug: "what-is-schema-markup-complete-guide",
    category: "SEO",
    author: "SM Dev Team",
    featuredImage: "https://smdevs.in/og-image.png",
    featuredImageAlt: "What is schema markup - structured data guide",
    focusKeyphrase: "what is schema markup",
    metaTitle: "What Is Schema Markup? Complete Structured Data Guide 2025",
    metaDescription: "Schema markup is structured data code you add to HTML so search engines understand your content. Learn what schema markup is, types, and how to implement it free.",
    publishDate: new Date().toISOString(),
    status: "published",
    tldr: `Schema markup is code (JSON-LD) added to your HTML that tells search engines exactly what your content means.
It uses the Schema.org vocabulary standardized by Google, Bing, Yahoo, and Yandex.
Valid schema markup can unlock rich results: star ratings, FAQs, How-Tos, breadcrumbs in Google Search.
The most common formats are JSON-LD (recommended), Microdata, and RDFa.
You can validate your schema markup for free using our Schema Validator tool.`,
    content: `
<h2>What Is Schema Markup?</h2>
<p>Schema markup (also called structured data or schema code) is a standardized vocabulary of code that you add to your website's HTML. It helps search engines like Google, Bing, and Yahoo understand the <em>meaning</em> of your content — not just its words.</p>
<p>For example, if your page contains a recipe, schema markup explicitly tells Google: "This is a recipe. It takes 30 minutes. It has 4 stars from 200 reviews. It contains 350 calories." Without schema, Google has to guess — and it often misinterprets content, missing out on rich result opportunities.</p>

<h2>What Is Schema Markup Language?</h2>
<p>Schema markup is based on a shared vocabulary called <strong>Schema.org</strong>, created in 2011 through a collaboration between Google, Bing, Yahoo, and Yandex. It defines hundreds of entity types — from Articles and FAQs to Products, Events, Recipes, and Job Postings — each with their own set of properties.</p>
<p>The three main formats for writing schema markup are:</p>
<ul>
  <li><strong>JSON-LD</strong> (JavaScript Object Notation for Linked Data) — Recommended by Google. Written in a &lt;script&gt; block in the page &lt;head&gt;. Easy to add without touching your body HTML.</li>
  <li><strong>Microdata</strong> — Embedded directly in your HTML elements using attributes like <code>itemscope</code> and <code>itemprop</code>.</li>
  <li><strong>RDFa</strong> — Similar to Microdata but based on the RDF standard. Rarely used today.</li>
</ul>

<h2>What Is Structured Data Markup?</h2>
<p>Structured data markup and schema markup are effectively the same thing — terms used interchangeably in the SEO world. "Structured data" refers to the concept of organizing information in a machine-readable format. "Schema markup" refers specifically to implementing that structured data using the Schema.org vocabulary.</p>
<p>When Google's documentation refers to structured data, it's describing the practice of using schema markup to communicate page content to Googlebot in a predictable, parseable format.</p>

<h2>Why Does Schema Markup Matter for SEO?</h2>
<p>Schema markup matters because it directly influences how your pages appear in search results. Pages with valid structured data can qualify for <strong>rich results</strong> — enhanced search listings that display additional information beyond the basic title and meta description:</p>
<ul>
  <li>⭐ Star ratings and review counts (Review schema)</li>
  <li>❓ FAQ dropdowns directly in the SERP (FAQPage schema)</li>
  <li>🍞 Breadcrumb navigation paths (BreadcrumbList schema)</li>
  <li>🏷️ Product prices, availability, and offers (Product schema)</li>
  <li>📅 Event dates and locations (Event schema)</li>
  <li>👔 Job postings with salary and location (JobPosting schema)</li>
</ul>
<p>Rich results consistently achieve higher click-through rates (CTR) than standard blue-link results. Studies show that FAQ rich results alone can increase organic CTR by 20–30% for informational queries.</p>

<h2>How to Implement Schema Markup on Your Website</h2>
<p>Implementing schema markup follows a simple process:</p>
<ol>
  <li><strong>Identify the right schema type</strong> — Visit Schema.org or use our <a href="/tools/seo/schema-generator">Schema Generator</a> to find the appropriate type for your content (Article, Product, FAQ, etc.).</li>
  <li><strong>Generate the JSON-LD code</strong> — Use our free <a href="/tools/seo/schema-generator">Schema Generator</a> to create valid markup without writing code manually.</li>
  <li><strong>Validate before publishing</strong> — Paste your code into our <a href="/tools/seo/schema-validator">Schema Validator</a> to check for errors. Google will not generate rich results from invalid markup.</li>
  <li><strong>Add to your page</strong> — Insert the validated &lt;script type="application/ld+json"&gt; block inside your page's &lt;head&gt; section.</li>
  <li><strong>Test in Google's Rich Results Test</strong> — Use Google's official tool to confirm eligibility for rich results.</li>
</ol>

<h2>Types of Schema Markup (Most Important for SEO)</h2>
<p>The Schema.org vocabulary includes over 800 types, but a handful are most impactful for organic search performance:</p>
<ul>
  <li><strong>Article / BlogPosting</strong> — For news articles and blog posts. Helps Google display publication dates and author bylines.</li>
  <li><strong>FAQPage</strong> — Generates FAQ dropdown accordions directly in the SERP. Excellent for informational content.</li>
  <li><strong>Product</strong> — Enables price, availability, and rating displays in shopping results.</li>
  <li><strong>LocalBusiness</strong> — Connects your site to Google Business Profile data for local SEO.</li>
  <li><strong>BreadcrumbList</strong> — Displays your site's navigation hierarchy in the SERP snippet.</li>
  <li><strong>SoftwareApplication</strong> — For SaaS tools and apps — displays ratings and app category in search.</li>
  <li><strong>HowTo</strong> — Step-by-step instruction schema that can generate visual step displays in rich results.</li>
</ul>

<h2>Schema Markup Checklist: Common Mistakes to Avoid</h2>
<ul>
  <li>❌ Marking up content that isn't visible on the page (violates Google's guidelines)</li>
  <li>❌ Using deprecated properties that Google no longer supports</li>
  <li>❌ Missing required fields (e.g., a Product schema without name or offers)</li>
  <li>❌ Adding FAQPage schema to pages that don't actually contain the FAQ content</li>
  <li>❌ Forgetting to validate after changes — broken schema is worse than none</li>
</ul>

<h2>Free Schema Tools</h2>
<p>You can use our free tools to generate and validate schema markup without writing a single line of code:</p>
<ul>
  <li><a href="/tools/seo/schema-generator">Schema Markup Generator</a> — Generate JSON-LD for 10+ schema types instantly</li>
  <li><a href="/tools/seo/schema-validator">Schema Markup Validator</a> — Check your existing markup for errors and warnings</li>
</ul>

<details>
<summary>What is the difference between schema markup and meta tags?</summary>
<p>Meta tags (title and description) control what users see in search results. Schema markup communicates the structure and meaning of your page content to search engine crawlers. Both are important — meta tags drive CTR for standard results, while schema markup can unlock rich results that stand out further.</p>
</details>

<details>
<summary>Does schema markup directly improve Google rankings?</summary>
<p>Schema markup is not a direct Google ranking factor, but it indirectly improves rankings through higher CTR (rich results attract more clicks), better content understanding (Google can better match your page to relevant queries), and improved dwell time from users who find exactly what they searched for.</p>
</details>

<details>
<summary>Is JSON-LD better than Microdata for schema markup?</summary>
<p>Yes. Google explicitly recommends JSON-LD for structured data implementation because it keeps the schema code separate from your HTML content, making it easier to add, update, and maintain. JSON-LD schema lives in a &lt;script&gt; block in the &lt;head&gt; — no need to modify your body HTML.</p>
</details>

<details>
<summary>How do I test if my schema markup is working?</summary>
<p>Use our free <a href="/tools/seo/schema-validator">Schema Validator</a> for instant checks, and Google's Rich Results Test (search.google.com/test/rich-results) to see which rich result types your page qualifies for. After deploying, check Google Search Console's "Rich Results" report to monitor rich result impressions and clicks.</p>
</details>
`
  },

  {
    title: "What Is Keyword Density? SEO Guide to Content Optimization",
    slug: "what-is-keyword-density-complete-seo-guide",
    category: "SEO",
    author: "SM Dev Team",
    featuredImage: "https://smdevs.in/og-image.png",
    featuredImageAlt: "What is keyword density - SEO content optimization guide",
    focusKeyphrase: "what is keyword density",
    metaTitle: "What Is Keyword Density? SEO Guide to Content Optimization",
    metaDescription: "Keyword density is the percentage of times a keyword appears in your content. Learn what the ideal keyword density is, how to calculate it, and avoid keyword stuffing.",
    publishDate: new Date().toISOString(),
    status: "published",
    tldr: `Keyword density is the percentage of times a target keyword appears relative to total word count.
The traditional ideal range is 1–2% — enough to signal relevance without stuffing.
Modern SEO focuses on semantic relevance and topical depth, not hitting a specific density number.
Keyword stuffing (over-optimization) is penalized by Google's Panda and Helpful Content algorithms.
Use our free Keyword Density Checker to analyze your content before publishing.`,
    content: `
<h2>What Is Keyword Density?</h2>
<p>Keyword density is the percentage of times a target keyword or phrase appears in a piece of content relative to the total word count. It is calculated as:</p>
<p><strong>Keyword Density = (Number of keyword occurrences ÷ Total word count) × 100</strong></p>
<p>For example, if your 1,000-word article contains the phrase "keyword density" 10 times, the keyword density is 1%. If it appears 30 times, the density is 3%.</p>

<h2>What Is the Ideal Keyword Density for SEO?</h2>
<p>The commonly cited ideal keyword density range is <strong>1% to 2%</strong> for your primary target keyword. This is a rough guideline rather than a strict rule — Google's algorithm does not penalize pages for having 1.5% vs. 2.1% density. What it does penalize is <em>keyword stuffing</em>: the practice of forcing a keyword into content unnaturally to manipulate rankings.</p>
<p>For a 1,000-word article, a 1–2% density means your target keyword should appear naturally around 10–20 times. For a 2,000-word post, 20–40 times is reasonable — but only if each use reads naturally and serves the reader.</p>

<h2>Keyword Density vs. TF-IDF: The Modern Approach</h2>
<p>While keyword density is still a useful audit metric, modern SEO has largely moved toward <strong>TF-IDF</strong> (Term Frequency–Inverse Document Frequency). TF-IDF measures how important a term is relative to a corpus of documents — essentially asking: does this page use this term more or less than competing pages?</p>
<p>Google's algorithms also heavily weight <strong>semantic relevance</strong>: the presence of related terms, synonyms, and conceptually connected phrases (LSI keywords) that signal deep topical coverage. A page that covers "keyword density," "keyword frequency," "content optimization," "on-page SEO," and "keyword stuffing" in a natural, thorough way will outperform a page that simply repeats "keyword density" at a high density.</p>

<h2>What Is Keyword Stuffing?</h2>
<p>Keyword stuffing is the over-use of a keyword in an unnatural, manipulative way. It was a common black-hat SEO tactic in the early 2000s — pages would repeat keywords hundreds of times, sometimes hidden in white text on white backgrounds, to manipulate Google's early ranking algorithm.</p>
<p>Google's Panda algorithm update (2011) and subsequent Helpful Content updates have made keyword stuffing counterproductive. Over-optimized content now actively hurts rankings. Signs of keyword stuffing include:</p>
<ul>
  <li>Repeating the same phrase in every sentence</li>
  <li>Lists of keywords with no context</li>
  <li>Unnatural phrasing like "our keyword density SEO keyword density tool checks keyword density"</li>
  <li>Keyword density above 3–4% for competitive terms</li>
</ul>

<h2>How to Check Keyword Density</h2>
<p>You can check keyword density manually or use a tool:</p>
<ol>
  <li><strong>Manual method</strong>: Copy your content into a word counter, note the total word count. Then use Ctrl+F to count occurrences of your keyword. Divide occurrences by total words and multiply by 100.</li>
  <li><strong>Tool method</strong>: Use our free <a href="/tools/seo/keyword-density-checker">Keyword Density Checker</a>. Paste your content, enter your target keyword, and instantly see the density percentage, frequency count, and flagged over-used terms.</li>
</ol>

<h2>Keyword Density Best Practices for 2025</h2>
<ul>
  <li><strong>Write for humans first</strong> — If your keyword use sounds forced or robotic to a human reader, Google's algorithms will likely penalize it.</li>
  <li><strong>Use semantic variations</strong> — Instead of repeating "keyword density" 20 times, naturally incorporate "keyword frequency," "content optimization," "word density," and "keyword usage."</li>
  <li><strong>Optimize key positions</strong> — Ensure your target keyword appears in the page title (H1), the first 100 words, at least one H2, and the meta description. Density in body text matters less than these strategic placements.</li>
  <li><strong>Audit before publishing</strong> — Run your content through a density checker before publishing. If any keyword exceeds 3%, review for natural alternatives.</li>
  <li><strong>Check competitor density</strong> — Analyze top-ranking pages for your target keyword. This reveals the "expected" density for your query and helps you calibrate.</li>
</ul>

<h2>The Relationship Between Keyword Density and Content Quality</h2>
<p>Google's Helpful Content System (2022–2024) represents a fundamental shift in how content quality is evaluated. Rather than relying primarily on keyword signals, Google now evaluates whether content demonstrates genuine expertise, provides a satisfying answer to the query, and serves the reader's actual needs.</p>
<p>This means the best-practice guidance for keyword density has shifted from "hit the right percentage" to "cover the topic comprehensively and write like an expert." A 3,000-word guide covering every sub-topic of keyword density, semantic SEO, TF-IDF, and content optimization will outperform a 800-word article with a perfect 1.5% density — because it signals genuine topical authority.</p>

<h2>How to Use the Keyword Density Checker</h2>
<p>Our free <a href="/tools/seo/keyword-density-checker">Keyword Density Checker</a> lets you analyze any piece of content in seconds:</p>
<ol>
  <li>Paste your article, blog post, or page content into the tool.</li>
  <li>The tool automatically calculates the density of all significant terms.</li>
  <li>Review the top keywords by frequency — terms with unusually high density are flagged.</li>
  <li>Make targeted replacements to reduce over-used terms and improve natural variety.</li>
</ol>

<details>
<summary>What is a good keyword density percentage?</summary>
<p>For most SEO purposes, a keyword density of 1% to 2% for your primary target keyword is considered healthy. For longer-tail phrases (3+ words), 0.5% to 1% is typically sufficient. The key signal is natural, contextually appropriate usage — not hitting an exact percentage.</p>
</details>

<details>
<summary>Does keyword density still matter in 2025?</summary>
<p>Keyword density as a standalone metric matters less than it did a decade ago. Modern Google primarily evaluates semantic relevance, topical authority, and content helpfulness. However, keyword density is still a useful audit signal — extremely low density may mean you're not covering the topic sufficiently, while very high density suggests over-optimization risk.</p>
</details>

<details>
<summary>Can too many keywords hurt my rankings?</summary>
<p>Yes. Keyword stuffing — forcing a keyword unnaturally into content at high frequency — is penalized by Google's algorithms. If your keyword density exceeds 3–4% and the usage reads unnaturally, you risk ranking penalties. Replace repeated instances with synonyms and related phrases to maintain semantic richness without over-optimization.</p>
</details>

<details>
<summary>How is keyword density different from keyword frequency?</summary>
<p>Keyword frequency is the raw count of how many times a keyword appears in a document. Keyword density is that count expressed as a percentage of total word count. A keyword appearing 15 times in a 500-word article has a frequency of 15 and a density of 3%. The same keyword appearing 15 times in a 2,000-word article still has a frequency of 15 but a density of only 0.75%.</p>
</details>
`
  }
];

async function seedBlog(blog) {
  const res = await fetch(`${BASE_URL}/api/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  const data = await res.json();
  if (data.success) {
    console.log(`✅ Published: ${blog.slug}`);
  } else {
    console.error(`❌ Failed: ${blog.slug} — ${data.error}`);
  }
}

for (const blog of blogs) {
  await seedBlog(blog);
}
