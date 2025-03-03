import clsx from "clsx";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type InputType = {
  id: string;
  type: string;
  label?: string;
  placeholder?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  iconClassName?: string;
  autocomplete?: string;
  defaultValue?: string;
};

function Input({
  id,
  type = "text",
  label,
  placeholder = "",
  icon,
  value,
  onChange,
  className,
  iconClassName,
  autocomplete = "on",
  defaultValue,
}: InputType) {
  const baseStyles =
    "border-muted block w-full min-w-full rounded-lg border p-2.5 text-foreground text-sm focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1 focus-visible:outline-0 font-secondary";

  const baseIconStyles =
    "text-muted-foreground group-focus-within:text-primary pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5";

  const inputStyles = twMerge(clsx(baseStyles, icon && "ps-10", className));
  const iconStyles = twMerge(clsx(baseIconStyles, iconClassName));

  return (
    <div className="w-full">
      <label
        htmlFor={id as string}
        className="text-foreground font-secondary mb-2 block text-sm font-medium"
      >
        {label}
      </label>
      <div className="group relative">
        {icon && <div className={clsx(iconStyles)}>{icon}</div>}
        <input
          type={type}
          id={id}
          name={id}
          className={inputStyles}
          placeholder={placeholder}
          autoComplete={autocomplete}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}

export default Input;
