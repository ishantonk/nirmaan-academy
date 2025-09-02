"use client";

import { FieldError } from "react-hook-form";
import { Input, Select, Checkbox, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";

export type FieldType = "input" | "select" | "checkbox" | "textarea";

interface FormFieldProps {
  type: FieldType;
  name: string;
  label: string;
  register: ReturnType<any>;
  error?: FieldError;
  clearError: () => void;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

interface FormProps extends React.ComponentProps<"form"> {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  onSubmit?: () => {};
}

export function Form({
  title,
  subtitle,
  className = "bg-base-200 border p-4 border-base-300",
  titleClassName = "text-2xl",
  subtitleClassName = "text-sm",
  children,
  isLoading = false,
  onSubmit,
  ...props
}: FormProps) {
  return (
    <form onSubmit={onSubmit} {...props} aria-busy={isLoading}>
      <fieldset
        className={cn("fieldset", className)}
        disabled={isLoading}
        aria-disabled={isLoading}
      >
        <legend className={cn("fieldset-legend", titleClassName)}>
          {title}
        </legend>

        <p className={cn("text-base-content/70 mb-4", subtitleClassName)}>
          {subtitle}
        </p>

        {children}
      </fieldset>
    </form>
  );
}

export function FormField({
  type,
  name,
  label,
  register,
  error,
  clearError,
  placeholder,
  options,
}: FormFieldProps) {
  if (type === "input") {
    return (
      <Input
        label={label}
        name={name}
        placeholder={placeholder}
        {...register}
        error={error}
        clearError={clearError}
      />
    );
  }

  if (type === "textarea") {
    return (
      <Textarea
        label={label}
        name={name}
        placeholder={placeholder}
        {...register}
        error={error}
        clearError={clearError}
      />
    );
  }

  if (type === "select") {
    return (
      <Select
        label={label}
        name={name}
        options={options || []}
        {...register}
        error={error}
        clearError={clearError}
      />
    );
  }

  if (type === "checkbox") {
    return (
      <Checkbox
        label={label}
        name={name}
        {...register}
        error={error}
        clearError={clearError}
      />
    );
  }

  return null;
}
