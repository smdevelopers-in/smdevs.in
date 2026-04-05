import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ error: "Invalid URL provided." }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      },
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch the target URL. The site might be blocking requests." }, { status: 500 });
    }

    const html = await response.text();

    // Extract Metadata using Regex
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i) || 
                         html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i);
    
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    const h2Matches = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
    const imgMatches = html.match(/<img[^>]*>/gi) || [];
    const linkMatches = html.match(/<a[^>]*href=["']([^"']+)["'][^>]*>/gi) || [];

    const imagesWithoutAlt = imgMatches.filter(img => !img.match(/alt=["']([^"']*)["']/i)).length;

    const data = {
      title: titleMatch ? titleMatch[1].trim() : null,
      titleLength: titleMatch ? titleMatch[1].trim().length : 0,
      metaDescription: metaDescMatch ? metaDescMatch[1].trim() : null,
      metaDescriptionLength: metaDescMatch ? metaDescMatch[1].trim().length : 0,
      h1Count: h1Matches.length,
      h2Count: h2Matches.length,
      imagesTotal: imgMatches.length,
      imagesWithoutAlt,
      linksTotal: linkMatches.length,
    };

    // Calculate SEO Score
    let score = 0;
    if (data.title) score += 20;
    if (data.metaDescription) score += 20;
    if (data.h1Count > 0) score += 20;
    if (data.imagesTotal > 0 && data.imagesWithoutAlt === 0) score += 20;
    else if (data.imagesTotal > 0) score += 10;
    if (data.h2Count > 0) score += 20;

    return NextResponse.json({ ...data, score });

  } catch (error: any) {
    console.error("SEO Analysis error:", error);
    return NextResponse.json({ error: error.message || "An unexpected error occurred." }, { status: 500 });
  }
}
