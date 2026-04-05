import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { BlogPost } from "@/types/blog";

// Helper to ensure the table exists
const ensureTableExists = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        category TEXT DEFAULT 'General',
        author TEXT DEFAULT 'SM Dev Team',
        featured_image TEXT,
        publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'published'
      );
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);`;
  } catch (error) {
    console.error("Schema Initialization Error:", error);
  }
};

export async function GET() {
  try {
    await ensureTableExists();
    const { rows } = await sql`
      SELECT * FROM blog_posts 
      WHERE status = 'published' 
      ORDER BY publish_date DESC
    `;
    
    // Map database fields to interface
    const blogs: BlogPost[] = rows.map(row => ({
      title: row.title,
      slug: row.slug,
      content: row.content,
      excerpt: row.excerpt,
      category: row.category,
      author: row.author,
      featuredImage: row.featured_image,
      createdAt: row.created_at.toISOString(),
      publishDate: row.publish_date.toISOString(),
      status: row.status
    }));

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newBlog: BlogPost = await request.json();
    await ensureTableExists();

    // Check for duplicate slug
    const { rowCount } = await sql`SELECT 1 FROM blog_posts WHERE slug = ${newBlog.slug}`;
    if (rowCount && rowCount > 0) {
      return NextResponse.json({ error: "A blog with this slug already exists." }, { status: 400 });
    }

    await sql`
      INSERT INTO blog_posts (
        title, slug, content, excerpt, category, author, featured_image, publish_date, created_at, status
      ) VALUES (
        ${newBlog.title}, 
        ${newBlog.slug}, 
        ${newBlog.content}, 
        ${newBlog.excerpt}, 
        ${newBlog.category}, 
        ${newBlog.author}, 
        ${newBlog.featuredImage}, 
        ${newBlog.publishDate || new Date().toISOString()}, 
        ${new Date().toISOString()}, 
        'published'
      )
    `;

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json({ error: "Failed to save blog post to database." }, { status: 500 });
  }
}
