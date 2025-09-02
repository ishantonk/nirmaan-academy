"use client";

import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: FieldError;
  clearError?: () => void;
  containerClassName?: string;
  labelClassName?: string;
  checkboxClassName?: string;
}

export function Checkbox({
  label,
  name,
  error,
  clearError,
  containerClassName = "mb-4",
  labelClassName = "cursor-pointer label justify-start gap-2",
  checkboxClassName = "checkbox",
  ...props
}: CheckboxProps) {
  return (
    <div className={cn(containerClassName)}>
      <label className={cn(labelClassName)}>
        <input
          type="checkbox"
          name={name}
          {...props}
          onFocus={clearError}
          className={cn(checkboxClassName, error ? "border-error" : "")}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        <span className="label-text">{label}</span>
      </label>
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
