import pg from 'pg';
import { v2 as cloudinary } from 'cloudinary';

const DATABASE_URL = 'postgresql://neondb_owner:npg_K6ZfyJWGnBS4@ep-summer-rain-anjhb1ps.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require';
const BASE = 'C:/Users/Admin/.gemini/antigravity/brain/fc51764b-6f11-4040-a475-655196efa7c7';

cloudinary.config({
  cloud_name: 'dkfj0zehx',
  api_key: '296562678135994',
  api_secret: 'OsJh1GsThS4Z-adhb9RcBd9y1-s'
});

async function upload(file, publicId) {
  const r = await cloudinary.uploader.upload(file, {
    public_id: publicId, overwrite: true, quality: 'auto', fetch_format: 'auto'
  });
  return r.secure_url;
}

const blogContent = `
<h2>What Are Chart Patterns in Trading?</h2>

<p>Chart patterns are recognizable formations that appear on price charts, created by the movement of an asset's price over time. They represent the collective psychology of all buyers and sellers in the market — their fear, greed, hesitation, and conviction — compressed into a visual structure that repeats across all markets and timeframes.</p>

<p>Professional traders use chart patterns to identify high-probability trading opportunities before they develop. Each pattern has a defined entry point, a logical stop-loss placement, and a measurable price target — making them a complete trade framework, not just a visual indicator.</p>

<p>This guide covers the 10 most important chart patterns, how to identify each one, what it signals, and exactly how to trade it.</p>

<h2>1. Head and Shoulders Pattern</h2>

<p>The Head and Shoulders is one of the most reliable bearish reversal patterns in technical analysis. It forms after a sustained uptrend and signals a high-probability trend reversal from bullish to bearish.</p>

<p><strong>How to identify it:</strong></p>
<ul>
<li>Left Shoulder: price rises to a peak, then pulls back</li>
<li>Head: price rises again to a higher peak, then pulls back to the same support level (neckline)</li>
<li>Right Shoulder: price rises one more time but fails to reach the head's peak, then falls back to the neckline</li>
<li>Neckline: the horizontal support line connecting the two pullback lows</li>
</ul>

<p><strong>Signal:</strong> Bearish reversal — the pattern completes and activates when price breaks below the neckline with increased volume.</p>

<p><strong>How to trade it:</strong></p>
<ul>
<li>Entry: short position on the neckline break (close below neckline on strong volume)</li>
<li>Stop-Loss: above the right shoulder high</li>
<li>Price Target: measure the distance from the head's peak to the neckline, then project that distance downward from the neckline break point</li>
</ul>

<table>
<thead><tr><th>Component</th><th>Significance</th><th>Volume</th></tr></thead>
<tbody>
<tr><td>Left shoulder formation</td><td>First sign of weakening trend</td><td>High on rally</td></tr>
<tr><td>Head formation</td><td>Final push of the old trend</td><td>Lower than left shoulder</td></tr>
<tr><td>Right shoulder formation</td><td>Buyers losing control</td><td>Lowest of the three</td></tr>
<tr><td>Neckline break</td><td>Pattern confirmation</td><td>Should spike significantly</td></tr>
</tbody>
</table>

<h2>2. Inverse Head and Shoulders Pattern</h2>

<p>The Inverse Head and Shoulders is the bullish mirror image of the Head and Shoulders. It forms at the bottom of a downtrend and signals a high-probability reversal from bearish to bullish.</p>

<p><strong>How to identify it:</strong> Three troughs where the middle trough (head) is the lowest, and the two outer troughs (shoulders) are at approximately the same level. The neckline connects the two peaks between the troughs.</p>

<p><strong>Signal:</strong> Bullish reversal — confirmed when price breaks above the neckline on strong volume.</p>

<p><strong>How to trade it:</strong></p>
<ul>
<li>Entry: long position on the neckline breakout</li>
<li>Stop-Loss: below the right shoulder low</li>
<li>Price Target: head-to-neckline distance projected upward from the breakout point</li>
</ul>

<p>Pair this pattern analysis with the <a href="/tools/trading/risk-reward">Risk-Reward Calculator</a> to confirm the trade meets your minimum 2:1 ratio before entry.</p>

<h2>3. Double Top Pattern</h2>

<p>The Double Top is a bearish reversal pattern that forms when price tests the same resistance level twice, fails to break through on both attempts, and then reverses downward. It is one of the most frequently occurring and reliable reversal patterns across all timeframes.</p>

<p><strong>How to identify it:</strong></p>
<ul>
<li>Two price peaks at approximately the same level, separated by a moderate pullback (the valley)</li>
<li>The second peak fails to significantly exceed the first — indicating buying momentum is exhausted</li>
<li>The support level (neckline) connects the valley between the two peaks</li>
</ul>

<p><strong>Signal:</strong> Bearish reversal — confirmed on a close below the neckline (valley low) with increased volume.</p>

<p><strong>How to trade it:</strong></p>
<ul>
<li>Entry: short on neckline break confirmation</li>
<li>Stop-Loss: above both peaks (above the highest point of the pattern)</li>
<li>Price Target: distance from peaks to neckline, projected downward from the neckline break</li>
</ul>

<h2>4. Double Bottom Pattern</h2>

<p>The Double Bottom is the bullish mirror of the Double Top. It forms when price tests the same support level twice, holds on both attempts, and then reverses upward. It is an extremely reliable long setup, especially on higher timeframes.</p>

<p><strong>How to identify it:</strong> Two price troughs at approximately the same level, separated by a moderate rally peak (the neckline). The second trough should hold above or at the first — indicating sellers are exhausted.</p>

<p><strong>Signal:</strong> Bullish reversal — confirmed when price breaks and closes above the neckline (rally peak between the two bottoms) with strong volume.</p>

<p><strong>How to trade it:</strong></p>
<ul>
<li>Entry: long on neckline breakout close</li>
<li>Stop-Loss: below both bottoms</li>
<li>Price Target: neckline-to-bottom distance projected upward from the neckline breakout</li>
</ul>

<h2>5. Cup and Handle Pattern</h2>

<p>The Cup and Handle is a bullish continuation pattern first described by investor William O'Neil. It forms during an uptrend, signals a consolidation phase, and then resolves with a continuation of the original trend. It is one of the highest-probability bullish setups in technical analysis.</p>

<p><strong>How to identify it:</strong></p>
<ul>
<li>Cup: a rounded, U-shaped price decline and recovery — not a sharp V-shape. The right side of the cup should reach back to approximately the same price as the left side (the prior high)</li>
<li>Handle: a brief downward drift or consolidation after the cup completes — typically declining no more than 15% from the cup's right edge</li>
</ul>

<p><strong>Signal:</strong> Bullish continuation — the pattern activates on a breakout above the handle's upper resistance with above-average volume.</p>

<p><strong>How to trade it:</strong></p>
<ul>
<li>Entry: buy the breakout above the handle's resistance level</li>
<li>Stop-Loss: below the handle's lowest point</li>
<li>Price Target: the depth of the cup added to the breakout point</li>
</ul>

<h2>6. Bull Flag Pattern</h2>

<p>The Bull Flag is a short-term bullish continuation pattern that forms after a sharp, strong price move (the flagpole) followed by a tight, orderly consolidation that drifts slightly downward (the flag). It is one of the most tradeable intraday and swing trading patterns.</p>

<p><strong>How to identify it:</strong></p>
<ul>
<li>Flagpole: a sharp, near-vertical price increase on strong volume</li>
<li>Flag: a tight rectangular consolidation that drifts slightly downward — parallel upper and lower trendlines. Volume should decrease during the flag formation</li>
</ul>

<p><strong>Signal:</strong> Bullish continuation — the flag breaks upward continuing the original direction of the flagpole move.</p>

<p><strong>How to trade it:</strong></p>
<ul>
<li>Entry: long on breakout above the upper flag trendline</li>
<li>Stop-Loss: below the lower flag trendline</li>
<li>Price Target: flagpole length added to the flag's breakout point</li>
</ul>

<h2>7. Bear Flag Pattern</h2>

<p>The Bear Flag is the bearish mirror of the Bull Flag. It forms after a sharp downward move (flagpole) followed by a tight upward consolidation (flag) before continuing the downtrend.</p>

<p><strong>How to identify it:</strong> A sharp downward flagpole, followed by a tight consolidation that drifts slightly upward with parallel trendlines and decreasing volume.</p>

<p><strong>Signal:</strong> Bearish continuation — confirmed on a breakdown below the lower flag trendline.</p>

<p><strong>How to trade it:</strong></p>
<ul>
<li>Entry: short on breakdown below the flag's lower trendline</li>
<li>Stop-Loss: above the flag's upper trendline</li>
<li>Price Target: flagpole length projected downward from the breakdown point</li>
</ul>

<h2>8. Ascending Triangle Pattern</h2>

<p>The Ascending Triangle is a bullish continuation pattern characterized by a flat horizontal resistance line (buyers repeatedly test the same level) and a rising lower trendline (sellers getting weaker with each pullback). The pattern signals that buyers are gaining control.</p>

<p><strong>How to identify it:</strong></p>
<ul>
<li>Flat upper resistance: two or more touches at the same price level</li>
<li>Rising lower trendline: each successive pullback holds at a higher low</li>
<li>Volume typically decreases as the pattern compresses, then spikes on breakout</li>
</ul>

<p><strong>Signal:</strong> Bullish continuation (can also form as a reversal at bottoms) — confirmed on a close above the flat resistance with strong volume.</p>

<p><strong>How to trade it:</strong></p>
<ul>
<li>Entry: long on breakout above horizontal resistance</li>
<li>Stop-Loss: below the most recent higher low (last touch of the rising trendline)</li>
<li>Price Target: widest part of the triangle (from flat resistance to first touch of rising trendline) added to the breakout point</li>
</ul>

<h2>9. Descending Triangle Pattern</h2>

<p>The Descending Triangle is the bearish counterpart to the Ascending Triangle. It features a flat horizontal support level (sellers repeatedly defend) and a declining upper trendline (buyers getting weaker at each attempt). The pattern signals increasing seller control.</p>

<p><strong>How to identify it:</strong></p>
<ul>
<li>Flat lower support: two or more touches at the same price level</li>
<li>Declining upper trendline: each rally attempt reaches a lower high than the previous one</li>
</ul>

<p><strong>Signal:</strong> Bearish continuation (also valid as a reversal at tops) — confirmed on a close below the flat support level with strong volume.</p>

<p><strong>How to trade it:</strong></p>
<ul>
<li>Entry: short on breakdown below flat support</li>
<li>Stop-Loss: above the most recent lower high</li>
<li>Price Target: triangle height projected downward from the breakdown point</li>
</ul>

<h2>10. Symmetrical Triangle Pattern</h2>

<p>The Symmetrical Triangle is a neutral continuation pattern that forms when price makes lower highs and higher lows simultaneously — compressing into an apex. It represents a period of indecision between buyers and sellers, with the resolution (breakout) typically continuing in the direction of the prior trend.</p>

<p><strong>How to identify it:</strong></p>
<ul>
<li>Declining upper trendline: progressively lower highs</li>
<li>Rising lower trendline: progressively higher lows</li>
<li>The two lines converge toward an apex, with volume declining as the pattern forms</li>
</ul>

<p><strong>Signal:</strong> Continuation in the prior trend direction — but the direction of the breakout must be confirmed before entry. Trading the breakout direction rather than anticipating it is the professional approach.</p>

<p><strong>How to trade it:</strong></p>
<ul>
<li>Entry: on the confirmed breakout direction (above upper trendline for long, below lower trendline for short)</li>
<li>Stop-Loss: on the opposite trendline from the breakout direction</li>
<li>Price Target: widest part of the triangle (at the leftmost point) projected in the breakout direction from the apex</li>
</ul>

<h2>Chart Pattern Success Rates: What the Data Shows</h2>

<table>
<thead>
<tr><th>Pattern</th><th>Direction</th><th>Avg. Success Rate</th><th>Avg. Price Move</th></tr>
</thead>
<tbody>
<tr><td>Inverse Head & Shoulders</td><td>Bullish reversal</td><td>83%</td><td>+37%</td></tr>
<tr><td>Cup and Handle</td><td>Bullish continuation</td><td>68%</td><td>+34%</td></tr>
<tr><td>Double Bottom</td><td>Bullish reversal</td><td>72%</td><td>+26%</td></tr>
<tr><td>Ascending Triangle</td><td>Bullish continuation</td><td>72%</td><td>+36%</td></tr>
<tr><td>Bull Flag</td><td>Bullish continuation</td><td>67%</td><td>+23%</td></tr>
<tr><td>Head & Shoulders</td><td>Bearish reversal</td><td>83%</td><td>-22%</td></tr>
<tr><td>Double Top</td><td>Bearish reversal</td><td>75%</td><td>-19%</td></tr>
<tr><td>Descending Triangle</td><td>Bearish continuation</td><td>72%</td><td>-31%</td></tr>
<tr><td>Bear Flag</td><td>Bearish continuation</td><td>67%</td><td>-22%</td></tr>
<tr><td>Symmetrical Triangle</td><td>Continuation (both)</td><td>58%</td><td>±19%</td></tr>
</tbody>
</table>

<p><em>Success rates based on Thomas Bulkowski's Encyclopedia of Chart Patterns — the most comprehensive statistical study of chart pattern performance across thousands of historical examples.</em></p>

<h2>5 Rules for Trading Chart Patterns Profitably</h2>

<ol>
<li><strong>Wait for confirmation:</strong> Never enter on a pattern that hasn't completed and broken out. Anticipating a breakout means you are often wrong, and the stop-loss distance is larger. Wait for the close beyond the key level.</li>
<li><strong>Volume must confirm the breakout:</strong> A breakout on below-average volume has a significantly higher failure rate. Strong volume on the breakout bar is the signal that institutional money is participating.</li>
<li><strong>Use the measured move for price targets:</strong> Every pattern has a defined target measurement. Use it. Don't hold past the target hoping for more — the pattern has defined the probable move.</li>
<li><strong>Always calculate risk-reward before entry:</strong> If the pattern's logical stop-loss placement means your risk-reward ratio is below 2:1, skip the trade. Use the <a href="/tools/trading/risk-reward">Risk-Reward Calculator</a> to confirm every pattern trade.</li>
<li><strong>Confirm with higher timeframe context:</strong> A bullish pattern on the 1-hour chart is significantly stronger if the daily chart is also in an uptrend. Never trade a bullish pattern against the dominant trend on a higher timeframe.</li>
</ol>

<h2>How to Calculate Your Break-Even on Pattern Trades</h2>

<p>Every chart pattern trade has a break-even price — the level the position must reach just to cover your entry cost, commissions, and spread. Use the <a href="/tools/trading/break-even">Break-Even Calculator</a> to calculate this number before entry. Setting your first profit target at break-even (and moving your stop there once reached) is a core professional risk management technique that eliminates the possibility of a losing trade on any position that has moved in your favor.</p>

<h2>Key Takeaways</h2>
<ul>
<li>Chart patterns are repeating price formations that signal high-probability entry points with defined targets and stop placements</li>
<li>The 10 essential patterns: Head & Shoulders, Inverse H&S, Double Top, Double Bottom, Cup & Handle, Bull Flag, Bear Flag, Ascending Triangle, Descending Triangle, Symmetrical Triangle</li>
<li>Every pattern has a measured move price target — always calculate it before entry</li>
<li>Volume confirmation on the breakout is mandatory — pattern breakouts on low volume fail significantly more often</li>
<li>Always calculate risk-reward before entering any pattern trade — minimum 2:1 is the professional standard</li>
</ul>

<details>
<summary>What are the most reliable chart patterns?</summary>
<p>Based on Thomas Bulkowski's statistical research across thousands of patterns, the most reliable are: Inverse Head and Shoulders (83% success rate, bullish reversal), Head and Shoulders (83% success rate, bearish reversal), Double Bottom (72% success rate), and Ascending Triangle (72% success rate). Success rates are significantly higher when volume confirms the breakout and the pattern aligns with the higher timeframe trend direction.</p>
</details>

<details>
<summary>How do you trade a Head and Shoulders pattern?</summary>
<p>Identify the three peaks (left shoulder, head, right shoulder) and draw the neckline connecting the two pullback lows. Enter a short position on a confirmed close below the neckline on strong volume. Place your stop-loss above the right shoulder's high. Calculate the price target by measuring the distance from the head's peak to the neckline, then project that same distance downward from the neckline break point.</p>
</details>

<details>
<summary>What is the difference between a bull flag and a cup and handle?</summary>
<p>A Bull Flag forms after a sharp, near-vertical price spike (flagpole) and consists of a brief, tight rectangular consolidation drifting slightly downward. It resolves quickly — typically within 1–4 weeks. A Cup and Handle forms a deeper, rounder U-shaped correction (the cup) followed by a shorter drift (the handle). The Cup and Handle typically takes weeks to months to fully form and signals a larger, more sustained move. Both are bullish continuation patterns, but Cup and Handle has a larger average price move upon breakout.</p>
</details>

<details>
<summary>How do you set price targets for chart patterns?</summary>
<p>Every major chart pattern uses the "measured move" technique. Measure the height of the pattern (from the pattern's extreme point to the breakout level), then project that same distance in the breakout direction from the breakout point. For Head and Shoulders: head peak to neckline distance, projected down from neckline. For triangles: widest part of the triangle, projected from the breakout. For flags: flagpole length, projected from the flag breakout.</p>
</details>

<details>
<summary>Do chart patterns work in all markets?</summary>
<p>Yes — chart patterns work in stocks, forex, cryptocurrencies, commodities, futures, and indices. They are effective across all liquid markets because they reflect universal human psychology (fear and greed) expressed through price movement. They also work across all timeframes, from 5-minute charts for day trading to weekly charts for position trading. Higher timeframe patterns are generally more reliable and produce larger measured moves.</p>
</details>

<details>
<summary>What volume should I look for on a chart pattern breakout?</summary>
<p>Volume should be above the 20-day average on the breakout bar — ideally 150–300% of average volume. This surge in volume indicates institutional participation in the move. Breakouts on below-average volume (sometimes called "low-volume breakouts") have a significantly higher failure rate and should be avoided or traded with reduced position size until volume confirms the move.</p>
</details>
`;

