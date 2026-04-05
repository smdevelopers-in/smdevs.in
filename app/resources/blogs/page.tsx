"use client";

import { useState, useEffect } from "react";
import { Search, Calendar, User, ArrowRight, Tag, BookOpen, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/types/blog";

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setIsLoading(false);
      });
  }, []);

  const categories = ["All", "SEO", "Trading", "Development", "General"];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 dark:border-slate-800 pb-12">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
                 <BookOpen size={12} /> Resource Hub
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Our <span className="text-blue-600">Blogs</span> & Insights
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                Expert articles on SEO, Trading, and Web Development to help you grow your digital presence.
              </p>
           </div>
           
           <div className="relative w-full md:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none font-bold text-slate-900 dark:text-white shadow-xl shadow-slate-200/20 dark:shadow-none"
              />
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* Sidebar - Categories */}
           <aside className="lg:col-span-3 space-y-8">
              <div className="space-y-6">
                 <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 border-l-4 border-blue-600 pl-4">
                    Categories
                 </h3>
                 <div className="flex flex-wrap lg:flex-col gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all text-left flex items-center justify-between group ${
                          activeCategory === cat 
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                          : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30"
                        }`}
                      >
                         {cat}
                         <Tag size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeCategory === cat ? "opacity-100" : ""}`} />
                      </button>
                    ))}
                 </div>
              </div>

              {/* Newsletter Promo */}
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6 relative overflow-hidden">
                 <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl -mr-16 -mb-16" />
                 <h4 className="text-xl font-black leading-tight relative">Stay Updated on Tech & Finance</h4>
                 <p className="text-xs text-white/50 font-medium leading-relaxed relative">
                    Get the latest tool updates and industry insights delivered to your inbox.
                 </p>
                 <button className="w-full py-3 bg-blue-600 rounded-xl font-bold text-xs hover:bg-blue-700 transition-all relative">
                    SUBSCRIBE NOW
                 </button>
              </div>
           </aside>

           {/* Main Grid - Blogs */}
           <div className="lg:col-span-9">
              {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {filteredBlogs.map((blog, index) => (
                     <Link 
                       key={index} 
                       href={`/resources/blogs/${blog.slug}`}
                       className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                     >
                        <div className="aspect-video relative overflow-hidden">
                           <img 
                             src={blog.featuredImage} 
                             alt={blog.title} 
                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                           />
                           <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 border border-blue-500/20 shadow-sm">
                                 {blog.category}
                              </span>
                           </div>
                        </div>
                        <div className="p-8 flex flex-col flex-1 space-y-6">
                           <div className="space-y-3">
                              <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">
                                {blog.title}
                              </h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed italic">
                                "{blog.excerpt}"
                              </p>
                           </div>
                           
                           <div className="pt-6 border-t border-slate-50 dark:border-slate-800 mt-auto flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-black text-[10px]">
                                    SM
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">{blog.author}</span>
                                    <span className="text-[10px] font-medium text-slate-400">{new Date(blog.publishDate).toLocaleDateString()}</span>
                                 </div>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all scale-0 group-hover:scale-100 origin-right">
                                 <ArrowRight size={18} />
                              </div>
                           </div>
                        </div>
                     </Link>
                   ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
                   <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                      <Search size={32} />
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white">No articles found</h3>
                   <p className="text-slate-400 font-medium">Try adjusting your filters or search keywords.</p>
                </div>
              )}
           </div>
        </div>

        {/* Admin Quick Link - For demo purposes */}
        <div className="pt-20 text-center">
           <Link href="/admin/create-blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors underline decoration-dotted">
              <Plus size={16} /> Technical: Access Blog Editor (Admin)
           </Link>
        </div>
      </div>
    </div>
  );
}
