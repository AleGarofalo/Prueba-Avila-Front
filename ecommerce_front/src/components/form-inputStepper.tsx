import { useController, FieldValues, Path } from "react-hook-form";

type InputNumberFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  min?: number;
  max?: number;
};

export function InputNumberField<T extends FieldValues>({
  name,
  label,
  min = 1,
  max = 10,
}: InputNumberFieldProps<T>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name });

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDecrement}
          className="px-3 py-1 border rounded-md text-lg bg-gray-100"
        >
          -
        </button>

        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-16 text-center border rounded-md py-1"
        />

        <button
          type="button"
          onClick={handleIncrement}
          className="px-3 py-1 border rounded-md text-lg bg-gray-100"
        >
          +
        </button>
      </div>

      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
}
