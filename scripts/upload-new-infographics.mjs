import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dkfj0zehx',
  api_key: '296562678135994',
  api_secret: 'OsJh1GsThS4Z-adhb9RcBd9y1-s'
});

const UPLOADS = [
  {
    file: 'D:/My Projects/smdevelopers/public/rsi-indicator-guide.png',
    publicId: 'smdevs/infographics/rsi-indicator-guide',
    slug: 'rsi-indicator-guide',
  },
  {
    file: 'D:/My Projects/smdevelopers/public/eeat-checklist-2026.png',
    publicId: 'smdevs/infographics/eeat-checklist-2026',
    slug: 'eeat-checklist-2026',
  },
  {
    file: 'D:/My Projects/smdevelopers/public/google-crawl-index-guide.png',
    publicId: 'smdevs/infographics/google-crawl-index-guide',
    slug: 'google-crawl-index-guide',
  },
];

(async () => {
  console.log('📤 Uploading 3 new infographics to Cloudinary...\n');
  const results = [];

  for (const u of UPLOADS) {
    try {
      const result = await cloudinary.uploader.upload(u.file, {
        public_id: u.publicId,
        overwrite: true,
        quality: 'auto',
        fetch_format: 'auto',
      });
      console.log(`✅ ${u.slug}`);
      console.log(`   → ${result.secure_url}\n`);
      results.push({ slug: u.slug, url: result.secure_url });
    } catch (e) {
      console.error(`❌ Failed: ${u.slug}`, e.message);
    }
  }

  console.log('\n📋 Update these URLs in data/infographics.ts:');
  results.forEach(r => {
    console.log(`  slug: "${r.slug}"`);
    console.log(`  image: "${r.url}"\n`);
  });

  console.log('✅ All done!');
})();
