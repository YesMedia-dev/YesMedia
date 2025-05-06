import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, comments } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // e.g., chrystyanpulido@gmail.com
        pass: process.env.EMAIL_PASS, // your Gmail app password
      },
      tls: {
        rejectUnauthorized: false, // Fixes "self-signed certificate" error on Vercel
      },
    });

    const mailOptions = {
      from: `"Vineland Contact" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for reaching out to Vineland Post Acute",
      text: `
Hi ${firstName},

Thank you for your message. We’ve received your inquiry and will get back to you shortly.

Your message:
"${comments}"

We may contact you at: ${phone}

– Vineland Post Acute
`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ success: false, error: "Failed to send email." }, { status: 500 });
  }
}


