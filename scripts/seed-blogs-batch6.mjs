/**
 * Batch 6 — 2 blogs: Jul 19 (SIP Calculator — new page) + Jul 20 (robots.txt SEO)
 * node scripts/seed-blogs-batch6.mjs
 */
const BASE_URL = "https://smdevs.in";

const blogs = [

  // ═══════════════════════════════════════════════════════════
  // BLOG 1 — SIP Calculator Guide   [Jul 19]
  // NEW PAGE: /tools/trading/sip-calculator (just shipped)
  // Keyword : "SIP calculator" / "what is SIP investment"
  // Volume  : 80K–200K/mo (one of the highest-volume Indian
  //           personal-finance queries on Google)
  // AI OV   : YES — formula-based definition, step-up SIP
  // Gap     : Most results are fund house calculators (no
  //           educational depth). Step-Up SIP guides are
  //           especially thin. Indian fintech angle.
  // Tool CTA: SIP Calculator (new page), Intrinsic Value Calc
  // ═══════════════════════════════════════════════════════════
  {
    title: "SIP Calculator: How to Calculate SIP Returns & Use Step-Up SIP to Build Wealth",
    slug: "sip-calculator-how-to-calculate-sip-returns",
    category: "Trading",
    author: "SM Dev Team",
    featuredImage:
      "https://res.cloudinary.com/dkfj0zehx/image/upload/v1784565458/smdevs_blog/what-is-sip-calculator-guide.webp",
    featuredImageAlt:
      "SIP calculator — how to calculate SIP returns and use step-up SIP to build wealth in India",
    focusKeyphrase: "SIP calculator",
    metaTitle: "SIP Calculator: How to Calculate Returns & Plan Step-Up SIP",
    metaDescription:
      "Use our free SIP calculator to estimate monthly investment returns, total corpus, and the power of step-up SIP. Includes the formula, examples with ₹ figures, and realistic return rates.",
    publishDate: "2026-07-19T05:30:00.000Z",
    status: "published",
    tldr: `A SIP (Systematic Investment Plan) is a method of investing a fixed amount in mutual funds at regular intervals — typically monthly — instead of a lump sum.
The SIP formula uses compound interest: Future Value = P × [((1+r)^n − 1)/r] × (1+r), where P = monthly investment, r = monthly return rate, n = months.
A Step-Up SIP increases your monthly contribution by a fixed % each year, compounding the compounding effect significantly.
Historical Indian equity mutual funds have returned 10–14% CAGR over long periods. Use 10–12% for conservative projections.
Use our free SIP Calculator to instantly compute your expected corpus, total investment, and wealth gained — with step-up simulation.`,
    content: `
<h2>What Is a SIP (Systematic Investment Plan)?</h2>
<p>A Systematic Investment Plan (SIP) is a method of investing in mutual funds where you commit a fixed amount at regular intervals — typically monthly — rather than investing a large lump sum at once. SIP is the most popular way Indians invest in equity mutual funds, and for good reason: it imposes financial discipline, averages out market volatility through rupee cost averaging, and harnesses the power of compounding to build substantial wealth over time.</p>
<p>With a SIP, your fixed monthly amount buys more mutual fund units when markets are low and fewer units when markets are high — automatically averaging your cost per unit over time. This makes SIP far less dependent on timing the market correctly, which even professional investors struggle to do consistently.</p>

<h2>The SIP Return Formula</h2>
<p>SIP returns are calculated using a modified compound interest formula that accounts for equal periodic investments:</p>
<pre><code>Future Value = P × [((1 + r)^n − 1) / r] × (1 + r)

Where:
P = Monthly SIP amount (in ₹)
r = Monthly return rate = Annual rate ÷ 12
n = Total number of months (Years × 12)</code></pre>

<h3>Worked Example — ₹5,000/month for 10 years at 12% annual return</h3>
<pre><code>P = ₹5,000
r = 12% ÷ 12 = 1% = 0.01
n = 10 × 12 = 120 months

FV = 5,000 × [((1.01)^120 − 1) / 0.01] × 1.01
FV = 5,000 × [(3.3004 − 1) / 0.01] × 1.01
FV = 5,000 × [230.04] × 1.01
FV = ₹11,61,695 ≈ ₹11.62 Lakhs

Total invested = ₹5,000 × 120 = ₹6,00,000
Wealth gained  = ₹11,62,000 − ₹6,00,000 = ₹5,62,000</code></pre>
<p>Your ₹6 lakh investment becomes ₹11.62 lakh — nearly double — purely through compounding. Try different amounts and time horizons using our free <a href="/tools/trading/sip-calculator">SIP Calculator</a> to instantly compute your projected corpus.</p>

<h2>SIP Returns at Different Amounts and Time Horizons (12% Annual)</h2>
<table>
  <thead>
    <tr><th>Monthly SIP</th><th>5 Years</th><th>10 Years</th><th>15 Years</th><th>20 Years</th></tr>
  </thead>
  <tbody>
    <tr><td>₹2,000</td><td>₹1.64 L</td><td>₹4.64 L</td><td>₹10.07 L</td><td>₹19.98 L</td></tr>
    <tr><td>₹5,000</td><td>₹4.08 L</td><td>₹11.62 L</td><td>₹25.23 L</td><td>₹49.96 L</td></tr>
    <tr><td>₹10,000</td><td>₹8.17 L</td><td>₹23.23 L</td><td>₹50.46 L</td><td>₹99.91 L</td></tr>
    <tr><td>₹25,000</td><td>₹20.42 L</td><td>₹58.08 L</td><td>₹1.26 Cr</td><td>₹2.50 Cr</td></tr>
    <tr><td>₹50,000</td><td>₹40.83 L</td><td>₹1.16 Cr</td><td>₹2.52 Cr</td><td>₹4.99 Cr</td></tr>
  </tbody>
</table>
<p>Notice how dramatically the corpus grows between 10 and 20 years — this is compounding accelerating in the later years. The final years of a long SIP contribute far more wealth than the early years, which is why starting early is so valuable.</p>

<h2>What Is a Step-Up SIP? (And Why It's Powerful)</h2>
<p>A Step-Up SIP (also called a Top-Up SIP) is a variation where you increase your monthly SIP amount by a fixed percentage every year — typically 10–15% — matching it to your annual income growth. Instead of investing the same ₹5,000 every month for 20 years, you start at ₹5,000 and increase by 10% each year.</p>

<h3>Step-Up SIP vs Regular SIP Comparison</h3>
<table>
  <thead>
    <tr><th>Scenario</th><th>Starting SIP</th><th>Step-Up</th><th>20-Year Corpus</th><th>Total Invested</th></tr>
  </thead>
  <tbody>
    <tr><td>Regular SIP</td><td>₹5,000/mo</td><td>None</td><td>₹49.96 L</td><td>₹12.00 L</td></tr>
    <tr><td>Step-Up SIP</td><td>₹5,000/mo</td><td>+10%/year</td><td>₹1.01 Cr</td><td>₹34.36 L</td></tr>
    <tr><td>Step-Up SIP</td><td>₹5,000/mo</td><td>+15%/year</td><td>₹1.63 Cr</td><td>₹63.71 L</td></tr>
  </tbody>
</table>
<p>The difference is staggering. A 10% annual step-up more than doubles the final corpus compared to a flat SIP — going from ₹49.96 lakh to over ₹1 crore — while the total amount invested only increases from ₹12 lakh to ₹34 lakh. The extra corpus is entirely from the compounding of the increased contributions over time.</p>
<p>Use our <a href="/tools/trading/sip-calculator">Step-Up SIP Calculator</a> to simulate exactly how much corpus you will build with any starting amount and annual step-up percentage.</p>

<h2>Realistic SIP Return Rates for Indian Mutual Funds</h2>
<table>
  <thead>
    <tr><th>Fund Category</th><th>Historical 10-Year CAGR</th><th>Conservative Estimate</th><th>Best for</th></tr>
  </thead>
  <tbody>
    <tr><td>Large-cap equity funds</td><td>12–15%</td><td>10–12%</td><td>Core long-term SIP, moderate risk</td></tr>
    <tr><td>Flexi-cap / Multi-cap funds</td><td>13–17%</td><td>11–13%</td><td>Diversified growth with flexibility</td></tr>
    <tr><td>Mid-cap equity funds</td><td>15–20%</td><td>12–15%</td><td>Higher growth, higher volatility</td></tr>
    <tr><td>Small-cap equity funds</td><td>18–25%</td><td>12–15%</td><td>Aggressive growth, long horizon (10+ yr)</td></tr>
    <tr><td>Debt / Liquid funds</td><td>5–8%</td><td>5–7%</td><td>Capital preservation, short horizon</td></tr>
    <tr><td>Hybrid / Balanced funds</td><td>10–13%</td><td>9–11%</td><td>Balanced risk-return for moderate investors</td></tr>
  </tbody>
</table>
<p><strong>Important disclaimer:</strong> Past returns do not guarantee future performance. For planning purposes, use 10–12% for equity SIPs and 6–7% for debt SIPs. Always consult a SEBI-registered investment advisor before making investment decisions.</p>

<h2>How to Use the SIP Calculator</h2>
<ol>
  <li>Go to our free <a href="/tools/trading/sip-calculator">SIP Calculator</a></li>
  <li>Enter your <strong>monthly SIP amount</strong> (e.g., ₹10,000)</li>
  <li>Enter the <strong>expected annual return rate</strong> (e.g., 12%)</li>
  <li>Enter the <strong>investment duration</strong> in years (e.g., 15 years)</li>
  <li>For Step-Up SIP, enter your <strong>annual step-up percentage</strong> (e.g., 10%)</li>
  <li>The calculator instantly shows: Total invested, Expected corpus, Wealth gained, and a year-by-year growth chart</li>
</ol>

<h2>SIP vs Lump Sum: Which Is Better?</h2>
<table>
  <thead>
    <tr><th>Factor</th><th>SIP</th><th>Lump Sum</th></tr>
  </thead>
  <tbody>
    <tr><td>Market timing risk</td><td>Low — averages across market cycles</td><td>High — full exposure at entry point</td></tr>
    <tr><td>Ideal for</td><td>Salaried investors, regular income earners</td><td>Investors with large surplus during market dips</td></tr>
    <tr><td>Return in bull markets</td><td>Slightly lower (buying at higher prices too)</td><td>Higher (full corpus benefits from the rise)</td></tr>
    <tr><td>Return in volatile markets</td><td>Higher (rupee cost averaging works best)</td><td>Lower (catch falling prices but miss rebounds)</td></tr>
    <tr><td>Discipline</td><td>Enforced automatically</td><td>Requires willpower to invest at the right time</td></tr>
  </tbody>
</table>
<p>For most investors with a regular income, SIP is the better choice because it removes the stress and risk of trying to time the market. Lump sum investment is most effective when made during significant market corrections — but consistently identifying those moments requires experience and emotional discipline most investors do not have.</p>

<details>
<summary>What is a SIP calculator?</summary>
<p>A SIP calculator is a tool that computes the expected future value of a Systematic Investment Plan based on three inputs: monthly investment amount, expected annual return rate, and investment duration in years. It uses the compound interest formula for periodic investments to project how your monthly contributions will grow into a larger corpus over time. Our free SIP Calculator also includes a Step-Up SIP option to simulate annual increases in your monthly contribution.</p>
</details>

<details>
<summary>How is SIP return calculated?</summary>
<p>SIP returns are calculated using the formula: FV = P × [((1 + r)^n − 1) / r] × (1 + r), where P is the monthly SIP amount, r is the monthly return rate (annual rate divided by 12), and n is the total number of months. This formula applies compound interest to each monthly installment — the first installment compounds for the full duration, while the last installment earns interest for only one month. The total future value is the sum of all these compounded amounts.</p>
</details>

<details>
<summary>What is a Step-Up SIP?</summary>
<p>A Step-Up SIP (also called Top-Up SIP) is a SIP where you increase your monthly contribution by a fixed percentage every year. For example, starting with ₹5,000/month and increasing by 10% each year means you invest ₹5,500 in Year 2, ₹6,050 in Year 3, and so on. Step-Up SIP is powerful because both your investment amount and the returns on that amount compound simultaneously — the combined effect over 15–20 years can more than double the corpus compared to a flat SIP with the same starting amount.</p>
</details>

<details>
<summary>What is a good SIP return rate in India?</summary>
<p>Historically, Indian large-cap equity mutual funds have delivered 12–15% CAGR over 10-year periods. For conservative planning purposes, using 10–12% per annum for equity SIPs is recommended. Debt funds typically return 5–8%. Hybrid funds fall in between at 9–11%. Always use conservative return assumptions in your planning — it is better to be pleasantly surprised than to rely on optimistic projections that may not materialise. Past performance does not guarantee future results.</p>
</details>

<details>
<summary>How much should I invest in SIP per month?</summary>
<p>The right SIP amount depends on your financial goal, time horizon, and expected return rate. A common approach: decide on a target corpus (e.g., ₹1 crore in 20 years at 12% return), then work backwards using the SIP formula to find the required monthly investment (approximately ₹10,000/month in this case). A general guideline is to invest at least 20% of your monthly income — but even ₹500/month started early is far better than waiting to invest a larger amount later. Use our SIP Calculator to reverse-engineer the monthly amount needed for your specific goal.</p>
</details>
`,
  },

  // ═══════════════════════════════════════════════════════════
  // BLOG 2 — robots.txt File SEO Guide   [Jul 20]
  // Keyword : "robots.txt file" / "robots txt SEO"
  // Volume  : 10K–30K/mo; tool tie-in = robots.txt generator
  // AI OV   : YES — code-based definition, clear structure
  // Gap     : Generic guides dominate. No "robots.txt for
  //           Next.js App Router" guide exists at all.
  //           Direct tool CTA to robots-txt-generator.
  // Tool CTA: Robots.txt Generator
  // ═══════════════════════════════════════════════════════════
  {
    title: "What Is a Robots.txt File? How to Create One Free (SEO Guide 2025)",
    slug: "what-is-robots-txt-file-seo-guide",
    category: "SEO",
    author: "SM Dev Team",
    featuredImage:
      "https://res.cloudinary.com/dkfj0zehx/image/upload/v1784565458/smdevs_blog/robots-txt-file-seo-guide.webp",
    featuredImageAlt:
      "What is a robots.txt file — how to create robots.txt for SEO and control Google crawling",
    focusKeyphrase: "robots.txt file",
    metaTitle: "What Is a Robots.txt File? How to Create One for SEO (2025)",
    metaDescription:
      "A robots.txt file tells search engine crawlers which pages to crawl or skip. Learn the syntax, common directives, critical mistakes to avoid, and how to generate one free.",
    publishDate: "2026-07-20T05:30:00.000Z",
    status: "published",
    tldr: `A robots.txt file is a plain-text file placed at the root of your website that instructs search engine crawlers (Googlebot, Bingbot) which pages or directories to crawl or skip.
It uses a simple syntax: User-agent (which bot), Allow/Disallow (what to crawl), and Sitemap (location of your XML sitemap).
Robots.txt controls crawl access — it does NOT prevent pages from appearing in search results (use noindex meta tag for that).
Critical mistake: Disallow: / blocks all crawling of your entire site — never use this on a live production website.
Generate a correct robots.txt file for your site instantly with our free Robots.txt Generator — no coding needed.`,
    content: `
<h2>What Is a Robots.txt File?</h2>
<p>A robots.txt file is a plain-text file placed at the root of your website (at <code>yourdomain.com/robots.txt</code>) that tells search engine crawlers — like Googlebot, Bingbot, and others — which pages or sections of your site they are allowed to crawl and index, and which they should skip.</p>
<p>When a search engine bot visits your site for the first time, the very first thing it does is check for a robots.txt file. If one exists, the bot reads the instructions and follows them before crawling any other page. If no robots.txt exists, the crawler treats it as "no restrictions" and crawls everything it can find.</p>
<p>Robots.txt is part of the <strong>Robots Exclusion Protocol</strong> — a standard developed in 1994 that all major search engines voluntarily follow. It is a cooperative agreement, not a technical barrier: well-behaved crawlers follow robots.txt, but malicious bots may ignore it.</p>

<h2>Robots.txt Syntax: The Basics</h2>
<p>A robots.txt file uses a simple, structured syntax:</p>
<pre><code># This is a comment — ignored by crawlers

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://yourdomain.com/sitemap.xml</code></pre>

<p>The key directives:</p>
<table>
  <thead>
    <tr><th>Directive</th><th>What It Does</th><th>Example</th></tr>
  </thead>
  <tbody>
    <tr><td><code>User-agent</code></td><td>Specifies which crawler(s) the rules apply to. <code>*</code> means all bots.</td><td><code>User-agent: *</code></td></tr>
    <tr><td><code>Disallow</code></td><td>Blocks the specified path from being crawled.</td><td><code>Disallow: /admin/</code></td></tr>
    <tr><td><code>Allow</code></td><td>Explicitly permits crawling of a path (used to override a broader Disallow).</td><td><code>Allow: /public/</code></td></tr>
    <tr><td><code>Sitemap</code></td><td>Tells crawlers the URL of your XML sitemap.</td><td><code>Sitemap: https://example.com/sitemap.xml</code></td></tr>
    <tr><td><code>#</code></td><td>Starts a comment line — ignored by all crawlers.</td><td><code># Block admin</code></td></tr>
  </tbody>
</table>

<h2>Robots.txt for Different Website Platforms</h2>

<h3>Standard robots.txt (Most Websites)</h3>
<pre><code>User-agent: *
Allow: /
Disallow: /admin/
Disallow: /login/
Disallow: /cart/
Disallow: /checkout/
Disallow: /*.pdf$

Sitemap: https://yourdomain.com/sitemap.xml</code></pre>

<h3>robots.txt for Next.js App Router (2025)</h3>
<p>In Next.js 13+ with the App Router, you can generate robots.txt programmatically by creating a <code>robots.ts</code> file in the <code>app/</code> directory. This is the recommended approach for Next.js projects:</p>
<pre><code>// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/private/'],
    },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}</code></pre>
<p>This generates a valid <code>/robots.txt</code> response automatically at build time. You can also create a static <code>robots.txt</code> file in the <code>public/</code> directory for a simple, non-dynamic alternative.</p>

<h3>robots.txt for WordPress</h3>
<p>WordPress generates a virtual robots.txt automatically. You can customise it via Settings → Reading (basic), or through Yoast SEO or Rank Math plugin (recommended). The default WordPress robots.txt should disallow <code>/wp-admin/</code> but allow <code>/wp-admin/admin-ajax.php</code> (needed for dynamic functionality):</p>
<pre><code>User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

Sitemap: https://yoursite.com/sitemap_index.xml</code></pre>

<h2>What Robots.txt Can and Cannot Do</h2>
<table>
  <thead>
    <tr><th>Can Do ✅</th><th>Cannot Do ❌</th></tr>
  </thead>
  <tbody>
    <tr><td>Block Googlebot from crawling specific pages or directories</td><td>Prevent a page from appearing in Google search results</td></tr>
    <tr><td>Save crawl budget by preventing waste on unimportant pages</td><td>Stop a page from being indexed if other sites link to it</td></tr>
    <tr><td>Point crawlers to your XML sitemap location</td><td>Provide any security — malicious bots ignore robots.txt</td></tr>
    <tr><td>Apply different rules to different bots (Googlebot vs Bingbot)</td><td>Block access to pages from human visitors</td></tr>
    <tr><td>Block crawling of specific file types (e.g., PDFs, images)</td><td>Guarantee compliance — it is voluntary, not enforced</td></tr>
  </tbody>
</table>
<p><strong>Critical distinction:</strong> If you want to prevent a page from appearing in Google search results, use a <code>&lt;meta name="robots" content="noindex"&gt;</code> tag on that page — not a robots.txt Disallow. Disallowing a page in robots.txt can actually cause it to appear in search results without a snippet because Google knows the page exists (from links) but cannot crawl it to see the noindex tag.</p>

<h2>The Most Dangerous Robots.txt Mistake</h2>
<p>The single most catastrophic robots.txt error — and one made by developers more often than you would think — is this:</p>
<pre><code>User-agent: *
Disallow: /</code></pre>
<p>This single line blocks all search engine crawlers from crawling your entire website. Every page becomes uncrawlable. Your site will de-index from Google within days. This mistake is commonly introduced when developers copy a robots.txt from a staging environment (which legitimately blocks crawling) to the production website without changing the Disallow rule.</p>
<p><strong>Always verify your live site's robots.txt</strong> after any deployment. Visit <code>yourdomain.com/robots.txt</code> directly in your browser and confirm the Disallow lines make sense for a public website.</p>

<h2>Crawl Budget: Why Robots.txt Matters for Large Sites</h2>
<p>Google allocates a "crawl budget" to each website — the number of pages Googlebot will crawl within a given time window. For most small and medium sites (under 1,000 pages), crawl budget is rarely a concern. For large sites with thousands of pages, using robots.txt to block unimportant pages (filtered search results, duplicate parameter URLs, admin pages) ensures Googlebot spends its crawl budget on your important content rather than wasting it on pages you do not want indexed.</p>
<p>Pages to consider blocking for large sites:</p>
<ul>
  <li>URL parameters that create duplicate content (<code>?sort=</code>, <code>?filter=</code>)</li>
  <li>Internal search result pages (<code>/search?q=</code>)</li>
  <li>Session ID parameters in URLs</li>
  <li>Admin and backend pages</li>
  <li>Staging or test subdirectories left accessible</li>
</ul>

<h2>How to Create and Test Your Robots.txt</h2>
<ol>
  <li><strong>Generate it free:</strong> Use our <a href="/tools/seo/robots-txt-generator">Robots.txt Generator</a> to build a correctly formatted robots.txt without writing code — select your blocked paths, enter your sitemap URL, and download the file.</li>
  <li><strong>Upload to root:</strong> Place the file at your site's root directory so it is accessible at <code>yourdomain.com/robots.txt</code></li>
  <li><strong>Test with Google:</strong> In Google Search Console, go to Settings → robots.txt and use the built-in tester to check if specific URLs are blocked or allowed</li>
  <li><strong>Verify the sitemap line:</strong> Always include your sitemap URL at the bottom of robots.txt — this helps Google discover your sitemap even if you have not submitted it via Search Console</li>
  <li><strong>Submit to Search Console:</strong> After uploading, go to Google Search Console → Sitemaps and submit your sitemap URL directly for faster indexing</li>
</ol>
<p>Once your robots.txt is set up, generate a comprehensive XML sitemap with our free <a href="/tools/seo/sitemap-generator">XML Sitemap Generator</a> and reference it in your robots.txt Sitemap directive for maximum crawler efficiency.</p>

<h2>robots.txt vs Meta Robots Tag vs X-Robots-Tag</h2>
<table>
  <thead>
    <tr><th>Method</th><th>Location</th><th>Controls</th><th>Best for</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>robots.txt</strong></td><td>Root of domain</td><td>Crawling (access)</td><td>Blocking entire directories, saving crawl budget</td></tr>
    <tr><td><strong>Meta robots tag</strong></td><td>HTML &lt;head&gt; of each page</td><td>Indexing + following</td><td>Noindex individual pages, nofollow links</td></tr>
    <tr><td><strong>X-Robots-Tag</strong></td><td>HTTP response header</td><td>Indexing + following</td><td>Non-HTML files (PDFs, images) that need noindex</td></tr>
  </tbody>
</table>
<p>Use all three appropriately: robots.txt for crawl access control, meta robots for individual page indexing decisions, and X-Robots-Tag for non-HTML assets.</p>

<details>
<summary>What is a robots.txt file in SEO?</summary>
<p>A robots.txt file is a plain-text file placed at the root of a website (yourdomain.com/robots.txt) that gives instructions to search engine crawlers about which pages or directories they should or should not crawl. It follows the Robots Exclusion Protocol — a voluntary standard followed by all major search engines including Google, Bing, and Yahoo. The file uses simple directives: User-agent specifies which bot the rules apply to, Disallow blocks specific paths, Allow overrides a Disallow, and Sitemap points crawlers to your XML sitemap.</p>
</details>

<details>
<summary>Does robots.txt affect Google rankings?</summary>
<p>Robots.txt affects rankings indirectly by controlling which pages Google can crawl and therefore consider for indexing. Blocking important pages in robots.txt will prevent them from ranking. However, robots.txt does not directly instruct Google to remove a page from search results — if other websites link to a blocked page, Google may still list it in results without a snippet (because it cannot crawl it). For complete removal from search results, use a noindex meta tag on the page itself, not a robots.txt Disallow.</p>
</details>

<details>
<summary>How do I create a robots.txt file?</summary>
<p>You can create a robots.txt file three ways: (1) Use our free Robots.txt Generator — enter your blocked paths and sitemap URL and download the correctly formatted file; (2) Create a plain-text file manually in any text editor, following the syntax: "User-agent: *" on the first line, followed by "Allow: /" and specific "Disallow:" lines for paths you want to block, then "Sitemap: https://yourdomain.com/sitemap.xml"; (3) For Next.js App Router projects, create an app/robots.ts file that exports a robots() function. Upload the completed file to your site's root directory so it is accessible at yourdomain.com/robots.txt.</p>
</details>

<details>
<summary>What happens if I have no robots.txt file?</summary>
<p>If your website has no robots.txt file, search engine crawlers treat it as if all pages are allowed to be crawled — there are no restrictions. This is fine for most websites. A missing robots.txt file does not harm your SEO. However, having a properly configured robots.txt is beneficial for: pointing crawlers to your sitemap, blocking unimportant pages that would waste crawl budget (important for large sites), and preventing crawling of admin or private areas. Google also logs a 404 error in Search Console when it cannot find a robots.txt, which is a minor but unnecessary warning.</p>
</details>

<details>
<summary>What is the difference between robots.txt and noindex?</summary>
<p>Robots.txt controls crawl access — it tells search engines whether they can visit a page at all. The noindex meta tag (placed in a page's HTML head section) controls indexing — it tells search engines not to include a crawled page in their search results. The critical difference: if you block a page in robots.txt, Google cannot crawl it to see the noindex tag. This means the page may still appear in search results (without a snippet) if other sites link to it. For pages you want completely removed from search results, use noindex — not robots.txt. Use robots.txt only to save crawl budget on pages you do not need crawled at all.</p>
</details>
`,
  },
];

async function seed(blog) {
  const res = await fetch(`${BASE_URL}/api/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  const data = await res.json();
  console.log(
    data.success
      ? `✅ ${new Date(blog.publishDate).toISOString().split("T")[0]} | ${blog.slug}`
      : `❌ ${blog.slug} — ${data.error}`
  );
}

for (const blog of blogs) {
  await seed(blog);
}
console.log("\nDone. Seeded: " + blogs.length);
