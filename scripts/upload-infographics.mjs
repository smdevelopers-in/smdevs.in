import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dkfj0zehx',
  api_key: '296562678135994',
  api_secret: 'OsJh1GsThS4Z-adhb9RcBd9y1-s'
});

const BASE = 'C:/Users/Admin/.gemini/antigravity/brain/fc51764b-6f11-4040-a475-655196efa7c7';

const UPLOADS = [
  { file: `${BASE}/infographic_seo_process_flowchart_1780484830925.png`,  publicId: 'smdevs/infographics/seo_process_flowchart' },
  { file: `${BASE}/infographic_technical_seo_audit_1780484850714.png`,     publicId: 'smdevs/infographics/technical_seo_audit' },
  { file: `${BASE}/infographic_google_ranking_factors_1780484872213.png`,  publicId: 'smdevs/infographics/google_ranking_factors' },
  { file: `${BASE}/infographic_onpage_seo_checklist_1780484892304.png`,    publicId: 'smdevs/infographics/onpage_seo_checklist' },
  { file: `${BASE}/infographic_content_marketing_funnel_1780484911689.png`,publicId: 'smdevs/infographics/content_marketing_funnel' },
  { file: `${BASE}/infographic_ai_seo_workflow_1780484934556.png`,         publicId: 'smdevs/infographics/ai_seo_workflow' },
  { file: `${BASE}/infographic_core_web_vitals_1780484956365.png`,         publicId: 'smdevs/infographics/core_web_vitals' },
  { file: `${BASE}/infographic_local_seo_framework_1780484977187.png`,     publicId: 'smdevs/infographics/local_seo_framework' },
  { file: `${BASE}/infographic_backlink_blueprint_1780484993875.png`,      publicId: 'smdevs/infographics/backlink_blueprint' },
  { file: `${BASE}/infographic_lead_gen_funnel_1780485014676.png`,         publicId: 'smdevs/infographics/lead_gen_funnel' },
];

(async () => {
  console.log('📤 Uploading 10 infographics to Cloudinary...\n');
  for (const u of UPLOADS) {
    try {
      const result = await cloudinary.uploader.upload(u.file, {
        public_id: u.publicId,
        overwrite: true,
        quality: 'auto',
        fetch_format: 'auto',
      });
      console.log(`✅ ${u.publicId.split('/').pop()}`);
      console.log(`   → ${result.secure_url}\n`);
    } catch (e) {
      console.error(`❌ Failed: ${u.publicId}`, e.message);
    }
  }
  console.log('✅ All uploads complete!');
})();
