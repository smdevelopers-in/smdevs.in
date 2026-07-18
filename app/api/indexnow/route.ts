import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sql } from '@vercel/postgres';

const BASE_URL = 'https://smdevs.in';
const INDEXNOW_KEY = 'e0eafedbf1a1451dabadd36b747778c5';
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

// Collect all site URLs (mirrors your sitemap.ts logic)
async function getAllUrls(): Promise<string[]> {
  const urls: string[] = [];

  // 1. Static routes
  const staticRoutes = [
    '',
    '/tools/seo',
    '/tools/trading',
    '/tools/others',
    '/resources/blogs',
  ];
  staticRoutes.forEach((r) => urls.push(`${BASE_URL}${r}`));

  // 2. SEO Tool routes
  try {
    const seoToolsDir = path.join(process.cwd(), 'app/tools/seo');
    if (fs.existsSync(seoToolsDir)) {
      fs.readdirSync(seoToolsDir)
        .filter((f) => fs.statSync(path.join(seoToolsDir, f)).isDirectory())
        .forEach((tool) => urls.push(`${BASE_URL}/tools/seo/${tool}`));
    }
  } catch (e) {
    console.error('IndexNow: Error reading SEO tools:', e);
  }

  // 3. Trading Tool routes
  try {
    const tradingDir = path.join(process.cwd(), 'app/tools/trading');
    if (fs.existsSync(tradingDir)) {
      fs.readdirSync(tradingDir)
        .filter((f) => fs.statSync(path.join(tradingDir, f)).isDirectory())
        .forEach((tool) => urls.push(`${BASE_URL}/tools/trading/${tool}`));
    }
  } catch (e) {
    console.error('IndexNow: Error reading trading tools:', e);
  }

  // 4. Other Tool routes
  try {
    const othersDir = path.join(process.cwd(), 'app/tools/others');
    if (fs.existsSync(othersDir)) {
      fs.readdirSync(othersDir)
        .filter((f) => fs.statSync(path.join(othersDir, f)).isDirectory())
        .forEach((tool) => urls.push(`${BASE_URL}/tools/others/${tool}`));
    }
  } catch (e) {
    console.error('IndexNow: Error reading other tools:', e);
  }

  // 5. Published blog routes from Postgres
  try {
    const { rows } = await sql`SELECT slug FROM blog_posts WHERE status = 'published'`;
    rows.forEach((blog: any) =>
      urls.push(`${BASE_URL}/resources/blogs/${blog.slug}`)
    );
  } catch (e) {
    console.error('IndexNow: Error reading blogs from DB:', e);
  }

  return urls;
}

export async function POST(request: NextRequest) {
  // Simple bearer-token guard so only you can trigger this
  const secret = request.headers.get('x-indexnow-secret');
  const expectedSecret = process.env.INDEXNOW_SECRET;

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const urlList = await getAllUrls();

    const body = {
      host: 'smdevs.in',
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    };

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        submitted: urlList.length,
        urls: urlList,
      });
    } else {
      const text = await response.text();
      return NextResponse.json(
        { error: `IndexNow API error: ${response.status}`, detail: text },
        { status: response.status }
      );
    }
  } catch (error: any) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: handy for testing in browser / Postman
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const expectedSecret = process.env.INDEXNOW_SECRET;

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const urlList = await getAllUrls();

    const body = {
      host: 'smdevs.in',
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    };

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        submitted: urlList.length,
        urls: urlList,
      });
    } else {
      const text = await response.text();
      return NextResponse.json(
        { error: `IndexNow API error: ${response.status}`, detail: text },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
