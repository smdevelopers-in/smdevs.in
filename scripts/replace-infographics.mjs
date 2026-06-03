import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dkfj0zehx',
  api_key: '296562678135994',
  api_secret: 'OsJh1GsThS4Z-adhb9RcBd9y1-s'
});

// Delete all old infographic images
const OLD_PUBLIC_IDS = [
  'smdevs/infographics/seo_process_flowchart',
  'smdevs/infographics/technical_seo_audit',
  'smdevs/infographics/google_ranking_factors',
  'smdevs/infographics/onpage_seo_checklist',
  'smdevs/infographics/content_marketing_funnel',
  'smdevs/infographics/ai_seo_workflow',
  'smdevs/infographics/core_web_vitals',
  'smdevs/infographics/local_seo_framework',
  'smdevs/infographics/backlink_blueprint',
  'smdevs/infographics/lead_gen_funnel',
];

// New images to upload
const BASE = 'C:/Users/Admin/.gemini/antigravity/brain/fc51764b-6f11-4040-a475-655196efa7c7';
const NEW_UPLOADS = [
  { file: `${BASE}/infographic_seo_audit_checklist_1780485939706.png`, publicId: 'smdevs/infographics/seo-audit-checklist' },
  { file: `${BASE}/infographic_core_web_vitals_1780485958221.png`,     publicId: 'smdevs/infographics/core-web-vitals-guide' },
];

(async () => {
  // Step 1: Delete old images
  console.log('🗑️  Deleting old infographic images...');
  try {
    const result = await cloudinary.api.delete_resources(OLD_PUBLIC_IDS);
    console.log(`   Deleted: ${Object.keys(result.deleted).length} images\n`);
  } catch(e) {
    console.log('   Note:', e.message, '\n');
  }

  // Step 2: Upload new images
  console.log('📤 Uploading new clean infographic images...');
  for (const u of NEW_UPLOADS) {
    try {
      const result = await cloudinary.uploader.upload(u.file, {
        public_id: u.publicId,
        overwrite: true,
        quality: 'auto',
        fetch_format: 'auto',
      });
      console.log(`✅ ${u.publicId.split('/').pop()} → ${result.secure_url}`);
    } catch(e) {
      console.error(`❌ Failed: ${u.publicId} — ${e.message}`);
    }
  }
  console.log('\n✅ Done!');
})();
