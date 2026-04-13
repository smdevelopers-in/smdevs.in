import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Use the key from env, or fallback to the provided key just to be safe during this session.
const resend = new Resend(process.env.RESEND_API_KEY || 're_PhyW7dcW_JNC9uLGADk1GtXYukCKxvuus');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, message, metadata } = body;

    if (!name || (!email && type === 'contact') || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    let subject = 'New Message from SM Developers';
    if (type === 'contact') {
      subject = `[Contact] New Inquiry from ${name}`;
    } else if (type === 'feedback') {
      subject = `[Feedback] Tool Feedback from ${name} - ${metadata?.tool || 'General'}`;
    }

    // Using your newly verified domain
    const { data, error } = await resend.emails.send({
      from: 'SM Developers <support@smdevs.in>',
      to: ['smdevelopers016@gmail.com'],
      reply_to: email || undefined,
      subject: subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #2563eb;">${subject}</h2>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email Address:</strong> ${email || 'Not provided'}</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${message}</p>
                ${metadata ? `
                  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                  <p><strong>Additional Context:</strong> Access Page: ${metadata.tool || 'Unknown'}</p>
                ` : ''}
            </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Email error catch:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