(async () => {
  const client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  console.log('✅ Connected\n');

  // Upload infographic
  console.log('📤 Uploading trading risk management infographic...');
  const infraUrl = await upload(
    `${BASE}/trading_risk_management_infographic_1780557265565.png`,
    'smdevs/infographics/trading-risk-management-rules'
  );
  console.log(`✅ Infographic: ${infraUrl}\n`);

  // Upload blog hero
  console.log('📤 Uploading chart patterns blog hero...');
  const heroUrl = await upload(
    `${BASE}/chart_patterns_blog_hero_1780557289522.png`,
    'smdevs/blogs/chart_patterns_blog_hero_2026'
  );
  console.log(`✅ Blog hero: ${heroUrl}\n`);

  // Publish blog
  const slug = 'chart-patterns-trading-guide';
  const { rowCount } = await client.query('SELECT 1 FROM blog_posts WHERE slug=$1', [slug]);
  if (rowCount > 0) {
    console.log('⚠️  Blog already exists');
  } else {
    const schema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "10 Chart Patterns Every Trader Must Know (With Examples and Price Targets)",
      "description": "A complete guide to the 10 most important chart patterns in technical analysis — including Head and Shoulders, Double Top, Cup and Handle, Bull Flag, and 6 more — with entry rules, stop-loss placement, and price target formulas.",
      "author": { "@type": "Organization", "name": "SM Developers", "url": "https://smdevs.in" },
      "publisher": { "@type": "Organization", "name": "SM Developers", "logo": { "@type": "ImageObject", "url": "https://smdevs.in/icon.png" } },
      "url": "https://smdevs.in/resources/blogs/chart-patterns-trading-guide",
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "image": heroUrl,
      "keywords": ["chart patterns", "technical analysis", "head and shoulders", "double top", "cup and handle", "bull flag", "trading patterns"],
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://smdevs.in/resources/blogs/chart-patterns-trading-guide" },
      "about": { "@type": "Thing", "name": "Chart Patterns Technical Analysis" }
    });

    await client.query(`
      INSERT INTO blog_posts
        (title, slug, content, excerpt, tldr, meta_title, meta_description, focus_keyphrase, category, author, featured_image, custom_schema, status, publish_date, created_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'published',NOW(),NOW())
    `, [
      '10 Chart Patterns Every Trader Must Know (With Examples and Price Targets)',
      slug,
      blogContent,
      'Chart patterns are repeating price formations that signal high-probability trade setups with defined entry points, stop-loss levels, and price targets. This guide covers the 10 most important patterns every trader needs to know — from Head and Shoulders to Cup and Handle — with exact trading rules for each.',
      `The 10 essential chart patterns: Head & Shoulders, Inverse H&S, Double Top, Double Bottom, Cup & Handle, Bull Flag, Bear Flag, Ascending Triangle, Descending Triangle, Symmetrical Triangle\nEvery pattern has a measurable price target using the "measured move" technique\nVolume must confirm breakouts — low-volume breakouts fail significantly more often\nHead and Shoulders and Inverse H&S have the highest statistical success rate at 83%\nAlways verify risk-reward (minimum 2:1) before entering any pattern trade`,
      '10 Chart Patterns Every Trader Must Know (With Examples and Price Targets)',
      'Learn the 10 most important chart patterns in technical analysis — Head and Shoulders, Double Top, Cup and Handle, Bull Flag, and more — with entry rules, stop-loss placement, and price targets.',
      'chart patterns trading',
      'Trading',
      'SM Developers Editorial',
      heroUrl,
      schema
    ]);
    console.log(`✅ Blog published: https://smdevs.in/resources/blogs/${slug}`);
  }

  // Output infographic URL for data file update
  console.log('\n📋 Infographic URL for data/infographics.ts:');
  console.log(infraUrl);

  await client.end();
})();
