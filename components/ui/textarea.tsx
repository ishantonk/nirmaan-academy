"use client";

import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  error?: FieldError;
  clearError?: () => void;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  row?: number;
}

export function Textarea({
  label,
  name,
  error,
  clearError,
  containerClassName = "mb-4", // todo: find form-control
  labelClassName = "label font-medium",
  inputClassName = "textarea w-full",
  row = 4,
  ...props
}: TextareaProps) {
  return (
    <div className={cn(containerClassName)}>
      <label htmlFor={name} className={cn(labelClassName)}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        {...props}
        onFocus={clearError}
        className={cn(inputClassName, error ? "textarea-error" : "")}
        rows={row}
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
