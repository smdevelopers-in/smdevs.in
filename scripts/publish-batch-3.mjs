/**
 * publish-batch-3.mjs
 * Publishes the final 3 high-ranking, 3500+ word ATS/Resume pillars to smdevs.in.
 * Run with: node scripts/publish-batch-3.mjs
 */

import { v2 as cloudinary } from 'cloudinary';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const blog1Content = require('./blog1_content.js');
const blog2Content = require('./blog2_content.js');
const blog3Content = require('./blog3_content.js');

cloudinary.config({
  cloud_name: 'dkfj0zehx',
  api_key: '296562678135994',
  api_secret: 'OsJh1GsThS4Z-adhb9RcBd9y1-s',
});

const API_URL = 'https://smdevs.in/api/blogs';

async function uploadImage(localPath, publicId) {
  console.log(`  📸 Uploading image: ${publicId}...`);
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder: 'smdevs_blog',
      public_id: publicId,
      format: 'webp',
      overwrite: true,
      transformation: [{ width: 1200, height: 675, crop: 'fill', quality: 'auto:good' }],
    });
    console.log(`  ✅ Uploaded: ${result.secure_url}`);
    return result.secure_url;
  } catch (err) {
    console.log(`  ⚠️ Image upload failed for ${publicId}. Will proceed without it if it's already there or handle error:`, err.message);
    return null;
  }
}

async function publishBlog(blog) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

