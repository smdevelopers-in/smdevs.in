"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Trash2, CheckCircle, Clock, Star, Quote, Loader2, Linkedin } from "lucide-react";

export default function ManageTestimonialsPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('smdevs_admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) fetchTestimonials();
  }, [isAdmin]);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/testimonials?status=all");
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      await fetch(`/api/testimonials?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
      fetchTestimonials();
    } catch (err) {
      console.error(err);
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
          </div>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            if (password === "smdevs2026") {
              setIsAdmin(true);
              sessionStorage.setItem('smdevs_admin', 'true');
            } else {
              setError("Incorrect password.");
            }
          }}>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 font-bold outline-none"
            />
            {error && <p className="text-xs text-rose-500 font-bold text-center">{error}</p>}
            <button className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl">
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-12">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <Link href="/" className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              Manage <span className="text-blue-600">Testimonials</span>
            </h1>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-20">
             <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase font-black tracking-widest text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Reviewer</th>
                    <th className="px-6 py-4">Review</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {testimonials.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                           {t.name}
                           {t.linkedin_id && (
                              <a href={t.linkedin_id.includes('http') ? t.linkedin_id : `https://linkedin.com/in/${t.linkedin_id}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-600">
                                 <Linkedin className="w-4 h-4" />
                              </a>
                           )}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">{t.designation}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{new Date(t.created_at).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 max-w-sm">
                        <p className="line-clamp-2 text-slate-600 dark:text-slate-300 italic">"{t.review}"</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex text-amber-400">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} className={`w-3 h-3 ${i < t.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-700'}`} />
                           ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          t.status === 'published' 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          {t.status === 'published' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                          {t.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {t.status === 'pending' ? (
                            <button 
                              onClick={() => updateStatus(t.id, 'published')}
                              className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 flex items-center justify-center transition-colors"
                              title="Publish"
                            >
                              <CheckCircle size={16} />
                            </button>
                          ) : (
                            <button 
                              onClick={() => updateStatus(t.id, 'pending')}
                              className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 flex items-center justify-center transition-colors"
                              title="Unpublish"
                            >
                              <Clock size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => deleteTestimonial(t.id)}
                            className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400 flex items-center justify-center transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {testimonials.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">No testimonials found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
