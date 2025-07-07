import React from "react";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting: boolean;
  children: React.ReactNode;
}

export default function SubmitButton({
  isSubmitting,
  disabled,
  children,
  className = "",
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || disabled}
      className={`flex items-center justify-center px-4 py-2 rounded-md font-medium transition
        bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 ${className}`}
      {...props}
    >
      {isSubmitting && (
        <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5 mr-2" />
      )}
      {children}
    </button>
  );
}
