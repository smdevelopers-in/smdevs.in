"use client";

import { 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  Lock, 
  ArrowLeft,
  Search as SearchIcon,
  Filter,
  Calendar,
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/types/blog";

export default function ManageBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isDeletingConfirmed, setIsDeletingConfirmed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) {
      fetchBlogs();
    }
  }, [isAdmin]);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (Array.isArray(data)) {
        setBlogs(data);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      const res = await fetch(`/api/blogs?slug=${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(blogs.filter(b => b.slug !== slug));
        setIsDeleting(null);
        setIsDeletingConfirmed(false);
      } else {
        alert(data.error || "Failed to delete blog.");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("An error occurred while deleting.");
    }
  };

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
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <Link href="/admin/create-blog" className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
              <ArrowLeft size={14} /> Back to Editor
            </Link>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Manage <span className="text-blue-600">Blog Posts</span>
            </h1>
          </div>
          <Link 
            href="/admin/create-blog"
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
          >
            <Plus size={18} />
            Create New Post
          </Link>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Controls */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-blue-500 outline-none text-sm font-bold"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{filteredBlogs.length} POSTS</span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Blog Post</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Date</th>
                  <th className="px-8 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent animate-spin rounded-full" />
                        <span className="text-sm font-bold text-slate-400">Loading blog archives...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4 text-slate-400">
                        <SearchIcon size={48} className="opacity-20" />
                        <span className="text-sm font-bold">No blog posts found.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBlogs.map((blog) => (
                    <tr key={blog.slug} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                            {blog.featuredImage ? (
                              <img src={blog.featuredImage} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <Search size={20} />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                              {blog.title}
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                              /{blog.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[10px] font-black text-blue-600 uppercase tracking-wider">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                          <Calendar size={14} className="opacity-50" />
                          {new Date(blog.publishDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/resources/blogs/${blog.slug}`}
                            target="_blank"
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                            title="View Live"
                          >
                            <ExternalLink size={18} />
                          </Link>
                          <Link 
                            href={`/admin/edit-blog/${blog.slug}`}
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                            title="Edit Post"
                          >
                            <Edit size={18} />
                          </Link>
                          <button 
                            onClick={() => setIsDeleting(blog.slug)}
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all"
                            title="Delete Post"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => {
              setIsDeleting(null);
              setIsDeletingConfirmed(false);
            }} 
          />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 text-center">
            <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-3xl flex items-center justify-center mx-auto text-rose-600 mb-2">
              <AlertTriangle size={40} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Delete Post?</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic">
                Are you sure you want to delete <span className="font-bold text-slate-900 dark:text-white not-italic">"{blogs.find(b => b.slug === isDeleting)?.title}"</span>?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button 
                onClick={() => {
                  setIsDeleting(null);
                  setIsDeletingConfirmed(false);
                }}
                className="py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black rounded-2xl hover:bg-slate-200 transition-all"
              >
                No, Cancel
              </button>
              <button 
                onClick={() => {
                  if (isDeletingConfirmed) {
                    handleDelete(isDeleting);
                  } else {
                    setIsDeletingConfirmed(true);
                  }
                }}
                className={`py-4 ${isDeletingConfirmed ? 'bg-rose-600 animate-pulse' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'} font-black rounded-2xl hover:opacity-90 transition-all`}
              >
                {isDeletingConfirmed ? "Yes, DELETE" : "Confirm"}
              </button>
            </div>
            
            {isDeletingConfirmed && (
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest animate-bounce">
                  Warning: This will delete the post permanently.
                </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
