import { z } from "zod";

export const step2Schema = z.object({
  travelersCount: z
    .number()
    .min(1, "Debe haber al menos 1 viajero")
    .max(10, "Máximo 10 viajeros"),

  travelers: z
    .array(
      z.object({
        fullName: z.string().min(1, "Nombre requerido"),
        birthDate: z.date().optional(),
        document: z.object({
          type: z.enum(["V", "J", "E"], { required_error: "Tipo requerido" }),
          number: z.string().min(5, "Número requerido"),
        }),
      })
    )
    .superRefine((travelers, ctx) => {
      travelers.forEach((traveler, index) => {
        if (!traveler.birthDate) {
          ctx.addIssue({
            path: [index, "birthDate"],
            code: z.ZodIssueCode.custom,
            message: "Fecha requerida",
          });
        }
      });
    }),

  hasPets: z.boolean(),
  petsCount: z.number().min(0).optional(),

  hasExtraBags: z.boolean(),
  extraBagsCount: z.number().min(0).optional(),
});

export type Step2FormValues = z.infer<typeof step2Schema>;
// ✅ Export individual del tipo de cada viajero
export type Traveler = Step2FormValues["travelers"][number];
