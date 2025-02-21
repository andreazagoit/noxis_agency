// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validazione dei dati
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tutti i campi sono obbligatori." },
        { status: 400 }
      );
    }

    // Configurazione del trasportatore di Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Configurazione dell'email
    const mailOptions = {
      from: process.env.SMTP_USER, // Il tuo indirizzo email
      to: process.env.CONTACT_EMAIL, // L'indirizzo email di destinazione
      subject: `Nuovo messaggio da ${name}`,
      text: `Hai ricevuto un nuovo messaggio da ${name} (${email}):\n\n${message}`,
    };

    // Invio dell'email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email inviata con successo!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore durante l'invio dell'email:", error);
    return NextResponse.json(
      { error: "Si è verificato un errore durante l'invio dell'email." },
      { status: 500 }
    );
  }
}
