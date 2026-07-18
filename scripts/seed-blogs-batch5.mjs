/**
 * Batch 5 — 4 blogs filling Jul 15–18 2026.
 * Optimised for Google ranking + AI Overviews + India-specific angles.
 * node scripts/seed-blogs-batch5.mjs
 */
const BASE_URL = "https://smdevs.in";

const blogs = [

  // ═══════════════════════════════════════════════════════════
  // BLOG 1 — Stop Loss in Trading   [Jul 15]
  // Keyword : "stop loss in trading" / "how to set stop loss"
  // Volume  : 12K–28K/mo, strong India demand
  // AI OV   : YES — definitional + mechanics + types
  // Gap     : No Indian site connects explanation → live calculator
  // Tool CTA: Risk/Reward Calculator + Position Size Calculator
  // ═══════════════════════════════════════════════════════════
  {
    title: "Stop Loss in Trading: What It Is, How to Set It & Why It Protects Your Capital",
    slug: "stop-loss-in-trading-how-to-set-it",
    category: "Trading",
    author: "SM Dev Team",
    featuredImage: "https://res.cloudinary.com/dkfj0zehx/image/upload/v1784353195/smdevs_blog/stop-loss-trading-explained.webp",
    featuredImageAlt: "Stop loss in trading — how to set stop loss order to protect capital in Indian stock market",
    focusKeyphrase: "stop loss in trading",
    metaTitle: "Stop Loss in Trading: How to Set It Right + Types Explained",
    metaDescription: "A stop loss automatically exits your trade when price moves against you. Learn the types (stop-market, stop-limit), how to set it based on support levels, and avoid common mistakes.",
    publishDate: "2026-07-15T05:30:00.000Z",
    status: "published",
    tldr: `A stop loss is a pre-set price level at which your trade automatically exits to limit your loss if the market moves against you.
Stop losses are the most important risk management tool in trading — they protect your capital from catastrophic losses that wipe out accounts.
The two main types are stop-market orders (instant execution at market price) and stop-limit orders (execute only at your specified price or better).
Placing your stop loss just below the nearest support level (or above resistance for short trades) is the most technically sound approach.
Use our Risk/Reward Calculator to verify your stop placement delivers at least 1:1.5 RR before entering any trade.`,
    content: `
<h2>What Is a Stop Loss in Trading?</h2>
<p>A stop loss is an order placed with your broker to automatically exit a trade when the price reaches a specified level — limiting your loss on that position. It is the most fundamental risk management tool in trading, acting as a safety valve that prevents any single bad trade from causing catastrophic damage to your account.</p>
<p>Without a stop loss, a losing trade can keep losing until you manually exit — which many traders delay due to hope or denial, often resulting in losses far larger than they originally planned to accept. A stop loss removes emotion from the exit decision: when the price hits your level, the trade closes automatically, regardless of what you are thinking or feeling at that moment.</p>

<h2>Why Stop Losses Are Non-Negotiable</h2>
<p>Every professional trader uses stop losses. Every trader who blows up an account ignores them. The mathematics are simple:</p>
<table>
  <thead><tr><th>Loss on a Trade</th><th>Return Needed to Break Even</th></tr></thead>
  <tbody>
    <tr><td>10% loss</td><td>11.1% gain required</td></tr>
    <tr><td>25% loss</td><td>33.3% gain required</td></tr>
    <tr><td>50% loss</td><td>100% gain required</td></tr>
    <tr><td>75% loss</td><td>300% gain required</td></tr>
    <tr><td>90% loss</td><td>900% gain required</td></tr>
  </tbody>
</table>
<p>As losses grow, recovery becomes mathematically harder — not linearly but exponentially. A 50% drawdown requires a 100% gain just to break even. This is why cutting losses early with a stop loss is the single most important habit in trading: it keeps losses manageable and recovery mathematically achievable.</p>

<h2>Types of Stop Loss Orders</h2>

<h3>1. Stop-Market Order</h3>
<p>A stop-market order triggers when price reaches your stop level and immediately executes at the best available market price. It guarantees execution but not the exact price — in fast-moving markets, you may get filled slightly worse than your stop level (called slippage).</p>
<p><strong>Best for:</strong> Liquid instruments like Nifty futures, Bank Nifty, and large-cap stocks where slippage is minimal. Use when getting out quickly matters more than the exact exit price.</p>

<h3>2. Stop-Limit Order</h3>
<p>A stop-limit order triggers at your stop price but only executes at your specified limit price or better. It guarantees the price you pay but does not guarantee execution — if the market gaps through your limit, the order may not fill and the trade stays open.</p>
<p><strong>Best for:</strong> Situations where you cannot accept a worse price than your limit, and you understand the risk of non-execution. Generally riskier than stop-market for most traders because a missed stop in a fast-moving market can lead to a much larger loss than the slippage you were trying to avoid.</p>

<h3>3. Trailing Stop Loss</h3>
<p>A trailing stop moves automatically in the direction of profit, maintaining a fixed distance (in points or percentage) from the highest price reached in your favour. When price reverses by the trailing amount, the stop triggers and exits the trade.</p>
<p><strong>Best for:</strong> Locking in profits on trending trades while letting winners run. Especially useful for swing trades in strongly trending markets where you want to stay long as long as the trend holds without manually adjusting your stop every day.</p>

<h2>How to Set a Stop Loss: 4 Methods</h2>

<h3>Method 1 — Support and Resistance (Best Method)</h3>
<p>Place your stop just below the nearest significant support level (for long trades) or just above resistance (for short trades). This is the most technically sound method because support levels are points where price has historically reversed — if price breaks below them convincingly, the trade thesis is invalidated.</p>
<p>Example: You buy Nifty at 23,500 after it bounces off S1 support at 23,400. Your stop goes to 23,350 — just below the support zone. If Nifty breaks 23,400 with force, S1 has failed as support and your trade is wrong.</p>
<p>Calculate today's Nifty S1, S2, and PP levels before the market opens using our free <a href="/tools/trading/pivot-calculator">Pivot Point Calculator</a>.</p>

<h3>Method 2 — Percentage-Based Stop</h3>
<p>Risk a fixed percentage of your account per trade — typically 1–2%. If your account is ₹5,00,000 and you risk 1% per trade, your maximum loss per trade is ₹5,000. Work backwards from this to determine your stop-loss distance in points.</p>
<pre><code>Stop Distance = Max Risk Amount ÷ Lot Size
Example: ₹5,000 risk ÷ 75 (Nifty lot size) = 66.6 points stop distance</code></pre>
<p>If the technically appropriate stop is further than 66.6 points from your entry, the trade is too large for your account at that position size. Either reduce lot size or skip the trade.</p>

<h3>Method 3 — ATR-Based Stop (Average True Range)</h3>
<p>The ATR measures a market's average daily volatility. Placing your stop at 1.5x to 2x the ATR ensures your stop is wide enough to absorb normal price noise without being triggered randomly, while still cutting the trade if something genuinely wrong happens.</p>
<pre><code>Stop Distance = 1.5 × ATR(14)
Example: If Nifty 14-period ATR = 180 points
Stop = 1.5 × 180 = 270 points below entry</code></pre>
<p>ATR-based stops adjust automatically to current market volatility — they widen during high-volatility periods and tighten when markets are calm.</p>

<h3>Method 4 — Swing High/Low Stop</h3>
<p>For swing trades, place the stop just below the most recent significant swing low (for longs) or above the most recent swing high (for shorts). A break of the swing low means the market is making lower lows — invalidating a bullish trade thesis.</p>

<h2>Stop Loss Placement With Risk/Reward Verification</h2>
<p>Once you have determined your stop-loss level, always verify the trade's risk-reward ratio before entering. For any stop placement to be worthwhile, the potential reward must justify the risk.</p>
<p>Use our free <a href="/tools/trading/risk-reward">Risk/Reward Calculator</a> to enter your entry price, stop-loss, and target and instantly see your RR ratio. Minimum acceptable: 1:1.5. Never enter a trade where the potential reward is less than the risk you are taking.</p>
<p>Also use our <a href="/tools/trading/position-size">Position Size Calculator</a> to calculate the exact number of lots you should trade based on your account size and your stop-loss distance — ensuring you never risk more than 1–2% of capital per trade regardless of the stop placement.</p>

<h2>Common Stop Loss Mistakes to Avoid</h2>
<ul>
  <li><strong>Placing stops at round numbers:</strong> Round numbers (23,000; 22,500; 50.00) are watched by everyone and are frequently hunted by market makers. Place stops a few points beyond round numbers — 22,985 instead of 23,000.</li>
  <li><strong>Moving the stop in the wrong direction:</strong> Never widen your stop to avoid being stopped out. Your stop defines how much you are wrong. Moving it is admitting you will accept being more wrong. This is the fastest path to catastrophic losses.</li>
  <li><strong>Stop loss too tight:</strong> A stop placed within normal price noise will be triggered randomly even when your trade direction is correct. Use ATR to set stops outside normal volatility.</li>
  <li><strong>No stop at all:</strong> "I'll watch the trade and exit manually" is not a risk management strategy. Markets can move 5–10% in minutes on news events. An unprotected position is a loaded gun.</li>
  <li><strong>Same stop for all trades:</strong> Stop distance should vary based on the instrument's volatility, your entry quality, and the distance to the nearest support/resistance — not be a fixed number of points applied to every trade.</li>
</ul>

<h2>Stop Loss for Intraday vs Swing Trading</h2>
<table>
  <thead><tr><th>Parameter</th><th>Intraday Trading</th><th>Swing Trading</th></tr></thead>
  <tbody>
    <tr><td>Stop type</td><td>Stop-market (speed matters)</td><td>Stop-market or stop-limit</td></tr>
    <tr><td>Stop distance</td><td>5–20 points (Nifty/BNF)</td><td>50–200 points or 2–5%</td></tr>
    <tr><td>Based on</td><td>Intraday pivot levels, 15-min chart support</td><td>Daily chart swing lows, weekly support</td></tr>
    <tr><td>Review frequency</td><td>Active during session</td><td>Adjust trailing stop daily at close</td></tr>
    <tr><td>Square off</td><td>Mandatory before market close</td><td>Hold until stop hit or target reached</td></tr>
  </tbody>
</table>

<details>
<summary>What is a stop loss in trading?</summary>
<p>A stop loss is an order placed with your broker that automatically closes your trade when the price reaches a specified level, capping the maximum loss on that position. It is the primary risk management tool in trading. Without a stop loss, a losing trade can continue losing indefinitely until manually closed — which traders often delay, resulting in far larger losses than planned. Stop losses remove emotion from loss-cutting decisions: when price reaches the predetermined level, the position exits automatically.</p>
</details>

<details>
<summary>Where should I place my stop loss?</summary>
<p>The best stop-loss placement is just beyond a significant technical level — below the nearest support level for long trades, or above resistance for short trades. This approach is technically sound because a break of support invalidates the bullish trade thesis. You can also use ATR-based stops (1.5–2x the 14-period ATR) to set a stop that accommodates normal price volatility without being triggered randomly. Always avoid placing stops at obvious round numbers, which are frequently targeted by market makers. After setting your stop, verify the trade has at least a 1:1.5 risk-reward ratio before entering.</p>
</details>

<details>
<summary>What is the difference between a stop-market and stop-limit order?</summary>
<p>A stop-market order triggers when price reaches your stop level and immediately executes at the best available market price — guaranteed execution but not guaranteed price (slippage possible). A stop-limit order triggers at the stop price but only executes at your specified limit price or better — guaranteed price but not guaranteed execution (if price gaps past your limit, the order won't fill). For most traders, stop-market orders are safer because they guarantee exit, while stop-limit orders risk leaving a position open during a fast-moving market decline if the limit price is not available.</p>
</details>

<details>
<summary>What percentage should a stop loss be?</summary>
<p>Your stop loss should be sized so that the total loss on the trade if stopped out equals 1–2% of your total trading capital — not a fixed percentage of the share price. For example, if your account is ₹5,00,000 and you risk 1% per trade, your maximum loss per trade is ₹5,000. Your stop-loss distance in points then depends on how many lots you trade. This approach ensures no single trade can significantly damage your overall capital, regardless of the instrument or position size.</p>
</details>

<details>
<summary>Can a stop loss fail?</summary>
<p>Yes — stop losses can fail to execute at your intended price in two situations: (1) Market gaps: if a stock or index opens far beyond your stop level due to overnight news, your stop-market order will execute at the opening market price (which could be much worse than your stop), and a stop-limit order may not execute at all. (2) Circuit breakers: extreme market events can trigger trading halts, temporarily preventing execution. Stop losses significantly reduce risk but cannot eliminate it entirely — they are protection against normal adverse moves, not against extreme gap events. This is why position sizing (never risking more than 1–2% per trade) is equally important.</p>
</details>
`,
  },

  // ═══════════════════════════════════════════════════════════
  // BLOG 2 — Support and Resistance   [Jul 16]
  // Keyword : "support and resistance in trading"
  // Volume  : 15K–35K/mo, massive India audience
  // AI OV   : YES — but all top results are Western sites
  // Gap     : Zero India-specific chart examples at page 1
  // Tool CTA: Pivot Point Calculator
  // ═══════════════════════════════════════════════════════════
  {
    title: "Support and Resistance in Trading: A Complete Beginner's Guide (With Nifty Examples)",
    slug: "support-and-resistance-in-trading-explained",
    category: "Trading",
    author: "SM Dev Team",
    featuredImage: "https://res.cloudinary.com/dkfj0zehx/image/upload/v1784353195/smdevs_blog/support-resistance-trading.webp",
    featuredImageAlt: "Support and resistance in trading explained — how to identify levels on Nifty 50 charts",
    focusKeyphrase: "support and resistance in trading",
    metaTitle: "Support and Resistance in Trading: Beginner's Guide + Nifty Examples",
    metaDescription: "Support is a price floor where buying pressure exceeds selling. Resistance is a ceiling where sellers dominate. Learn how to identify, draw, and trade these levels on Indian stocks.",
    publishDate: "2026-07-16T05:30:00.000Z",
    status: "published",
    tldr: `Support is a price level where buying demand consistently exceeds selling pressure, causing price to bounce higher. Resistance is the opposite — a ceiling where sellers dominate and price is rejected lower.
These levels form because traders have memory: the same prices where the market reversed in the past attract orders again in the future.
The most reliable support and resistance levels come from: prior swing highs/lows, round numbers, pivot points, and moving averages.
Role reversal is one of the most powerful concepts — when support breaks, it becomes resistance, and vice versa.
Combine support/resistance with pivot points for maximum confluence using our free Pivot Point Calculator.`,
    content: `
<h2>What Are Support and Resistance in Trading?</h2>
<p><strong>Support</strong> is a price level at which a downward-moving market consistently finds buying interest strong enough to halt the decline and cause a bounce higher. Think of it as a floor — every time price drops to this level, buyers step in and push it back up.</p>
<p><strong>Resistance</strong> is the opposite — a price ceiling where selling pressure consistently exceeds buying, causing price to stall or reverse lower. Every time price rises to this level, sellers step in and push it back down.</p>
<p>These levels are not magic lines — they form because of trader psychology and market memory. The same prices where the market reversed in the past attract new orders in the future: buyers who missed the previous low try to buy at the same price again; sellers who sold at the previous high try to repeat their success.</p>

<h2>Why Support and Resistance Work</h2>
<p>Three groups of traders create support and resistance levels:</p>
<ul>
  <li><strong>Buyers who missed the move:</strong> Traders who watched a stock bounce from ₹450 and wished they had bought. They wait for price to return to ₹450 and buy again — creating demand at that level.</li>
  <li><strong>Traders in winning positions:</strong> Traders who bought at ₹450 and saw the stock rise to ₹520. If price pulls back toward ₹450, they add more to their winning position.</li>
  <li><strong>Traders who were wrong:</strong> Traders who sold at ₹450 (thinking it would fall further) and were proven wrong when price rallied. When price returns to ₹450, they exit their losing short to "break even" — creating additional buying pressure at that level.</li>
</ul>
<p>All three groups buy at the same ₹450 level for different reasons — creating a predictable cluster of demand that acts as support.</p>

<h2>How to Identify Support and Resistance Levels</h2>

<h3>1. Prior Swing Highs and Swing Lows</h3>
<p>The most reliable support and resistance levels come from prior swing points — the peaks and troughs that price has previously reversed at. On a daily chart, look for price levels where the market clearly turned around at least twice. The more times a level has been tested and held, the stronger it is.</p>
<p>How to draw them: identify a local low where price bounced up at least twice — draw a horizontal line at that level. That is support. Do the same for swing highs — that is resistance.</p>

<h3>2. Round Numbers</h3>
<p>Round numbers (Nifty 22,000; 22,500; 23,000; Bank Nifty 48,000; 50,000) act as powerful psychological support and resistance because traders naturally place limit orders and stop losses at round numbers. The clustering of orders at these levels creates self-fulfilling support and resistance zones.</p>

<h3>3. Pivot Points (Calculated Support/Resistance)</h3>
<p>Pivot points are mathematically calculated support and resistance levels derived from the previous session's high, low, and close. They are extremely popular with intraday traders because they provide objective, pre-calculated levels before the market opens — no subjective drawing required.</p>
<p>The standard pivot levels: PP (central pivot), R1, R2, R3 (resistance), S1, S2, S3 (support). Use our free <a href="/tools/trading/pivot-calculator">Pivot Point Calculator</a> to compute today's Nifty and Bank Nifty levels before 9:15 AM each trading day.</p>

<h3>4. Moving Averages as Dynamic Support/Resistance</h3>
<p>Unlike horizontal support and resistance lines, moving averages are dynamic — they move with price. The 20-day, 50-day, and 200-day EMAs/SMAs act as support in uptrends and resistance in downtrends. The 200-day moving average in particular is watched by institutional traders globally as a major market trend indicator.</p>

<h2>Support and Resistance on Nifty 50: Practical Examples</h2>
<p>Let us apply these concepts to how intraday traders use support and resistance on Nifty 50:</p>
<p><strong>Scenario — Intraday long setup:</strong></p>
<ol>
  <li>Calculate today's pivot levels using the Pivot Point Calculator before market opens</li>
  <li>Nifty opens and drops toward S1 at 22,380</li>
  <li>S1 coincides with yesterday's swing low at 22,370 — confluence zone 22,370–22,380</li>
  <li>A bullish hammer candle forms at this zone on the 15-minute chart</li>
  <li>Entry: 22,400 (above the hammer high), Stop: 22,340 (below the support zone), Target: PP at 22,580</li>
  <li>Risk: 60 points, Reward: 180 points → RR = 1:3 ✅</li>
</ol>

<h2>Role Reversal: When Support Becomes Resistance</h2>
<p>One of the most powerful concepts in technical analysis is <strong>role reversal</strong> — when a support level is decisively broken, it flips and becomes resistance. And when resistance is broken, it becomes support.</p>
<p>This happens because of the same trader psychology that creates the levels in the first place:</p>
<ul>
  <li>Traders who bought at support are now losing when the level breaks. When price rallies back to that same level, they exit their losing longs to cut losses — creating selling pressure at the old support (now resistance).</li>
  <li>Traders who shorted the breakout now have winners. When price retraces to their entry area, they add to positions — creating more selling pressure at the same level.</li>
</ul>
<p>Role reversal setups are some of the highest-probability trade entries in technical analysis, particularly when the breakout was accompanied by high volume.</p>

<h2>Trading Strategies Using Support and Resistance</h2>

<h3>Strategy 1 — Bounce Trading (Most Common)</h3>
<p>Enter in the direction of the prior trend when price reaches a support or resistance level and shows a reversal candlestick pattern. In an uptrend, buy when price pulls back to support. In a downtrend, sell/short when price rallies to resistance.</p>
<p><strong>Entry conditions:</strong> price at support/resistance + confirming candle (hammer, engulfing, pin bar) + volume confirmation + additional confluence (pivot point, moving average).</p>

<h3>Strategy 2 — Breakout Trading</h3>
<p>Enter in the direction of the breakout when price closes convincingly beyond a key resistance (for longs) or support (for shorts). Wait for the candle to close beyond the level — not just spike through it — to avoid false breakouts.</p>
<p><strong>Key filter:</strong> strong breakouts are accompanied by volume significantly above the 20-period average. Low-volume breakouts frequently fail and reverse back through the level.</p>

<h3>Strategy 3 — Retest Trading (Most Reliable)</h3>
<p>After a confirmed breakout, wait for price to pull back and retest the broken level (role reversal) before entering in the breakout direction. This gives you a better entry price and confirmation that the breakout is genuine — failed retests (price bounces off the old resistance, now acting as support) are some of the highest-probability setups in technical analysis.</p>

<h2>Support and Resistance Zones, Not Lines</h2>
<p>A critical mindset shift: think of support and resistance as <em>zones</em>, not precise lines. Price rarely reverses at the exact same pip or rupee value every time. A support zone might span 30–50 points on Nifty. Within that zone, price may briefly dip below the "line" before reversing.</p>
<p>Drawing support and resistance as zones (shaded rectangles on your chart rather than single lines) prevents you from being stopped out prematurely when price briefly penetrates the level before reversing — which is extremely common and often a liquidity grab by institutional traders before the real move begins.</p>

<details>
<summary>What is support and resistance in trading?</summary>
<p>Support is a price level where buying demand consistently halts a downward price move and causes a bounce higher — acting as a floor. Resistance is a price ceiling where selling pressure consistently stops an upward move and causes a reversal lower. These levels form because traders have memory: the same prices where markets reversed in the past attract clusters of new orders in the future from buyers who missed the move, traders adding to winners, and traders exiting losing positions. The more times a level has been tested and held, the more significant it becomes.</p>
</details>

<details>
<summary>How do you identify support and resistance levels?</summary>
<p>Identify support and resistance levels using these methods: (1) Prior swing highs and lows — look for price levels where the market reversed at least twice on a daily or weekly chart; (2) Round numbers — psychological levels like 22,000, 22,500, 23,000 on Nifty attract clusters of orders; (3) Pivot points — mathematically calculated from the prior session's high, low, and close, providing objective daily support and resistance levels; (4) Moving averages — the 20-day, 50-day, and 200-day moving averages act as dynamic support in uptrends and resistance in downtrends. Levels become more significant when multiple methods confirm the same price zone.</p>
</details>

<details>
<summary>What is role reversal in support and resistance?</summary>
<p>Role reversal is when a broken support level becomes resistance, and a broken resistance level becomes support. When price breaks below a support level, traders who bought at that support are now losing. If price rallies back to that level, they sell to exit their losing trades — creating selling pressure at the same price that previously attracted buyers. This transforms the old support into resistance. Role reversal retest setups — entering after a breakout as price pulls back to test the broken level — are among the highest-probability trade entries in technical analysis.</p>
</details>

<details>
<summary>What is the difference between support and resistance and pivot points?</summary>
<p>Support and resistance from swing highs/lows are identified manually on a chart by looking at where price previously reversed. They are based on historical price action and are somewhat subjective — different traders may draw them slightly differently. Pivot points are mathematically calculated support and resistance levels derived from a formula using the previous session's high, low, and close. They are fully objective — every trader using the same formula gets identical levels. In practice, the most powerful trade setups occur when a pivot point level (calculated support/resistance) aligns with a manual support/resistance level from prior swing points — this confluence significantly increases the probability of a price reaction.</p>
</details>
`,
  },

  // ═══════════════════════════════════════════════════════════
  // BLOG 3 — Moving Average SMA vs EMA   [Jul 17]
  // Keyword : "moving average trading" / "SMA vs EMA"
  // Volume  : 20K–50K/mo
  // AI OV   : YES — formula-based definition + comparison
  // Gap     : No India-specific crossover strategy + tool combo
  // Tool CTA: Pivot Point Calculator
  // ═══════════════════════════════════════════════════════════
  {
    title: "Moving Average in Trading: SMA vs EMA Explained (With Strategies)",
    slug: "moving-average-sma-vs-ema-trading-guide",
    category: "Trading",
    author: "SM Dev Team",
    featuredImage: "https://res.cloudinary.com/dkfj0zehx/image/upload/v1784353196/smdevs_blog/moving-average-sma-ema-trading.webp",
    featuredImageAlt: "Moving average SMA vs EMA trading guide — how to use 20 EMA and 50 SMA for trading signals",
    focusKeyphrase: "moving average in trading",
    metaTitle: "Moving Average in Trading: SMA vs EMA Explained + Strategies",
    metaDescription: "A moving average smooths price data to identify trends. Learn the difference between SMA and EMA, the Golden Cross, the 20 EMA bounce strategy, and when each works best.",
    publishDate: "2026-07-17T05:30:00.000Z",
    status: "published",
    tldr: `A moving average smooths price data over a set period to reveal the underlying trend direction, filtering out random daily noise.
The Simple Moving Average (SMA) gives equal weight to all periods. The Exponential Moving Average (EMA) gives more weight to recent prices, reacting faster to price changes.
The most popular settings: 20 EMA for short-term trend, 50 SMA for medium-term trend, 200 SMA for long-term trend and major support/resistance.
The "Golden Cross" (50 SMA crossing above 200 SMA) and "Death Cross" (50 SMA crossing below 200 SMA) are widely watched institutional signals.
Moving averages work best in trending markets — they produce many false signals in sideways, choppy conditions.`,
    content: `
<h2>What Is a Moving Average in Trading?</h2>
<p>A moving average is a technical indicator that calculates the average price of a security over a specified number of periods, creating a smooth line on a chart that reveals the underlying trend direction. By averaging out the daily price fluctuations, moving averages help traders see whether price is in an uptrend, downtrend, or sideways consolidation — eliminating the noise that makes raw price charts difficult to interpret.</p>
<p>The word "moving" means the average recalculates each day (or candle) as new data arrives and old data drops off — so it literally moves across the chart as time progresses.</p>

<h2>Simple Moving Average (SMA) — Formula and Calculation</h2>
<p>The SMA is calculated by adding the closing prices for a set number of periods and dividing by that number:</p>
<pre><code>SMA(n) = (P1 + P2 + P3 + ... + Pn) ÷ n

Example — 5-day SMA for Nifty:
Day 1: 22,100 | Day 2: 22,250 | Day 3: 22,180 | Day 4: 22,400 | Day 5: 22,350
SMA(5) = (22,100 + 22,250 + 22,180 + 22,400 + 22,350) ÷ 5 = 22,256</code></pre>
<p>The SMA gives equal weight to each period in the calculation. The price from 50 days ago has the same influence on the 50-SMA as today's price. This makes the SMA smooth and stable — but slower to react to recent price changes.</p>

<h2>Exponential Moving Average (EMA) — How It Differs</h2>
<p>The EMA applies a multiplier that gives more weight to recent prices, making it respond faster to current price action than the SMA of the same period length.</p>
<pre><code>EMA Multiplier = 2 ÷ (n + 1)

For 20-period EMA: Multiplier = 2 ÷ (20 + 1) = 0.0952

EMA = (Current Price × Multiplier) + (Previous EMA × (1 − Multiplier))</code></pre>
<p>The practical result: when price makes a sharp move, the 20 EMA will respond noticeably faster than the 20 SMA. The EMA is more sensitive to recent market activity.</p>

<h2>SMA vs EMA: Which Should You Use?</h2>
<table>
  <thead><tr><th>Feature</th><th>SMA</th><th>EMA</th></tr></thead>
  <tbody>
    <tr><td><strong>Price weighting</strong></td><td>Equal weight to all periods</td><td>More weight to recent prices</td></tr>
    <tr><td><strong>Reaction speed</strong></td><td>Slower — lags more</td><td>Faster — less lag</td></tr>
    <tr><td><strong>False signals</strong></td><td>Fewer (smoother)</td><td>More in choppy markets</td></tr>
    <tr><td><strong>Best for</strong></td><td>Long-term trend identification, institutional signals (200 SMA)</td><td>Short-term momentum, intraday trading, dynamic support</td></tr>
    <tr><td><strong>Popular settings</strong></td><td>50 SMA, 100 SMA, 200 SMA</td><td>9 EMA, 20 EMA, 50 EMA</td></tr>
    <tr><td><strong>Used by</strong></td><td>Institutional investors, long-term trend traders</td><td>Intraday traders, swing traders, momentum traders</td></tr>
  </tbody>
</table>
<p>Most experienced traders use a combination — for example, the 20 EMA for dynamic support in an uptrend and the 200 SMA as the major trend line. Neither is universally better; they serve different purposes.</p>

<h2>The Most Important Moving Average Settings</h2>

<h3>20 EMA — The Trader's Moving Average</h3>
<p>The 20-period EMA is the most widely used moving average for active traders. In a strong uptrend, price consistently bounces off the 20 EMA on pullbacks, making it an excellent dynamic support level for buying dips. In a downtrend, the 20 EMA acts as resistance on rallies.</p>
<p>Intraday application on 15-minute charts: many intraday traders treat the 20 EMA as the primary trend filter — only taking long trades when price is above the 20 EMA and short trades when below it.</p>

<h3>50 SMA — The Swing Trader's Benchmark</h3>
<p>The 50-day SMA represents approximately 10 weeks of trading — a medium-term trend indicator. It is one of the most widely watched levels by portfolio managers and institutional traders for identifying medium-term trend changes. A stock consistently above its 50 SMA is considered in a medium-term uptrend; below it, a downtrend.</p>

<h3>200 SMA — The Institutional Trend Line</h3>
<p>The 200-day SMA is the most important moving average for long-term trend analysis. On a daily chart, the 200 SMA separates bull markets from bear markets. When Nifty 50 is above its 200 SMA, the long-term trend is bullish; below it, bearish. Many institutional fund managers have explicit rules about not holding equity exposure when the index is below its 200 SMA.</p>
<p>The 200 SMA is particularly powerful as a support/resistance level in its own right — markets frequently stage major bounces at the 200 SMA after extended corrections.</p>

<h2>The Golden Cross and Death Cross</h2>
<p>Two of the most famous moving average signals in all of technical analysis:</p>

<h3>Golden Cross</h3>
<p>A Golden Cross occurs when the 50-day SMA crosses <em>above</em> the 200-day SMA. It signals that medium-term momentum has shifted bullish and is a widely watched institutional buy signal. Golden Crosses on the Nifty 50 daily chart historically preceded sustained bull runs.</p>
<pre><code>Golden Cross: 50 SMA crosses ABOVE 200 SMA → Bullish signal</code></pre>

<h3>Death Cross</h3>
<p>The Death Cross is the opposite — when the 50-day SMA crosses <em>below</em> the 200-day SMA. It signals a shift to bearish medium-term momentum and is used by many institutional investors as a signal to reduce equity exposure.</p>
<pre><code>Death Cross: 50 SMA crosses BELOW 200 SMA → Bearish signal</code></pre>
<p><strong>Important caveat:</strong> Both signals are lagging — they occur after the trend has already changed. Golden Crosses and Death Crosses are more useful for confirming trend direction than for precise entry timing. Use them as context, not as standalone trade triggers.</p>

<h2>Moving Average Trading Strategies</h2>

<h3>Strategy 1 — 20 EMA Bounce (Trending Markets)</h3>
<p>In a confirmed uptrend (price above 50 SMA, above 200 SMA), wait for price to pull back and touch the 20 EMA. When a bullish reversal candle forms at the 20 EMA, enter long with a stop below the 20 EMA (or the most recent swing low). Target the prior high or a resistance level.</p>
<p>This is one of the cleanest and most consistently repeating patterns in trending markets. The 20 EMA bounce is valid on 15-minute (intraday), 1-hour (short swing), and daily (multi-day swing) timeframes.</p>

<h3>Strategy 2 — MA Crossover System</h3>
<p>Use two moving averages — one faster, one slower. When the fast MA crosses above the slow MA, go long. When it crosses below, go short (or exit). Common pairs: 9 EMA / 21 EMA for intraday, 20 EMA / 50 SMA for swing trades.</p>
<p><strong>Limitation:</strong> MA crossover systems produce many whipsaws in ranging markets. Always apply a trend filter — only take crossover signals in the direction of the longer-term trend (e.g., 200 SMA direction).</p>

<h3>Strategy 3 — Price Relative to 200 SMA (Trend Filter)</h3>
<p>Use the 200 SMA purely as a market regime filter rather than a trade trigger. Only take long setups when price is above the 200 SMA. Only take short setups when price is below the 200 SMA. This single filter dramatically improves the win rate of most trading systems by ensuring you trade in the direction of the dominant long-term trend.</p>

<h2>Combining Moving Averages with Pivot Points</h2>
<p>The highest-probability setups occur when a moving average aligns with a calculated pivot level — the confluence of two independent support/resistance methods creates a much stronger zone than either alone.</p>
<p>Example: if the daily 50 SMA at 22,380 coincides with the weekly S1 pivot at 22,370, this confluence zone is extremely significant. Calculate your pivot levels each morning with our free <a href="/tools/trading/pivot-calculator">Pivot Point Calculator</a> and overlay them on your moving average chart to identify high-confluence trade zones before the market opens.</p>

<details>
<summary>What is a moving average in trading?</summary>
<p>A moving average is a technical indicator that calculates the average price of a security over a specified number of time periods (candles), creating a smooth line on a price chart. It filters out random short-term price noise to reveal the underlying trend direction. As new price data arrives each period, the oldest data point drops off and the average recalculates — hence "moving." Moving averages are among the most widely used technical indicators, serving as dynamic support and resistance levels, trend filters, and crossover signals.</p>
</details>

<details>
<summary>What is the difference between SMA and EMA?</summary>
<p>The Simple Moving Average (SMA) gives equal weight to every price period in its calculation — the price from 50 days ago has the same influence as today's price. The Exponential Moving Average (EMA) applies a weighting multiplier that gives more importance to recent prices, making it respond faster to new price action. The result: the EMA reacts more quickly to price changes and is preferred by short-term and intraday traders, while the SMA produces a smoother, more stable line preferred for long-term trend analysis and institutional signals like the 200-day moving average.</p>
</details>

<details>
<summary>What is the Golden Cross in trading?</summary>
<p>The Golden Cross is a technical signal that occurs when a security's 50-day Simple Moving Average crosses above its 200-day Simple Moving Average. It indicates that medium-term momentum has shifted bullish and the price trend may be turning upward for the longer term. The Golden Cross is widely watched by institutional investors and fund managers as a bullish confirmation signal. Its opposite — the Death Cross (50 SMA crossing below 200 SMA) — is a bearish signal. Both are lagging indicators that confirm trend changes after they occur rather than predicting them in advance.</p>
</details>

<details>
<summary>Which moving average is best for intraday trading?</summary>
<p>For intraday trading, the 20-period EMA is the most widely used moving average. Applied to a 15-minute chart, it provides dynamic support in uptrends and resistance in downtrends, giving intraday traders a reference for trend direction and pullback entries. The 9 EMA is used by very short-term traders for momentum signals. Many intraday traders use a combination — the 9 EMA for momentum direction and the 20 EMA as the primary trend filter, only taking trades in the direction the price is relative to the 20 EMA.</p>
</details>

<details>
<summary>Do moving averages work for Indian stocks and Nifty?</summary>
<p>Yes — moving averages are widely used by Indian traders and analysts for Nifty 50, Bank Nifty, and individual stocks on NSE/BSE. The 200-day SMA on the Nifty 50 daily chart is one of the most important technical levels watched by domestic and FII (Foreign Institutional Investor) fund managers for long-term trend assessment. The 20 EMA on 15-minute Nifty charts is a primary reference for intraday traders. Moving averages work on Indian markets the same way they work globally because they are based on price action and trader psychology rather than any market-specific characteristic.</p>
</details>
`,
  },

  // ═══════════════════════════════════════════════════════════
  // BLOG 4 — What Is EPS   [Jul 18]
  // Keyword : "what is EPS" / "earnings per share"
  // Volume  : 15K–40K/mo; high India retail investor interest
  // AI OV   : YES — definitional formula + how to use
  // Gap     : Complements PE ratio blog; no India-specific
  //           diluted EPS, EPS growth analysis guide exists
  // Tool CTA: Intrinsic Value Calculator
  // ═══════════════════════════════════════════════════════════
  {
    title: "What Is EPS (Earnings Per Share)? Formula, Types & How to Use It",
    slug: "what-is-eps-earnings-per-share-explained",
    category: "Trading",
    author: "SM Dev Team",
    featuredImage: "https://res.cloudinary.com/dkfj0zehx/image/upload/v1784353195/smdevs_blog/what-is-eps-earnings-per-share.webp",
    featuredImageAlt: "What is EPS earnings per share — formula types and how to use EPS for stock analysis",
    focusKeyphrase: "what is EPS earnings per share",
    metaTitle: "What Is EPS (Earnings Per Share)? Formula, Types & Analysis Guide",
    metaDescription: "EPS (Earnings Per Share) = Net Profit ÷ Shares Outstanding. Learn basic vs diluted EPS, trailing vs forward EPS, EPS growth analysis, and how to use EPS with the P/E ratio.",
    publishDate: "2026-07-18T05:30:00.000Z",
    status: "published",
    tldr: `EPS (Earnings Per Share) is the portion of a company's net profit allocated to each outstanding share. Formula: EPS = Net Profit ÷ Weighted Average Shares Outstanding.
Higher EPS means the company is generating more profit per share — generally a positive sign for shareholders.
Diluted EPS is more conservative than Basic EPS — it accounts for all potential shares from stock options, convertible bonds, and warrants.
EPS growth rate (how fast EPS increases over time) is more important than the absolute EPS number when comparing companies.
EPS is the "E" in the P/E ratio — understanding EPS deeply allows you to evaluate whether a stock's valuation is justified.`,
    content: `
<h2>What Is EPS (Earnings Per Share)?</h2>
<p>EPS stands for Earnings Per Share — the portion of a company's net profit that is attributable to each individual outstanding share of stock. It is one of the most fundamental metrics in stock analysis, telling you exactly how much profit the company generates for every share you own.</p>
<p>EPS is the "E" in the widely-used P/E ratio (Price-to-Earnings). Understanding EPS is therefore a prerequisite for using P/E ratios correctly in stock valuation.</p>

<h2>EPS Formula and Calculation</h2>
<pre><code>Basic EPS = Net Profit (PAT) ÷ Weighted Average Shares Outstanding

Example:
Company ABC reports Net Profit (PAT): ₹480 crore
Weighted average shares outstanding: 120 crore shares

EPS = ₹480 Cr ÷ 120 Cr = ₹4.00 per share</code></pre>
<p>This means for every share you own in Company ABC, the company earned ₹4.00 in profit during the year. If the share price is ₹80, the P/E ratio is 80 ÷ 4 = 20x — investors are paying 20 times the annual earnings per share.</p>
<p><strong>Where to find EPS for Indian stocks:</strong> Check the company's quarterly result press release (BSE/NSE filings), the screener.in or tickertape.in financial data pages, or the company's investor relations website. EPS is reported on a per-share, annualised basis in India's financial results.</p>

<h2>Basic EPS vs Diluted EPS</h2>
<p>There are two versions of EPS, and understanding the difference is critical for accurate valuation:</p>
<table>
  <thead><tr><th>Feature</th><th>Basic EPS</th><th>Diluted EPS</th></tr></thead>
  <tbody>
    <tr><td><strong>Shares counted</strong></td><td>Only currently outstanding shares</td><td>All potential shares including options, warrants, convertibles</td></tr>
    <tr><td><strong>Value</strong></td><td>Higher (fewer shares in denominator)</td><td>Lower (more shares in denominator)</td></tr>
    <tr><td><strong>Conservatism</strong></td><td>Less conservative</td><td>More conservative — shows "worst case" dilution</td></tr>
    <tr><td><strong>Best for</strong></td><td>Current snapshot</td><td>Valuation analysis (use this one)</td></tr>
    <tr><td><strong>When equal</strong></td><td colspan="2">When the company has no stock options, warrants, or convertible securities outstanding</td></tr>
  </tbody>
</table>
<p><strong>Rule:</strong> Always use <em>diluted EPS</em> for valuation calculations, including when computing P/E ratios. Diluted EPS is the more conservative and complete measure because it accounts for all the potential shares that could enter the market through employee stock options, convertible bonds, or other dilutive instruments.</p>

<h2>Trailing EPS vs Forward EPS (TTM vs NTM)</h2>
<p>EPS can be calculated based on different time periods:</p>
<ul>
  <li><strong>Trailing EPS (TTM — Trailing Twelve Months):</strong> Based on the last four reported quarters of actual earnings. This is factual data — no estimates. Use trailing EPS for conservative, historically-grounded valuation.</li>
  <li><strong>Forward EPS (NTM — Next Twelve Months):</strong> Based on analyst consensus estimates for the coming year's earnings. Forward EPS is more forward-looking but dependent on analyst accuracy — which can be materially wrong, especially for cyclical businesses or companies undergoing major changes.</li>
</ul>
<p>The P/E ratio computed with trailing EPS is called the trailing P/E; with forward EPS it is the forward P/E. Both have their uses — trailing P/E for conservative historical comparison, forward P/E for growth-oriented companies where current earnings significantly understate future earning power.</p>

<h2>EPS Growth Rate: The Most Important EPS Metric</h2>
<p>The absolute EPS number is less important than its growth rate over time. A company with EPS of ₹2 growing at 30% annually is far more valuable than a company with EPS of ₹10 growing at 3% annually.</p>
<pre><code>EPS Growth Rate (YoY) = (Current Year EPS − Prior Year EPS) ÷ Prior Year EPS × 100

Example:
FY2023 EPS: ₹12.50
FY2024 EPS: ₹15.75
EPS Growth = (15.75 − 12.50) ÷ 12.50 × 100 = 26%</code></pre>
<p>When evaluating a stock, look at 3-year and 5-year EPS CAGR (Compound Annual Growth Rate) to assess the company's earnings growth trajectory. Consistent 15–20% EPS growth over 5 years is characteristic of quality compounders — the type of businesses that deliver outstanding long-term shareholder returns.</p>

<h2>EPS and P/E Ratio: How They Work Together</h2>
<p>EPS and P/E ratio are inseparable in stock valuation. Understanding both allows you to answer the fundamental valuation question: "Is this stock cheap or expensive for the growth it delivers?"</p>
<table>
  <thead><tr><th>Scenario</th><th>EPS</th><th>Share Price</th><th>P/E Ratio</th><th>Interpretation</th></tr></thead>
  <tbody>
    <tr><td>Value stock</td><td>₹25</td><td>₹300</td><td>12x</td><td>Low P/E — cheap if earnings are sustainable</td></tr>
    <tr><td>Growth stock</td><td>₹8</td><td>₹320</td><td>40x</td><td>High P/E — justified only if EPS grows 25%+/yr</td></tr>
    <tr><td>EPS decline</td><td>₹5 → ₹3</td><td>₹90</td><td>30x (on depressed E)</td><td>Dangerously misleading — P/E looks ok but EPS is falling</td></tr>
  </tbody>
</table>
<p>Use our free <a href="/tools/trading/intrinsic-value">Intrinsic Value Calculator</a> to input EPS and growth rate and compute the stock's fair value using both the Graham formula (EPS × (8.5 + 2g)) and the DCF model — giving you a data-driven valuation rather than relying solely on the P/E ratio.</p>

<h2>What Affects EPS: Earnings Quality</h2>
<p>Not all EPS is equal. High-quality EPS is backed by genuine cash flow. Low-quality EPS may be inflated by accounting choices. Always check these factors:</p>
<ul>
  <li><strong>One-time items:</strong> A company might report high EPS because it sold a building or received an insurance payout. Strip out one-time items to see "normalised EPS" — the recurring earning power.</li>
  <li><strong>Share buybacks:</strong> When a company buys back its own shares, the share count in the denominator decreases — mathematically increasing EPS even if profits are flat. Check whether EPS growth is driven by profit growth or share count reduction.</li>
  <li><strong>Depreciation and amortisation:</strong> Aggressive or conservative depreciation policies significantly affect reported profit (and therefore EPS) without affecting cash flow.</li>
  <li><strong>Tax rate changes:</strong> A one-time drop in the effective tax rate boosts EPS. Check the reported tax rate versus the historical average.</li>
</ul>

<h2>How to Use EPS for Stock Analysis: Step-by-Step</h2>
<ol>
  <li><strong>Find diluted TTM EPS</strong> from the company's latest annual results or quarterly filing</li>
  <li><strong>Calculate the trailing P/E ratio:</strong> Current share price ÷ EPS</li>
  <li><strong>Compare to sector P/E average</strong> — is the company expensive or cheap relative to peers?</li>
  <li><strong>Check EPS growth trend</strong> — compute YoY EPS growth for the last 3–5 years</li>
  <li><strong>Calculate PEG ratio:</strong> P/E ÷ EPS growth rate — values below 1 suggest potential undervaluation</li>
  <li><strong>Use EPS in the Graham formula</strong> to estimate intrinsic value: IV = EPS × (8.5 + 2g)</li>
  <li><strong>Check EPS quality</strong> — is the growth driven by genuine profit increase or one-time items or buybacks?</li>
</ol>

<details>
<summary>What is EPS in stocks?</summary>
<p>EPS (Earnings Per Share) is the portion of a company's net profit allocated to each outstanding share of stock. It is calculated by dividing the company's net profit (Profit After Tax) by the weighted average number of shares outstanding during the period. For example, if a company earns ₹500 crore in net profit and has 100 crore shares outstanding, its EPS is ₹5. EPS is the "E" in the P/E ratio and is one of the most fundamental metrics in stock valuation and analysis.</p>
</details>

<details>
<summary>What is the difference between basic EPS and diluted EPS?</summary>
<p>Basic EPS uses only the currently outstanding shares in the denominator. Diluted EPS includes all potential future shares that could be created through stock options, employee stock option plans (ESOPs), convertible bonds, and warrants. Since diluted EPS accounts for more shares, it is always equal to or lower than basic EPS. Analysts and investors use diluted EPS for valuation because it provides a more conservative, worst-case picture of earnings per share after accounting for all possible dilution of existing shareholders.</p>
</details>

<details>
<summary>What is a good EPS for a stock?</summary>
<p>There is no universal "good" EPS value because it depends entirely on the company's share price, industry, and growth trajectory. What matters more than the absolute EPS number is EPS growth — how rapidly EPS is increasing year over year. A company with EPS of ₹2 growing at 30% per year is often more attractive than a company with EPS of ₹15 growing at 2%. For Indian markets, quality large-cap companies typically show EPS CAGR of 12–20% over a full business cycle. Consistent EPS growth above 15% for five or more consecutive years is a hallmark of a high-quality compounding business.</p>
</details>

<details>
<summary>How does EPS affect stock price?</summary>
<p>In the long run, stock prices follow EPS growth. A company that consistently grows its EPS will typically see its share price grow proportionally over a full market cycle, as the market eventually prices the stock at a similar P/E multiple applied to higher earnings. In the short run, any single quarterly EPS result significantly above or below analyst consensus expectations triggers a sharp stock price move — this is why earnings season is one of the most volatile periods for individual stocks. A consistent pattern of positive EPS surprises is one of the strongest drivers of sustained stock price appreciation.</p>
</details>

<details>
<summary>How is EPS used in the P/E ratio?</summary>
<p>The P/E ratio (Price-to-Earnings ratio) is calculated by dividing the current share price by EPS: P/E = Price ÷ EPS. EPS is therefore the denominator that determines how "expensive" or "cheap" the stock appears at its current price. If EPS increases while price stays constant, the P/E ratio falls (stock becomes cheaper). If EPS falls while price stays constant, P/E rises (stock becomes more expensive). This is why a falling P/E ratio during a rising stock price (because EPS is growing faster than price) is a positive signal — the stock is becoming cheaper relative to earnings even as it rises.</p>
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
console.log("\nDone. Total seeded: " + blogs.length);
