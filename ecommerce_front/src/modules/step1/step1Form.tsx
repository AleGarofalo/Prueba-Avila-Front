"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step1FormValues, step1Schema } from "@/schemas/step1.schema";

import { StepIndicator } from "@/components/stepIndicator";
import { InputField } from "@/components/form-inputfield";
import { DateField } from "@/components/form-datefield";
import { SelectField } from "@/components/form-selectfield";
import SubmitButton from "@/components/button";

import { useState, useEffect } from "react";

const flightClasses = [
  { value: "economy", label: "Económica" },
  { value: "business", label: "Ejecutiva" },
  { value: "first", label: "Primera Clase" },
];

export default function Step1Form() {
  const [step, setStep] = useState(0);
  const [allDestinations, setAllDestinations] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const destinationsSet = new Set<string>();

        data.forEach((item: any) => {
          const label = `${item.destination}`;
          destinationsSet.add(label);
        });

        const uniqueDestinations = Array.from(destinationsSet);
        setAllDestinations(uniqueDestinations);
      });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      destination: "",
      departureDate: undefined,
      returnDate: undefined,
      flightClass: "",
    },
  });

  const departureDate = watch("departureDate");
  const returnDate = watch("returnDate");

  const onSubmit = (data: Step1FormValues) => {
    console.log("Paso 1 válido ✅:", data);
    // Aquí puedes hacer: setStep(1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto p-8 bg-white shadow rounded-lg space-y-6"
    >
      <StepIndicator
        currentStep={step}
        steps={[
          { label: "Información del viaje" },
          { label: "Viajeros" },
          { label: "Servicios" },
          { label: "Resumen" },
        ]}
      />

      <InputField
        label="Destino"
        name="destination"
        value={watch("destination")}
        onChange={(e) => setValue("destination", e.target.value)}
        error={errors.destination?.message}
      />

      <DateField
        label="Fecha de salida"
        name="departureDate"
        selected={departureDate}
        onChange={(date: Date | null) => {
          if (date) {
            setValue("departureDate", date);
          }
        }}
        error={errors.departureDate?.message}
      />

      <DateField
        label="Fecha de regreso"
        name="returnDate"
        selected={returnDate}
        onChange={(date: Date | null) => {
          if (date) {
            setValue("returnDate", date);
          }
        }}
        error={errors.returnDate?.message}
      />

      <SelectField
        label="Clase de vuelo"
        name="flightClass"
        value={watch("flightClass")}
        onChange={(e) => setValue("flightClass", e.target.value)}
        options={flightClasses}
        error={errors.flightClass?.message}
      />

      <div className="pt-4">
        <SubmitButton isSubmitting={isSubmitting}>Siguiente paso</SubmitButton>
      </div>
    </form>
  );
}
