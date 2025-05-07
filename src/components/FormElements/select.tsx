"use client";

import { ChevronUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useId, useState } from "react";

interface PropsType {
  label: string;
  items: { value: string; label: string }[];
  prefixIcon?: React.ReactNode;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string; // Added for controlled component support
  required?: boolean;
  disabled?: boolean;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Updated event type
}

export function Select({
  items,
  label,
  defaultValue,
  placeholder,
  prefixIcon,
  className,
  value,
  required,
  disabled,
  name,
  onChange,
}: PropsType) {
  const id = useId();
  const [isOptionSelected, setIsOptionSelected] = useState(!!defaultValue || !!value);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsOptionSelected(e.target.value !== "");
    onChange?.(e);
  };

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {prefixIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {prefixIcon}
          </div>
        )}

        <select
          id={id}
          value={value}
          defaultValue={defaultValue}
          name={name}
          onChange={handleSelectChange}
          disabled={disabled}
          required={required}
          className={cn(
            "w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-primary dark:disabled:bg-gray-700",
            prefixIcon && "pl-10",
            isOptionSelected ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400",
          )}
          aria-describedby={label ? `${id}-description` : undefined}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <ChevronUpIcon
          className={cn(
            "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-180 text-gray-400",
            disabled && "text-gray-300 dark:text-gray-600",
          )}
        />
      </div>
    </div>
  );
}