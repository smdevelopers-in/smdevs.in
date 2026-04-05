export default function SEOContentSection() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800/50 relative overflow-hidden">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight">
              The Power of <span className="text-blue-600">Free Specialized Tools</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg">
              In the modern digital landscape, access to accurate and accessible information is the ultimate competitive advantage. Whether you are an aspiring blogger, a seasoned developer, or a focused trader, the right tools can make or break your strategy. At **SM Developers**, we believe that professional-grade utilities like our **Schema Validator**, **SEO Structure Analyzer**, and **Trading Pivot Calculators** should be available to everyone at zero cost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Why SEO Tools Matter</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Search Engine Optimization is no longer about guessing. It's about technical precision. Using a high-quality analyzer helps you identify hidden errors in your heading hierarchy, meta tags, and content structure that might be holding your website back from the front page of Google.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">The Trading Edge</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Trading is a game of probabilities and risk management. By using automated calculators, you eliminate human error and emotion from your decision-making process. Having instant access to pivot levels and position size math ensures you stay disciplined in any market condition.
              </p>
            </div>
          </div>

          <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center italic font-bold text-slate-600 dark:text-slate-400">
            "Our goal is to foster a community of learners and creators who can build better products and make smarter trades using open, accessible, and fast technology."
          </div>
        </div>
      </div>
    </section>
  );
}
