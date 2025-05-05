import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Format "2025-05-06" → "May 6, 2025"
function formatToFriendlyDate(date: string): string {
  try {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  } catch {
    return date;
  }
}

// Format "14:30" → "2:30 PM"
function formatTo12Hour(time: string): string {
  try {
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    if (isNaN(hour) || isNaN(minute)) return time;

    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = ((hour + 11) % 12) + 1;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${suffix}`;
  } catch {
    return time;
  }
}

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      preferredDate,
      preferredTime,
      comments,
    } = await req.json();

    const formattedDate = formatToFriendlyDate(preferredDate);
    const formattedTime = formatTo12Hour(preferredTime);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // should be chrystyanpulido@gmail.com
        pass: process.env.EMAIL_PASS, // use Gmail App Password
      },
    });

    // Notify yourself
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New tour request from ${firstName} ${lastName}`,
      text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Preferred Date: ${formattedDate}
Preferred Time: ${formattedTime}
Comments: ${comments}
      `.trim(),
    });

    // Auto-reply to visitor
    await transporter.sendMail({
      from: `"Vineland Post Acute" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your tour request",
      text: `Hi ${firstName},

Thank you for scheduling a tour at Vineland Post Acute! We look forward to seeing you on ${formattedDate} at ${formattedTime}.

Our team will follow up with a confirmation shortly.

Best,  
Vineland Team`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Gmail error:", error);
    return NextResponse.json({ success: false, error: "Email send failed" }, { status: 500 });
  }
}
