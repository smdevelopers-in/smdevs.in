import pg from 'pg';
const client = new pg.Client({ connectionString: 'postgresql://neondb_owner:npg_K6ZfyJWGnBS4@ep-summer-rain-anjhb1ps.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require' });
await client.connect();

// Search for any existing blogs related to stock split, bonus issue, corporate actions
const terms = ['stock split', 'bonus', 'corporate action', 'bonus share', 'split', 'bonus issue'];
console.log('🔍 Checking existing blogs for stock split / bonus related content...\n');

for (const term of terms) {
  const r = await client.query(`
    SELECT slug, title, focus_keyphrase FROM blog_posts
    WHERE LOWER(title) LIKE $1 OR LOWER(focus_keyphrase) LIKE $1
    ORDER BY publish_date
  `, [`%${term}%`]);
  if (r.rows.length > 0) {
    console.log(`\n⚠️  MATCH for "${term}":`);
    r.rows.forEach(row => {
      console.log(`   [${row.focus_keyphrase}] ${row.slug}`);
      console.log(`   Title: ${row.title}`);
    });
  }
}

// Also get total blog count and last publish date
const countR = await client.query(`SELECT COUNT(*) as total, MAX(publish_date)::date as last_date FROM blog_posts`);
console.log(`\n📊 Total blogs: ${countR.rows[0].total}`);
console.log(`📅 Last publish date: ${countR.rows[0].last_date}`);

await client.end();
