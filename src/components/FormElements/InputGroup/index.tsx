"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

type InputGroupProps = {
  className?: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "password" | "FullName" | "file";
  required?: boolean;
  disabled?: boolean;
  active?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  height?: "sm" | "default";
  defaultValue?: string;
  errorMessage?: string;
  showPasswordToggle?: boolean;
  autocomplete?: string;
  fileStyleVariant?: string
};

const InputGroup: React.FC<InputGroupProps> = ({
  className,
  label,
  type,
  placeholder,
  required,
  disabled,
  active,
  handleChange,
  icon,
  iconPosition = "right",
  errorMessage,
  showPasswordToggle = false,
  ...props
}) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
        {required && <span className="ml-1 select-none text-red">*</span>}
      </label>

      <div className="relative mt-3">
        {icon && (
          <span
            className={cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400",
              iconPosition === "left" ? "left-4" : "right-4"
            )}
          >
            {icon}
          </span>
        )}

        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          name={props.name}
          placeholder={placeholder}
          onChange={handleChange}
          value={props.value}
          defaultValue={props.defaultValue}
          className={cn(
            "w-full rounded-lg border border-gray-300 bg-transparent outline-none transition focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark",
            icon && iconPosition === "left" && "pl-12",
            icon && iconPosition === "right" && "pr-12",
            isPassword && showPasswordToggle && "pr-12",
            props.height === "sm" && "py-2.5",
            !props.height && "py-3 px-4"
          )}
          required={required}
          disabled={disabled}
          data-active={active}
        />

        {showPasswordToggle && isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mr-1 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 bg-white dark:bg-dark-2"
          >
            {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        )}
      </div>

      {errorMessage && (
        <p className="pl-1 text-sm text-red">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputGroup;
