import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, comments } = body;

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM as string,
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

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ Resend error:", error);
    return NextResponse.json({ success: false, error: "Email failed to send." }, { status: 500 });
  }
}




