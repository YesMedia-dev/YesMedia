import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    console.log("📨 Incoming POST body:", body);

    const { firstName, lastName, email, phone, comments } = body as {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      comments: string;
    };

    const emailFrom = process.env.EMAIL_FROM || "onboarding@resend.dev";
    console.log("📤 Sending from:", emailFrom);
    console.log("📤 Sending to:", email);

    const data = await resend.emails.send({
      from: emailFrom,
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

    console.log("✅ Email sent:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Resend email error:", message);

    return new NextResponse(
      JSON.stringify({ success: false, error: message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}









