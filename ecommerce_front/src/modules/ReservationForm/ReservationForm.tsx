"use client";

import { useState } from "react";
import Step1Form from "@/modules/step1/step1Form";
import Step2Form from "@/modules/step2/step2Form";
import Step3Form from "@/modules/step3/step3Form";
import Step4Form from "@/modules/step4/step4Form";

import { AllFormData } from "@/types/form.types";

export default function ReservationForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState<Partial<AllFormData>>({});

  const updateFormData = (data: Partial<AllFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setFormData({} as AllFormData);
    setCurrentStep(0);
  };

  return (
    <div className="w-full mx-auto p-8 bg-white shadow rounded-lg space-y-6">
      {currentStep === 0 && (
        <Step1Form onSubmit={(data) => updateFormData(data)} />
      )}

      {currentStep === 1 && (
        <Step2Form onSubmit={(data) => updateFormData(data)} />
      )}

      {currentStep === 2 && (
        <Step3Form onSubmit={(data) => updateFormData(data)} />
      )}

      {currentStep === 3 && (
        <Step4Form
          data={formData as AllFormData}
          onBack={() => setCurrentStep(2)}
          onConfirm={handleReset} // ✅ esta función reinicia el flujo
        />
      )}
    </div>
  );
}
