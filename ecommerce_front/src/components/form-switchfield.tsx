"use client";

import { useFormContext, Controller } from "react-hook-form";

interface SwitchFieldProps {
  name: string;
  label: string;
}

export function SwitchField({ name, label }: SwitchFieldProps) {
  const { control } = useFormContext();

  return (
    <div className="flex items-center justify-between border-b py-4">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            id={name}
            type="checkbox"
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
          />
        )}
      />
    </div>
  );
}
