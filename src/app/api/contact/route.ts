import { Resend } from "resend";
import { NextResponse } from "next/server";

// Initialize Resend with API key
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Define the expected request body type
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comments: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Check if Resend is properly initialized
    if (!resend) {
      console.error("❌ Resend API key not configured");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await req.json();
    console.log("📨 Incoming POST body:", body);

    // Validate required fields
    const { firstName, lastName, email, comments } = body as ContactFormData;
    
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Configure email parameters
    const emailFrom = process.env.EMAIL_FROM || "onboarding@resend.dev";
    const emailTo = process.env.EMAIL_TO || email; // Use configured recipient or fall back to sender

    console.log("📤 Sending from:", emailFrom);
    console.log("📤 Sending to:", emailTo);

    // Send email via Resend
    const data = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: "Thank you for reaching out to Vineland Post Acute",
      text: `
Hi ${firstName} ${lastName},

Thank you for your message. We've received your inquiry and will get back to you shortly.

Your message:
"${comments}"

We may contact you at: ${body.phone || "N/A"}

– Vineland Post Acute
      `,
    });

    console.log("✅ Email sent:", data);
    
    // Return success response - handle the Resend response type correctly
    return NextResponse.json({ 
      success: true, 
      data: data
    });
    
  } catch (error) {
    // Handle errors
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Resend email error:", error);
    
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}









