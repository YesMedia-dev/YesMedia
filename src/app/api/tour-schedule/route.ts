import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // Transporter setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // e.g. chrystyanpulido@gmail.com
        pass: process.env.GMAIL_PASS, // App password (not your actual Gmail password)
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
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
    };

    const data = await transporter.sendMail(mailOptions);
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

