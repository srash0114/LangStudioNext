import { cn } from "@/lib/utils";
import { useId } from "react";

interface PropsType {
  label: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  icon?: React.ReactNode;
  defaultValue?: string;
  value?: string;
  name?: string; // Thêm name
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextAreaGroup({
  label,
  placeholder,
  required,
  disabled,
  active,
  className,
  icon,
  defaultValue,
  value,
  name, // Thêm name
  onChange,
}: PropsType) {
  const id = useId();

  return (
    <div className={cn("flex flex-col", className)}>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-gray-400">{icon}</div>
        )}
        <textarea
          id={id}
          rows={6}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          name={name} // Thêm name vào textarea
          className={cn(
            "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-primary dark:disabled:bg-gray-700",
            icon && "pl-10",
            active && "border-primary ring-2 ring-primary/20",
          )}
          required={required}
          disabled={disabled}
          aria-describedby={label ? `${id}-description` : undefined}
        />
      </div>
    </div>
  );
}