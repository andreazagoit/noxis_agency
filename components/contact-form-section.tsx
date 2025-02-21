"use client";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import TextInput from "./ui/text-input";
import TextAreaInput from "./ui/textarea-input";
import { sendEmail } from "@/utils/email";
import { z } from "zod";
import { contactFormSchema } from "@/utils/validation";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      contactFormSchema.parse(formData);
      const result = await sendEmail({
        ...formData,
        gdprConsent: new Date().toISOString(),
      });

      if (result.success) {
        setSuccess(true);
        setErrorMessage(null);
      } else {
        setSuccess(false);
        setErrorMessage(
          "Si è verificato un errore nell'invio del messaggio. Riprova più tardi."
        );
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors.map((e) => e.message).join(", ")); // Uniamo i messaggi di errore
        setSuccess(false);
      } else {
        setErrorMessage("Si è verificato un errore sconosciuto.");
        setSuccess(false);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 py-16 flex-1">
      <div className="flex-1">
        <h2 className="text-black text-5xl font-bold mb-2 uppercase">
          Richiedi un preventivo
        </h2>
        <p className="text-gray-600 mb-4">
          Siamo pronti a trasformare la tua visione in un prodotto digitale.
          <br />
          Hai domande o desideri maggiori informazioni? Scrivici un messaggio e
          ti risponderemo il prima possibile.
        </p>
      </div>
      <div className="flex-1">
        {success !== null && (
          <div
            className={cn(success ? "text-green-500" : "text-red-500", "mb-2")}
          >
            {success
              ? "Messaggio inviato con successo, ti ricontatteremo il prima possibile!"
              : errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <TextInput
            label="Nome"
            name="name"
            placeholder="Mario Rossi"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Email"
            name="email"
            placeholder="text@domain.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextAreaInput
            label="Messaggio"
            name="message"
            placeholder="Il mio progetto..."
            value={formData.message}
            onChange={handleChange}
            required
            maxLength={500}
          />
          <div className="flex items-start gap-4">
            <Checkbox name="gdprConsent" required className="bg-neutral-300" />
            <label htmlFor="gdpr-consent" className="text-gray-600 text-sm">
              Acconsento al trattamento dei miei dati personali secondo la{" "}
              <a
                href="https://www.iubenda.com/privacy-policy/75442792"
                className="text-neutral-400 underline"
                target="_blank"
              >
                informativa sulla privacy
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-4 w-fit ${
              isSubmitting ? "bg-gray-600" : "bg-black"
            }`}
          >
            {isSubmitting ? (
              "Invio in corso..."
            ) : (
              <span className="flex items-center gap-4 text-sm">
                Invia messaggio
                <IoIosSend />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormSection;
