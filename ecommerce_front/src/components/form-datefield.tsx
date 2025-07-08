// src/components/form-datefield.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateFieldProps = {
  label: string;
  name: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  minDate?: Date;
  maxDate?: Date;
};

export function DateField({
  label,
  name,
  selected,
  onChange,
  error,
  minDate,
  maxDate,
}: DateFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <DatePicker
        id={name}
        selected={selected}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        minDate={minDate}
        maxDate={maxDate}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
