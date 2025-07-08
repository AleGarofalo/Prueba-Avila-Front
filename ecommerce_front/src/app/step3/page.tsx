import Step3Form from "@/modules/step3/step3Form";
import type { Step3FormValues } from "@/schemas/step3.schema";

export default function Step3Page() {
  const handleStep3Submit = (data: Step3FormValues) => {
    console.log("Datos del paso 3 enviados ✅:", data);
    // Aquí podrías redirigir o simular ir al paso 4, si quisieras.
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <Step3Form onSubmit={handleStep3Submit} />
    </main>
  );
}
