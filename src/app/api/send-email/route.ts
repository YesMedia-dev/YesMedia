import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { firstName, lastName, email, phone, comments } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail", // ✅ Use Gmail 
    auth: {
      user: process.env.EMAIL_USER, // = chrystyanpulido@gmail.com
      pass: process.env.EMAIL_PASS, // = your Gmail App Password
    },
  });

  // ✅ Send email to yourself (Vineland)
  await transporter.sendMail({
    from: `"Website Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New message from ${firstName} ${lastName}`,
    text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Message: ${comments}
    `,
  });

  // ✅ Auto-reply to user
  await transporter.sendMail({
    from: `"Vineland Post Acute" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "We received your message",
    text: `Hi ${firstName},\n\nThank you for contacting Vineland Post Acute. We will be reaching out shortly.\n\nBest,\nVineland Team`,
  });

  return NextResponse.json({ success: true });
}
