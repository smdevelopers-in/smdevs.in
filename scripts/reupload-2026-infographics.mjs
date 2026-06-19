/**
 * reupload-2026-infographics.mjs
 * Overwrites the 2025-branded infographic images on Cloudinary with 2026 versions.
 */
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dkfj0zehx',
  api_key: '296562678135994',
  api_secret: 'OsJh1GsThS4Z-adhb9RcBd9y1-s',
});

const UPLOADS = [
  {
    localPath: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b5cbf90f-bdf9-4583-86c3-e1514d3e99e5\\infographic_ai_seo_2026_1781073084612.png',
    publicId: 'ai-seo-workflow',
    label: 'AI SEO Workflow 2026',
  },
  {
    localPath: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b5cbf90f-bdf9-4583-86c3-e1514d3e99e5\\infographic_google_ranking_2026_1781073108724.png',
    publicId: 'google-ranking-signals',
    label: 'Google Ranking Signals 2026',
  },
];

async function main() {
  console.log('☁️  Re-uploading 2026 infographic images to Cloudinary\n');
  for (const item of UPLOADS) {
    process.stdout.write(`  Uploading "${item.label}"... `);
    try {
      const result = await cloudinary.uploader.upload(item.localPath, {
        folder: 'smdevs/infographics',
        public_id: item.publicId,
        format: 'jpg',
        overwrite: true,
        invalidate: true,
        transformation: [
          { width: 900, height: 1200, crop: 'fill', quality: 'auto:best', gravity: 'center' },
        ],
      });
      console.log(`✅`);
      console.log(`     URL: ${result.secure_url}`);
    } catch (err) {
      console.log(`❌ ${err.message}`);
    }
  }
  console.log('\n✨ Done! CDN cache invalidated — images serve fresh 2026 versions.');
}

main().catch(console.error);
