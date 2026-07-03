/**
 * Seed 3 competitor-researched blog posts.
 * node scripts/seed-blogs-batch3.mjs
 */

const BASE_URL = "https://smdevs.in";

const blogs = [

  // ──────────────────────────────────────────────────────────
  // BLOG 1 – Open Graph Tags
  // Competitor gap: Semrush/Moz cover it technically; no clean
  // beginner-friendly guide with real examples + tool CTA.
  // ──────────────────────────────────────────────────────────
  {
    title: "What Are Open Graph Tags? Complete Guide with Examples (2025)",
    slug: "what-are-open-graph-tags-complete-guide",
    category: "SEO",
    author: "SM Dev Team",
    featuredImage: "https://res.cloudinary.com/dkfj0zehx/image/upload/v1783060976/smdevs_blog/open-graph-tags-seo-guide.webp",
    featuredImageAlt: "What are Open Graph tags - OG tags guide with social media preview examples",
    focusKeyphrase: "open graph tags",
    metaTitle: "What Are Open Graph Tags? Complete Guide with Examples",
    metaDescription: "Open Graph tags control how your pages look when shared on Facebook, LinkedIn & WhatsApp. Learn what OG tags are, which ones matter, and how to add them correctly.",
    publishDate: new Date().toISOString(),
    status: "published",
    tldr: `Open Graph (OG) tags are HTML meta tags that control how your page appears when shared on social media platforms like Facebook, LinkedIn, WhatsApp, and Slack.
Without OG tags, platforms auto-generate ugly, broken previews that kill click-through rates.
The 4 essential OG tags are: og:title, og:description, og:image (1200×630px), and og:url.
OG tags are not a Google ranking factor, but they directly impact social traffic, CTR, and brand perception.
Use our free Open Graph Generator to create and preview all your OG tags in under 60 seconds.`,
    content: `
<h2>What Are Open Graph Tags?</h2>
<p>Open Graph (OG) tags are a set of HTML meta tags placed in the <code>&lt;head&gt;</code> section of a webpage that control how that page appears when shared on social media platforms and messaging apps. They were created by Facebook in 2010 and are now used universally by Facebook, LinkedIn, Twitter/X, WhatsApp, Slack, Discord, and most other platforms that generate link previews.</p>
<p>Without Open Graph tags, platforms like LinkedIn will attempt to scrape your page and guess what to show — often pulling an irrelevant image, a truncated or missing title, and no description. The result is a blank, generic-looking link that nobody clicks. OG tags give you complete control over the preview.</p>
<p>In HTML, Open Graph tags look like this:</p>
<pre><code>&lt;meta property="og:title" content="What Are Open Graph Tags? Complete Guide" /&gt;
&lt;meta property="og:description" content="Learn how OG tags control your social media previews and boost CTR." /&gt;
&lt;meta property="og:image" content="https://yoursite.com/images/og-guide.jpg" /&gt;
&lt;meta property="og:url" content="https://yoursite.com/open-graph-guide" /&gt;
&lt;meta property="og:type" content="article" /&gt;</code></pre>

<h2>Why Open Graph Tags Matter for SEO (Indirectly)</h2>
<p>Open Graph tags are <strong>not a direct Google ranking factor</strong>. Google has confirmed this explicitly. However, they have a powerful <em>indirect</em> impact on your SEO performance:</p>
<ul>
  <li><strong>Higher social CTR:</strong> A compelling OG image and title generates significantly more clicks from social shares than a broken auto-generated preview. More clicks = more traffic.</li>
  <li><strong>More backlinks:</strong> Content that looks professional when shared is more likely to be cited and linked to by other sites.</li>
  <li><strong>Better brand perception:</strong> Consistent, high-quality OG previews across all social platforms reinforce trust and authority — signals Google increasingly uses to evaluate content quality.</li>
  <li><strong>Social engagement signals:</strong> High engagement (clicks, shares, comments) on social platforms can drive traffic spikes that lead to improved organic visibility.</li>
</ul>
<p>Bottom line: OG tags don't move you up Google's rankings directly, but the traffic and authority they generate through social media do.</p>

<h2>The 4 Essential Open Graph Tags (Every Page Needs These)</h2>

<h3>1. og:title</h3>
<p>The title displayed in the social media preview card. This can differ from your HTML <code>&lt;title&gt;</code> tag — and often should. While your meta title is optimized for Google and keyword ranking, your <code>og:title</code> should be optimized for <strong>social engagement</strong>: punchy, benefit-driven, and designed to stop the scroll.</p>
<pre><code>&lt;meta property="og:title" content="On-Page SEO Checklist: 20 Things to Check Before Publishing" /&gt;</code></pre>
<p><strong>Best practice:</strong> Keep under 60–70 characters to avoid truncation on mobile previews. Front-load the most compelling part of the title.</p>

<h3>2. og:description</h3>
<p>The descriptive text below the title in the preview card. Like the <code>og:title</code>, this can differ from your HTML meta description. Use it to expand on the benefit and give users a specific reason to click.</p>
<pre><code>&lt;meta property="og:description" content="Use this 20-point checklist to audit every page before it goes live. Covers title tags, schema, internal links, Core Web Vitals and more." /&gt;</code></pre>
<p><strong>Best practice:</strong> Aim for 155–160 characters. Include a clear value proposition or a specific number/fact that builds curiosity.</p>

<h3>3. og:image</h3>
<p>The image that dominates the social preview card. This is the most visually impactful OG tag — the difference between a link preview nobody looks at and one that stops the scroll entirely.</p>
<pre><code>&lt;meta property="og:image" content="https://yoursite.com/images/open-graph-guide-1200x630.jpg" /&gt;</code></pre>
<p><strong>Best practice:</strong> Use exactly <strong>1200×630 pixels</strong> — this is the universal standard for crisp rendering across all platforms and devices. Use a file under 8MB. Avoid small text in the image (it'll be unreadable on mobile). Always use an absolute URL (not a relative path).</p>

<h3>4. og:url</h3>
<p>The canonical URL of the page. This consolidates social share counts and engagement signals to one URL, even if multiple URL variations exist (with/without trailing slash, with UTM parameters, etc.).</p>
<pre><code>&lt;meta property="og:url" content="https://smdevs.in/tools/seo/open-graph-generator" /&gt;</code></pre>
<p><strong>Best practice:</strong> Match this exactly to your page's canonical URL.</p>

<h2>Additional Open Graph Tags (Recommended)</h2>

<h3>og:type</h3>
<p>Declares the type of content. The default is <code>website</code>. For blog posts and articles, use <code>article</code> to unlock additional metadata fields (author, publish date, tags) that platforms like LinkedIn use to categorize and distribute content.</p>
<pre><code>&lt;meta property="og:type" content="article" /&gt;</code></pre>

<h3>og:site_name</h3>
<p>Your brand name. Displayed below the preview title on some platforms. Helps with brand recognition in social feeds.</p>
<pre><code>&lt;meta property="og:site_name" content="SM Developers" /&gt;</code></pre>

<h3>og:locale</h3>
<p>Specifies the language and region of the page content. Important for international sites. Defaults to <code>en_US</code>.</p>
<pre><code>&lt;meta property="og:locale" content="en_IN" /&gt;</code></pre>

<h2>Twitter Card Tags vs Open Graph Tags</h2>
<p>Twitter/X uses its own card system alongside (or instead of) Open Graph tags. Twitter Card tags take priority on Twitter — but if Twitter Card tags are absent, Twitter falls back to OG tags. For maximum compatibility, implement both:</p>
<pre><code>&lt;!-- Twitter Cards --&gt;
&lt;meta name="twitter:card" content="summary_large_image" /&gt;
&lt;meta name="twitter:title" content="Your Title Here" /&gt;
&lt;meta name="twitter:description" content="Your description here." /&gt;
&lt;meta name="twitter:image" content="https://yoursite.com/og-image.jpg" /&gt;</code></pre>
<p>Use <code>summary_large_image</code> as your Twitter card type — it displays a full-width image preview (the "big card" format) instead of a small thumbnail, which dramatically improves click rates on Twitter/X.</p>

<h2>Good vs Bad Open Graph Tag Examples</h2>

<h3>❌ Bad og:image Example</h3>
<p>Using your site logo (typically square, small, and lacks context) as the OG image. When a 512×512 logo is displayed in a 1200×630 preview slot, platforms either stretch it (blurry) or add white bars (ugly). Either way, the preview looks broken and unprofessional.</p>

<h3>✅ Good og:image Example</h3>
<p>A purpose-built 1200×630 image that visually communicates the content topic — a headline, a relevant graphic, and brand colors. The SM Developers blog posts you're reading right now each have a custom Cloudinary-hosted 1200×630 OG image specifically designed for social sharing.</p>

<h3>❌ Bad og:title Example</h3>
<pre><code>&lt;meta property="og:title" content="Page 1 | SM Developers" /&gt;</code></pre>
<p>No keyword, no value, could be any page on the internet.</p>

<h3>✅ Good og:title Example</h3>
<pre><code>&lt;meta property="og:title" content="Free Open Graph Generator — Preview Your Social Cards Instantly" /&gt;</code></pre>
<p>Clear, benefit-driven, includes the tool name and primary keyword.</p>

<h2>How to Add Open Graph Tags to Your Website</h2>
<ul>
  <li><strong>HTML/custom sites:</strong> Add OG meta tags manually inside the <code>&lt;head&gt;</code> of each page's HTML.</li>
  <li><strong>WordPress:</strong> Plugins like Yoast SEO, Rank Math, or All in One SEO handle OG tags automatically per post/page.</li>
  <li><strong>Next.js:</strong> Use the <code>metadata</code> export with <code>openGraph</code> object — Next.js generates the correct meta tags automatically.</li>
  <li><strong>Shopify:</strong> Built into most themes; customize per product through the SEO section in product settings.</li>
</ul>

<h2>How to Generate and Preview Open Graph Tags for Free</h2>
<p>Use our free <a href="/tools/seo/open-graph-generator">Open Graph Generator</a> to build all your OG tags, preview exactly how your link will look on Facebook, Twitter, and LinkedIn, and copy the ready-to-paste code — all in under 60 seconds, no account required.</p>
<p>After implementing your tags, you can validate them using Facebook's Sharing Debugger (developers.facebook.com/tools/debug/) or LinkedIn's Post Inspector. These tools fetch your page and show you the exact preview social platforms will display.</p>

<details>
<summary>What is an Open Graph image and what size should it be?</summary>
<p>An Open Graph image (og:image) is the preview image that social platforms display when a link to your page is shared. The recommended size is 1200×630 pixels — this is the universal standard for full-quality rendering across Facebook, LinkedIn, Twitter/X, WhatsApp, and Slack. The image must be hosted at a publicly accessible URL (not password-protected or behind authentication) and should be under 8MB in file size.</p>
</details>

<details>
<summary>Do Open Graph tags affect Google rankings?</summary>
<p>No — Open Graph tags are not a direct Google ranking signal. Google has confirmed this. However, OG tags indirectly improve SEO performance by increasing social click-through rates (which drives more traffic), encouraging more backlinks (social content that looks professional gets shared more), and building brand authority signals that Google's algorithms increasingly factor into rankings through measures like E-E-A-T evaluation.</p>
</details>

<details>
<summary>What happens if I don't add Open Graph tags?</summary>
<p>Without OG tags, social platforms scrape your page and auto-generate previews — usually pulling a random image, a truncated or missing title, and no description. These auto-generated previews are almost always worse than manually crafted ones: they look broken, unprofessional, and generate far fewer clicks. Every page you want shared on social media should have OG tags.</p>
</details>

<details>
<summary>What is the difference between og:title and the HTML title tag?</summary>
<p>The HTML &lt;title&gt; tag is optimized for search engines — it appears as the blue clickable headline in Google search results and is the most important on-page SEO element. The og:title is optimized for social media sharing — it appears in link preview cards on platforms like Facebook, LinkedIn, and Twitter. They can (and often should) be different: the &lt;title&gt; targets keyword ranking, while og:title targets social engagement and click-through rate from social feeds.</p>
</details>
`
  },

  // ──────────────────────────────────────────────────────────
  // BLOG 2 – On-Page SEO Checklist
  // Competitor gap: High competition but no tool-site with a
  // specific actionable checklist linking to their own tools.
  // ──────────────────────────────────────────────────────────
  {
    title: "On-Page SEO Checklist: 20 Things to Check Before You Publish",
    slug: "on-page-seo-checklist-20-things-before-publish",
    category: "SEO",
    author: "SM Dev Team",
    featuredImage: "https://res.cloudinary.com/dkfj0zehx/image/upload/v1783060975/smdevs_blog/on-page-seo-checklist.webp",
    featuredImageAlt: "On-page SEO checklist - 20 things to check before publishing a blog post",
    focusKeyphrase: "on page SEO checklist",
    metaTitle: "On-Page SEO Checklist: 20 Things to Check Before Publishing",
    metaDescription: "A 20-point on-page SEO checklist for every blog post and landing page. Covers title tags, schema, internal links, Core Web Vitals, and more. Free tools included.",
    publishDate: new Date().toISOString(),
    status: "published",
    tldr: `On-page SEO covers everything you control directly on a page to help it rank — title tags, headings, content, schema, internal links, and page speed.
The single most impactful on-page element is your meta title tag — get this right first.
Google's Helpful Content System evaluates pages for E-E-A-T: Experience, Expertise, Authoritativeness, and Trustworthiness.
Schema markup (especially FAQ and HowTo) can unlock rich results that dramatically boost CTR even without moving up in rankings.
Run every page through our free On-Page SEO Checker before publishing to catch missing elements automatically.`,
    content: `
<h2>What Is On-Page SEO?</h2>
<p>On-page SEO (also called on-site SEO) refers to all the optimization practices applied directly to a webpage's content and HTML source code to improve its visibility in search engine results. Unlike off-page SEO (which involves external factors like backlinks), on-page SEO is entirely within your control.</p>
<p>A thorough on-page SEO audit covers your title tags, meta descriptions, heading structure, content quality, keyword placement, internal linking, schema markup, image optimization, URL structure, and page speed. Getting all of these right before you publish is far more efficient than retroactively fixing them after a page has been indexed with problems.</p>

<h2>On-Page SEO Checklist: 20 Must-Check Items</h2>

<h3>Title & Meta Tags (Critical)</h3>

<h4>1. ✅ Unique, Keyword-Focused Title Tag (50–60 Characters)</h4>
<p>Your meta title is the single most important on-page SEO element. Place your primary target keyword as close to the beginning as possible. Keep it under 60 characters to avoid truncation in Google results. Every page on your site must have a completely unique title — duplicate titles are one of the most common and costly SEO mistakes.</p>
<p>Use our free <a href="/tools/seo/serp-preview">SERP Preview Tool</a> to see exactly how your title will appear in Google before publishing.</p>

<h4>2. ✅ Meta Description (145–155 Characters)</h4>
<p>Write a compelling meta description that includes your primary keyword naturally and gives users a specific reason to click. While Google doesn't rank based on meta descriptions, a well-written description significantly increases click-through rate (CTR) from the same ranking position.</p>

<h4>3. ✅ Open Graph Tags (og:title, og:description, og:image)</h4>
<p>Add OG tags so your page looks great when shared on LinkedIn, Facebook, WhatsApp, and Twitter. The og:image should be 1200×630px. Use our <a href="/tools/seo/open-graph-generator">Open Graph Generator</a> to build them in seconds.</p>

<h3>Heading Structure (High Impact)</h3>

<h4>4. ✅ Single H1 That Matches Search Intent</h4>
<p>Every page should have exactly one H1 tag containing your primary keyword. The H1 should directly answer what the user is searching for — if someone searches "on-page SEO checklist," your H1 should make it immediately obvious they've found the right page.</p>

<h4>5. ✅ Logical H2/H3 Hierarchy</h4>
<p>Use H2s for main sections and H3s for subsections. This structure helps both readers skim content and Googlebot understand your page's topic hierarchy. Include keyword variations and related terms in your subheadings — this is how you rank for semantic variations of your target keyword.</p>

<h4>6. ✅ Question-Format Headings for "What Is" Queries</h4>
<p>For any informational content targeting "what is X" or "how to X" queries, include the exact question as an H2 with a direct, concise answer in the first sentence below it. Google's AI Overviews and People Also Ask boxes heavily feature this format.</p>

<h3>Content Quality (E-E-A-T)</h3>

<h4>7. ✅ Primary Keyword in First 100 Words</h4>
<p>Include your primary target keyword naturally within the first paragraph of body content. This early signal confirms to Googlebot that your page is relevant to the query before it reads further.</p>

<h4>8. ✅ Semantic Keywords and LSI Terms Throughout</h4>
<p>Don't repeat the same keyword phrase over and over. Instead, use semantic variations and related terms. For an article about "on-page SEO," also use phrases like "on-site optimization," "page-level SEO," "title tag optimization," and "meta tag best practices." Use our <a href="/tools/seo/keyword-density-checker">Keyword Density Checker</a> to audit your content balance before publishing.</p>

<h4>9. ✅ Content Depth Matches Keyword Intent</h4>
<p>Match your content length and format to what's already ranking for your target keyword. Check the SERP: if page one is dominated by 2,000+ word guides, a 400-word post won't rank. If page one shows tool pages, a blog post won't rank. Run the query through our <a href="/tools/seo/keyword-intent-analyzer">Keyword Intent Analyzer</a> to confirm the correct format before writing.</p>

<h4>10. ✅ Author Byline and Publication Date</h4>
<p>Google's E-E-A-T guidelines (Experience, Expertise, Authoritativeness, Trustworthiness) reward content that demonstrates credible authorship. Add a clear author name and publication date. For YMYL (Your Money, Your Life) topics — health, finance, trading — E-E-A-T signals are especially critical.</p>

<h3>URL and Technical Structure</h3>

<h4>11. ✅ Short, Keyword-Rich URL Slug</h4>
<p>Your URL should be short, descriptive, and include your primary keyword. Use hyphens to separate words (not underscores). Avoid stop words (a, the, of, and) in URLs. Example: <code>/on-page-seo-checklist</code> not <code>/blog/the-complete-guide-to-on-page-seo-checklist-2025</code>.</p>

<h4>12. ✅ Canonical Tag Set Correctly</h4>
<p>Every page should have a self-referencing canonical tag in the <code>&lt;head&gt;</code> to prevent duplicate content issues from URL variations (trailing slashes, query parameters, HTTP vs HTTPS). This is especially important for e-commerce and paginated content.</p>

<h3>Internal and External Linking</h3>

<h4>13. ✅ 3–5 Internal Links to Related Content</h4>
<p>Internal links distribute PageRank throughout your site, help Googlebot discover and understand related content, and keep users engaged longer. Every new piece of content should link to 3–5 related pages already on your site. Use descriptive anchor text (not "click here") that includes keywords.</p>

<h4>14. ✅ Link to 1–2 High-Authority External Sources</h4>
<p>Citing reputable external sources (Google's official documentation, academic research, established industry references) signals to Google that your content is well-researched and trustworthy. Don't be afraid of linking out — Google doesn't penalize external links, and it builds reader trust.</p>

<h4>15. ✅ Check for Broken Links Before Publishing</h4>
<p>Broken outbound links damage user experience and signal poor content maintenance to Google. Use our free <a href="/tools/seo/broken-link-checker">Broken Link Checker</a> to scan your page before it goes live.</p>

<h3>Schema Markup</h3>

<h4>16. ✅ FAQ Schema for Informational Content</h4>
<p>If your page includes a Q&A section, add FAQPage schema markup. When valid, this generates FAQ accordion dropdowns directly in the Google SERP, sometimes doubling the visual space your result occupies and significantly increasing CTR. Validate your schema with our free <a href="/tools/seo/schema-validator">Schema Validator</a>.</p>

<h4>17. ✅ Article or SoftwareApplication Schema</h4>
<p>For blog posts, add Article schema to help Google understand the content type, author, and publication date. For tool pages, SoftwareApplication schema helps Google classify your tool and can enable star ratings in search results. Use our <a href="/tools/seo/schema-generator">Schema Generator</a> to create the correct markup for any content type.</p>

<h3>Images and Media</h3>

<h4>18. ✅ Descriptive File Names and Alt Text for All Images</h4>
<p>Rename images before uploading: <code>on-page-seo-checklist-2025.webp</code> not <code>IMG_0042.png</code>. Add descriptive alt text that describes the image for screen readers and provides keyword context for Google Images. Never stuff keywords into alt text — describe the image accurately.</p>

<h4>19. ✅ Images Compressed to Under 150KB (WebP Format)</h4>
<p>Large uncompressed images are one of the most common causes of poor Core Web Vitals scores (particularly Largest Contentful Paint). Convert to WebP format and compress before uploading. This alone can cut page load time by 30–50% on image-heavy pages.</p>

<h3>Page Experience</h3>

<h4>20. ✅ Run a Full On-Page SEO Audit</h4>
<p>Before clicking publish, run your URL through our free <a href="/tools/seo/on-page-seo-checker">On-Page SEO Checker</a>. It automatically scans your page for missing title tags, duplicate meta, broken links, schema errors, heading structure issues, and Core Web Vitals warnings — catching problems you might have missed manually.</p>

<h2>On-Page SEO Checklist Summary Table</h2>
<table>
  <thead>
    <tr><th>#</th><th>Element</th><th>Priority</th><th>Tool</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Unique title tag (50–60 chars, keyword near start)</td><td>🔴 Critical</td><td>SERP Preview</td></tr>
    <tr><td>2</td><td>Meta description (145–155 chars, includes keyword)</td><td>🔴 Critical</td><td>Meta Tag Generator</td></tr>
    <tr><td>3</td><td>Open Graph tags (title, description, 1200×630 image)</td><td>🟠 High</td><td>OG Generator</td></tr>
    <tr><td>4</td><td>Single H1 with primary keyword</td><td>🔴 Critical</td><td>On-Page Checker</td></tr>
    <tr><td>5</td><td>Logical H2/H3 heading hierarchy</td><td>🟠 High</td><td>On-Page Checker</td></tr>
    <tr><td>6</td><td>Question H2s for "what is / how to" queries</td><td>🟡 Medium</td><td>Manual</td></tr>
    <tr><td>7</td><td>Primary keyword in first 100 words</td><td>🟠 High</td><td>Keyword Density</td></tr>
    <tr><td>8</td><td>Semantic/LSI keyword variety throughout</td><td>🟠 High</td><td>Keyword Density</td></tr>
    <tr><td>9</td><td>Content depth matches SERP intent</td><td>🔴 Critical</td><td>Intent Analyzer</td></tr>
    <tr><td>10</td><td>Author byline and publication date</td><td>🟡 Medium</td><td>Manual</td></tr>
    <tr><td>11</td><td>Short keyword-rich URL slug</td><td>🟠 High</td><td>Manual</td></tr>
    <tr><td>12</td><td>Canonical tag set correctly</td><td>🟠 High</td><td>On-Page Checker</td></tr>
    <tr><td>13</td><td>3–5 internal links to related pages</td><td>🟠 High</td><td>Manual</td></tr>
    <tr><td>14</td><td>1–2 external links to authority sources</td><td>🟡 Medium</td><td>Manual</td></tr>
    <tr><td>15</td><td>No broken links on the page</td><td>🟠 High</td><td>Broken Link Checker</td></tr>
    <tr><td>16</td><td>FAQ schema (for Q&A content)</td><td>🟠 High</td><td>Schema Validator</td></tr>
    <tr><td>17</td><td>Article or SoftwareApp schema</td><td>🟡 Medium</td><td>Schema Generator</td></tr>
    <tr><td>18</td><td>Alt text and descriptive filenames for images</td><td>🟠 High</td><td>Manual</td></tr>
    <tr><td>19</td><td>Images compressed (WebP, under 150KB)</td><td>🟠 High</td><td>Manual</td></tr>
    <tr><td>20</td><td>Full on-page audit before publishing</td><td>🔴 Critical</td><td>On-Page Checker</td></tr>
  </tbody>
</table>

<details>
<summary>What is the most important on-page SEO factor?</summary>
<p>The meta title tag (title tag) is consistently ranked as the single most important on-page SEO factor. It's the primary signal Google uses to understand what a page is about, it appears as the blue clickable headline in search results, and it directly influences both ranking position and click-through rate. Every page must have a unique, keyword-focused title tag of 50–60 characters with the primary keyword near the beginning.</p>
</details>

<details>
<summary>How long should on-page SEO content be?</summary>
<p>Content length should match the dominant format of what's already ranking for your target keyword — check the SERP before writing. Informational guides and how-to posts typically perform best at 1,500–3,000 words when competitors are ranking with similar depth. However, length alone doesn't rank — comprehensiveness and relevance to search intent matter far more than hitting a word count target. A focused 800-word post that perfectly satisfies a query can outrank a padded 4,000-word article.</p>
</details>

<details>
<summary>What is E-E-A-T in SEO?</summary>
<p>E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness — a framework used in Google's Search Quality Rater Guidelines to evaluate content quality. Experience refers to first-hand knowledge of the topic. Expertise means demonstrated knowledge in the field. Authoritativeness is the reputation of the site and author. Trustworthiness covers accuracy, transparency, and site security. E-E-A-T signals include author bylines, external citations, factual accuracy, HTTPS, and clear editorial standards.</p>
</details>

<details>
<summary>Does on-page SEO still matter in 2025?</summary>
<p>Yes — on-page SEO is more important than ever in 2025. Google's Helpful Content System and AI Overviews have raised the bar for content quality and intent-matching. Basic on-page elements (title tags, meta descriptions, schema markup, heading structure) remain ranking signals. Meanwhile, newer factors like E-E-A-T signals, Core Web Vitals, and semantic keyword coverage have become increasingly decisive. A well-optimized page with strong on-page SEO now outcompetes poorly-optimized pages with even better backlinks.</p>
</details>
`
  },

  // ──────────────────────────────────────────────────────────
  // BLOG 3 – Position Sizing Formula
  // Competitor gap: Indian trading sites (Groww, Bajaj) cover
  // it at surface level; no in-depth guide with multiple
  // strategies + Indian market fee context + tool CTA.
  // ──────────────────────────────────────────────────────────
  {
    title: "Position Sizing Formula: How to Calculate Lot Size for Any Trade",
    slug: "position-sizing-formula-how-to-calculate-lot-size",
    category: "Trading",
    author: "SM Dev Team",
    featuredImage: "https://res.cloudinary.com/dkfj0zehx/image/upload/v1783060975/smdevs_blog/position-sizing-formula-trading.webp",
    featuredImageAlt: "Position sizing formula - how to calculate lot size for stocks, futures and options trading",
    focusKeyphrase: "position sizing formula",
    metaTitle: "Position Sizing Formula: How to Calculate Lot Size for Trading",
    metaDescription: "Learn the position sizing formula used by professional traders. Includes the 1% rule, worked examples for stocks and futures, and how to factor in brokerage fees.",
    publishDate: new Date().toISOString(),
    status: "published",
    tldr: `Position sizing determines how many shares or lots to buy on any trade — it's one of the most important risk management decisions you make.
The core formula: Position Size = (Account Size × Risk%) ÷ (Entry Price − Stop-Loss Price).
The 1% Rule means risking no more than 1–2% of total account capital on any single trade.
Wider stop-losses require proportionally smaller position sizes to keep risk constant.
Use our free Position Size Calculator to compute your exact lot size before placing any order.`,
    content: `
<h2>What Is Position Sizing in Trading?</h2>
<p>Position sizing is the process of determining how many shares, units, or lots to buy or sell on a single trade, based on your account size, risk tolerance, and stop-loss distance. It is arguably the most important risk management decision a trader makes — more important than entry strategy, indicator selection, or market timing.</p>
<p>Even a strategy with a 40% win rate can be highly profitable with correct position sizing. The same strategy can blow up an account with poor position sizing. Professional traders don't just ask "what to buy" — they ask "how much to buy and why."</p>

<h2>The Core Position Sizing Formula</h2>
<p>The standard position sizing formula used by professional traders worldwide is:</p>
<pre><code>Position Size = (Account Size × Risk Per Trade %) ÷ (Entry Price − Stop-Loss Price)</code></pre>
<p>This formula has three inputs:</p>
<ul>
  <li><strong>Account Size:</strong> Your total trading capital (the amount in your trading account)</li>
  <li><strong>Risk Per Trade %:</strong> The maximum percentage of your account you're willing to lose if the trade hits your stop-loss (typically 1–2%)</li>
  <li><strong>Entry Price − Stop-Loss Price:</strong> The distance from your entry to your stop-loss (also called "risk per share" or "stop distance")</li>
</ul>

<h2>Worked Example: Position Sizing for a Stock Trade</h2>
<p><strong>Scenario:</strong> You have a ₹5,00,000 trading account. You've identified a trade in Infosys at ₹1,800. Based on technical analysis, your stop-loss is at ₹1,760. You risk 1% of your capital per trade.</p>
<p><strong>Step 1: Calculate maximum risk amount</strong></p>
<pre><code>Risk Amount = ₹5,00,000 × 1% = ₹5,000</code></pre>
<p><strong>Step 2: Calculate risk per share</strong></p>
<pre><code>Risk Per Share = Entry − Stop = ₹1,800 − ₹1,760 = ₹40</code></pre>
<p><strong>Step 3: Calculate position size</strong></p>
<pre><code>Position Size = ₹5,000 ÷ ₹40 = 125 shares</code></pre>
<p><strong>Result:</strong> Buy 125 shares of Infosys. If price drops to your ₹1,760 stop-loss, you lose exactly ₹5,000 (1% of account). If price rises to your target of ₹1,880, you profit ₹10,000 (2% of account) — a 1:2 risk/reward ratio.</p>

<h2>The 1% Rule: Why Professional Traders Risk Only 1–2% Per Trade</h2>
<p>The 1% rule states that you should never risk more than 1% of your total account on a single trade. Some traders use 2%, and very experienced traders sometimes go to 3% — but rarely more.</p>
<p>Why? Because of drawdown math. If you risk 10% per trade and have a losing streak of 5 trades in a row (which happens to even the best traders), you've lost 41% of your account. Recovery from a 41% drawdown requires a 69% gain — increasingly difficult. But with 1% risk, 5 consecutive losses cost you only 4.9% of your account — a manageable setback you can recover from quickly.</p>
<table>
  <thead>
    <tr><th>Risk Per Trade</th><th>Account After 5 Losses</th><th>Required to Recover</th></tr>
  </thead>
  <tbody>
    <tr><td>1%</td><td>95.1% remaining</td><td>5.1% gain</td></tr>
    <tr><td>2%</td><td>90.4% remaining</td><td>10.6% gain</td></tr>
    <tr><td>5%</td><td>77.4% remaining</td><td>29.2% gain</td></tr>
    <tr><td>10%</td><td>59.0% remaining</td><td>69.5% gain</td></tr>
    <tr><td>20%</td><td>32.8% remaining</td><td>205% gain</td></tr>
  </tbody>
</table>
<p>The 1% rule keeps your account alive through inevitable losing streaks so you can continue trading when market conditions improve.</p>

<h2>Position Sizing for Futures and Options Trades</h2>

<h3>Futures Position Sizing</h3>
<p>For futures contracts, position sizing is calculated in lots, not shares. Each futures lot has a specific lot size defined by the exchange. The formula adjusts to:</p>
<pre><code>Number of Lots = (Account Size × Risk%) ÷ (Stop Distance × Lot Size)</code></pre>
<p><strong>Example:</strong> Nifty 50 Futures, lot size = 75 units. Entry = 23,500, Stop = 23,200, Stop distance = 300 points. Account = ₹10,00,000, Risk = 1% = ₹10,000.</p>
<pre><code>Number of Lots = ₹10,000 ÷ (300 × 75) = ₹10,000 ÷ ₹22,500 = 0.44 lots</code></pre>
<p>Since you can't trade fractional lots, round down to 0 lots — the trade is too large for your risk parameters. Either widen your stop (reduces precision), lower your risk %, or skip this trade. This is important discipline: if the math says don't take the trade, don't take the trade.</p>

<h3>Options Position Sizing</h3>
<p>For options, "position size" typically refers to the number of lots (contracts). Risk per lot = Premium Paid × Lot Size. If you're buying a Nifty Call at ₹150 premium (lot size 75), your risk per lot is ₹150 × 75 = ₹11,250. With a ₹5,000 max risk, you cannot buy even 1 lot — you'd need to either reduce premium (find a cheaper strike) or allocate a higher risk amount.</p>
<pre><code>Number of Option Lots = Risk Amount ÷ (Premium × Lot Size)</code></pre>

<h2>How Stop-Loss Distance Affects Position Size</h2>
<p>The key insight of position sizing is the inverse relationship between stop-loss distance and position size. A wider stop-loss forces a smaller position to keep risk constant. Beginners often use a wide stop to "give the trade room" without reducing their position size — this is the most common way traders blow up accounts without realizing why.</p>
<table>
  <thead>
    <tr><th>Account</th><th>Risk (1%)</th><th>Stop Distance</th><th>Position Size</th></tr>
  </thead>
  <tbody>
    <tr><td>₹5,00,000</td><td>₹5,000</td><td>₹20 (tight)</td><td>250 shares</td></tr>
    <tr><td>₹5,00,000</td><td>₹5,000</td><td>₹40 (moderate)</td><td>125 shares</td></tr>
    <tr><td>₹5,00,000</td><td>₹5,000</td><td>₹100 (wide)</td><td>50 shares</td></tr>
    <tr><td>₹5,00,000</td><td>₹5,000</td><td>₹250 (very wide)</td><td>20 shares</td></tr>
  </tbody>
</table>

<h2>Adjusting Position Size for Brokerage Fees</h2>
<p>For accurate position sizing, especially on smaller accounts or high-frequency strategies, factor in transaction costs. Add total fees to your risk amount before calculating:</p>
<pre><code>Adjusted Position Size = (Risk Amount − Total Fees) ÷ Stop Distance</code></pre>
<p>If your 1% risk = ₹5,000 but total round-trip fees = ₹400, your effective risk budget for price movement is only ₹4,600.</p>
<pre><code>Adjusted Size = ₹4,600 ÷ ₹40 = 115 shares (not 125)</code></pre>
<p>This level of precision matters most for intraday traders where fees represent a larger fraction of position P&L. Use our <a href="/tools/trading/break-even">Break-Even Calculator</a> to compute the exact fee impact on any trade.</p>

<h2>Position Sizing Strategies Beyond the 1% Rule</h2>

<h3>Fixed Fractional (Standard)</h3>
<p>Risk a fixed percentage of current account value per trade. As your account grows, position sizes grow proportionally. This is the standard approach described above and used by most professional traders.</p>

<h3>Fixed Ratio</h3>
<p>Increase your position size by one unit for every fixed profit amount gained. Conservative during drawdowns, more aggressive as profits accumulate. Popularized by Ryan Jones in trading literature.</p>

<h3>Kelly Criterion (Advanced)</h3>
<p>A mathematical formula that calculates optimal position size based on your historical win rate and average win/loss ratio: Kelly % = Win Rate − [(1 − Win Rate) / (Avg Win / Avg Loss)]. Most professional traders use half-Kelly or quarter-Kelly to reduce volatility. Full Kelly is theoretically optimal but psychologically brutal during drawdown periods.</p>

<h2>Use the Position Size Calculator</h2>
<p>Instead of calculating manually, use our free <a href="/tools/trading/position-size">Position Size Calculator</a>. Enter your account size, risk percentage, entry price, and stop-loss — and get your exact share/lot size instantly. You can also combine it with our <a href="/tools/trading/risk-reward">Risk/Reward Calculator</a> to ensure each trade meets your minimum reward-to-risk threshold before you place the order.</p>

<details>
<summary>What is the position sizing formula in trading?</summary>
<p>The standard position sizing formula is: Position Size = (Account Size × Risk Per Trade %) ÷ (Entry Price − Stop-Loss Price). For example, with a ₹5,00,000 account, 1% risk (₹5,000), entry at ₹1,800 and stop-loss at ₹1,760 (₹40 risk per share), position size = ₹5,000 ÷ ₹40 = 125 shares. This formula ensures that a single losing trade never destroys more than your pre-defined maximum risk percentage.</p>
</details>

<details>
<summary>What is the 1% rule in trading?</summary>
<p>The 1% rule states that you should never risk more than 1% of your total trading capital on a single trade. If your account is ₹5,00,000, your maximum loss on any trade should be ₹5,000. This rule exists to protect your account from catastrophic drawdowns during losing streaks — which happen to every trader regardless of skill level. With 1% risk, even 10 consecutive losses (a rare but possible scenario) reduces your account by only 9.6%, from which recovery is straightforward.</p>
</details>

<details>
<summary>How do I calculate position size for futures in India?</summary>
<p>For Indian index futures, the formula is: Number of Lots = (Account Size × Risk%) ÷ (Stop Distance in Points × Lot Size). For Nifty 50 (lot size 75) with a ₹10,00,000 account, 1% risk (₹10,000), and a 200-point stop: Lots = ₹10,000 ÷ (200 × 75) = ₹10,000 ÷ ₹15,000 = 0.67 lots. Round down to 0 or 1 lot (1 lot = ₹15,000 risk, which exceeds 1%). In this case, either widen your account size, reduce stop distance to 133 points, or increase your risk % to 1.5%.</p>
</details>

<details>
<summary>Why does stop-loss distance affect position size?</summary>
<p>Stop-loss distance and position size have an inverse relationship: the wider your stop-loss, the smaller your position must be to keep total dollar risk constant. If you risk ₹5,000 with a ₹20 stop, you can buy 250 shares. With a ₹100 stop (5× wider), you can only buy 50 shares (5× smaller) to maintain the same ₹5,000 maximum loss. This is why traders who use wide stops without reducing their share count dramatically overstake their trades — often the hidden reason for account blowups.</p>
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
  console.log(data.success ? `✅ ${blog.slug}` : `❌ ${blog.slug}: ${data.error}`);
}

for (const blog of blogs) {
  await seedBlog(blog);
}
console.log("Done.");
