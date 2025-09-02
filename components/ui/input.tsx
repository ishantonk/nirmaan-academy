"use client";

import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: FieldError;
  clearError?: () => void;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export function Input({
  label,
  name,
  error,
  clearError,
  containerClassName = "mb-4",
  labelClassName = "label font-medium",
  inputClassName = "input w-full",
  ...props
}: InputProps) {
  return (
    <div className={cn(containerClassName)}>
      <label htmlFor={name} className={cn(labelClassName)}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...props}
        onFocus={clearError}
        className={cn(inputClassName, error ? "input-error" : "")}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <span
          id={`${name}-error`}
          role="alert"
          aria-live="polite"
          className="text-error text-xs mt-1"
        >
          {error.message}
        </span>
      )}
    </div>
  );
}
