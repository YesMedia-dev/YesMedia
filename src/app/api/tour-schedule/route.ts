import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface TourFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  comments: string;
  language?: string; // "en" | "es"
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      preferredDate,
      preferredTime,
      comments,
      language = "en"
    } = body as TourFormData;

    if (!firstName || !lastName || !email || !preferredDate || !preferredTime) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const isSpanish = language === "es";

    const subject = isSpanish
      ? "Su solicitud de recorrido en Vineland Post Acute"
      : "Your Tour Request at Vineland Post Acute";

    const message = isSpanish
      ? `Hola ${firstName} ${lastName},

Gracias por su interés en visitar Vineland Post Acute.

Detalles recibidos:
– Fecha preferida: ${preferredDate}
– Hora preferida: ${preferredTime}
– Teléfono: ${phone || "N/A"}
– Comentarios: ${comments || "N/A"}

Nuestro equipo se pondrá en contacto pronto para confirmar su recorrido.

Saludos cordiales,
Vineland Post Acute`
      : `Hi ${firstName} ${lastName},

Thank you for your interest in visiting Vineland Post Acute.

Here are the details we received:
– Preferred Date: ${preferredDate}
– Preferred Time: ${preferredTime}
– Phone: ${phone || "N/A"}
– Comments: ${comments || "N/A"}

Our team will be in touch shortly to confirm your tour.

Best regards,  
Vineland Post Acute`;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject,
      text: message
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Email send error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


