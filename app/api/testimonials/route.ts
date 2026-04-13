import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// Helper to ensure the table exists
const ensureTableExists = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        linkedin_id TEXT,
        designation TEXT NOT NULL,
        review TEXT NOT NULL,
        category TEXT,
        rating INTEGER NOT NULL DEFAULT 5,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS category TEXT;`;
  } catch (error) {
    console.error("Testimonial Schema Init Error:", error);
  }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "published";
    
    await ensureTableExists();
    
    // Fetch all or filter by status
    const { rows } = status === "all" 
      ? await sql`SELECT * FROM testimonials ORDER BY created_at DESC`
      : await sql`SELECT * FROM testimonials WHERE status = ${status} ORDER BY created_at DESC`;

    return NextResponse.json(rows);
  } catch (error) {
    console.error("API GET Testimonials Error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await ensureTableExists();

    const { name, linkedinId, designation, review, rating, category } = data;

    if (!name || !designation || !review) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Default status is 'pending' requires admin approval
    const status = 'pending';

    await sql`
      INSERT INTO testimonials (name, linkedin_id, designation, review, rating, status, category, created_at)
      VALUES (${name}, ${linkedinId || null}, ${designation}, ${review}, ${rating || 5}, ${status}, ${category || 'Overall'}, ${new Date().toISOString()})
    `;

    return NextResponse.json({ success: true, message: "Testimonial submitted successfully and is pending approval." });
  } catch (error) {
    console.error("API POST Testimonials Error:", error);
    return NextResponse.json({ error: "Failed to save testimonial." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || !data.status) {
      return NextResponse.json({ error: "ID and new status are required." }, { status: 400 });
    }

    await sql`
      UPDATE testimonials
      SET status = ${data.status}
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API PUT Testimonials Error:", error);
    return NextResponse.json({ error: "Failed to update testimonial." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required for deletion." }, { status: 400 });
    }

    await sql`
      DELETE FROM testimonials 
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true, message: "Testimonial deleted." });
  } catch (error) {
    console.error("API DELETE Testimonials Error:", error);
    return NextResponse.json({ error: "Failed to delete testimonial." }, { status: 500 });
  }
}
