import pg from 'pg';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ cloud_name: 'dkfj0zehx', api_key: '296562678135994', api_secret: 'OsJh1GsThS4Z-adhb9RcBd9y1-s' });
const DATABASE_URL = 'postgresql://neondb_owner:npg_K6ZfyJWGnBS4@ep-summer-rain-anjhb1ps.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require';
const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0eee0f4c-1752-4957-9d55-e65faffb9067';

function uploadImage(localPath) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'smdevs-blogs', resource_type: 'image' },
      (err, result) => err ? reject(err) : resolve(result.secure_url));
    fs.createReadStream(localPath).pipe(stream);
  });
}

const BLOGS = [
  // ── Aug 28: Bonus Issue vs Stock Split (KD 21 — EASY WIN) ────────────────
  {
    slug: 'bonus-issue-vs-stock-split-difference-india',
    title: 'Bonus Issue vs Stock Split: Key Differences Every Investor Must Know (2026)',
    metaTitle: 'Bonus Issue vs Stock Split: Key Differences India | SM Devs',
    metaDesc: 'Understand the key differences between bonus issue and stock split in India — face value, reserves, share count, tax impact, and which is better for investors with real examples.',
    focus: 'bonus issue vs stock split difference',
    category: 'Trading',
    date: '2026-08-28',
    image: 'blog_bonus_issue_vs_stock_split_hero_1788073898267.jpg',
    excerpt: 'Bonus issue and stock split are two corporate actions that both increase the number of shares held by investors — but they work very differently under the hood. Both leave total investment value unchanged on the day of action, yet they have distinct implications for face value, company reserves, accounting treatment, and long-term tax calculations. This guide explains every difference between bonus issue and stock split with real Indian company examples.',
    content: `<h2>What is a Bonus Issue?</h2>
<p>A <strong>bonus issue</strong> (also called a scrip issue or capitalisation issue) is when a company issues additional free shares to existing shareholders by converting its accumulated reserves and surplus into equity capital. No cash changes hands — the company simply distributes its reserves as shares.</p>
<p><strong>Example:</strong> If you hold 100 shares of Company X and it announces a 1:1 bonus issue, you receive 100 additional shares for free. You now hold 200 shares. The share price adjusts downward proportionally (roughly halves), but your total investment value remains the same on the ex-bonus date.</p>
<p>Key accounting impact: Company's <strong>reserves decrease</strong> and <strong>paid-up capital increases</strong> by an equal amount. The company's balance sheet total is unchanged.</p>

<h2>What is a Stock Split?</h2>
<p>A <strong>stock split</strong> is when a company divides each existing share into multiple smaller-denomination shares. The total number of shares increases, but the <strong>face value reduces</strong> proportionally. The total paid-up capital and reserves remain completely unchanged.</p>
<p><strong>Example:</strong> Company Y splits its shares in a 2:1 ratio. Each share with face value ₹10 becomes 2 shares with face value ₹5 each. If you held 100 shares at ₹1,000 per share, you now hold 200 shares at ₹500 per share. Total value = ₹1,00,000 both before and after.</p>
<p>Read our complete guide: <a href="/resources/blogs/what-is-a-stock-split-explained">What is a Stock Split? How It Affects Investors</a></p>

<h2>Bonus Issue vs Stock Split: Side-by-Side Comparison</h2>
<table>
<thead><tr><th>Feature</th><th>Bonus Issue</th><th>Stock Split</th></tr></thead>
<tbody>
<tr><td><strong>What changes</strong></td><td>New shares issued from reserves</td><td>Existing shares subdivided</td></tr>
<tr><td><strong>Face Value</strong></td><td>Remains the same (e.g., stays ₹10)</td><td>Reduces proportionally (₹10 → ₹5 in 2:1 split)</td></tr>
<tr><td><strong>Company Reserves</strong></td><td>Decreases (reserves converted to capital)</td><td>Unchanged — no accounting transfer</td></tr>
<tr><td><strong>Paid-up Capital</strong></td><td>Increases (new shares added to capital)</td><td>Unchanged — shares just subdivided</td></tr>
<tr><td><strong>Share Price</strong></td><td>Adjusts down proportionally on ex-date</td><td>Adjusts down proportionally on ex-date</td></tr>
<tr><td><strong>Market Cap</strong></td><td>Unchanged at announcement</td><td>Unchanged at announcement</td></tr>
<tr><td><strong>Total Shares Outstanding</strong></td><td>Increases</td><td>Increases</td></tr>
<tr><td><strong>Investor's Total Value</strong></td><td>Unchanged on ex-date</td><td>Unchanged on ex-date</td></tr>
<tr><td><strong>Cash involved</strong></td><td>No — free shares</td><td>No — shares divided</td></tr>
<tr><td><strong>Tax on receipt</strong></td><td>No tax when received (taxed on sale)</td><td>No tax when split happens</td></tr>
</tbody>
</table>

<h2>Tax Implications: Bonus Shares vs Split Shares in India</h2>
<p>Both bonus shares and split shares are <strong>not taxed when received</strong>. Tax applies only when you sell them. However, the cost-of-acquisition calculation differs significantly:</p>

<h3>Tax on Bonus Shares</h3>
<p>The cost of acquisition of bonus shares is considered <strong>₹0</strong> (zero) under Indian income tax law. This means:</p>
<ul>
<li>When you sell bonus shares, the <strong>entire sale price is capital gain</strong></li>
<li>Holding period for LTCG: Bonus shares must be held for more than 12 months from the date of allotment to qualify for Long-Term Capital Gains tax (10% above ₹1 lakh) vs STCG (15%)</li>
<li>Example: 100 bonus shares received for free, sold at ₹200 each → ₹20,000 capital gain (entire amount)</li>
</ul>

<h3>Tax on Split Shares</h3>
<p>The cost of acquisition of split shares is calculated proportionally from the original cost:</p>
<ul>
<li>If you paid ₹1,000 for 1 share and it splits into 2 shares, each share's cost = ₹500</li>
<li>Capital gain = Sale price − ₹500 (your proportional cost)</li>
<li>Holding period: For LTCG purposes, the <strong>original purchase date</strong> applies — not the split date. So a 3-year-old share that splits is already LTCG-eligible immediately after the split.</li>
</ul>
<p><strong>Key difference:</strong> Bonus shares have zero cost basis (higher tax on sale) while split shares retain the proportional original cost (lower taxable gain).</p>

<h2>Real Indian Examples: Bonus Issue and Stock Split</h2>
<table>
<thead><tr><th>Company</th><th>Action</th><th>Ratio</th><th>Year</th><th>Impact</th></tr></thead>
<tbody>
<tr><td>Tata Consultancy Services</td><td>Bonus Issue</td><td>1:1</td><td>2018</td><td>Shares doubled, price halved, face value ₹1 unchanged</td></tr>
<tr><td>Infosys</td><td>Bonus Issue</td><td>1:1</td><td>2018</td><td>Shares doubled; Signal of strong free cash flow</td></tr>
<tr><td>HDFC Bank</td><td>Stock Split</td><td>1:2</td><td>2019</td><td>Face value ₹2 → ₹1; price halved; liquidity improved</td></tr>
<tr><td>Adani Power</td><td>Stock Split</td><td>10:1</td><td>2024</td><td>Face value ₹10 → ₹1; share price made accessible to retail investors</td></tr>
<tr><td>MRF</td><td>Never split</td><td>—</td><td>—</td><td>Highest-priced stock in India (~₹1.5 lakh/share) — company philosophy against splits</td></tr>
</tbody>
</table>
<p><em>Note: Adani Power stock split (2024) is a good example — the face value changed from ₹10 to ₹1 (10:1 ratio). <a href="/resources/blogs/what-happens-when-stock-splits-price-impact-india">What happens during a stock split →</a></em></p>

<h2>Why Do Companies Issue Bonus Shares?</h2>
<ul>
<li><strong>Signal of profitability</strong>: A bonus issue signals the company has accumulated strong reserves — a positive signal to investors</li>
<li><strong>Reward shareholders without cash outflow</strong>: Rewards long-term holders without depleting cash reserves</li>
<li><strong>Reduces share price to improve liquidity</strong>: Similar to a split — lower per-share price attracts more retail buyers</li>
<li><strong>Utilise accumulated surplus</strong>: Converts idle balance sheet reserves into active equity capital</li>
</ul>

<h2>Why Do Companies Do Stock Splits?</h2>
<ul>
<li><strong>Improve affordability</strong>: A ₹50,000/share stock is out of reach for small retail investors; ₹5,000/share after a 10:1 split is accessible</li>
<li><strong>Increase daily trading volume</strong>: Lower per-share price means more retail participation and higher daily turnover</li>
<li><strong>Psychological appeal</strong>: Investors perceive lower-priced shares as "affordable" even though market cap is unchanged</li>
<li><strong>Include more investors</strong>: Required for index inclusion in some indices where share price is a factor</li>
</ul>

<h2>Which is Better: Bonus Issue or Stock Split?</h2>
<p>For the investor, both have the <strong>same immediate financial impact</strong> — total portfolio value is unchanged at the time of the corporate action. The differences matter more for:</p>
<ul>
<li><strong>Tax planning</strong>: Split shares have a proportional cost basis (better for taxation on sale). Bonus shares have zero cost (entire sale price is gain).</li>
<li><strong>Long-term investors</strong>: Both are positive signals — companies only split stocks or issue bonuses when confident about the future</li>
<li><strong>Company fundamentals</strong>: A bonus issue reduces reserves, which slightly weakens the balance sheet. A split has no balance sheet impact at all.</li>
</ul>
<p>For a fundamental investor, a stock split is marginally preferable from a balance sheet perspective. For an income investor, the bonus issue is preferred since cost basis of ₹0 doesn't matter if you plan to hold forever.</p>

<h2>FAQs: Bonus Issue vs Stock Split</h2>
<h3>What is the difference between bonus issue and stock split?</h3>
<p>In a bonus issue, the company issues additional free shares by converting its accumulated reserves into paid-up equity capital — face value stays the same, but reserves decrease. In a stock split, existing shares are subdivided into smaller units — face value decreases proportionally, but reserves and paid-up capital stay unchanged. Both increase total shares outstanding and reduce price per share proportionally, leaving total investment value unchanged.</p>
<h3>Is stock split taxable in India?</h3>
<p>A stock split itself is not taxable in India. No tax is charged when the split happens. Tax applies only when you sell the split shares. The capital gain is calculated as: Sale price − (Original purchase price ÷ Split ratio). For LTCG eligibility, the original purchase date (not the split date) counts.</p>
<h3>Are bonus shares taxable in India?</h3>
<p>Bonus shares are not taxable when allotted. The cost of acquisition of bonus shares is zero under Indian tax law. When you sell them, the entire sale proceeds count as capital gain. If held for over 12 months, LTCG tax of 10% applies above ₹1 lakh. If held under 12 months, STCG of 15% applies.</p>
<h3>What is the ratio 1:1 in bonus issue?</h3>
<p>A 1:1 bonus ratio means you receive 1 bonus share for every 1 share you hold. If you had 500 shares, you get 500 additional shares free — total becomes 1,000 shares. The share price adjusts to approximately half on the ex-bonus date, keeping total value the same.</p>`,
  },

  // ── Aug 29: What Happens When a Stock Splits ─────────────────────────────
  {
    slug: 'what-happens-when-stock-splits-price-impact-india',
    title: 'What Happens When a Stock Splits? Price Impact, Timeline & Should You Buy? (2026)',
    metaTitle: 'What Happens When a Stock Splits? Price, Timeline & Tips | SM Devs',
    metaDesc: 'Exactly what happens when a stock splits in India — price adjustment, share count change, demat account update timeline, why companies split stocks, and whether to buy before or after.',
    focus: 'what happens when a stock splits india',
    category: 'Trading',
    date: '2026-08-29',
    image: 'blog_what_happens_stock_split_hero_1788073911463.jpg',
    excerpt: 'When a company announces a stock split, investors often have many questions: Will my portfolio value change? When will I see more shares in my demat account? Should I buy the stock before the split? What happens to my SIP or mutual fund holdings? This complete guide walks through exactly what happens — step by step — when a stock splits, with real timelines and practical guidance for Indian investors.',
    content: `<h2>What Happens When a Stock Splits?</h2>
<p>When a stock splits, each existing share is divided into a specified number of smaller shares. The <strong>total number of shares increases</strong>, the <strong>price per share decreases proportionally</strong>, and your <strong>total investment value remains exactly the same</strong> at the moment of the split.</p>
<p>Example of a 2:1 split (also written as 1:2):</p>
<table>
<thead><tr><th></th><th>Before Split</th><th>After 2:1 Split</th></tr></thead>
<tbody>
<tr><td>Shares held</td><td>100</td><td>200</td></tr>
<tr><td>Price per share</td><td>₹1,500</td><td>₹750</td></tr>
<tr><td>Total value</td><td>₹1,50,000</td><td>₹1,50,000 ✅</td></tr>
<tr><td>Face value</td><td>₹10</td><td>₹5</td></tr>
</tbody>
</table>
<p>For a deeper understanding of what a stock split is and why companies do it, read our guide: <a href="/resources/blogs/what-is-a-stock-split-explained">What is a Stock Split?</a></p>

<h2>Step-by-Step Timeline: What Happens From Announcement to Credit</h2>

<h3>Step 1: Board Meeting Announcement</h3>
<p>The company's Board of Directors meets and approves the stock split. This is announced to BSE/NSE via a regulatory filing. The announcement includes the <strong>split ratio</strong> (e.g., 2:1, 5:1, 10:1) and the proposed <strong>Record Date</strong>.</p>
<p>Share price often rises on the announcement date — not because the company became more valuable, but because of retail investor excitement and improved liquidity expectations.</p>

<h3>Step 2: Shareholder Approval (if required)</h3>
<p>For listed companies in India, stock splits require shareholder approval via postal ballot or Extraordinary General Meeting (EGM). The resolution typically passes easily since a split is viewed positively by shareholders. This step takes 2–4 weeks after the board announcement.</p>

<h3>Step 3: SEBI / Exchange Approval & Record Date Confirmation</h3>
<p>After shareholder approval, the company files with BSE/NSE and SEBI. The exchanges confirm the <strong>Record Date</strong> — the date on which shareholders must hold the stock to receive the split shares.</p>

<h3>Step 4: Ex-Date (1 Trading Day Before Record Date)</h3>
<p>The <strong>Ex-Date</strong> is the most important date for investors:</p>
<ul>
<li>If you buy the stock <strong>on or after the ex-date</strong>, you will NOT receive the split shares</li>
<li>If you hold the stock <strong>before the ex-date</strong> (i.e., buy before ex-date and hold through record date), you receive the split shares</li>
<li><strong>On the ex-date morning</strong>, the exchange automatically adjusts the opening price — the stock opens at the post-split price (e.g., if it closed at ₹1,500 and it's a 2:1 split, it opens at ~₹750)</li>
</ul>

<h3>Step 5: Record Date</h3>
<p>The company takes a snapshot of all shareholders on this date. Everyone who holds shares in their demat account on the Record Date is eligible for the split shares.</p>

<h3>Step 6: New Shares Credited to Demat Account</h3>
<p>After the Record Date, the registrar and transfer agent (RTA — typically NSDL or CDSL) credits the additional shares to eligible shareholders' demat accounts. This typically happens within <strong>2–5 trading days after the Record Date</strong>.</p>
<p>You'll see your share count change in your broker app (Zerodha Kite, Upstox, Groww, etc.) — but the total portfolio value remains the same.</p>

<h2>What Happens to Your Orders and Positions?</h2>
<h3>Pending Limit Orders</h3>
<p>Any pending buy or sell limit orders placed at the old price are <strong>automatically cancelled by the exchange</strong> on the ex-date. You must re-place orders at the new adjusted price after the split. Always check for cancelled orders on ex-date morning.</p>

<h3>F&O Positions (Futures & Options)</h3>
<p>If you hold Futures or Options contracts on a splitting stock:</p>
<ul>
<li>The exchange adjusts <strong>lot size and strike prices</strong> proportionally</li>
<li>A stock with lot size 500 in a 2:1 split becomes lot size 1,000 at half the strike price</li>
<li>Open positions are carried over at adjusted levels — no action required</li>
<li>Check NSE's official corporate action adjustment circulars for exact adjusted values</li>
</ul>

<h3>SIP and Mutual Fund Holdings</h3>
<p>If the splitting stock is held inside a mutual fund scheme, the NAV (Net Asset Value) of the fund is NOT affected — mutual funds hold many stocks, and the split's price adjustment is automatic. Your fund's NAV and unit count remain unchanged.</p>

<h2>Why Do Companies Split Stocks?</h2>
<p>Companies split stocks for several strategic reasons:</p>

<h3>1. Make Shares More Affordable</h3>
<p>Stocks priced at ₹10,000+ per share are out of reach for small retail investors. A 10:1 split brings the price to ₹1,000 — suddenly accessible to crores of Indian retail investors who couldn't buy before. More buyers = more liquidity = healthier trading volumes.</p>

<h3>2. Increase Daily Trading Volume and Liquidity</h3>
<p>Lower-priced stocks attract more retail participation. Higher trading volume reduces bid-ask spreads, making the stock easier and cheaper to trade for everyone — institutional and retail investors alike.</p>

<h3>3. Signal Confidence About the Future</h3>
<p>Companies don't split stocks when they're struggling. A split is an implicit signal from management that they expect continued strong performance — the price fell so high that it needs splitting. Historically, stocks that announce splits outperform the broader market in the 1-year period post-split.</p>

<h3>4. Psychological Pricing Appeal</h3>
<p>Investor psychology treats a ₹500 stock as "cheaper" than a ₹5,000 stock — even though shares in a company represent ownership, not absolute price. Lower nominal prices attract more retail participation.</p>

<h2>Recent Stock Splits in India (2023–2026)</h2>
<table>
<thead><tr><th>Company</th><th>Split Ratio</th><th>Year</th><th>Face Value Change</th></tr></thead>
<tbody>
<tr><td>Adani Power</td><td>10:1</td><td>2024</td><td>₹10 → ₹1</td></tr>
<tr><td>Mazagon Dock Shipbuilders</td><td>2:1</td><td>2024</td><td>₹10 → ₹5</td></tr>
<tr><td>Tata Motors</td><td>5:1</td><td>2024</td><td>₹2 → ₹1</td></tr>
<tr><td>Vedanta</td><td>1:1 bonus</td><td>2023</td><td>—</td></tr>
<tr><td>Bajaj Auto</td><td>5:1</td><td>2023</td><td>₹10 → ₹2</td></tr>
</tbody>
</table>
<p><em>Always verify current data on <a href="https://www.nseindia.com" target="_blank" rel="noopener noreferrer">NSE India</a> or <a href="https://www.bseindia.com" target="_blank" rel="noopener noreferrer">BSE India</a> corporate actions section.</em></p>
<p>Also read: <a href="/resources/blogs/bonus-issue-vs-stock-split-difference-india">Bonus Issue vs Stock Split: Key Differences</a></p>

<h2>Should You Buy a Stock Before or After a Stock Split?</h2>
<p>This is the most common investor question. The honest answer:</p>
<h3>Before the Split — What Research Shows</h3>
<ul>
<li>Stocks often rise 2–3% in the days after a split announcement (excitement + increased awareness)</li>
<li>Studies (including Fama et al.) show split stocks outperform the market by ~8% in the 12 months following the split — NOT because of the split itself, but because companies that split stocks tend to be growing companies</li>
<li>However, by the time the split is publicly announced, much of the news is already priced in</li>
</ul>
<h3>The Right Way to Think About It</h3>
<ul>
<li><strong>Do NOT buy a stock just because it's splitting</strong> — the split itself creates no value</li>
<li><strong>DO consider buying if the stock is fundamentally strong</strong> and the split simply makes it more accessible</li>
<li>A split is a signal — investigate <em>why</em> the stock price got high enough to warrant a split. That growth story matters far more than the split itself</li>
<li>After the split, the stock is more affordable — but the valuation (P/E ratio) is unchanged. You're not getting a discount.</li>
</ul>

<h2>FAQs: What Happens When a Stock Splits</h2>
<h3>Does the stock price fall after a split?</h3>
<p>Yes — but proportionally. In a 2:1 split, the price halves on the ex-date. This is an automatic exchange adjustment, not a market-driven fall. Your total holdings value is unchanged. The stock then trades freely at the new price, and may go up or down from there based on fundamentals and market sentiment.</p>
<h3>What happens to my demat account when a stock splits?</h3>
<p>Your share count increases proportionally (e.g., 100 shares → 200 in a 2:1 split) within 2–5 trading days after the Record Date. The value per share is adjusted automatically. Your total portfolio value in rupees remains the same. Your broker app may show a temporary discrepancy during the credit processing window.</p>
<h3>Why do companies split stocks?</h3>
<p>Companies split stocks to: (1) make shares more affordable for retail investors when the price has risen to high levels, (2) increase daily trading volume and liquidity, (3) signal management confidence about future growth, and (4) attract a broader investor base. A split itself creates no fundamental value — it's purely cosmetic from a financial standpoint.</p>
<h3>What is the difference between a 2:1 split and a 1:2 split?</h3>
<p>In Indian market terminology, a "2:1 split" means each existing share splits into 2 new shares (sometimes written as 1:2 where the new face value replaces the old). A 2:1 split doubles your shares and halves the price. Always check the face value in the company's official announcement to confirm the exact ratio — e.g., "face value changes from ₹10 to ₹5" confirms a 2:1 (doubling) split.</p>`,
  },

  // ── Aug 30: Stock Split Complete Guide (Pillar — replaces existing thin blog) ─
  {
    slug: 'stock-split-complete-guide-india-2026',
    title: 'Stock Split: Complete Guide for Indian Investors — How It Works, Why It Happens & Examples (2026)',
    metaTitle: 'Stock Split Complete Guide India 2026: How It Works & Examples | SM Devs',
    metaDesc: 'Complete stock split guide for Indian investors — how stock splits work, types (2:1, 5:1, 10:1), recent Indian examples (Adani Power, Mazagon Dock), tax impact, and whether to buy before or after.',
    focus: 'stock split complete guide india',
    category: 'Trading',
    date: '2026-08-30',
    image: 'blog_stock_split_guide_hero_1788073884201.jpg',
    excerpt: 'A stock split is one of the most searched corporate actions in Indian markets — particularly when a high-profile company like Adani Power or Mazagon Dock announces one. Stock splits are often misunderstood: many retail investors think they\'re getting something for free, or that the stock is suddenly cheaper. This guide covers everything — how stock splits work, types and ratios, how to calculate your new holdings, recent major Indian stock splits, tax implications, and the data on whether buying before a split is actually worth it.',
    content: `<h2>What is a Stock Split?</h2>
<p>A <strong>stock split</strong> is a corporate action where a company divides each of its existing shares into a specific number of new shares. The total number of outstanding shares increases, but the share price decreases proportionally — so the company's <strong>total market capitalisation remains unchanged</strong>.</p>
<p>Think of it like cutting a pizza: cutting a ₹1,000 pizza into 2 slices doesn't make it a ₹2,000 pizza — each slice is now worth ₹500. You have more slices, but the total pizza's value is identical.</p>

<h2>How Does a Stock Split Work? (Step-by-Step Calculation)</h2>
<p>For a <strong>2:1 stock split</strong> (1 share becomes 2 shares):</p>
<table>
<thead><tr><th>Before Split</th><th>After 2:1 Split</th></tr></thead>
<tbody>
<tr><td>Shares held: 100</td><td>Shares held: 200</td></tr>
<tr><td>Price per share: ₹2,000</td><td>Price per share: ₹1,000</td></tr>
<tr><td>Face value: ₹10</td><td>Face value: ₹5</td></tr>
<tr><td>Total value: ₹2,00,000</td><td>Total value: ₹2,00,000 ✅</td></tr>
</tbody>
</table>
<p>For a <strong>10:1 stock split</strong> (like Adani Power 2024):</p>
<table>
<thead><tr><th>Before Split</th><th>After 10:1 Split</th></tr></thead>
<tbody>
<tr><td>Shares held: 50</td><td>Shares held: 500</td></tr>
<tr><td>Price per share: ₹1,000</td><td>Price per share: ₹100</td></tr>
<tr><td>Face value: ₹10</td><td>Face value: ₹1</td></tr>
<tr><td>Total value: ₹50,000</td><td>Total value: ₹50,000 ✅</td></tr>
</tbody>
</table>

<h2>Types of Stock Splits</h2>
<table>
<thead><tr><th>Split Type</th><th>What Happens</th><th>Share Price Change</th><th>Common In India</th></tr></thead>
<tbody>
<tr><td><strong>2:1 Split</strong></td><td>1 share → 2 shares</td><td>Halves</td><td>Yes (HDFC Bank 2019)</td></tr>
<tr><td><strong>5:1 Split</strong></td><td>1 share → 5 shares</td><td>Drops to 20% of original</td><td>Yes (Bajaj Auto 2023)</td></tr>
<tr><td><strong>10:1 Split</strong></td><td>1 share → 10 shares</td><td>Drops to 10% of original</td><td>Yes (Adani Power 2024)</td></tr>
<tr><td><strong>Reverse Split</strong></td><td>Multiple shares → 1 share</td><td>Increases proportionally</td><td>Rare in India</td></tr>
</tbody>
</table>
<p>A <strong>reverse stock split</strong> (e.g., 1:5 — 5 shares become 1) is rare in India and usually signals distress. The company consolidates shares to raise the per-share price, often to meet minimum price requirements for exchange listing.</p>

<h2>Recent Major Stock Splits in India (2023–2026)</h2>
<table>
<thead><tr><th>Company</th><th>Split Ratio</th><th>Year</th><th>Price Before</th><th>Price After</th><th>Face Value Change</th></tr></thead>
<tbody>
<tr><td><strong>Adani Power</strong></td><td>10:1</td><td>2024</td><td>~₹750</td><td>~₹75</td><td>₹10 → ₹1</td></tr>
<tr><td><strong>Mazagon Dock Shipbuilders</strong></td><td>2:1</td><td>2024</td><td>~₹4,000</td><td>~₹2,000</td><td>₹10 → ₹5</td></tr>
<tr><td><strong>Tata Motors DVR</strong></td><td>10:1</td><td>2024</td><td>—</td><td>—</td><td>₹10 → ₹1</td></tr>
<tr><td><strong>Bajaj Auto</strong></td><td>5:1</td><td>2023</td><td>~₹5,000</td><td>~₹1,000</td><td>₹10 → ₹2</td></tr>
<tr><td><strong>Hindustan Aeronautics (HAL)</strong></td><td>10:1</td><td>2023</td><td>~₹4,500</td><td>~₹450</td><td>₹10 → ₹1</td></tr>
</tbody>
</table>
<p><em>For upcoming stock splits, check <a href="https://www.nseindia.com/companies-listing/corporate-filings-actions" target="_blank" rel="noopener noreferrer">NSE Corporate Actions</a> or <a href="https://www.bseindia.com" target="_blank" rel="noopener noreferrer">BSE Corporate Actions</a>.</em></p>

<h2>Why Do Companies Split Stocks?</h2>
<ol>
<li><strong>Improve affordability</strong>: A ₹50,000/share stock (like MRF) is inaccessible to most retail investors. Splitting makes it buyable for ₹5,000 or ₹500</li>
<li><strong>Increase trading liquidity</strong>: More affordable stocks attract more retail buyers, increasing daily volume and narrowing bid-ask spreads</li>
<li><strong>Signal confidence</strong>: Companies split stocks when they're doing well — it's implicitly a bullish signal from management</li>
<li><strong>Broader investor base</strong>: More retail participation improves stock stability and reduces volatility driven by concentrated institutional holdings</li>
<li><strong>Index eligibility</strong>: Some index rules require shares to be below a certain price threshold for inclusion in certain indices or ETFs</li>
</ol>

<h2>Stock Split vs Bonus Issue: A Quick Comparison</h2>
<p>Both increase share count and lower price per share — but they're fundamentally different accounting events. For the full comparison, read: <a href="/resources/blogs/bonus-issue-vs-stock-split-difference-india">Bonus Issue vs Stock Split: Key Differences</a></p>
<table>
<thead><tr><th>Feature</th><th>Stock Split</th><th>Bonus Issue</th></tr></thead>
<tbody>
<tr><td>Face value</td><td>Reduces proportionally</td><td>Unchanged</td></tr>
<tr><td>Company reserves</td><td>Unchanged</td><td>Decreases</td></tr>
<tr><td>Tax cost basis</td><td>Original cost ÷ split ratio</td><td>Zero (bonus shares)</td></tr>
</tbody>
</table>

<h2>Tax Implications of Stock Splits in India</h2>
<ul>
<li><strong>No tax when split happens</strong> — the split itself is not a taxable event</li>
<li><strong>Cost of acquisition</strong>: Your original purchase cost is divided proportionally. If you paid ₹10,000 for 10 shares and they split 2:1, each of your 20 shares now has a cost basis of ₹500</li>
<li><strong>Holding period</strong>: The original purchase date counts for LTCG/STCG classification — not the split date. A stock you bought 3 years ago and split is immediately LTCG-eligible</li>
<li><strong>LTCG</strong>: Gains above ₹1 lakh taxed at 10% (for equity held &gt;12 months)</li>
<li><strong>STCG</strong>: Gains taxed at 15% (for equity held ≤12 months)</li>
</ul>

<h2>What Happens to Your Holdings During a Stock Split? (Timeline)</h2>
<p>For the complete step-by-step timeline from announcement to demat credit, read: <a href="/resources/blogs/what-happens-when-stock-splits-price-impact-india">What Happens When a Stock Splits? Price Impact & Timeline</a></p>
<p>In brief:</p>
<ol>
<li>Board approves split → announcement made</li>
<li>Shareholder approval → EGM or postal ballot</li>
<li>Record Date confirmed by exchange</li>
<li>Ex-Date: Price auto-adjusts; pending orders cancelled</li>
<li>Record Date: Snapshot of eligible holders</li>
<li>Demat credit: 2–5 days after Record Date</li>
</ol>

<h2>Should You Buy a Stock Before or After It Splits?</h2>
<p>Data from multiple studies (Ikenberry, Rankine & Stice; Fama) shows:</p>
<ul>
<li>Stocks that split outperform the market by an average of 7–8% in the 12 months <em>after</em> the split — not because of the split, but because growing companies split stocks</li>
<li>However, announcement-day pops (2–4%) are often quickly priced in</li>
<li><strong>Bottom line</strong>: Buy if the company is fundamentally strong. Ignore the split itself — it creates no value. The split is cosmetic; the underlying business is what matters.</li>
</ul>

<h2>FAQs: Stock Split India</h2>
<h3>What is a stock split in simple words?</h3>
<p>A stock split is when a company divides each of its shares into smaller pieces. If a stock priced at ₹1,000 does a 2:1 split, you get 2 shares worth ₹500 each — same total value of ₹1,000. Nothing is gained or lost; you just have more shares at a lower price per share.</p>
<h3>Does a stock split increase the value of my investment?</h3>
<p>No — a stock split does not increase the value of your investment. On the ex-date, the share price adjusts downward proportionally, keeping your total portfolio value identical. Value is only created by the company's actual business performance — not by the split itself.</p>
<h3>What is the Adani Power stock split?</h3>
<p>Adani Power announced a 10:1 stock split in 2024 — the face value changed from ₹10 to ₹1 per share. Each shareholder received 10 shares for every 1 share held. The share price adjusted from approximately ₹750 to approximately ₹75 on the ex-date. The split made Adani Power shares accessible to a much larger retail investor base.</p>
<h3>How do I know if a company is about to split its stock?</h3>
<p>Monitor BSE and NSE's corporate actions pages, check SEBI filings, and follow financial news. Companies announce splits via board meeting disclosures on stock exchanges. Tools like Trendlyne, Screener, and Moneycontrol also track upcoming corporate actions including stock splits, bonus issues, and rights issues.</p>`,
  },
];

