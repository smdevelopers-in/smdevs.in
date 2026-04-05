import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { BlogPost } from "@/types/blog";
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
  ChevronRight
} from "lucide-react";
import Breadcrumbs from "@/components/tools/Breadcrumbs";

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  // Read from JSON file
  const dataPath = path.join(process.cwd(), "data", "blogs.json");
  let blogs: BlogPost[] = [];
  try {
    const fileData = fs.readFileSync(dataPath, "utf-8");
    blogs = JSON.parse(fileData);
  } catch (e) {
    console.error("Error reading blogs for detail page:", e);
  }

  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const relatedPosts = blogs
    .filter(b => b.slug !== slug && b.category === blog.category)
    .slice(0, 3);
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           
           {/* Main Content Side */}
           <article className="lg:col-span-8 space-y-12">
              {/* Breadcrumb & Navigation */}
              <div className="flex items-center justify-between">
                 <Link href="/resources/blogs" className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
                    <ArrowLeft size={16} /> Back to Library
                 </Link>
                 <div className="flex items-center gap-4 text-slate-400">
                    <Share2 size={18} className="hover:text-blue-600 cursor-pointer transition-colors" />
                    <Bookmark size={18} className="hover:text-blue-600 cursor-pointer transition-colors" />
                 </div>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-6">
                 <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-500/10">
                    {blog.category}
                 </div>
                 <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                    {blog.title}
                 </h1>
                 
                 <div className="flex flex-wrap items-center gap-6 pt-4 text-sm font-medium text-slate-500 dark:text-slate-400 border-b border-slate-50 dark:border-slate-800 pb-8">
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-black text-[10px]">
                          SM
                       </div>
                       <span className="font-bold text-slate-900 dark:text-white">{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Calendar size={16} className="text-blue-600" />
                       {new Date(blog.publishDate).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2">
                       <Clock size={16} className="text-blue-600" />
                       6 min read
                    </div>
                 </div>

                 {/* Breadcrumbs below Metadata */}
                 <div className="pt-4">
                    <Breadcrumbs items={[
                      { label: "Resources", href: "/resources/blogs" }, 
                      { label: "Blogs", href: "/resources/blogs" }, 
                      { label: blog.title }
                    ]} />
                 </div>
              </div>

              {/* Featured Image */}
              <div className="aspect-[21/9] w-full rounded-[3rem] overflow-hidden shadow-2xl relative group">
                 <img 
                   src={blog.featuredImage} 
                   alt={blog.title} 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
              </div>

              {/* Rich Text Content */}
              <div 
                className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-blue-600 prose-blockquote:border-blue-600 prose-blockquote:italic prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/10 prose-img:rounded-[2rem] text-lg leading-relaxed text-slate-600 dark:text-slate-300 font-medium"
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
           </article>

           {/* Sidebar Side */}
           <aside className="lg:col-span-4 space-y-12">
              {/* About Author */}
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

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="space-y-8">
                   <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 border-l-4 border-slate-200 dark:border-slate-800 pl-4">Related Insights</h3>
                   <div className="space-y-6">
                      {relatedPosts.map((related, i) => (
                        <Link 
                          key={i} 
                          href={`/resources/blogs/${related.slug}`}
                          className="flex gap-4 group"
                        >
                           <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-105">
                              <img src={related.featuredImage} alt={related.title} className="w-full h-full object-cover" />
                           </div>
                           <div className="space-y-2 py-1">
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                 {related.title}
                              </h4>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                                 READ MORE <ChevronRight size={10} />
                              </span>
                           </div>
                        </Link>
                      ))}
                   </div>
                </div>
              )}

              {/* Newsletter Ad */}
              <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white space-y-8 shadow-2xl shadow-blue-500/30 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32" />
                 <div className="space-y-4 relative">
                    <h3 className="text-2xl font-black leading-tight">Join 10,000+ Readers</h3>
                    <p className="text-sm text-blue-100 font-medium leading-relaxed">
                       Subscribe to our weekly newsletter and never miss an update on new tools and tech guides.
                    </p>
                 </div>
                 <div className="space-y-3 relative">
                    <input 
                      type="email" 
                      placeholder="Enter your email..." 
                      className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm font-bold"
                    />
                    <button className="w-full py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-slate-100 transition-all text-sm uppercase tracking-widest shadow-xl">
                       JOIN THE CLUB
                    </button>
                 </div>
              </div>
           </aside>
        </div>
      </div>
    </div>
  );
}
