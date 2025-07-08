"use client";

import { InputField } from "@/components/form-inputfield";
import { DateField } from "@/components/form-datefield";
import { SelectField } from "@/components/form-selectfield";
import { useFormContext } from "react-hook-form";

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
  } = useFormContext();

  const prefix = `travelers.${index}`;
  const docPath = `${prefix}.document`;

  const birthDate = watch(`${prefix}.birthDate`);
  const docType = watch(`${docPath}.type`);
  const docNumber = watch(`${docPath}.number`);

  const travelerErrors = (errors?.travelers as any)?.[index] ?? {};

  return (
    <div className="p-4 border rounded-md bg-white space-y-4">
      <h3 className="font-semibold text-gray-700">Viajero #{index + 1}</h3>

      <InputField
        name={`${prefix}.fullName`}
        label="Nombre completo"
        value={watch(`${prefix}.fullName`) || ""}
        onChange={(e) => setValue(`${prefix}.fullName`, e.target.value)}
        error={travelerErrors?.fullName?.message}
      />

      <DateField
        name={`${prefix}.birthDate`}
        label="Fecha de nacimiento"
        selected={birthDate}
        onChange={(date) => {
          if (date) setValue(`${prefix}.birthDate`, date);
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
            value={docType}
            onChange={(e) => setValue(`${docPath}.type`, e.target.value)}
            options={docTypes}
            error={travelerErrors?.document?.type?.message}
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
