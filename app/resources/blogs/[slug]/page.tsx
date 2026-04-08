import { notFound } from "next/navigation";
import Link from "next/link";
import { sql } from "@vercel/postgres";
import { BlogPost } from "@/types/blog";
import * as cheerio from "cheerio";
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  ChevronRight,
  ListOrdered
} from "lucide-react";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import TableOfContents from "@/components/tools/TableOfContents";
import SidebarTools from "@/components/tools/SidebarTools";

async function getBlog(slug: string) {
  try {
    const { rows } = await sql`SELECT * FROM blog_posts WHERE slug = ${slug} LIMIT 1`;
    if (rows.length > 0) {
      const row = rows[0];
      return {
        title: row.title,
        slug: row.slug,
        content: row.content,
        excerpt: row.excerpt,
        tldr: row.tldr,
        focusKeyphrase: row.focus_keyphrase,
        metaTitle: row.meta_title,
        metaDescription: row.meta_description,
        category: row.category,
        author: row.author,
        featuredImage: row.featured_image,
        createdAt: row.created_at.toISOString(),
        publishDate: row.publish_date.toISOString(),
        status: row.status
      } as BlogPost;
    }
  } catch (e) {
    console.error("Error fetching blog from DB:", e);
  }
  return null;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  
  if (!blog) return { title: 'Post Not Found' };

  return {
    title: blog.metaTitle || `${blog.title} | SM Developers`,
    description: blog.metaDescription || blog.excerpt || blog.tldr?.slice(0, 150),
    keywords: blog.focusKeyphrase ? [blog.focusKeyphrase] : [],
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: [blog.featuredImage],
      type: 'article',
      publishedTime: blog.publishDate,
      authors: [blog.author],
    }
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  let blog: BlogPost | null = await getBlog(slug);
  let relatedPosts: BlogPost[] = [];
  let tableOfContents: { id: string; text: string; level: number }[] = [];
  let faqSchemaObj: any = null;

  if (blog) {
    try {
      // Fetch related posts
      const { rows: relatedRows } = await sql`
        SELECT * FROM blog_posts 
        WHERE category = ${blog.category} AND slug != ${slug} 
        LIMIT 3
      `;
      relatedPosts = relatedRows.map(r => ({
        title: r.title,
        slug: r.slug,
        content: r.content,
        excerpt: r.excerpt,
        category: r.category,
        author: r.author,
        featuredImage: r.featured_image,
        createdAt: r.created_at.toISOString(),
        publishDate: r.publish_date.toISOString(),
        status: r.status
      } as BlogPost));

      // Parse HTML for TOC and inject IDs
      const $ = cheerio.load(blog.content);
      $('h1, h2, h3, h4, h5, h6').each((i, el) => {
        const text = $(el).text();
        const id = text.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        $(el).attr('id', id);
        
        tableOfContents.push({
          id,
          text,
          level: parseInt(el.tagName.replace('h', ''))
        });
      });

      // Automatically Extract FAQs for Schema
      let faqEntities: any[] = [];
      $('details').each((i, el) => {
        const question = $(el).find('summary').text().trim();
        // Get the inner text of the answer block, avoiding empty spaces
        const answer = $(el).children().not('summary').text().trim().replace(/\s+/g, ' ');
        if (question && answer) {
          faqEntities.push({
            "@type": "Question",
            "name": question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": answer
            }
          });
        }
      });

      if (faqEntities.length > 0) {
        faqSchemaObj = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqEntities
        };
      }

      blog.content = $.html();

    } catch (e) {
      console.error("Error processing blog post:", e);
    }
  }

  if (!blog) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://smdevs.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blogs",
        "item": "https://smdevs.in/resources/blogs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": `https://smdevs.in/resources/blogs/${blog.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://smdevs.in/resources/blogs/${blog.slug}`
    },
    "headline": blog.metaTitle || blog.title,
    "description": blog.metaDescription || blog.excerpt || blog.tldr?.slice(0, 150) || "",
    "image": blog.featuredImage,
    "author": {
      "@type": "Person",
      "name": blog.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "SM Developers",
      "logo": {
        "@type": "ImageObject",
        "url": "https://smdevs.in/icon.png"
      }
    },
    "datePublished": blog.publishDate || blog.createdAt,
    "dateModified": blog.publishDate || blog.createdAt
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchemaObj && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaObj) }}
        />
      )}
      {blog.customSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: blog.customSchema.includes('<script') 
              ? blog.customSchema.replace(/<script[^>]*>|<\/script>/g, '') 
              : blog.customSchema 
          }}
        />
      )}
      <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      
      {/* 1. Full Width Dark Banner */}
      <section className="bg-slate-950 dark:bg-[#040B16] text-white pt-32 pb-16 border-b border-slate-800">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               
               {/* Left Column: Title & Meta */}
               <div className="space-y-6">
                 {/* Breadcrumbs */}
                 <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                    <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/resources/blogs" className="hover:text-blue-500 transition-colors">Blogs</Link>
                    <span>/</span>
                    <span className="text-white line-clamp-1">{blog.title}</span>
                 </div>
                 
                 <h1 className="text-4xl md:text-5xl lg:text-5xl font-black tracking-tight leading-[1.2]">
                    {blog.title}
                 </h1>
                 
                 <div className="flex flex-wrap items-center gap-6 pt-4 text-sm font-medium text-slate-400">
                    <div className="flex items-center gap-2">
                       <span className="text-slate-500">Posted by:</span>
                       <span className="font-bold text-white">{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-slate-500">Date:</span>
                       <span className="text-blue-400">{new Date(blog.publishDate).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-slate-500">Read time:</span>
                       <span className="text-rose-400">6 min read</span>
                    </div>
                 </div>
               </div>
               
               {/* Right Column: Featured Image */}
               <div className="aspect-[16/9] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl relative group border border-slate-800">
                  <img 
                    src={blog.featuredImage} 
                    alt={blog.featuredImageAlt || blog.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
               </div>
               
            </div>
         </div>
      </section>

      {/* 2. Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           <article className="lg:col-span-8 space-y-12">
              
              {/* TLDR Block (Key Takeaways) */}
              {blog.tldr && (
                 <div className="bg-slate-50 dark:bg-slate-900 border-l-4 border-blue-600 p-6 md:p-8 rounded-r-2xl space-y-4 shadow-sm">
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                     Key Takeaways
                   </h3>
                   <ul className="space-y-4 list-disc pl-5 text-[17px] text-slate-600 dark:text-slate-300">
                     {blog.tldr.split('\n').filter((b: string) => b.trim() !== '').map((bullet: string, i: number) => (
                       <li key={i} className="pl-2 leading-relaxed">{bullet}</li>
                     ))}
                   </ul>
                 </div>
              )}

              {/* Rich Text Content */}
              <div 
                className="prose prose-slate dark:prose-invert max-w-none text-[17px] leading-[1.8] text-slate-700 dark:text-slate-300 prose-headings:font-black prose-a:text-blue-600 prose-p:my-4 prose-headings:mt-8 prose-headings:mb-4 prose-ul:my-4 prose-li:my-1 prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Footer / Sharing */}
              <div className="pt-16 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                     <span className="text-sm font-black uppercase tracking-widest text-slate-400">Share This Story</span>
                     <div className="flex items-center gap-3">
                        <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"><Facebook size={18} /></button>
                        <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all transform hover:scale-110"><Twitter size={18} /></button>
                        <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all transform hover:scale-110"><Linkedin size={18} /></button>
                     </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                     <MessageSquare size={18} className="text-blue-600" />
                     <span className="text-sm font-bold text-slate-900 dark:text-white italic">"Fascinating read. Great insights on {blog.category}!"</span>
                  </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="pt-16 mt-16 border-t border-slate-100 dark:border-slate-800 space-y-8">
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white">Related Insights</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedPosts.map((related, i) => (
                        <Link 
                          key={i} 
                          href={`/resources/blogs/${related.slug}`}
                          className="group space-y-4"
                        >
                           <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm transition-transform duration-500 group-hover:scale-105 border border-slate-100 dark:border-slate-800">
                              <img src={related.featuredImage} alt={related.title} className="w-full h-full object-cover" />
                           </div>
                           <div className="space-y-2 py-1">
                              <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                 {related.title}
                              </h4>
                              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-1 mt-2">
                                 READ MORE <ChevronRight size={14} />
                              </span>
                           </div>
                        </Link>
                      ))}
                   </div>
                </div>
              )}

           </article>
           {/* Sidebar Side */}
           <aside className="lg:col-span-4 space-y-12 relative">
              {/* 1. About Author */}
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6">
                 <h3 className="text-sm font-black uppercase tracking-widest text-blue-600 border-l-4 border-blue-600 pl-4">About Author</h3>
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                       SM
                    </div>
                    <div className="space-y-1">
                       <h4 className="font-bold text-slate-900 dark:text-white">{blog.author}</h4>
                       <p className="text-xs text-slate-400 font-medium">Core Editorial Team at SM Developers</p>
                    </div>
                 </div>
                 <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic">
                    Passionate about making complex technology and financial concepts accessible to everyone through simplified tools and insights.
                 </p>
              </div>

              {/* 2. New Tools (Dynamic based on category) */}
              <SidebarTools category={blog.category} />

              {/* 3. Table of Contents (Sticky) */}
              {tableOfContents.length > 0 && (
                <div className="sticky top-28 z-10 transition-all duration-300">
                  <TableOfContents items={tableOfContents} />
                </div>
              )}
           </aside>
         </div>
      </section>
    </div>
    </>
  );
}
