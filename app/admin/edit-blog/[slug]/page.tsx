"use client";

import { Editor } from '@tinymce/tinymce-react';
import { 
  Sparkles,
  Save,
  Clock,
  User,
  Image as ImageIcon,
  Tag,
  ArrowLeft,
  Plus,
  Lock,
  Loader2,
  Trash2,
  Code
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { BlogPost } from "@/types/blog";

const CATEGORIES = ["SEO", "Trading", "Development", "General"];

export default function EditBlogPage() {
  const { slug: urlSlug } = useParams();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("General");
  const [author, setAuthor] = useState("SM Dev Team");
  const [featuredImage, setFeaturedImage] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summary, setSummary] = useState("");
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Advanced SEO Fields
  const [tldr, setTldr] = useState("");
  const [focusKeyphrase, setFocusKeyphrase] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");
  const [customSchema, setCustomSchema] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const editorRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isAdmin && urlSlug) {
      fetchBlog();
    }
  }, [isAdmin, urlSlug]);

  const fetchBlog = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs");
      const blogs = await res.json();
      const blog = blogs.find((b: any) => b.slug === urlSlug);
      
      if (blog) {
        setTitle(blog.title);
        setSlug(blog.slug);
        setCategory(blog.category);
        setAuthor(blog.author);
        setFeaturedImage(blog.featuredImage);
        setPublishDate(blog.publishDate ? new Date(blog.publishDate).toISOString().slice(0, 16) : "");
        setSummary(blog.excerpt || "");
        setTldr(blog.tldr || "");
        setFocusKeyphrase(blog.focusKeyphrase || "");
        setMetaTitle(blog.metaTitle || "");
        setMetaDescription(blog.metaDescription || "");
        setFeaturedImageAlt(blog.featuredImageAlt || "");
        setCustomSchema(blog.customSchema || "");
        setInitialContent(blog.content || "");
      } else {
        setError("Blog post not found.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load blog data.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSummary = () => {
    if (!editorRef.current) return;
    setIsGeneratingSummary(true);
    setTimeout(() => {
      const text = editorRef.current.getContent({ format: 'text' });
      setSummary(text.slice(0, 160) + "...");
      setIsGeneratingSummary(false);
    }, 1500);
  };

  const handleUpdate = async () => {
    if (!title || !editorRef.current) {
      alert("Please enter a title and content.");
      return;
    }

    const htmlContent = editorRef.current.getContent();
    setIsUpdating(true);

    const updatedPost: Partial<BlogPost> = {
      title,
      slug,
      content: htmlContent,
      excerpt: summary || editorRef.current.getContent({ format: 'text' }).slice(0, 160) + "...",
      tldr,
      focusKeyphrase,
      metaTitle,
      metaDescription,
      category: category as any,
      author,
      featuredImage: featuredImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      featuredImageAlt,
      customSchema,
      publishDate: publishDate || new Date().toISOString(),
      status: "published"
    };

    try {
      const res = await fetch(`/api/blogs?slug=${urlSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });

      const data = await res.json();

      if (data.success) {
        router.push(`/resources/blogs/${slug}`);
        router.refresh();
      } else {
        alert(data.error || "Failed to update blog.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("An error occurred while updating.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setFeaturedImage(data.url);
      } else {
        alert(data.error || "Upload failed.");
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  if (!isMounted) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Admin Access</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic">Enter the master password to continue.</p>
          </div>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            if (password === "smdevs2026") {
              setIsAdmin(true);
            } else {
              setError("Incorrect password. Please try again.");
            }
          }}>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none"
              autoFocus
            />
            {error && <p className="text-xs text-rose-500 font-bold text-center italic">{error}</p>}
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20">
              Unlock Terminal
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic animate-pulse">Retrieving Archives...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="space-y-1">
              <Link href="/admin/manage-blogs" className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                 <ArrowLeft size={14} /> Back to Dashboard
              </Link>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Refining <span className="text-blue-600">Archived Post</span>
              </h1>
           </div>
           <div className="flex items-center gap-3">
              <Link href="/admin/manage-blogs" className="px-6 py-2.5 rounded-xl border border-border bg-white dark:bg-slate-900 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors">
                 Discard
              </Link>
              <button 
                onClick={handleUpdate}
                disabled={isUpdating}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50"
              >
                 {isUpdating ? <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" /> : <Save size={18} />}
                 {isUpdating ? "Optimizing..." : "Update Post"}
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Editor Side */}
           <div className="lg:col-span-8 space-y-6">
              <div className="space-y-4 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-border shadow-sm">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Post Title</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter a catchy title..."
                      className="w-full text-3xl font-bold bg-transparent border-none focus:ring-0 placeholder:text-slate-400 dark:placeholder:text-slate-600 p-0 text-slate-900 dark:text-white"
                    />
                 </div>
                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs font-medium text-slate-400 border-t border-slate-50 dark:border-slate-800 pt-4">
                    <span className="shrink-0">Permalink: </span>
                    <span className="text-blue-600 underline shrink-0 hidden sm:block">smdevs.in/resources/blogs/</span>
                    <input 
                      type="text"
                      readOnly
                      className="w-full bg-slate-50/50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-slate-700/50 text-slate-500 font-bold focus:outline-none cursor-not-allowed"
                      value={slug}
                    />
                 </div>
              </div>

              {/* TinyMCE Content */}
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                 <Editor
                   apiKey="07xf0znqle7x4fpbhw4ulmas3pa8j88hbtgw3wo05ngkmoo9"
                   onInit={(_evt, editor) => editorRef.current = editor}
                   initialValue={initialContent}
                   init={{
                     height: 700,
                     menubar: true,
                     plugins: [
                       'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                       'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                       'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'accordion'
                     ],
                     toolbar: 'undo redo | blocks | ' +
                       'bold italic forecolor | accordion | alignleft aligncenter ' +
                       'alignright alignjustify | bullist numlist outdent indent | ' +
                       'removeformat | table | help',
                     content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px }',
                     paste_data_images: true,
                     paste_as_text: false,
                     paste_retain_style_properties: "all",
                   }}
                 />
              </div>
           </div>

           {/* Sidebar Side */}
           <div className="lg:col-span-4 space-y-6">
              {/* Publication Settings */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border shadow-sm space-y-8">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-50 dark:border-slate-800 pb-4">
                    <Tag size={18} className="text-blue-600" /> Settings
                 </h3>
                 
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 flex items-center gap-2">
                          <User size={14} /> Author Name
                       </label>
                       <input 
                         type="text" 
                         value={author} 
                         onChange={(e) => setAuthor(e.target.value)}
                         className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 flex items-center gap-2">
                          <Tag size={14} /> Category
                       </label>
                       <select 
                         value={category}
                         onChange={(e) => setCategory(e.target.value)}
                         className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
                       >
                          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 flex items-center gap-2">
                          <Clock size={14} /> Publish Date
                       </label>
                       <input 
                         type="datetime-local" 
                         value={publishDate}
                         onChange={(e) => setPublishDate(e.target.value)}
                         className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
                       />
                    </div>
                 </div>
              </div>

               {/* Special Advanced SEO Panel */}
               <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border shadow-sm space-y-6">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-50 dark:border-slate-800 pb-4">
                    <span className="text-emerald-600 text-xl leading-none">•</span> Advanced SEO
                 </h3>
                 
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 flex justify-between">
                         SERP Title <span className="text-blue-500">{metaTitle.length}/60</span>
                       </label>
                       <input 
                         type="text" 
                         value={metaTitle} 
                         onChange={(e) => setMetaTitle(e.target.value)}
                         placeholder="Optional: Custom title for Google..."
                         className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                         Focus Keyphrase
                       </label>
                       <input 
                         type="text" 
                         value={focusKeyphrase} 
                         onChange={(e) => setFocusKeyphrase(e.target.value)}
                         placeholder="e.g. Next.js SEO optimization"
                         className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 flex justify-between">
                         TL;DR (Top Bullets)
                       </label>
                       <textarea 
                         value={tldr} 
                         onChange={(e) => setTldr(e.target.value)}
                         placeholder="Provide key takeaways, separated by newlines. These appear as bullets at the top."
                         rows={4}
                         className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white resize-none"
                       />
                    </div>
                 </div>
               </div>

               {/* Featured Image */}
               <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border shadow-sm space-y-4">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ImageIcon size={18} className="text-blue-600" /> Featured Image
                 </h3>
                 <label className={`aspect-video w-full bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-dashed ${isUploadingImage ? 'border-blue-500' : 'border-slate-200 dark:border-slate-700 hover:border-blue-500/50'} flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer overflow-hidden relative group`}>
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploadingImage} className="hidden" />
                    {isUploadingImage ? (
                       <div className="flex flex-col items-center gap-3">
                          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                          <span className="text-xs font-bold text-blue-600 animate-pulse">Uploading to Cloudinary...</span>
                       </div>
                    ) : featuredImage ? (
                       <div className="w-full h-full relative">
                          <img src={featuredImage} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <span className="bg-white/90 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl">Change Image</span>
                          </div>
                       </div>
                    ) : (
                       <>
                          <div className="p-3 bg-white dark:bg-slate-700 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                             <Plus className="w-5 h-5 text-slate-400" />
                          </div>
                          <span className="text-xs font-bold text-slate-400">Upload WebP Image</span>
                       </>
                    )}
                 </label>
                 <input 
                   type="text" 
                   placeholder="Or enter remote image URL..."
                   value={featuredImage}
                   onChange={(e) => setFeaturedImage(e.target.value)}
                   className="w-full px-4 py-2 border-b border-border focus:outline-none bg-transparent text-xs font-medium"
                 />
                 <div className="pt-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Image Alt Tag</label>
                    <input 
                      type="text" 
                      placeholder="e.g. A developer working on SEO tools..."
                      value={featuredImageAlt}
                      onChange={(e) => setFeaturedImageAlt(e.target.value)}
                      className="w-full px-4 py-3 mt-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
                    />
                 </div>
              </div>

              {/* Custom JSON-LD Schema */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border shadow-sm space-y-4">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Code className="text-blue-600" size={18} /> Custom Schema Payload
                 </h3>
                 <textarea 
                   value={customSchema} 
                   onChange={(e) => setCustomSchema(e.target.value)}
                   placeholder='{"@context": "https://schema.org", "@type": "Article"...}'
                   rows={6}
                   className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white resize-y"
                 />
              </div>

              {/* AI Assistant */}
              <div className="bg-blue-600 rounded-3xl p-8 text-white space-y-6 shadow-xl shadow-blue-500/20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16" />
                 <div className="space-y-2 relative">
                    <h4 className="font-black flex items-center gap-2 uppercase tracking-widest text-xs">
                       <Sparkles size={16} className="fill-white" /> AI Writing Helper
                    </h4>
                    <p className="text-xs text-blue-100 font-medium leading-relaxed">
                       Automatically generate a metadata summary for social sharing and search engines.
                    </p>
                 </div>
                 
                 {summary && (
                   <div className="p-4 bg-white/10 rounded-2xl italic text-[11px] font-medium leading-relaxed border border-white/10">
                      "{summary}"
                   </div>
                 )}

                 <button 
                   onClick={generateSummary}
                   disabled={isGeneratingSummary}
                   className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                 >
                    {isGeneratingSummary ? (
                       <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent animate-spin rounded-full" />
                    ) : (
                       <Sparkles size={16} />
                    )}
                    Generate AI Excerpt
                 </button>
              </div>
           </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .ProseMirror {
          min-height: 400px;
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .dark .ProseMirror p.is-editor-empty:first-child::before {
          color: #52525b;
        }
        .dark .ProseMirror {
          color: #e2e8f0;
        }
        .editor-content blockquote {
          border-left: 4px solid #3b82f6 !important;
          padding-left: 1rem !important;
          font-style: italic !important;
          color: #64748b !important;
        }
        .editor-content code {
          background-color: #f1f5f9 !important;
          padding: 0.2rem 0.4rem !important;
          border-radius: 4px !important;
          font-size: 0.875rem !important;
        }
        .dark .editor-content code {
          background-color: #1e293b !important;
          color: #e2e8f0 !important;
        }
      ` }} />
    </div>
  );
}
