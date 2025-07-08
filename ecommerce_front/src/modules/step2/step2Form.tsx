"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step2FormValues, step2Schema } from "@/schemas/step2.schema";
import { z } from "zod";

import { StepIndicator } from "@/components/stepIndicator";
import { InputField } from "@/components/form-inputfield";
import { InputNumberField } from "@/components/form-inputStepper";
import { PassengerFields } from "@/components/PassengerFields";
import SubmitButton from "@/components/button";

type Step2FormProps = {
  onSubmit: (data: Step2FormValues) => void;
};

export default function Step2Form({ onSubmit }: Step2FormProps) {
  const methods = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      travelersCount: 1,
      travelers: [
        {
          fullName: "",
          birthDate: undefined,
          document: { type: "V", number: "" },
        },
      ],
      hasPets: false,
      petsCount: 0,
      hasExtraBags: false,
      extraBagsCount: 0,
    },
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "travelers",
  });

  const travelersCount = watch("travelersCount");
  const hasPets = watch("hasPets");
  const hasExtraBags = watch("hasExtraBags");

  // Ajusta el array de viajeros al número indicado
  useEffect(() => {
    const currentLength = fields.length;
    if (travelersCount > currentLength) {
      for (let i = currentLength; i < travelersCount; i++) {
        append({
          fullName: "",
          birthDate: undefined,
          document: { type: "V", number: "" },
        });
      }
    } else if (travelersCount < currentLength) {
      for (let i = currentLength; i > travelersCount; i--) {
        remove(i - 1);
      }
    }
  }, [travelersCount]);

  const handleSubmitForm = (data: Step2FormValues) => {
    onSubmit(data); // ← lo pasas al padre
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="w-full mx-auto p-8 bg-white shadow rounded-lg space-y-6"
      >
        <StepIndicator
          currentStep={1}
          steps={[
            { label: "Información del viaje" },
            { label: "Viajeros" },
            { label: "Servicios" },
            { label: "Resumen" },
          ]}
        />

        <InputNumberField
          name="travelersCount"
          label="Número de viajeros"
          min={1}
          max={10}
        />

        {fields.map((_, index) => (
          <PassengerFields key={index} index={index} />
        ))}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            ¿Viajas con mascotas?
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setValue("hasPets", true)}
              className={`px-3 py-1 border rounded-md ${
                hasPets ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => setValue("hasPets", false)}
              className={`px-3 py-1 border rounded-md ${
                !hasPets ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              No
            </button>
          </div>
          {hasPets && (
            <InputNumberField
              name="petsCount"
              label="Cantidad de mascotas"
              min={0}
              max={10}
            />
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            ¿Necesitas maletas extra?
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setValue("hasExtraBags", true)}
              className={`px-3 py-1 border rounded-md ${
                hasExtraBags ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => setValue("hasExtraBags", false)}
              className={`px-3 py-1 border rounded-md ${
                !hasExtraBags ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              No
            </button>
          </div>
          {hasExtraBags && (
            <InputNumberField
              name="extraBagsCount"
              label="Cantidad de maletas extra"
              min={0}
              max={10}
            />
          )}
        </div>

        <div className="pt-4">
          <SubmitButton isSubmitting={isSubmitting}>
            Siguiente paso
          </SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
}
