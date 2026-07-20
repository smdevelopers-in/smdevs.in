import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dkfj0zehx',
  api_key: '296562678135994',
  api_secret: 'OsJh1GsThS4Z-adhb9RcBd9y1-s'
});

const UPLOADS = [
  {
    file: 'D:/My Projects/smdevelopers/public/macd-indicator-guide.png',
    publicId: 'smdevs/infographics/macd-indicator-guide',
    slug: 'macd-indicator-guide',
  },
  {
    file: 'D:/My Projects/smdevelopers/public/candlestick-patterns-cheatsheet.png',
    publicId: 'smdevs/infographics/candlestick-patterns-cheatsheet',
    slug: 'candlestick-patterns-cheatsheet',
  },
  {
    file: 'D:/My Projects/smdevelopers/public/topic-cluster-strategy.png',
    publicId: 'smdevs/infographics/topic-cluster-strategy',
    slug: 'topic-cluster-strategy',
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

  console.log('\n📋 Cloudinary URLs:');
  results.forEach(r => {
    console.log(`  ${r.slug}: ${r.url}`);
  });
  console.log('\n✅ All done!');
})();