async function publishAll() {
  const client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  console.log(`\n🚀 Publishing ${BLOGS.length} stock split cluster blogs (Aug 28–30)...\n`);

  // First update existing stock split blog focus keyphrase to be the pillar
  await client.query(`
    UPDATE blog_posts SET
      focus_keyphrase = 'stock split explained for beginners',
      meta_title = 'What is a Stock Split? How It Affects Investors — Full Explained | SM Devs',
      meta_description = 'What is a stock split in simple terms? Explained for beginners — with worked examples, face value changes, what it means for your demat account, and how it differs from a bonus issue.'
    WHERE slug = 'what-is-a-stock-split-explained'
  `);
  console.log('✅ Updated existing blog focus: what-is-a-stock-split-explained → "stock split explained for beginners"');
  console.log('   (Preserves the existing page\'s rank while differentiating from the new pillar)\n');

  for (const blog of BLOGS) {
    const imgPath = `${ARTIFACT_DIR}\\${blog.image}`;
    process.stdout.write(`📸 Uploading ${blog.slug}... `);
    const imageUrl = await uploadImage(imgPath);
    console.log('✓');
    await client.query(`
      INSERT INTO blog_posts (title,slug,content,excerpt,tldr,focus_keyphrase,meta_title,meta_description,category,author,featured_image,status,publish_date)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'published',$12)
      ON CONFLICT (slug) DO NOTHING
    `, [blog.title, blog.slug, blog.content, blog.excerpt, blog.excerpt.substring(0,200),
        blog.focus, blog.metaTitle, blog.metaDesc, blog.category, 'SM Developers Team',
        imageUrl, new Date(blog.date + 'T03:30:00.000Z')]);
    console.log(`  ✅ ${blog.date} — [${blog.category}] ${blog.slug}\n`);
  }

  console.log('✅ Stock split topic cluster complete!\n');
  console.log('Cluster structure:');
  console.log('  [Beginner] what-is-a-stock-split-explained (existing, updated focus)');
  console.log('  [Comparison] bonus-issue-vs-stock-split-difference-india (Aug 28)');
  console.log('  [Impact/Timeline] what-happens-when-stock-splits-price-impact-india (Aug 29)');
  console.log('  [Pillar/Complete] stock-split-complete-guide-india-2026 (Aug 30)');

  await client.end();
}

publishAll().catch(console.error);
