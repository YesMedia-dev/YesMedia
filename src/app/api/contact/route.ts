import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, comments } = body;

    console.log("📨 Incoming form data:", body); // Optional log for debugging

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // chrystyanpulido@gmail.com
        pass: process.env.EMAIL_PASS, // Gmail app password
      },
      tls: {
        rejectUnauthorized: false, // Allow Gmail’s cert on Vercel
      },
    });

    await transporter.sendMail({
      from: `"Vineland Post Acute" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for reaching out to Vineland Post Acute",
      text: `
Hi ${firstName} ${lastName},

Thank you for your message. We’ve received your inquiry and will get back to you shortly.

Your message:
"${comments}"

We may contact you at: ${phone}

– Vineland Post Acute
`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Email send error:", error);
    return NextResponse.json(
      { success: false, error: "Email failed to send." },
      { status: 500 }
    );
  }
}



