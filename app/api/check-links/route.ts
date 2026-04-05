import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ error: "Invalid URL provided." }, { status: 400 });
    }

    // Step 1: Fetch HTML
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch the target URL." }, { status: 500 });
    }

    const html = await response.text();

    // Step 2: Extract links using regex (simple for MVP)
    const hrefRegex = /href="([^"]+)"/g;
    const matches = Array.from(html.matchAll(hrefRegex));
    const rawLinks = matches.map(m => m[1]);

    // Step 3: Clean and Absolute-ify links
    const baseUrl = new URL(url);
    const cleanedLinks = rawLinks
      .map(link => {
        try {
          return new URL(link, baseUrl).href;
        } catch (e) {
          return null;
        }
      })
      .filter((link): link is string => 
        !!link && 
        link.startsWith("http") && 
        !link.includes("mailto:") && 
        !link.includes("javascript:") && 
        !link.includes("tel:")
      );

    // Remove duplicates
    const uniqueLinks = Array.from(new Set(cleanedLinks));

    // Step 4: Check links (limit to first 30 for safety/performance in MVP)
    const linksToCheck = uniqueLinks.slice(0, 30);
    
    const results = await Promise.all(
      linksToCheck.map(async (link) => {
        try {
          const res = await fetch(link, { 
            method: "HEAD", 
            signal: AbortSignal.timeout(5000) // 5 sec timeout
          });
          
          return {
            url: link,
            status: res.status,
            working: res.status >= 200 && res.status < 400,
            type: link.includes(baseUrl.hostname) ? "Internal" : "External"
          };
        } catch (error) {
          return {
            url: link,
            status: 0,
            working: false,
            type: link.includes(baseUrl.hostname) ? "Internal" : "External",
            error: "Request failed"
          };
        }
      })
    );

    return NextResponse.json({
      total: results.length,
      working: results.filter(r => r.working).length,
      broken: results.filter(r => !r.working).length,
      links: results
    });

  } catch (error) {
    console.error("Link check error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