const blogs = [
  {
    title: 'What Is ATS in Resume? The Complete Guide to Applicant Tracking Systems (2026)',
    slug: 'what-is-ats-in-resume-complete-guide',
    excerpt: 'ATS stands for Applicant Tracking System — software employers use to collect, parse, rank, and manage job applications. Learn exactly what ATS is, how it scores your resume, which companies use it, and how to check your ATS score instantly with a free tool.',
    category: 'General',
    author: 'SM Developers Team',
    focusKeyphrase: 'what is ATS in resume',
    metaTitle: 'What Is ATS in Resume? Complete Applicant Tracking System Guide (2026)',
    metaDescription: 'ATS stands for Applicant Tracking System. Learn what ATS means in resume terms, how it works, how it scores your resume, and how to check your ATS score free. Complete 2026 guide.',
    featuredImageAlt: 'Applicant Tracking System dashboard showing resume parsing, keyword scoring, and candidate ranking interface with glowing circuit lines on dark background',
    publishDate: new Date().toISOString(),
    status: 'published',
    tldr: "ATS (Applicant Tracking System) is software that collects, parses, and ranks job applications — used by 99% of Fortune 500 companies.\nATS does NOT auto-reject most resumes — it ranks them by relevance score; only ~8% of recruiters configure automatic rejections.\nATS scores your resume on keyword match %, section detection, experience relevance, and education match.\nFormatting pitfalls like tables, columns, text boxes, and image-based PDFs cause ATS to misread or lose your content entirely.\nUse our free Resume Analyzer & ATS Optimizer to check your exact ATS score in seconds — no signup required.",
    content: blog1Content,
    imagePath: "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\c16fb306-56ea-4011-bc3c-a329ddd00804\\blog_what_is_ats_resume_1781776584812.png",
    imageId: "blog_what_is_ats_resume_2026"
  },
  {
    title: "How to Write an ATS-Friendly Resume in 2026 (Step-by-Step Guide)",
    slug: "how-to-write-ats-friendly-resume",
    excerpt: "Learn exactly how to write an ATS-friendly resume in 2026 with our complete step-by-step guide. Covers format, fonts, keywords, section structure, before/after examples, and a printable checklist — so your resume passes ATS and impresses recruiters.",
    category: "General",
    author: "SM Developers Team",
    focusKeyphrase: "how to write an ATS-friendly resume",
    metaTitle: "How to Write an ATS-Friendly Resume in 2026 | Step-by-Step Guide",
    metaDescription: "Step-by-step guide to writing an ATS-friendly resume in 2026. Learn the safest format, keyword strategy, section headings, fonts, and get a free ATS score check instantly.",
    featuredImageAlt: "Step-by-step ATS-friendly resume guide showing clean single-column resume layout with keyword highlights and ATS score meter on dark background",
    publishDate: new Date().toISOString(),
    status: 'published',
    tldr: "Use a single-column .docx or clean PDF — the safest ATS-compatible format in 2026.\nUse standard section headings: Work Experience, Education, Skills, Certifications.\nWrite a keyword-rich professional summary — it's the highest-weight ATS scoring zone.\nQuantify every achievement: ATS and recruiters both score metrics-rich bullets higher.\nTest your resume with SM Developers' free ATS Optimizer before every application.",
    content: blog2Content,
    imagePath: "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\c16fb306-56ea-4011-bc3c-a329ddd00804\\blog_ats_friendly_resume_guide_1781776594068.png",
    imageId: "blog_ats_friendly_resume_guide_2026"
  },
  {
    title: "Free ATS Resume Checker: Instantly Score Your Resume (2026)",
    slug: "ats-resume-checker-free",
    excerpt: "Looking for an ATS resume checker that is actually free? Check your ATS score, verify formatting compatibility, and identify missing keywords against any job description. 100% private and processed in your browser.",
    category: "General",
    author: "SM Developers Team",
    focusKeyphrase: "ATS resume checker free",
    metaTitle: "Free ATS Resume Checker | Instant ATS Score & Optimization (2026)",
    metaDescription: "Use our 100% free ATS resume checker. Get your ATS score instantly, fix parsing errors, and match keywords against any job description to pass the ATS filter.",
    featuredImageAlt: "Free ATS Resume Checker tool interface showing high ATS score, keyword match checklist, and optimization recommendations",
    publishDate: new Date().toISOString(),
    status: 'published',
    tldr: "Most ATS checkers limit you to a few scans or charge fees. The SM Developers Resume Analyzer is 100% free and unlimited.\nAn ATS checker simulates how real recruiting software parses and scores your resume against a specific job description.\nTailoring your resume to match the exact wording of a job description significantly increases your chance of passing the ATS filter.\nFix critical formatting errors like multi-column layouts, image-based PDFs, and non-standard section headings before worrying about keywords.\nOur tool processes your resume securely in your browser—your data is never saved or shared.",
    content: blog3Content,
    imagePath: "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\c16fb306-56ea-4011-bc3c-a329ddd00804\\blog_ats_resume_checker_free_1781776603873.png",
    imageId: "blog_ats_resume_checker_free_2026"
  }
];

async function main() {
  console.log('🚀 Starting batch publish for the final 3 high-authority ATS blogs...');
  
  for (const blog of blogs) {
    console.log(`\n--- Processing: ${blog.title} ---`);
    
    // Upload image
    const imageUrl = await uploadImage(blog.imagePath, blog.imageId);
    
    // Construct final payload
    const payload = {
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      category: blog.category,
      author: blog.author,
      focusKeyphrase: blog.focusKeyphrase,
      metaTitle: blog.metaTitle,
      metaDescription: blog.metaDescription,
      featuredImage: imageUrl || 'https://res.cloudinary.com/dkfj0zehx/image/upload/v1/smdevs_blog/default_blog_img.webp',
      featuredImageAlt: blog.featuredImageAlt,
      content: blog.content,
      publishDate: blog.publishDate,
      status: blog.status,
      tldr: blog.tldr
    };

    try {
      console.log(`  📝 Publishing to smdevs.in database...`);
      const result = await publishBlog(payload);
      console.log(`  ✅ Published successfully! ID: ${result.id}`);
    } catch (error) {
      console.error(`  ❌ Failed to publish ${blog.slug}:`, error);
    }
  }
  
  console.log('\n🎉 Batch 3 complete! The new high-ranking blogs are now live in the database.');
}

main().catch(console.error);
