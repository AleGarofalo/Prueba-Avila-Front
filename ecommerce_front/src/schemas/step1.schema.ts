import { z } from "zod";

export const step1Schema = z
  .object({
    destination: z.string().min(2, "El destino es obligatorio"),
    departureDate: z.preprocess(
      (val) =>
        typeof val === "string" || val instanceof Date
          ? new Date(val)
          : undefined,
      z.date({
        required_error: "La fecha de salida es obligatoria",
        invalid_type_error: "La fecha de salida no es válida",
      })
    ),
    returnDate: z.preprocess(
      (val) =>
        typeof val === "string" || val instanceof Date
          ? new Date(val)
          : undefined,
      z.date({
        required_error: "La fecha de regreso es obligatoria",
        invalid_type_error: "La fecha de regreso no es válida",
      })
    ),
    flightClass: z.string().min(1, "Selecciona una clase"),
  })
  .refine((data) => data.returnDate >= data.departureDate, {
    path: ["returnDate"],
    message: "La fecha de regreso debe ser posterior a la de salida",
  });

export type Step1FormValues = z.infer<typeof step1Schema>;
