"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, Step3FormValues } from "@/schemas/step3.schema";
import { SwitchField } from "@/components/form-switchfield";
import SubmitButton from "@/components/button";
import { StepIndicator } from "@/components/stepIndicator";

type Step3FormProps = {
  onSubmit: (data: Step3FormValues) => void;
};

export default function Step3Form({ onSubmit }: Step3FormProps) {
  const methods = useForm<Step3FormValues>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      wantsInsurance: false,
      wantsPreferredSeats: false,
      needsAssistance: false,
      assistanceNote: "",
    },
  });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const needsAssistance = watch("needsAssistance");

  const handleSubmitForm = (data: Step3FormValues) => {
    onSubmit(data); // ← lo pasas al padre
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="w-full mx-auto p-8 bg-white shadow rounded-lg space-y-6"
      >
        <StepIndicator
          currentStep={2}
          steps={[
            { label: "Información del viaje" },
            { label: "Viajeros" },
            { label: "Servicios" },
            { label: "Resumen" },
          ]}
        />
        <SwitchField
          name="wantsInsurance"
          label="¿Deseas agregar seguro de viaje?"
        />
        <SwitchField
          name="wantsPreferredSeats"
          label="¿Deseas seleccionar asientos preferenciales?"
        />
        <SwitchField
          name="needsAssistance"
          label="¿Requiere asistencia especial?"
        />

        {needsAssistance && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nota de asistencia (máx. 200 caracteres)
            </label>
            <textarea
              {...register("assistanceNote")}
              maxLength={200}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.assistanceNote && (
              <p className="text-sm text-red-500 mt-1">
                {errors.assistanceNote.message}
              </p>
            )}
          </div>
        )}

        <SubmitButton isSubmitting={isSubmitting}>Siguiente paso</SubmitButton>
      </form>
    </FormProvider>
  );
}
