import pg from 'pg';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ cloud_name: 'dkfj0zehx', api_key: '296562678135994', api_secret: 'OsJh1GsThS4Z-adhb9RcBd9y1-s' });
const DATABASE_URL = 'postgresql://neondb_owner:npg_K6ZfyJWGnBS4@ep-summer-rain-anjhb1ps.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require';
const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0eee0f4c-1752-4957-9d55-e65faffb9067';

function uploadImage(localPath) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'smdevs-blogs', resource_type: 'image' }, (err, result) => err ? reject(err) : resolve(result.secure_url));
    fs.createReadStream(localPath).pipe(stream);
  });
}

const BLOGS = [
  {
    slug: 'what-is-sensex-bse-india-complete-guide',
    title: 'What is Sensex? BSE India\'s Benchmark Index — Complete Guide (2026)',
    metaTitle: 'What is Sensex? BSE India Benchmark Index Explained | SM Devs',
    metaDesc: 'Learn what the Sensex is, how India\'s BSE 30-stock index is calculated, its history from 100 in 1979 to 80,000+ in 2024, top constituent stocks, and how Sensex differs from Nifty 50.',
    focus: 'what is sensex bse india',
    category: 'Trading',
    date: '2026-08-25',
    image: 'blog_sensex_bse_guide_hero_1787813309701.jpg',
    excerpt: 'The Sensex — officially the S&P BSE Sensex — is India\'s oldest and most widely tracked stock market index, maintained by the Bombay Stock Exchange (BSE). It tracks 30 of the largest and most financially sound companies listed on BSE, representing the pulse of the Indian economy. When people say "the market is up today," they are usually referring to a movement in the Sensex or Nifty 50. This complete guide explains what the Sensex is, how it\'s calculated, its historical journey from 100 points in 1979 to over 80,000 in 2024, and how to use Sensex data for investment decisions.',
    content: `<h2>What is the Sensex?</h2>
<p>The <strong>Sensex</strong> (Sensitive Index) is a free-float market capitalisation-weighted index of 30 well-established and financially sound companies listed on the <strong>Bombay Stock Exchange (BSE)</strong>. It is India's oldest stock market index, established on January 1, 1986, with a base value of 100 points as of April 1979.</p>
<p>Its official name is the <strong>S&P BSE Sensex</strong>, following a licensing agreement between BSE and S&P Dow Jones Indices. It is the most widely reported benchmark of Indian equity market performance — both domestically and internationally.</p>
<blockquote><p><strong>When CNBC TV18 says "markets closed 500 points higher today" — they mean the Sensex rose by 500 points.</strong></p></blockquote>

<h2>How is the Sensex Calculated?</h2>
<p>The Sensex uses the <strong>Free-Float Market Capitalisation Method</strong>:</p>
<p><strong>Sensex = (Sum of Free-Float Market Cap of 30 companies / Base Market Cap) × Base Index Value (100)</strong></p>
<p><strong>Free-Float Market Cap</strong> = Current Share Price × Number of Shares Available for Public Trading (excludes promoter holdings, government stakes, and strategic holdings)</p>
<p>This means larger companies (by market cap) have a higher weight in the index — a 5% move in Reliance Industries affects the Sensex far more than a 5% move in a smaller constituent.</p>

<h2>Sensex vs Nifty 50: Key Differences</h2>
<table>
<thead><tr><th>Feature</th><th>Sensex</th><th>Nifty 50</th></tr></thead>
<tbody>
<tr><td><strong>Exchange</strong></td><td>Bombay Stock Exchange (BSE)</td><td>National Stock Exchange (NSE)</td></tr>
<tr><td><strong>Stocks</strong></td><td>30 companies</td><td>50 companies</td></tr>
<tr><td><strong>Base Year</strong></td><td>1978–79 (base = 100)</td><td>1995 (base = 1,000)</td></tr>
<tr><td><strong>Established</strong></td><td>1986</td><td>1996</td></tr>
<tr><td><strong>Trading Volume</strong></td><td>Lower than NSE</td><td>Higher — most futures and options traded on NSE</td></tr>
<tr><td><strong>Correlation</strong></td><td colspan="2">Very high (~0.99) — both move almost identically</td></tr>
</tbody>
</table>
<p>For most practical purposes — investing, tracking, and analysis — Sensex and Nifty 50 move in the same direction and tell the same story about Indian equity markets.</p>

<h2>Sensex Historical Journey: From 100 to 80,000+</h2>
<table>
<thead><tr><th>Year</th><th>Sensex Level</th><th>Key Event</th></tr></thead>
<tbody>
<tr><td>1979</td><td>100</td><td>Base year established</td></tr>
<tr><td>1990</td><td>~1,000</td><td>First major bull run</td></tr>
<tr><td>1992</td><td>4,500 → 2,500</td><td>Harshad Mehta scam — first major crash</td></tr>
<tr><td>2000</td><td>~5,000</td><td>Dot-com bubble peak</td></tr>
<tr><td>2006</td><td>10,000</td><td>India's economic boom, IT sector growth</td></tr>
<tr><td>2008</td><td>21,000 → 8,000</td><td>Global financial crisis — 62% crash in 10 months</td></tr>
<tr><td>2014</td><td>~25,000</td><td>Modi government elected — FII confidence surge</td></tr>
<tr><td>2020 (Mar)</td><td>25,981</td><td>COVID-19 pandemic crash — 38% fall in 6 weeks</td></tr>
<tr><td>2021</td><td>60,000</td><td>Fastest 10,000-point rally in history post-COVID</td></tr>
<tr><td>2024</td><td>85,978 (all-time high)</td><td>FII inflows, strong domestic consumption</td></tr>
<tr><td>2026</td><td>~82,000–84,000</td><td>Consolidation after 2024 peak; rate cut cycle</td></tr>
</tbody>
</table>
<p><em>Source: BSE India historical data</em></p>

<h2>Top 10 Sensex Constituent Stocks (2026)</h2>
<table>
<thead><tr><th>Company</th><th>Sector</th><th>Approx. Weight</th></tr></thead>
<tbody>
<tr><td>Reliance Industries</td><td>Energy / Telecom / Retail</td><td>~12–14%</td></tr>
<tr><td>HDFC Bank</td><td>Banking</td><td>~10–12%</td></tr>
<tr><td>ICICI Bank</td><td>Banking</td><td>~7–9%</td></tr>
<tr><td>Infosys</td><td>IT Services</td><td>~7–8%</td></tr>
<tr><td>TCS (Tata Consultancy Services)</td><td>IT Services</td><td>~5–7%</td></tr>
<tr><td>Bharti Airtel</td><td>Telecom</td><td>~4–5%</td></tr>
<tr><td>ITC</td><td>FMCG</td><td>~3–4%</td></tr>
<tr><td>Larsen & Toubro</td><td>Infrastructure</td><td>~3–4%</td></tr>
<tr><td>State Bank of India</td><td>Banking (PSU)</td><td>~3%</td></tr>
<tr><td>Axis Bank</td><td>Banking</td><td>~2–3%</td></tr>
</tbody>
</table>
<p><em>Weights change with share prices — check <a href="https://www.bseindia.com" target="_blank" rel="noopener noreferrer">BSE India</a> for live constituent weights.</em></p>

<h2>How Stocks Get Added or Removed from Sensex</h2>
<p>BSE's Index Committee reviews Sensex constituents semi-annually (typically in June and December). Selection criteria:</p>
<ul>
<li><strong>Listed on BSE</strong> for at least 1 year</li>
<li><strong>Large-cap stock</strong>: Must rank among the top 100 by average free-float market cap over the past year</li>
<li><strong>Liquidity</strong>: High median daily trading value and turnover</li>
<li><strong>Sector representation</strong>: Committee ensures sectoral diversity — not all 30 slots go to banking even if banks have highest market caps</li>
<li><strong>Financial soundness</strong>: Consistent profitability track record</li>
</ul>
<p>Recent additions include Bajaj Finance and Titan; removals happen when a company's market cap falls or it faces governance issues. BSE announces changes with advance notice.</p>

<h2>What Causes Sensex to Rise or Fall?</h2>
<h3>Factors That Push Sensex Higher</h3>
<ul>
<li><strong>RBI rate cuts</strong>: Lower interest rates make equities more attractive vs fixed deposits</li>
<li><strong>Strong GDP data</strong>: Better economic growth = higher corporate earnings expectations</li>
<li><strong>FII (Foreign Institutional Investor) inflows</strong>: Foreign money buying Indian stocks</li>
<li><strong>Positive global cues</strong>: US Fed rate cuts, strong Dow Jones, stable crude oil prices</li>
<li><strong>Strong quarterly results</strong>: Especially from heavyweight stocks like Reliance, HDFC Bank</li>
</ul>
<h3>Factors That Push Sensex Lower</h3>
<ul>
<li><strong>RBI rate hikes</strong>: Higher rates make debt more attractive; equity valuations compress</li>
<li><strong>FII selling</strong>: Foreign investors exiting Indian markets — often due to stronger US dollar</li>
<li><strong>High crude oil prices</strong>: India imports 85% of its oil — high crude = inflation + trade deficit</li>
<li><strong>Geopolitical tensions</strong>: Wars, sanctions, global uncertainty → risk-off selling</li>
<li><strong>Weak earnings season</strong>: Disappointing results from large-cap heavyweights</li>
<li><strong>Rupee depreciation</strong>: Weak INR relative to USD triggers FII outflows</li>
</ul>

<h2>How to Use Sensex for Investment Decisions</h2>
<h3>The PE Ratio of Sensex (Market Valuation Tool)</h3>
<p>The BSE publishes the trailing Price-to-Earnings (P/E) ratio of the Sensex — a key indicator of whether the market is cheap or expensive:</p>
<ul>
<li><strong>Sensex P/E below 16–18</strong>: Historically undervalued — good long-term buying zone</li>
<li><strong>Sensex P/E 18–24</strong>: Fair value range</li>
<li><strong>Sensex P/E above 28–30</strong>: Historically overvalued — reduce equity, increase debt allocation</li>
</ul>
<p>The Sensex P/E touched 40x during the COVID recovery rally (Jan 2021) — historically extreme. Such readings have always preceded corrections.</p>

<h3>Using Sensex for SIP Timing (or Not)</h3>
<p>If you are investing via SIP (Systematic Investment Plan), Sensex levels generally don't matter — the rupee cost averaging effect means you automatically buy more units when Sensex falls and fewer when it rises. For lump-sum investments, buying when Sensex P/E is below 20 has historically produced superior 5-year returns.</p>

<h2>FAQs: Sensex</h2>
<h3>What is Sensex in simple words?</h3>
<p>Sensex is a number that tells you how 30 of India's biggest and best companies are performing as a group. When Sensex goes up, it means these 30 companies collectively became more valuable that day. When it falls, they lost value. It's the most popular shorthand for "how is the Indian stock market doing today?"</p>
<h3>What is the difference between Sensex and Nifty?</h3>
<p>Sensex tracks 30 stocks listed on BSE (Bombay Stock Exchange). Nifty 50 tracks 50 stocks listed on NSE (National Stock Exchange). Both represent the same large-cap Indian equity market and move almost identically — their day-to-day correlation is above 99%. Nifty 50 is more popular for futures and options trading; Sensex is the original and more widely quoted benchmark globally.</p>
<h3>What was the Sensex all-time high?</h3>
<p>The Sensex hit its all-time high of 85,978.25 points on September 27, 2024, driven by strong FII inflows, robust domestic consumption, and optimism around rate cuts. As of 2026, it trades in the 80,000–84,000 range after post-peak consolidation.</p>
<h3>Can I invest directly in the Sensex?</h3>
<p>You cannot buy the Sensex index directly. However, you can invest in it through: (1) <strong>Sensex Index Mutual Funds</strong> — funds that replicate the Sensex portfolio (e.g., HDFC Sensex Fund, SBI BSE Sensex ETF), (2) <strong>BSE Sensex ETFs</strong> — traded on BSE like stocks, (3) <strong>Sensex Futures &amp; Options</strong> — derivative contracts for experienced traders.</p>`,
  },
  {
    slug: 'what-is-bounce-rate-seo-how-to-reduce-it',
    title: 'What is Bounce Rate in SEO? How to Reduce It and Improve Rankings (2026)',
    metaTitle: 'What is Bounce Rate in SEO? How to Reduce It | SM Developers',
    metaDesc: 'Learn what bounce rate is in SEO, what a good bounce rate looks like by industry, 12 proven strategies to reduce bounce rate, and how it affects your Google rankings in 2026.',
    focus: 'what is bounce rate seo',
    category: 'SEO',
    date: '2026-08-26',
    image: 'blog_bounce_rate_seo_hero_1787813321940.jpg',
    excerpt: 'Bounce rate is the percentage of visitors who land on your page and leave without clicking to any other page on your site. A high bounce rate signals to Google that your page may not be satisfying the user\'s search intent — and that can hurt your rankings over time. But bounce rate is one of the most misunderstood metrics in SEO. This guide explains exactly what bounce rate means, when it\'s a problem, and 12 proven strategies to reduce it.',
    content: `<h2>What is Bounce Rate?</h2>
<p><strong>Bounce rate</strong> is the percentage of single-page sessions on your website — visitors who land on a page and leave without interacting with any other page. In Google Analytics 4 (GA4), this is measured as the inverse of the <strong>engagement rate</strong>: a "bounced" session is one that lasts less than 10 seconds, has no conversion event, and has only one pageview.</p>
<p><strong>Formula:</strong> Bounce Rate = (Single-Page Sessions ÷ Total Sessions) × 100</p>
<p>Example: If 1,000 people visit your blog post and 600 leave without clicking anything else, your bounce rate is 60%.</p>

<h2>Is Bounce Rate a Google Ranking Factor?</h2>
<p>This is the most debated question in SEO. Google has officially stated that bounce rate from Google Analytics is NOT a direct ranking signal — Google doesn't have access to your GA4 data.</p>
<p>However, Google <em>does</em> measure user behaviour through its own systems:</p>
<ul>
<li><strong>Pogo-sticking</strong>: When a user clicks your search result, immediately returns to Google, and clicks a competitor's result — this IS a negative signal Google measures internally</li>
<li><strong>Dwell time</strong>: How long a user spends on your page before returning to search results — Google uses this as a quality signal</li>
<li><strong>Click-through rate (CTR)</strong>: Low CTR combined with poor engagement reinforces that a page isn't satisfying search intent</li>
</ul>
<p><strong>Bottom line</strong>: Your GA4 bounce rate isn't directly read by Google, but the <em>underlying reasons</em> for a high bounce rate (poor content, slow load, mismatch with search intent) absolutely hurt your rankings.</p>

<h2>What is a Good Bounce Rate?</h2>
<table>
<thead><tr><th>Bounce Rate</th><th>Assessment</th></tr></thead>
<tbody>
<tr><td><strong>Below 25%</strong></td><td>Excellent — very high engagement (or possible tracking error)</td></tr>
<tr><td><strong>25–40%</strong></td><td>Good — strong content-intent match</td></tr>
<tr><td><strong>40–55%</strong></td><td>Average — acceptable for most content types</td></tr>
<tr><td><strong>55–70%</strong></td><td>Needs improvement — investigate causes</td></tr>
<tr><td><strong>Above 70%</strong></td><td>Poor — significant content or UX problem</td></tr>
</tbody>
</table>
<p><strong>Important context</strong>: Bounce rate benchmarks vary significantly by page type and industry:</p>
<table>
<thead><tr><th>Page / Site Type</th><th>Expected Bounce Rate</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Blog posts / articles</td><td>65–90%</td><td>Users read and leave — this is normal behaviour</td></tr>
<tr><td>E-commerce product pages</td><td>20–45%</td><td>Users browse multiple products before buying</td></tr>
<tr><td>Landing pages</td><td>60–90%</td><td>Single purpose pages — users convert or leave</td></tr>
<tr><td>Contact / About pages</td><td>40–60%</td><td>Users find what they need and leave</td></tr>
<tr><td>Tool / calculator pages</td><td>30–55%</td><td>Users use the tool, then explore more</td></tr>
<tr><td>News / media sites</td><td>65–85%</td><td>Single article reads are normal</td></tr>
</tbody>
</table>
<p><strong>Never compare your blog's bounce rate (70%) to an e-commerce site's (35%) — the context is completely different.</strong></p>

<h2>12 Proven Strategies to Reduce Bounce Rate</h2>

<h3>1. Match Content to Search Intent (Most Important)</h3>
<p>The #1 cause of high bounce rate is a mismatch between what the user searched for and what your page delivers. If someone searches "pivot point calculator" and lands on a blog post about trading theory — they bounce instantly.</p>
<ul>
<li>Check what keyword is driving traffic to each high-bounce page in GSC</li>
<li>Ensure your page's H1, introduction, and content directly addresses that keyword's intent</li>
<li>If the page doesn't match intent, either rewrite it or create a better-matched page</li>
</ul>

<h3>2. Improve Page Load Speed</h3>
<p>53% of mobile users abandon pages that take more than 3 seconds to load (Google data). Every extra second of load time increases bounce rate by approximately 32% (Unbounce).</p>
<ul>
<li>Test with <a href="https://pagespeed.web.dev" target="_blank" rel="noopener noreferrer">PageSpeed Insights</a></li>
<li>Compress and convert images to WebP format</li>
<li>Target LCP (Largest Contentful Paint) under 2.5 seconds</li>
</ul>

<h3>3. Add Compelling Internal Links</h3>
<p>Internal links keep visitors on your site. Every page should have 3–5 relevant internal links to related content:</p>
<ul>
<li>Use descriptive anchor text (not "click here")</li>
<li>Link to genuinely related content — don't force links</li>
<li>Add "Related Articles" sections at the end of blog posts</li>
<li>Use contextual in-content links — they get clicked 3x more than sidebar links</li>
</ul>

<h3>4. Improve Your Introduction (Hook in First 100 Words)</h3>
<p>Most bounces happen within the first 10 seconds — before users have even read a paragraph. Your introduction must immediately confirm the user is in the right place:</p>
<ul>
<li>State what the page covers in the first sentence</li>
<li>Use the target keyword naturally in the first paragraph</li>
<li>Promise a specific outcome: "By the end of this guide, you'll know exactly how to..."</li>
<li>Avoid long introductions that delay getting to the value</li>
</ul>

<h3>5. Improve Readability</h3>
<p>Walls of text cause instant bounces. Format content for scannability:</p>
<ul>
<li>Short paragraphs (2–3 sentences maximum)</li>
<li>Use H2 and H3 subheadings every 200–300 words</li>
<li>Use bullet points and numbered lists for steps and features</li>
<li>Use <strong>bold text</strong> to highlight key information</li>
<li>Include tables for comparisons and data</li>
<li>Font size minimum 16px — 18px for body text is better for mobile</li>
</ul>

<h3>6. Make Your Site Mobile-Responsive</h3>
<p>60%+ of Indian web traffic comes from mobile devices. A non-responsive site creates an immediate bounce:</p>
<ul>
<li>Test with Google's <a href="https://search.google.com/test/mobile-friendly" target="_blank" rel="noopener noreferrer">Mobile-Friendly Test</a></li>
<li>Buttons must be minimum 44×44px (tap-friendly)</li>
<li>No horizontal scrolling on mobile</li>
<li>Text must be readable without zooming</li>
</ul>

<h3>7. Add a Clear Call-to-Action (CTA)</h3>
<p>Tell visitors what to do next. A clear next step reduces exits:</p>
<ul>
<li>"Try our free Schema Validator tool →"</li>
<li>"Read next: How to Add Schema Markup Step by Step →"</li>
<li>"Download the PDF checklist →"</li>
</ul>

<h3>8. Use Engaging Media</h3>
<p>Pages with images, infographics, embedded videos, and charts have lower bounce rates because they give users multiple reasons to stay:</p>
<ul>
<li>Add a relevant hero image or infographic above the fold</li>
<li>Embed a relevant YouTube video for how-to content (users watch, increasing time-on-page)</li>
<li>Use comparison tables to present data visually</li>
</ul>

<h3>9. Avoid Pop-Ups on Mobile</h3>
<p>Aggressive pop-ups — especially those that appear immediately on page load on mobile — are a major bounce trigger. Google also penalises intrusive interstitials in its mobile ranking algorithm. If you use pop-ups, set them to trigger after 30 seconds or on exit intent only.</p>

<h3>10. Open External Links in New Tab</h3>
<p>If users click an external link that opens in the same tab, they leave your site — and that session counts as a bounce. Always use <code>target="_blank" rel="noopener noreferrer"</code> for external links.</p>

<h3>11. Improve Site Search</h3>
<p>If a user doesn't find what they need on the current page but can search your site, they stay. Add a visible search box and ensure it works well — especially on content-heavy sites.</p>

<h3>12. Fix Pages with Unusually High Bounce Rates</h3>
<p>In GA4, go to Reports → Engagement → Pages and Screens → sort by Bounce Rate descending. Identify your 10 highest-bounce pages and investigate each:</p>
<ul>
<li>Is the content thin or outdated?</li>
<li>Is the page slow?</li>
<li>Does the content match the keyword driving traffic to it?</li>
<li>Is there a clear next step for the user?</li>
</ul>

<h2>How to Check Bounce Rate in GA4</h2>
<p>In Google Analytics 4, bounce rate is not prominently displayed by default. Here's how to find it:</p>
<ol>
<li>Go to <strong>GA4 → Reports → Engagement → Pages and Screens</strong></li>
<li>Click <strong>Customise report</strong> (pencil icon, top right)</li>
<li>Under Metrics, add <strong>Bounce Rate</strong></li>
<li>Save the report</li>
<li>Sort by Bounce Rate descending to find your worst-performing pages</li>
</ol>
<p>Note: GA4's Bounce Rate definition differs from Universal Analytics (UA). In GA4, a bounce is a session under 10 seconds with no events. In UA, it was any single-page session regardless of duration. GA4 bounce rates are typically lower than UA for the same pages.</p>

<h2>FAQs: Bounce Rate</h2>
<h3>What is a good bounce rate for a blog?</h3>
<p>For blogs and article pages, a bounce rate of 65–80% is normal and not cause for concern. Blog readers typically read one article and leave — that's expected behaviour. Focus on improving bounce rate for tool pages, landing pages, and e-commerce pages where multi-page browsing is part of the user journey.</p>
<h3>Does high bounce rate hurt SEO?</h3>
<p>Google Analytics bounce rate is not a direct Google ranking signal. However, the behaviour causing high bounce rates — poor content, slow pages, intent mismatch — indirectly hurts SEO. Google's internal signals (like pogo-sticking) do measure user satisfaction. If users consistently click back to search results after visiting your page, that is a negative quality signal for that page.</p>
<h3>How is bounce rate different in GA4 vs Universal Analytics?</h3>
<p>In Universal Analytics (UA), bounce rate = any session with only one pageview. In GA4, bounce rate = sessions lasting under 10 seconds with no engagement events (no clicks, no conversions, no second pageview). GA4 bounce rates are typically 10–20 percentage points lower than UA for the same pages because a user who reads your article for 5 minutes counts as "engaged" in GA4 but "bounced" in UA.</p>`,
  },
  {
    slug: 'what-is-options-trading-beginner-guide-india',
    title: 'What is Options Trading? Complete Beginner Guide for Indian Markets (2026)',
    metaTitle: 'What is Options Trading? Beginner Guide for Indian Markets | SM Devs',
    metaDesc: 'Learn what options trading is, how Call and Put options work, key terms (strike price, premium, expiry, lot size), options strategies for beginners, and how to start trading NSE options safely.',
    focus: 'options trading for beginners india',
    category: 'Trading',
    date: '2026-08-27',
    image: 'blog_options_trading_beginner_hero_1787813334256.jpg',
    excerpt: 'Options trading is one of the most powerful — and most misunderstood — financial instruments available to Indian investors. An option gives you the right (but not the obligation) to buy or sell an asset at a specific price before a specific date. India\'s NSE is now the world\'s largest derivatives exchange by volume. This complete beginner\'s guide explains what options are, how Call and Put options work, all the key terminology, the risks involved, and how to start safely.',
    content: `<h2>What is Options Trading?</h2>
<p><strong>Options trading</strong> is the buying and selling of options contracts — financial derivatives that give the buyer the <em>right, but not the obligation</em>, to buy or sell an underlying asset (stock, index) at a <em>predetermined price (strike price)</em> on or before a <em>specific date (expiry)</em>.</p>
<p>The key word is <strong>"right, not obligation"</strong> — unlike futures where you must buy or sell, options give you the choice. You pay a fee (called the <strong>premium</strong>) for this right. If the market doesn't move in your favour, you simply don't exercise the option — your maximum loss is the premium paid.</p>
<p>In India, options are primarily traded on the NSE (National Stock Exchange) through the F&O (Futures and Options) segment. India's NSE is the <strong>world's largest derivatives exchange by contract volume</strong> — with Nifty and Bank Nifty options being the most actively traded contracts globally.</p>

<h2>Call Options vs Put Options — The Core Difference</h2>
<table>
<thead><tr><th></th><th>Call Option (CE)</th><th>Put Option (PE)</th></tr></thead>
<tbody>
<tr><td><strong>Right to</strong></td><td>BUY the underlying at strike price</td><td>SELL the underlying at strike price</td></tr>
<tr><td><strong>Buyer profits when</strong></td><td>Price goes UP above strike</td><td>Price goes DOWN below strike</td></tr>
<tr><td><strong>Buyer's max loss</strong></td><td>Premium paid only</td><td>Premium paid only</td></tr>
<tr><td><strong>Seller's max profit</strong></td><td>Premium received</td><td>Premium received</td></tr>
<tr><td><strong>Seller's max loss</strong></td><td>Theoretically unlimited</td><td>Strike price minus zero</td></tr>
<tr><td><strong>Market view</strong></td><td>Bullish</td><td>Bearish</td></tr>
</tbody>
</table>

<h2>10 Key Options Trading Terms Every Beginner Must Know</h2>

<h3>1. Strike Price</h3>
<p>The price at which the option contract allows you to buy (Call) or sell (Put) the underlying asset. For Nifty options, strikes are available at every 50-point interval (e.g., 24,000; 24,050; 24,100).</p>

<h3>2. Premium</h3>
<p>The price you pay to buy an option contract. This is your maximum risk when buying options. Premium is determined by intrinsic value + time value. As expiry approaches, time value decays — this is called <strong>theta decay</strong> and is the enemy of option buyers.</p>

<h3>3. Expiry Date</h3>
<p>The date on which the option contract expires. In India:</p>
<ul>
<li><strong>Weekly expiry</strong>: Nifty options expire every Thursday; Bank Nifty every Wednesday</li>
<li><strong>Monthly expiry</strong>: Last Thursday of each month — available for all F&O stocks and indices</li>
<li>Options lose value rapidly as expiry approaches, especially in the last 2–3 days</li>
</ul>

<h3>4. Lot Size</h3>
<p>Options are traded in lots (batches), not single units. Current lot sizes (2026):</p>
<ul>
<li><strong>Nifty 50</strong>: 25 units per lot</li>
<li><strong>Bank Nifty</strong>: 15 units per lot</li>
<li><strong>Sensex</strong>: 10 units per lot</li>
<li>Individual stock options: varies by company (typically 200–5,000 shares per lot)</li>
</ul>

<h3>5. In-the-Money (ITM), At-the-Money (ATM), Out-of-the-Money (OTM)</h3>
<table>
<thead><tr><th>Term</th><th>Call Option</th><th>Put Option</th><th>Premium</th></tr></thead>
<tbody>
<tr><td><strong>ITM</strong></td><td>Strike &lt; Market Price</td><td>Strike &gt; Market Price</td><td>Most expensive — has intrinsic value</td></tr>
<tr><td><strong>ATM</strong></td><td>Strike ≈ Market Price</td><td>Strike ≈ Market Price</td><td>Most liquid — highest time value</td></tr>
<tr><td><strong>OTM</strong></td><td>Strike &gt; Market Price</td><td>Strike &lt; Market Price</td><td>Cheapest — no intrinsic value, only time value</td></tr>
</tbody>
</table>

<h3>6. Intrinsic Value and Time Value</h3>
<p><strong>Premium = Intrinsic Value + Time Value</strong></p>
<p>Intrinsic value = how much the option is worth if exercised today. An ITM Call with market at 24,500 and strike at 24,000 has ₹500 of intrinsic value. Time value is the additional premium reflecting the probability that the option becomes more valuable before expiry.</p>

<h3>7. Greeks: Delta, Theta, Vega, Gamma</h3>
<table>
<thead><tr><th>Greek</th><th>Measures</th><th>Beginner's takeaway</th></tr></thead>
<tbody>
<tr><td><strong>Delta (Δ)</strong></td><td>Option price change per ₹1 move in underlying</td><td>ATM option Delta ≈ 0.5 — premium moves ₹0.50 for every ₹1 Nifty moves</td></tr>
<tr><td><strong>Theta (Θ)</strong></td><td>Daily time decay of premium</td><td>Options lose value every day even if market doesn't move — hurts buyers, helps sellers</td></tr>
<tr><td><strong>Vega (v)</strong></td><td>Premium change per 1% change in IV</td><td>Higher volatility = higher premiums — buy options before big events (budget, earnings)</td></tr>
<tr><td><strong>Gamma (Γ)</strong></td><td>Rate of change of Delta</td><td>Highest for ATM options near expiry — massive premium swings possible</td></tr>
</tbody>
</table>

<h3>8. Implied Volatility (IV)</h3>
<p>IV is the market's expectation of future volatility, baked into the option premium. High IV = expensive options. India VIX (Volatility Index) reflects Nifty options' IV — VIX above 20 means expensive premiums, below 15 means cheap premiums. Buy options when IV is low; sell options when IV is high.</p>

<h3>9. Open Interest (OI)</h3>
<p>The total number of outstanding (unsettled) option contracts at a given strike. High OI at a specific strike often acts as a support (high Put OI) or resistance (high Call OI) level — this is called <strong>Max Pain</strong> analysis.</p>

<h3>10. Options Chain</h3>
<p>A table showing all available strikes, their Call and Put premiums, OI, volume, and IV for a given expiry. Available free on <a href="https://www.nseindia.com/option-chain" target="_blank" rel="noopener noreferrer">NSE India's website</a>. Analysing the options chain is the first skill every options trader must learn.</p>

<h2>3 Simple Options Strategies for Beginners</h2>

<h3>Strategy 1: Buying a Call Option (Bullish View)</h3>
<p><strong>When to use</strong>: You believe a stock or Nifty will rise significantly before expiry.</p>
<ol>
<li>Select a slightly OTM or ATM Call option (e.g., Nifty 24,100 CE when Nifty is at 24,000)</li>
<li>Pay the premium (your maximum loss)</li>
<li>Profit if Nifty rises above 24,100 + premium paid before expiry</li>
<li>Loss limited to premium paid — cannot lose more</li>
</ol>
<p><strong>Risk</strong>: Theta decay erodes your premium daily. Timing matters — being right about direction but wrong about timing still results in a loss.</p>

<h3>Strategy 2: Buying a Put Option (Bearish View)</h3>
<p><strong>When to use</strong>: You believe a stock or index will fall before expiry.</p>
<ol>
<li>Select an ATM or slightly OTM Put option (e.g., Nifty 23,900 PE when Nifty is at 24,000)</li>
<li>Pay the premium</li>
<li>Profit if Nifty falls below 23,900 minus premium paid</li>
<li>Useful as portfolio hedge — buy puts on your Nifty/stock portfolio to protect against crashes</li>
</ol>

<h3>Strategy 3: Protective Put (Hedging Existing Holdings)</h3>
<p>If you hold Nifty ETFs or stocks worth ₹5 lakh and fear a short-term fall, buy 1 lot of Nifty ATM Put options as insurance. Cost = premium (e.g., ₹5,000–₹8,000). This caps your downside to the premium paid while keeping full upside if markets rise.</p>

<h2>Options Trading Risks — What Beginners Must Understand</h2>
<ul>
<li><strong>Option buying is a high-probability loss activity</strong>: Studies show 85–90% of options expire worthless. This means buyers lose their premium most of the time — even experienced traders.</li>
<li><strong>Theta decay is relentless</strong>: An option that doesn't move loses value every single day. Buying weekly options 2–3 days before expiry is extremely high risk.</li>
<li><strong>Selling options is high-risk</strong>: Selling naked (uncovered) options gives you unlimited loss potential. Never sell options without a hedge as a beginner.</li>
<li><strong>Leverage amplifies losses</strong>: Options give 5x–20x leverage. A 5% adverse move in Nifty can wipe out 50–100% of your option premium.</li>
</ul>

<h2>How to Start Options Trading in India (Step by Step)</h2>
<ol>
<li><strong>Open a demat + trading account</strong> with a broker that has good F&O tools: Zerodha, Upstox, Angel One, or Dhan. Ensure F&O segment is activated.</li>
<li><strong>Learn the options chain</strong>: Spend 2 weeks on <a href="https://www.nseindia.com/option-chain" target="_blank" rel="noopener noreferrer">NSE's options chain</a> without trading — understand how premiums move with Nifty.</li>
<li><strong>Use our <a href="/tools/trading/option-profit">free Options Profit Calculator</a></strong> to simulate P&L before placing any trade.</li>
<li><strong>Start paper trading</strong>: Practice with virtual money for 1–2 months. Only trade real money when you have a clear strategy.</li>
<li><strong>Begin with index options</strong>: Nifty and Bank Nifty options are more liquid and predictable than individual stock options. Start here.</li>
<li><strong>Risk only what you can afford to lose completely</strong>: Never put more than 5% of your portfolio into option buying. Treat option premium as a cost, not an investment.</li>
</ol>

<h2>FAQs: Options Trading India</h2>
<h3>What is options trading in simple words?</h3>
<p>Options trading is buying or selling contracts that give you the right — not the obligation — to buy (Call) or sell (Put) stocks or indices at a fixed price before a fixed date. You pay a fee called premium for this right. If the market moves in your favour, you profit. If it doesn't, you lose only the premium paid — nothing more.</p>
<h3>Is options trading legal in India?</h3>
<p>Yes — options trading is completely legal in India and regulated by SEBI (Securities and Exchange Board of India). Index options (Nifty, Bank Nifty, Sensex) and stock options on SEBI-approved F&O stocks are traded on NSE and BSE. You need a SEBI-registered broker and a demat account to participate.</p>
<h3>What is the minimum amount needed to start options trading in India?</h3>
<p>The minimum is the premium for one lot of options. For Nifty 50 (25 units/lot), an ATM option premium might be ₹150–₹300 per unit, making one lot cost ₹3,750–₹7,500. For Bank Nifty (15 units/lot), premiums vary similarly. You don't need lakhs to start — but you should be prepared to lose the entire premium on any trade.</p>
<h3>What is the difference between futures and options?</h3>
<p>Futures obligate both buyer and seller to complete the transaction at the agreed price on expiry — regardless of market direction. Options give the buyer the right but not the obligation. Futures have unlimited loss potential for both sides; option buyers have capped loss (premium paid) with unlimited profit potential, while option sellers have capped profit (premium received) with unlimited loss potential.</p>`,
  },
];

async function publishAll() {
  const client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  console.log(`🚀 Publishing ${BLOGS.length} blogs (Aug 25–27)...\n`);
  for (const blog of BLOGS) {
    const imgPath = `${ARTIFACT_DIR}\\${blog.image}`;
    process.stdout.write(`📸 ${blog.slug}... `);
    const imageUrl = await uploadImage(imgPath);
    console.log('✓');
    await client.query(`
      INSERT INTO blog_posts (title,slug,content,excerpt,tldr,focus_keyphrase,meta_title,meta_description,category,author,featured_image,status,publish_date)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'published',$12)
      ON CONFLICT (slug) DO NOTHING
    `, [blog.title, blog.slug, blog.content, blog.excerpt, blog.excerpt.substring(0, 200),
        blog.focus, blog.metaTitle, blog.metaDesc, blog.category, 'SM Developers Team',
        imageUrl, new Date(blog.date + 'T03:30:00.000Z')]);
    console.log(`  ✅ ${blog.date} — [${blog.category}] ${blog.slug}\n`);
  }
  console.log('✅ All done!');
  await client.end();
}
publishAll().catch(console.error);
