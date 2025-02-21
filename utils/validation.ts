import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(3, "Il nome deve contenere almeno 3 caratteri"),
  email: z.string().email("Per favore, inserisci un'email valida"),
  message: z
    .string()
    .min(10, "Il messaggio deve contenere almeno 10 caratteri")
    .max(500, "Il messaggio non può contenere più di 500 caratteri"),
});
