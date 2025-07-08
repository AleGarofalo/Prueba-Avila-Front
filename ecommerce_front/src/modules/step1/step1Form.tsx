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
  { value: "Economy", label: "Económica" },
  { value: "Business", label: "Ejecutiva" },
  { value: "First Class", label: "Primera Clase" },
];

type Step1FormProps = {
  onSubmit: (data: Step1FormValues) => void;
};

type FlightData = {
  destination: string;
  class: string;
  priceUSD: number;
};

export default function Step1Form({ onSubmit }: Step1FormProps) {
  const [step] = useState(0);
  const [allDestinations, setAllDestinations] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const destinationsSet = new Set<string>();
        data.forEach((item: FlightData) => {
          destinationsSet.add(item.destination);
        });
        setAllDestinations(Array.from(destinationsSet));
      });
  }, []);

  const methods = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      destination: "",
      departureDate: null,
      returnDate: null,
      flightClass: "",
    },
  });

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const rawDeparture = watch("departureDate");
  const departureDate: Date | null =
    rawDeparture instanceof Date ? rawDeparture : null;

  const rawReturn = watch("returnDate");
  const returnDate: Date | null = rawReturn instanceof Date ? rawReturn : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setValue("destination", value);
    if (value.length > 0) {
      const filtered = allDestinations.filter((d) =>
        d.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setValue("destination", suggestion);
    setShowSuggestions(false);
  };

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6); // 6 meses desde hoy

  const handleSubmitForm = (data: Step1FormValues) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
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

      <div className="relative">
        <InputField
          label="Destino"
          name="destination"
          value={inputValue}
          onChange={handleInputChange}
          error={errors.destination?.message}
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded shadow z-10">
            {filteredSuggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => handleSuggestionClick(s)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      <DateField
        label="Fecha de salida"
        name="departureDate"
        selected={departureDate ?? null}
        onChange={(date) => setValue("departureDate", date ?? undefined)}
        minDate={new Date()}
        maxDate={maxDate}
        error={errors.departureDate?.message}
      />

      <DateField
        label="Fecha de regreso"
        name="returnDate"
        selected={returnDate ?? null}
        onChange={(date) => setValue("returnDate", date ?? undefined)}
        minDate={departureDate ?? new Date()}
        maxDate={maxDate}
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
