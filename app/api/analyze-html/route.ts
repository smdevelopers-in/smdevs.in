import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url, html: rawHtml, keyword: targetKeyword } = await req.json();
    let html = rawHtml;

    if (url && !html) {
      if (!url.startsWith("http")) {
        return NextResponse.json({ error: "Invalid URL. Please include http:// or https://" }, { status: 400 });
      }

      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        },
        signal: AbortSignal.timeout(10000)
      });

      if (!response.ok) {
        return NextResponse.json({ error: "Could not fetch the URL. The site might be blocking automated requests." }, { status: 500 });
      }
      html = await response.text();
    }

    if (!html || html.trim().length === 0) {
      return NextResponse.json({ error: "No HTML content provided to analyze." }, { status: 400 });
    }

    const $ = cheerio.load(html);

    // --- 1. EXTRACTION ---
    
    // Head
    const title = $("title").text().trim() || "";
    const description = $('meta[name="description"]').attr("content")?.trim() || 
                        $('meta[property="og:description"]').attr("content")?.trim() || "";
    const robots = $('meta[name="robots"]').attr("content")?.trim() || "";
    const canonical = $('link[rel="canonical"]').attr("href")?.trim() || "";
    const ogImage = $('meta[property="og:image"]').attr("content") || "";

    // Body Content
    const bodyText = $("body").text().replace(/\s+/g, " ").trim();
    const wordCount = bodyText.split(/\s+/).filter(w => w.length > 0).length;
    const first100Words = bodyText.split(/\s+/).slice(0, 100).join(" ");
    
    // Headings
    const h1s = $("h1").map((i, el) => $(el).text().trim()).get();
    const h2s = $("h2").map((i, el) => $(el).text().trim()).get();
    const h3s = $("h3").map((i, el) => $(el).text().trim()).get();
    const allHeadings = $("h1, h2, h3, h4, h5, h6").get();

    // Images
    const images = $("img");
    const totalImages = images.length;
    let imagesWithoutAlt = 0;
    let poorAltText = 0;
    let badFileNames = 0;

    images.each((i, el) => {
      const alt = $(el).attr("alt")?.trim();
      const src = $(el).attr("src") || "";
      
      if (!alt) {
        imagesWithoutAlt++;
      } else if (alt.length < 3 || ["image", "img", "photo", "pic"].includes(alt.toLowerCase())) {
        poorAltText++;
      }

      const fileName = src.split("/").pop() || "";
      if (fileName.includes("_") || /^[0-9]+(\.[a-z]+)?$/.test(fileName)) {
        badFileNames++;
      }
    });

    // Links
    const links = $("a");
    const totalLinks = links.length;
    const baseUrl = url ? new URL(url).origin : "";
    let internalLinks = 0;
    let externalLinks = 0;

    links.each((i, el) => {
      const href = $(el).attr("href");
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;
      if (href.startsWith("/") || (baseUrl && href.startsWith(baseUrl))) {
        internalLinks++;
      } else {
        externalLinks++;
      }
    });

    // --- 2. ADVANCED LOGIC ---

    const issues = [];
    const keyword = targetKeyword?.trim().toLowerCase();
    
    // A. Title Analysis (Weight: 20)
    let titleScore = 20;
    if (!title) {
      titleScore = 0;
      issues.push({ title: "Missing Title Tag", severity: "High", explanation: "Title tags are critical for ranking and CTR.", fix: "Add a descriptive <title> tag between 50-60 characters." });
    } else {
      if (title.length < 30 || title.length > 65) {
        titleScore -= 10;
        issues.push({ title: "Suboptimal Title Length", severity: "Medium", explanation: `Your title is ${title.length} chars. Optimal is 50-60.`, fix: "Adjust title length to be between 50 and 60 characters." });
      }
      if (keyword && !title.toLowerCase().includes(keyword)) {
        titleScore -= 10;
        issues.push({ title: "Keyword Missing in Title", severity: "High", explanation: "Target keyword should be in the title for relevance.", fix: `Include '${keyword}' near the beginning of your title.` });
      }
    }

    // B. Meta Analysis (Weight: 20)
    let metaScore = 20;
    if (!description) {
      metaScore = 0;
      issues.push({ title: "Missing Meta Description", severity: "High", explanation: "Descriptions act as organic ad copy in search results.", fix: "Add a meta description between 150-160 characters." });
    } else {
      if (description.length < 120 || description.length > 170) {
        metaScore -= 10;
        issues.push({ title: "Suboptimal Meta Length", severity: "Medium", explanation: `Description is ${description.length} chars. Optimal is 150-160.`, fix: "Aim for 150-160 characters for best display on Google." });
      }
      if (keyword && !description.toLowerCase().includes(keyword)) {
        metaScore -= 5;
        issues.push({ title: "Keyword Missing in Meta", severity: "Medium", explanation: "Keyword in description gets bolded in snippets.", fix: `Integrate '${keyword}' naturally into your meta description.` });
      }
      // Simple CTA Check
      const hasCTA = /(buy|get|start|contact|learn|find|shop|register|download)/i.test(description);
      if (!hasCTA) {
        metaScore -= 5;
        issues.push({ title: "Missing CTA in Meta", severity: "Low", explanation: "Directing users to take action can improve CTR.", fix: "Add a call-to-action like 'Learn more', 'Start today', or 'Get started'." });
      }
    }

    // C. Heading Analysis (Weight: 15)
    let headingScore = 15;
    if (h1s.length === 0) {
      headingScore = 0;
      issues.push({ title: "Missing H1 Tag", severity: "High", explanation: "H1 tells search engines the main topic of your page.", fix: "Add exactly one H1 tag summarizing your content." });
    } else if (h1s.length > 1) {
      headingScore -= 7;
      issues.push({ title: "Multiple H1 Tags", severity: "Medium", explanation: "Multiple H1s can dilute the topical focus of your page.", fix: "Change secondary H1s to H2 tags." });
    } else if (keyword && !h1s[0].toLowerCase().includes(keyword)) {
      headingScore -= 5;
      issues.push({ title: "Keyword Missing in H1", severity: "Medium", explanation: "H1 relevancy is a key on-page signal.", fix: `Ensure '${keyword}' appears in your main H1 heading.` });
    }

    // Hierarchy Check
    let hierarchyBroken = false;
    let lastLevel = 0;
    $(allHeadings).each((i, el) => {
      const level = parseInt(el.tagName.substring(1));
      if (level > lastLevel + 1 && lastLevel !== 0) {
        hierarchyBroken = true;
      }
      lastLevel = level;
    });
    if (hierarchyBroken) {
      headingScore -= 5;
      issues.push({ title: "Broken Heading Hierarchy", severity: "Medium", explanation: "Skipping heading levels (e.g. H1 to H3) confuses crawlers.", fix: "Ensure headings follow a logical order: H1 > H2 > H3." });
    }

    // D. Content Analysis (Weight: 15)
    let contentScore = 15;
    if (wordCount < 300) {
      contentScore -= 10;
      issues.push({ title: "Thin Content Detected", severity: "High", explanation: "Pages with less than 300 words often struggle to rank.", fix: "Expand your content with more helpful information for users." });
    }
    if (keyword && !first100Words.toLowerCase().includes(keyword)) {
      contentScore -= 5;
      issues.push({ title: "Keyword Not in First 100 Words", severity: "Medium", explanation: "Early keyword mention establishes topical relevance.", fix: `Use your target keyword '${keyword}' within the first paragraph.` });
    }

    // Readability (very basic)
    const avgWordLen = bodyText.split("").length / wordCount;
    const complexityScore = avgWordLen > 6 ? "Complex" : "Simple";
    if (complexityScore === "Complex") {
       issues.push({ title: "High Content Complexity", severity: "Low", explanation: "Longer words may make the content harder to read for general users.", fix: "Try using simpler language or shorter sentences where possible." });
    }

    // E. Link Analysis (Weight: 15)
    let linkScore = 15;
    if (totalLinks === 0) {
      linkScore -= 10;
      issues.push({ title: "No Links Found", severity: "Medium", explanation: "Links help search engines discover pages and pass authority.", fix: "Add both internal and external links to help crawlers navigate." });
    } else {
      const internalRatio = internalLinks / Math.max(totalLinks, 1);
      if (internalRatio < 0.2) {
        linkScore -= 5;
        issues.push({ title: "Low Internal Linking", severity: "Medium", explanation: "Internal links build site architecture and keep users engaged.", fix: "Link to other relevant pages on your own website." });
      }
    }

    // F. Image Analysis (Weight: 15)
    let imageScore = 15;
    if (imagesWithoutAlt > 0) {
      const penalty = Math.min(imagesWithoutAlt * 2, 8);
      imageScore -= penalty;
      issues.push({ title: `${imagesWithoutAlt} Images Missing Alt Text`, severity: "High", explanation: "Alt text is required for accessibility and image search SEO.", fix: "Add descriptive alternative text to all <img> tags." });
    }
    if (poorAltText > 0) {
      imageScore -= 3;
      issues.push({ title: "Generic Alt Text Detected", severity: "Low", explanation: "Alt text like 'image.jpg' provides no SEO value.", fix: "Use descriptive keywords in your alt text instead of generic filenames." });
    }
    if (badFileNames > 0) {
      imageScore -= 2;
      issues.push({ title: "Non-Descriptive Image Filenames", severity: "Low", explanation: "Google reads filenames to understand image content.", fix: "Rename images using keywords and hyphens (e.g. 'blue-jeans.jpg')." });
    }

    const totalScore = Math.max(0, titleScore + metaScore + headingScore + contentScore + linkScore + imageScore);

    return NextResponse.json({
      summary: { title, description, robots, canonical, ogImage },
      stats: {
        wordCount,
        headingStats: { h1: h1s.length, h2: h2s.length, h3: h3s.length },
        linkStats: { total: totalLinks, internal: internalLinks, external: externalLinks },
        imageStats: { total: totalImages, missingAlt: imagesWithoutAlt, poorAltCount: poorAltText }
      },
      headings: { h1: h1s, h2: h2s },
      readability: { complexity: complexityScore, avgWordLength: avgWordLen.toFixed(1) },
      issues,
      keywordAnalysis: keyword ? {
        keyword,
        foundInTitle: title.toLowerCase().includes(keyword),
        foundInH1: h1s.some(h => h.toLowerCase().includes(keyword)),
        foundInFirst100: first100Words.toLowerCase().includes(keyword),
        foundInAlts: images.map((i, el) => $(el).attr("alt")?.toLowerCase()).get().some(a => a?.includes(keyword))
      } : null,
      score: Math.round(totalScore)
    });

  } catch (error: any) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze HTML." }, { status: 500 });
  }
}
