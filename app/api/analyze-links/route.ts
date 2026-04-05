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

    const links: Array<{ href: string; text: string; type: "internal" | "external" }> = [];
    const baseUrl = new URL(url).origin;

    $("a").each((i, el) => {
      const href = $(el).attr("href");
      const text = $(el).text().trim() || "[No Text]";
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

      const type = (href.startsWith("/") || href.startsWith(baseUrl)) ? "internal" : "external";
      links.push({ href: (href.startsWith("/") ? baseUrl + href : href), text, type });
    });

    return NextResponse.json({
      total: links.length,
      internal: links.filter(l => l.type === "internal").length,
      external: links.filter(l => l.type === "external").length,
      links: links.slice(0, 500) // Limit for performance
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
