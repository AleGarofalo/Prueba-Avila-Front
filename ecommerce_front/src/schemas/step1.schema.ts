import { z } from "zod";

export const step1Schema = z
  .object({
    destination: z.string().min(2, "El destino es obligatorio"),
    departureDate: z.date({
      required_error: "La fecha de salida es obligatoria",
      invalid_type_error: "La fecha de salida no es válida",
    }),
    returnDate: z.date({
      required_error: "La fecha de regreso es obligatoria",
      invalid_type_error: "La fecha de regreso no es válida",
    }),
    flightClass: z.string().min(1, "Selecciona una clase"),
  })
  .superRefine((data, ctx) => {
    if (data.returnDate < data.departureDate) {
      ctx.addIssue({
        path: ["returnDate"],
        code: z.ZodIssueCode.custom,
        message: "La fecha de regreso debe ser posterior a la de salida",
      });
    }
  });

export type Step1FormValues = z.infer<typeof step1Schema>;
