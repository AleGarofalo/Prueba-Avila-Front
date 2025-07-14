"use client";

import { InputField } from "@/components/form-inputfield";
import { DateField } from "@/components/form-datefield";
import { SelectField } from "@/components/form-selectfield";
import { useFormContext, type FieldErrors } from "react-hook-form";
import type { Step2FormValues } from "@/schemas/step2.schema";

type PassengerFieldsProps = {
  index: number;
};

const docTypes = [
  { value: "V", label: "V" },
  { value: "J", label: "J" },
  { value: "E", label: "E" },
];

export function PassengerFields({ index }: PassengerFieldsProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Step2FormValues>();

  const prefix = `travelers.${index}` as const;
  const docPath = `${prefix}.document` as const;

  const birthDate = watch(`${prefix}.birthDate`);
  const docType = watch(`${docPath}.type`);
  const docNumber = watch(`${docPath}.number`);
  const fullName = watch(`${prefix}.fullName`);

  // 🔧 Tipado de errores corregido
  const typedErrors = errors as FieldErrors<Step2FormValues>;
  const travelerErrors = typedErrors?.travelers?.[index];

  return (
    <div className="p-4 border rounded-md bg-white space-y-4">
      <h3 className="font-semibold text-gray-700">Viajero #{index + 1}</h3>

      <InputField
        name={`${prefix}.fullName`}
        label="Nombre completo"
        value={fullName || ""}
        onChange={(e) => setValue(`${prefix}.fullName`, e.target.value)}
        error={travelerErrors?.fullName?.message}
      />

      <DateField
        name={`${prefix}.birthDate`}
        label="Fecha de nacimiento"
        selected={birthDate || null}
        onChange={(date) => {
          setValue(`${prefix}.birthDate`, date ?? undefined);
        }}
        error={travelerErrors?.birthDate?.message}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Documento de identidad
        </label>

        <div className="flex gap-2">
          <SelectField
            label="Tipo de documento"
            name={`${docPath}.type`}
            value={docType as "V" | "J" | "E"}
            onChange={(e) =>
              setValue(`${docPath}.type`, e.target.value as "V" | "J" | "E")
            }
            options={docTypes}
            error={
              (travelerErrors?.document?.type as { message?: string })?.message
            }
          />
          <InputField
            label="Número de documento"
            name={`${docPath}.number`}
            value={docNumber || ""}
            onChange={(e) => setValue(`${docPath}.number`, e.target.value)}
            placeholder="Número"
            error={travelerErrors?.document?.number?.message}
          />
        </div>
      </div>
    </div>
  );
}
