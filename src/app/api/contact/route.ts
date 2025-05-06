import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comments: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    console.log("📨 Incoming POST body:", body);

    const { firstName, lastName, email, phone, comments } = body as ContactFormData;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Thank you for reaching out to Vineland Post Acute",
      text: `
Hi ${firstName} ${lastName},

Thank you for your message. We've received your inquiry and will get back to you shortly.

Your message:
"${comments}"

We may contact you at: ${phone || "N/A"}

– Vineland Post Acute
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Gmail sent:", info.response);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Gmail send error:", err);
    return NextResponse.json({ success: false, error: "Email failed to send" }, { status: 500 });
  }
}










