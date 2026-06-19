/**
 * publish-infographics.mjs
 * Uploads 8 new infographic images to Cloudinary and logs their final URLs
 * so we can update infographics.ts with the real Cloudinary paths.
 * Run with: node scripts/publish-infographics.mjs
 */

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dkfj0zehx',
  api_key: '296562678135994',
  api_secret: 'OsJh1GsThS4Z-adhb9RcBd9y1-s',
});

const INFOGRAPHICS_TO_UPLOAD = [
  {
    localPath: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b5cbf90f-bdf9-4583-86c3-e1514d3e99e5\\infographic_ai_seo_2025_1781068706168.png',
    publicId:  'ai-seo-workflow',
    slug:      'ai-seo-workflow',
    label:     'AI SEO Workflow 2025',
  },
  {
    localPath: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b5cbf90f-bdf9-4583-86c3-e1514d3e99e5\\infographic_google_ranking_signals_1781068724663.png',
    publicId:  'google-ranking-signals',
    slug:      'google-ranking-signals',
    label:     'Google Ranking Signals 2025',
  },
  {
    localPath: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b5cbf90f-bdf9-4583-86c3-e1514d3e99e5\\infographic_keyword_research_1781068742313.png',
    publicId:  'keyword-research-process',
    slug:      'keyword-research-process',
    label:     'Keyword Research Process',
  },
  {
    localPath: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b5cbf90f-bdf9-4583-86c3-e1514d3e99e5\\infographic_on_page_seo_1781068761803.png',
    publicId:  'on-page-seo-elements',
    slug:      'on-page-seo-elements',
    label:     'On-Page SEO Elements',
  },
  {
    localPath: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b5cbf90f-bdf9-4583-86c3-e1514d3e99e5\\infographic_position_sizing_1781068779658.png',
    publicId:  'position-sizing-formula',
    slug:      'position-sizing-formula',
    label:     'Position Sizing Formula',
  },
  {
    localPath: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b5cbf90f-bdf9-4583-86c3-e1514d3e99e5\\infographic_content_marketing_funnel_1781068797313.png',
    publicId:  'content-marketing-funnel',
    slug:      'content-marketing-funnel',
    label:     'Content Marketing Funnel',
  },
  {
    localPath: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b5cbf90f-bdf9-4583-86c3-e1514d3e99e5\\infographic_backlink_strategy_1781068817444.png',
    publicId:  'backlink-building-strategy',
    slug:      'backlink-building-strategy',
    label:     'Backlink Building Strategy',
  },
  {
    localPath: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b5cbf90f-bdf9-4583-86c3-e1514d3e99e5\\infographic_local_seo_1781068835054.png',
    publicId:  'local-seo-framework',
    slug:      'local-seo-framework',
    label:     'Local SEO Framework',
  },
];

async function uploadInfographic(item) {
  const result = await cloudinary.uploader.upload(item.localPath, {
    folder: 'smdevs/infographics',
    public_id: item.publicId,
    format: 'jpg',
    overwrite: true,
    transformation: [
      { width: 900, height: 1200, crop: 'fill', quality: 'auto:best', gravity: 'center' },
    ],
  });
  return result.secure_url;
}

async function main() {
  console.log('🖼️  SM Developers — Infographic Publisher\n');

  const results = {};

  for (const item of INFOGRAPHICS_TO_UPLOAD) {
    process.stdout.write(`  Uploading "${item.label}"... `);
    try {
      const url = await uploadInfographic(item);
      results[item.slug] = url;
      console.log(`✅`);
      console.log(`     URL: ${url}`);
    } catch (err) {
      console.log(`❌ ${err.message}`);
      results[item.slug] = 'UPLOAD_FAILED';
    }
  }

  console.log('\n\n📋 FINAL URL MAP (copy into infographics.ts):\n');
  for (const [slug, url] of Object.entries(results)) {
    console.log(`  "${slug}": "${url}",`);
  }

  // Output as JSON for easy parsing
  console.log('\n\nJSON_RESULT:' + JSON.stringify(results));
}

main().catch(console.error);
