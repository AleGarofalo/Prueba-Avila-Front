import { z } from "zod";

export const step3Schema = z.object({
  wantsInsurance: z.boolean(),
  wantsPreferredSeats: z.boolean(),
  needsAssistance: z.boolean(),
  assistanceNote: z
    .string()
    .max(200, "Máximo 200 caracteres")
    .optional()
    .or(z.literal("")), // en caso de que esté vacío pero presente
});

export type Step3FormValues = z.infer<typeof step3Schema>;
