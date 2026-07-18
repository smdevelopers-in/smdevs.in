/**
 * Audit all blog publish dates, group by date, and print a report.
 * node scripts/audit-blog-dates.mjs
 */
const res = await fetch('https://smdevs.in/api/blogs');
const blogs = await res.json();

console.log('=== TOTAL BLOGS:', blogs.length, '===\n');

// Group by date
const byDate = {};
blogs.forEach(b => {
  const date = new Date(b.publishDate || b.createdAt).toISOString().split('T')[0];
  if (!byDate[date]) byDate[date] = [];
  byDate[date].push({ 
    id: b.id, 
    slug: b.slug, 
    title: b.title.substring(0, 60),
    publishDate: b.publishDate || b.createdAt
  });
});

let clashCount = 0;
Object.keys(byDate).sort().forEach(d => {
  const count = byDate[d].length;
  const clash = count > 1 ? ' ⚠️  CLASH' : '';
  console.log(`DATE: ${d}  COUNT: ${count}${clash}`);
  byDate[d].forEach(b => {
    console.log(`  id=${b.id} | ${b.slug}`);
  });
  if (count > 1) clashCount++;
});

console.log(`\n=== DATES WITH MULTIPLE POSTS: ${clashCount} ===`);
