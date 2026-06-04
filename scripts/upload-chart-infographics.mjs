import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dkfj0zehx',
  api_key: '296562678135994',
  api_secret: 'OsJh1GsThS4Z-adhb9RcBd9y1-s'
});

const BASE = 'C:/Users/Admin/.gemini/antigravity/brain/fc51764b-6f11-4040-a475-655196efa7c7';

const UPLOADS = [
  { file: `${BASE}/chart_infographic_head_shoulders_1780561500933.png`,       pid: 'smdevs/infographics/chart-pattern-head-and-shoulders' },
  { file: `${BASE}/chart_infographic_inverse_head_shoulders_1780561520480.png`, pid: 'smdevs/infographics/chart-pattern-inverse-head-and-shoulders' },
  { file: `${BASE}/chart_infographic_double_top_1780561540097.png`,            pid: 'smdevs/infographics/chart-pattern-double-top' },
  { file: `${BASE}/chart_infographic_double_bottom_1780561560920.png`,         pid: 'smdevs/infographics/chart-pattern-double-bottom' },
  { file: `${BASE}/chart_infographic_cup_handle_1780561582368.png`,            pid: 'smdevs/infographics/chart-pattern-cup-and-handle' },
  { file: `${BASE}/chart_infographic_bull_flag_1780561604775.png`,             pid: 'smdevs/infographics/chart-pattern-bull-flag' },
  { file: `${BASE}/chart_infographic_bear_flag_1780561623428.png`,             pid: 'smdevs/infographics/chart-pattern-bear-flag' },
  { file: `${BASE}/chart_infographic_ascending_triangle_1780561642379.png`,    pid: 'smdevs/infographics/chart-pattern-ascending-triangle' },
  { file: `${BASE}/chart_infographic_descending_triangle_1780561659563.png`,   pid: 'smdevs/infographics/chart-pattern-descending-triangle' },
  { file: `${BASE}/chart_infographic_symmetrical_triangle_1780561678581.png`,  pid: 'smdevs/infographics/chart-pattern-symmetrical-triangle' },
];

(async () => {
  console.log('📤 Uploading 10 chart pattern infographics to Cloudinary...\n');
  const results = [];
  for (const u of UPLOADS) {
    try {
      const r = await cloudinary.uploader.upload(u.file, {
        public_id: u.pid, overwrite: true, quality: 'auto', fetch_format: 'auto'
      });
      console.log(`✅ ${u.pid.split('/').pop()} → ${r.secure_url}`);
      results.push({ slug: u.pid.split('/').pop(), url: r.secure_url });
    } catch (e) {
      console.error(`❌ ${u.pid}: ${e.message}`);
    }
  }
  console.log('\n\n📋 All URLs:');
  results.forEach(r => console.log(`${r.slug}: ${r.url}`));
})();
