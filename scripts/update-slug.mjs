import pg from 'pg';

const DATABASE_URL = 'postgresql://neondb_owner:npg_K6ZfyJWGnBS4@ep-summer-rain-anjhb1ps.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require';

const OLD_SLUG = 'how-to-use-free-seo-tools-rank-higher-2025';
const NEW_SLUG = 'how-to-use-free-seo-tools-rank-higher';

(async () => {
  const client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  console.log('✅ Connected to Neon Postgres');

  // Check old slug exists
  const { rows } = await client.query('SELECT id, slug, custom_schema FROM blog_posts WHERE slug = $1', [OLD_SLUG]);
  if (rows.length === 0) {
    console.log('❌ Old slug not found in database:', OLD_SLUG);
    await client.end();
    process.exit(1);
  }

  // Check new slug is not already taken
  const { rowCount } = await client.query('SELECT 1 FROM blog_posts WHERE slug = $1', [NEW_SLUG]);
  if (rowCount > 0) {
    console.log('❌ New slug already exists:', NEW_SLUG);
    await client.end();
    process.exit(1);
  }

  // Update the slug and fix the URL inside custom_schema
  const row = rows[0];
  let updatedSchema = row.custom_schema || '';
  if (updatedSchema) {
    updatedSchema = updatedSchema.replace(
      /https:\/\/smdevs\.in\/resources\/blogs\/how-to-use-free-seo-tools-rank-higher-2025/g,
      'https://smdevs.in/resources/blogs/how-to-use-free-seo-tools-rank-higher'
    );
  }

  const result = await client.query(
    'UPDATE blog_posts SET slug = $1, custom_schema = $2 WHERE slug = $3',
    [NEW_SLUG, updatedSchema, OLD_SLUG]
  );

  if (result.rowCount > 0) {
    console.log(`✅ Slug updated: ${OLD_SLUG} → ${NEW_SLUG}`);
    console.log(`✅ Schema URL updated inside custom_schema`);
    console.log(`\n🚀 New URL: https://smdevs.in/resources/blogs/${NEW_SLUG}`);
  } else {
    console.log('❌ Update failed');
  }

  await client.end();
})();
