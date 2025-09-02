"use client";

import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  error?: FieldError;
  clearError?: () => void;
  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
}

export function Select({
  label,
  name,
  options,
  error,
  clearError,
  containerClassName = "mb-4",
  labelClassName = "label font-medium",
  selectClassName = "select w-full",
  ...props
}: SelectProps) {
  return (
    <div className={cn(containerClassName)}>
      <label htmlFor={name} className={cn(labelClassName)}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        {...props}
        onFocus={clearError}
        className={cn(selectClassName, error ? "select-error" : "")}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
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
