import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    // Validate Cloudinary config
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Upload Error: Missing Cloudinary environment variables');
      return NextResponse.json({ error: 'Server misconfiguration: Missing CDN credentials.' }, { status: 500 });
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (parseError) {
      console.error('Upload Error: Failed to parse form data:', parseError);
      return NextResponse.json({ error: 'Failed to parse uploaded file data.' }, { status: 400 });
    }

    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type. Please upload an image.' }, { status: 400 });
    }

    // Convert browser File to Buffer for Cloudinary Node.js SDK
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'smdevs_blog', 
          format: 'webp',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload_stream error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (error: any) {
    console.error('Upload API Error:', error?.message || error);
    return NextResponse.json({ 
      error: `Failed to upload image: ${error?.message || 'Unknown CDN error'}` 
    }, { status: 500 });
  }
}
