import pg from 'pg';

const DATABASE_URL = 'postgresql://neondb_owner:npg_K6ZfyJWGnBS4@ep-summer-rain-anjhb1ps.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require';

// Slugs to rename (remove year suffix)
const SLUG_RENAMES = [
  { old: 'what-is-schema-markup-structured-data-guide-2025', new: 'what-is-schema-markup-structured-data-guide' },
  { old: 'keyword-intent-analysis-complete-guide-2025',      new: 'keyword-intent-analysis-complete-guide' },
];

// These 6 slugs need content/meta updated from 2025 → 2026
const SLUGS_TO_UPDATE_YEAR = [
  'how-to-use-free-seo-tools-rank-higher',
  'what-is-schema-markup-structured-data-guide', // will be renamed above first
  'keyword-intent-analysis-complete-guide',       // will be renamed above first
  'free-trading-calculators-risk-management-guide',
  'how-to-write-perfect-meta-title-meta-description',
  'on-page-seo-checklist-23-things-audit-before-publish',
];

function replace2025(text) {
  if (!text) return text;
  return text
    .replace(/\b2025\b/g, '2026')
    .replace(/rank-higher-in-2025/gi, 'rank-higher-in-2026')
    .replace(/structured-data-guide-2025/gi, 'structured-data-guide-2026');
}

(async () => {
  const client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  console.log('✅ Connected to Neon Postgres\n');

  // ── Step 1: Rename slugs with year suffix ────────────────────────────────
  console.log('── STEP 1: Removing year from slugs ──');
  for (const rename of SLUG_RENAMES) {
    // Check if old slug exists
    const { rowCount: exists } = await client.query('SELECT 1 FROM blog_posts WHERE slug=$1', [rename.old]);
    if (!exists) { console.log(`  ⚠️  Not found: ${rename.old}`); continue; }

    // Check new slug not already taken
    const { rowCount: taken } = await client.query('SELECT 1 FROM blog_posts WHERE slug=$1', [rename.new]);
    if (taken) { console.log(`  ⚠️  New slug already taken: ${rename.new}`); continue; }

    // Update slug and fix URLs in custom_schema
    const { rows } = await client.query('SELECT custom_schema FROM blog_posts WHERE slug=$1', [rename.old]);
    let schema = rows[0]?.custom_schema || '';
    schema = schema.replace(new RegExp(rename.old, 'g'), rename.new);

    await client.query(
      'UPDATE blog_posts SET slug=$1, custom_schema=$2 WHERE slug=$3',
      [rename.new, schema, rename.old]
    );
    console.log(`  ✅ ${rename.old}`);
    console.log(`     → ${rename.new}`);
  }

  // ── Step 2: Replace 2025 → 2026 in all content/meta fields ─────────────
  console.log('\n── STEP 2: Replacing 2025 → 2026 in content & meta ──');

  // Re-fetch final slugs after renames
  const finalSlugs = SLUGS_TO_UPDATE_YEAR; // already has new names

  for (const slug of finalSlugs) {
    const { rows } = await client.query(
      'SELECT slug, title, content, excerpt, meta_title, meta_description, custom_schema, tldr FROM blog_posts WHERE slug=$1',
      [slug]
    );
    if (!rows[0]) { console.log(`  ⚠️  Not found: ${slug}`); continue; }

    const r = rows[0];
    const updated = {
      title:            replace2025(r.title),
      content:          replace2025(r.content),
      excerpt:          replace2025(r.excerpt),
      meta_title:       replace2025(r.meta_title),
      meta_description: replace2025(r.meta_description),
      custom_schema:    replace2025(r.custom_schema),
      tldr:             replace2025(r.tldr),
    };

    await client.query(`
      UPDATE blog_posts SET
        title=$1, content=$2, excerpt=$3, meta_title=$4,
        meta_description=$5, custom_schema=$6, tldr=$7
      WHERE slug=$8
    `, [
      updated.title, updated.content, updated.excerpt, updated.meta_title,
      updated.meta_description, updated.custom_schema, updated.tldr, slug
    ]);

    console.log(`  ✅ Updated: ${slug}`);
    if (r.meta_title !== updated.meta_title) {
      console.log(`     Meta title: "${r.meta_title}"`);
      console.log(`             → "${updated.meta_title}"`);
    }
  }

  // ── Step 3: Verify final state ───────────────────────────────────────────
  console.log('\n── FINAL STATE ──');
  const { rows: final } = await client.query(
    'SELECT slug, meta_title FROM blog_posts ORDER BY publish_date DESC LIMIT 10'
  );
  final.forEach(r => console.log(`  ${r.slug}\n    → ${r.meta_title}`));

  await client.end();
  console.log('\n✅ All done!');
})();
