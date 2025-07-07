type Step = {
  label: string;
  sublabel?: string;
};

type StepIndicatorProps = {
  steps: Step[];
  currentStep: number; // 0-based index
};

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
            >
              {index + 1}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                {step.label}
              </span>
              {step.sublabel && (
                <span className="text-xs text-gray-500">{step.sublabel}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
