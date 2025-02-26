import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "icon" | "destructive";
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className,
  type = "button",
  title,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-secondary transition duration-500 hover:translate-y-[-3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer flex items-center gap-4";

  const variantStyles = clsx({
    "bg-primary text-primary-foreground border border-primary focus-visible:ring-primary":
      variant === "default",

    "border border-foreground text-foreground bg-transparent hover:text-primary hover:border-primary":
      variant === "outline",

    "p-1 border border-border rounded-full": variant === "icon",

    "bg-destructive text-destructive-foreground hover:shadow-destructive":
      variant === "destructive",
  });

  return (
    <button
      title={title}
      type={type}
      className={twMerge(baseStyles, variantStyles, className)}
      {...props}
    />
  );
};

export default Button;
