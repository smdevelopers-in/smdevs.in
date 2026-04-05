import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { BlogPost } from "@/types/blog";

const DATA_PATH = path.join(process.cwd(), "data", "blogs.json");

// Helper to read blogs from JSON
const readBlogs = (): BlogPost[] => {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      return [];
    }
    const data = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading blogs:", error);
    return [];
  }
};

// Helper to write blogs to JSON
const writeBlogs = (blogs: BlogPost[]) => {
  try {
    const dir = path.dirname(DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_PATH, JSON.stringify(blogs, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing blogs:", error);
  }
};

export async function GET() {
  const blogs = readBlogs();
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  try {
    const newBlog: BlogPost = await request.json();
    const blogs = readBlogs();
    
    // Check for duplicate slug
    const exists = blogs.some(b => b.slug === newBlog.slug);
    if (exists) {
      return NextResponse.json({ error: "A blog with this slug already exists." }, { status: 400 });
    }

    blogs.push({
      ...newBlog,
      createdAt: new Date().toISOString(),
      status: "published"
    });

    writeBlogs(blogs);

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json({ error: "Failed to save blog post." }, { status: 500 });
  }
}
