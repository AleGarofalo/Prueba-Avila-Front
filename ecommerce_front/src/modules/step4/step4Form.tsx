"use client";

import { AllFormData } from "@/types/form.types";
import SubmitButton from "@/components/button";
import { StepIndicator } from "@/components/stepIndicator";
import Swal from "sweetalert2";
import type { Traveler } from "@/schemas/step2.schema";

type Step4SummaryProps = {
  data: AllFormData;
  onBack: () => void;
  onConfirm: () => void;
};

const handleConfirm = async (onConfirm: () => void) => {
  const result = await Swal.fire({
    title: "¡Reserva confirmada!",
    text: "Tu vuelo ha sido reservado exitosamente.",
    icon: "success",
    confirmButtonText: "Aceptar",
  });

  if (result.isConfirmed) {
    onConfirm(); // ✅ Solo se ejecuta al confirmar la alerta
  }
};

export default function Step4Summary({
  data,
  onBack,
  onConfirm,
}: Step4SummaryProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-4">
      <StepIndicator
        currentStep={3}
        steps={[
          { label: "Información del viaje" },
          { label: "Viajeros" },
          { label: "Servicios" },
          { label: "Resumen" },
        ]}
      />
      <h2 className="text-xl font-semibold">Resumen de la reserva</h2>

      <p>
        <strong>Destino:</strong> {data.destination}
      </p>
      <p>
        <strong>Fechas:</strong> {data.departureDate.toLocaleDateString()} -{" "}
        {data.returnDate.toLocaleDateString()}
      </p>
      <p>
        <strong>Clase de vuelo:</strong> {data.flightClass}
      </p>

      <p>
        <strong>Viajeros:</strong> {data.travelersCount}
      </p>
      <ul className="list-disc ml-6">
        {data.travelers.map((t: Traveler, i: number) => (
          <li key={i}>
            {t.fullName}
            {t.birthDate
              ? ` - ${t.birthDate.toLocaleDateString()}`
              : " - (Sin fecha de nacimiento)"}
          </li>
        ))}
      </ul>

      {data.hasPets && (
        <p>
          <strong>Mascotas:</strong> {data.petsCount}
        </p>
      )}

      {data.hasExtraBags && (
        <p>
          <strong>Maletas extra:</strong> {data.extraBagsCount}
        </p>
      )}

      <p>
        <strong>Seguro:</strong> {data.wantsInsurance ? "Sí" : "No"}
      </p>
      <p>
        <strong>Asientos preferenciales:</strong>{" "}
        {data.wantsPreferredSeats ? "Sí" : "No"}
      </p>
      <p>
        <strong>Asistencia especial:</strong>{" "}
        {data.needsAssistance ? "Sí" : "No"}
      </p>

      {data.needsAssistance && (
        <p>
          <strong>Nota:</strong> {data.assistanceNote}
        </p>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <SubmitButton isSubmitting={false} onClick={onBack}>
          Atrás
        </SubmitButton>

        <SubmitButton
          isSubmitting={false}
          onClick={() => handleConfirm(onConfirm)}
        >
          Confirmar Reserva
        </SubmitButton>
      </div>
    </div>
  );
}
