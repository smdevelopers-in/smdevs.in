/**
 * Fix clashing publish dates — for every date that has N blogs,
 * spread them across N consecutive days (one per day) keeping the
 * middle/first blog on the original date, spreading earlier & later.
 *
 * Rule applied (matching user's instruction):
 *   3 blogs on same date  →  prev day | same day | next day
 *   4 blogs on same date  →  prev-1   | same     | next+1  | next+2
 *   5 blogs on same date  →  prev-2   | prev-1   | same    | next+1 | next+2
 *   6 blogs on same date  →  prev-2   | prev-1   | same    | next+1 | next+2 | next+3
 *
 * node scripts/fix-blog-dates.mjs
 */

const BASE_URL = "https://smdevs.in";

// ─── helpers ───────────────────────────────────────────────────────────────

function addDays(isoString, days) {
  const d = new Date(isoString);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString();
}

// Offset pattern: keep one on the "same" date, spread symmetrically.
// Always returns an array of offsets, length = count.
function offsets(count) {
  // anchor = index of the blog that stays on the original date
  const anchor = Math.floor(count / 2) - (count % 2 === 0 ? 1 : 0);
  return Array.from({ length: count }, (_, i) => i - anchor);
}

// ─── fetch all blogs ────────────────────────────────────────────────────────

const res = await fetch(`${BASE_URL}/api/blogs`);
const blogs = await res.json();

console.log(`Total blogs fetched: ${blogs.length}\n`);

// Group by date
const byDate = {};
blogs.forEach(b => {
  const date = new Date(b.publishDate || b.createdAt).toISOString().split("T")[0];
  if (!byDate[date]) byDate[date] = [];
  byDate[date].push(b);
});

// ─── identify clashes ──────────────────────────────────────────────────────

const clashes = Object.entries(byDate).filter(([, group]) => group.length > 1);
console.log(`Dates with multiple blogs: ${clashes.length}`);
clashes.forEach(([date, group]) => {
  console.log(`  ${date} → ${group.length} blogs`);
});
console.log("");

// ─── build patch list ──────────────────────────────────────────────────────

const patches = []; // { slug, newDate, blog }

for (const [date, group] of clashes) {
  const offs = offsets(group.length);
  group.forEach((blog, idx) => {
    const originalDate = blog.publishDate || blog.createdAt;
    const newDate = addDays(originalDate, offs[idx]);
    const newDateDay = newDate.split("T")[0];
    patches.push({ slug: blog.slug, newDate, blog, originalDay: date, newDay: newDateDay });
  });
}

// ─── preview ──────────────────────────────────────────────────────────────

console.log("CHANGES TO APPLY:");
patches.forEach(p => {
  const dir = p.originalDay === p.newDay ? "  SAME   " : p.newDay < p.originalDay ? "◀ EARLIER" : "▶ LATER  ";
  console.log(`  ${dir}  ${p.slug}`);
  console.log(`           ${p.originalDay} → ${p.newDay}`);
});

// ─── apply patches ────────────────────────────────────────────────────────

console.log("\nApplying patches...\n");
let ok = 0, fail = 0;

for (const p of patches) {
  if (p.originalDay === p.newDay) {
    console.log(`⏺ SKIP (same)   ${p.slug}`);
    ok++;
    continue;
  }

  const body = { ...p.blog, publishDate: p.newDate };
  const r = await fetch(`${BASE_URL}/api/blogs?slug=${encodeURIComponent(p.slug)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await r.json();
  if (data.success) {
    console.log(`✅ UPDATED       ${p.slug}  →  ${p.newDay}`);
    ok++;
  } else {
    console.log(`❌ FAILED        ${p.slug}  —  ${data.error}`);
    fail++;
  }
}

console.log(`\nDone. Updated: ${ok}  Failed: ${fail}`);
