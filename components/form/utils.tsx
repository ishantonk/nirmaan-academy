import { cn } from "@/lib/utils";

// todo: make error messages remove when user click input

interface FromProps extends React.ComponentProps<"form"> {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  children: React.ReactNode;
}

export default function Form({
  title,
  subtitle,
  className,
  titleClassName = "text-2xl",
  subtitleClassName = "text-sm",
  children = "bg-base-200 w-xs border p-4 border-base-300",
  ...props
}: FromProps) {
  return (
    <form {...props}>
      <fieldset
        className={cn("fieldset border-base-300 w-xs border p-4", className)}
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
