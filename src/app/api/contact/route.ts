import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comments: string;
  lang?: "en" | "es";
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, comments, lang = "en" } = body as ContactFormData;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const subject =
      lang === "es"
        ? "Gracias por contactarnos – Vineland Post Acute"
        : "Thank you for reaching out to Vineland Post Acute";

    const message =
      lang === "es"
        ? `Hola ${firstName} ${lastName},

Gracias por su mensaje. Hemos recibido su consulta y nos pondremos en contacto con usted pronto.

Su mensaje:
"${comments}"

Podemos contactarlo al: ${phone || "N/A"}

– Vineland Post Acute`
        : `Hi ${firstName} ${lastName},

Thank you for your message. We've received your inquiry and will get back to you shortly.

Your message:
"${comments}"

We may contact you at: ${phone || "N/A"}

– Vineland Post Acute`;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Email send error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}











