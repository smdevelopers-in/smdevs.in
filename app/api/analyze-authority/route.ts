import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      },
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) throw new Error("Could not fetch page");

    const html = await response.text();
    const $ = cheerio.load(html);

    // Heuristics for Authority Score
    const bodyText = $("body").text().trim();
    const wordCount = bodyText.split(/\s+/).length;
    const internalLinks = $("a").filter((i, el) => ($(el).attr("href") || "").startsWith("/") || ($(el).attr("href") || "").includes(new URL(url).host)).length;
    const hasH1 = $("h1").length > 0;
    const hasMeta = $('meta[name="description"]').length > 0;
    const images = $("img").length;

    // Score Calculation (Purely heuristic)
    let contentScore = Math.min(wordCount / 10, 40); // Max 40
    let linkScore = Math.min(internalLinks * 2, 30); // Max 30
    let technicalScore = (hasH1 ? 15 : 0) + (hasMeta ? 15 : 0); // Max 30

    const totalScore = Math.round(contentScore + linkScore + technicalScore);

    return NextResponse.json({
      score: totalScore,
      breakdown: {
        content: Math.round(contentScore),
        links: Math.round(linkScore),
        technical: Math.round(technicalScore)
      },
      stats: {
        wordCount,
        internalLinks,
        images
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
