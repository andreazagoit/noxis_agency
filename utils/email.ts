"use server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { contactFormSchema } from "./validation";

export const sendEmail = async ({
  name,
  email,
  message,
  gdprConsent,
}: {
  name: string;
  email: string;
  message: string;
  gdprConsent: string; // Expecting the date as a string
}) => {
  // Validazione con Zod
  try {
    contactFormSchema.parse({ name, email, message }); // Verifica che i dati siano validi
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Se la validazione fallisce, restituiamo un errore
      return {
        success: false,
        error: error.errors.map((e) => e.message).join(", "),
      };
    }
    return {
      success: false,
      error: "Errore sconosciuto durante la validazione dei dati.",
    };
  }

  // Creazione del trasportatore SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Contenuto dell'email con l'inclusione di gdprConsent come data
  const mailOptions = {
    from: process.env.SMTP_USER, // Il tuo indirizzo email
    to: process.env.CONTACT_EMAIL, // L'indirizzo email di destinazione
    subject: `Nuovo messaggio da ${name}`,
    text: `Hai ricevuto un nuovo messaggio da ${name} (${email}):\n\n${message}\n\nGDPR Consent: ${`Acconsentito il ${new Date(
      gdprConsent
    ).toLocaleString()}`}`,
  };

  // Invia l'email
  try {
    await transporter.sendMail(mailOptions);
    return { success: true }; // Email inviata con successo
  } catch (error) {
    console.error("Errore nell'invio dell'email:", error);
    return {
      success: false,
      error: "Errore nell'invio dell'email. Riprova più tardi.",
    };
  }
};
