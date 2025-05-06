import { Resend } from "resend";
import { NextResponse } from "next/server";

// Initialize Resend with API key
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Define request body structure
interface TourFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  comments: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    if (!resend) {
      console.error("❌ Resend API key not configured");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    console.log("📨 Incoming tour request:", body);

    const {
      firstName,
      lastName,
      email,
      phone,
      preferredDate,
      preferredTime,
      comments,
    } = body as TourFormData;

    if (!firstName || !lastName || !email || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailFrom = process.env.EMAIL_FROM || "onboarding@resend.dev";
    const emailTo = process.env.EMAIL_TO || email;

    console.log("📤 Sending from:", emailFrom);
    console.log("📤 Sending to:", emailTo);

    const data = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: "Your Tour Request at Vineland Post Acute",
      text: `
Hi ${firstName} ${lastName},

Thank you for your interest in visiting Vineland Post Acute.

Here are the details we received:
– Preferred Date: ${preferredDate}
– Preferred Time: ${preferredTime}
– Phone: ${phone || "N/A"}
– Comments: ${comments || "N/A"}

Our team will be in touch shortly to confirm your tour.

Best regards,  
Vineland Post Acute
      `,
    });

    console.log("✅ Tour email sent:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Tour schedule email error:", error);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
