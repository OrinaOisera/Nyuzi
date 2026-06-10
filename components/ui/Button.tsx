import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary:
    "bg-nyuzi-amber text-white shadow-md shadow-amber-900/15 hover:bg-nyuzi-amber-dark active:scale-[0.98]",
  secondary:
    "bg-nyuzi-emerald text-white shadow-md shadow-emerald-900/15 hover:bg-emerald-900 active:scale-[0.98]",
  outline:
    "border-2 border-nyuzi-amber/80 bg-white/50 text-nyuzi-amber hover:border-nyuzi-amber hover:bg-amber-50 active:scale-[0.98]",
  ghost:
    "text-nyuzi-muted hover:bg-nyuzi-sand hover:text-nyuzi-ink active:scale-[0.98]",
};

const sizes = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
