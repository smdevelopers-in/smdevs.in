import { MetadataRoute } from 'next';
import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://smdevelopers.xyz';

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/tools/seo',
    '/tools/trading',
    '/resources/blogs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // 2. SEO Tool Routes
  const seoRoutes: any[] = [];
  try {
    const seoToolsDir = path.join(process.cwd(), 'app/tools/seo');
    if (fs.existsSync(seoToolsDir)) {
      const seoToolFolders = fs.readdirSync(seoToolsDir).filter(f => fs.statSync(path.join(seoToolsDir, f)).isDirectory());
      seoToolFolders.forEach((tool) => {
        seoRoutes.push({
          url: `${baseUrl}/tools/seo/${tool}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        });
      });
    }
  } catch (e) {
    console.error("Error reading SEO tools for sitemap:", e);
  }

  // 3. Trading Tool Routes
  const tradingRoutes: any[] = [];
  try {
    const tradingToolsDir = path.join(process.cwd(), 'app/tools/trading');
    if (fs.existsSync(tradingToolsDir)) {
      const tradingToolFolders = fs.readdirSync(tradingToolsDir).filter(f => fs.statSync(path.join(tradingToolsDir, f)).isDirectory());
      tradingToolFolders.forEach((tool) => {
        tradingRoutes.push({
          url: `${baseUrl}/tools/trading/${tool}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        });
      });
    }
  } catch (e) {
    console.error("Error reading trading tools for sitemap:", e);
  }

  // 4. Dynamic Blog Routes from Postgres
  let blogRoutes: any[] = [];
  try {
    const { rows } = await sql`SELECT slug, publish_date, created_at FROM blog_posts WHERE status = 'published'`;
    blogRoutes = rows.map((blog: any) => ({
      url: `${baseUrl}/resources/blogs/${blog.slug}`,
      lastModified: new Date(blog.publish_date || blog.created_at || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (e) {
    console.error("Error reading blogs for database sitemap:", e);
  }

  return [
    ...staticRoutes,
    ...seoRoutes,
    ...tradingRoutes,
    ...blogRoutes,
  ];
}
