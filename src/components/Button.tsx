import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "inverse";
  children: ReactNode;
}

export default function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const base = "relative overflow-hidden px-6 py-3 text-sm font-semibold tracking-[0.02em] transition-colors duration-300 border-0 rounded-none group";
  const variants = {
    primary: "bg-[#2A3E1A] text-[#F5EFE3]",
    outline: "border border-[#2A3E1A] text-[#2A3E1A] bg-transparent",
    inverse: "bg-[#F5EFE3] text-[#1A2810]",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      <span className="absolute inset-0 bg-[#E8703A] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" aria-hidden="true" />
      <span className="relative z-10 group-hover:text-[#F5EFE3] transition-colors duration-300">{children}</span>
    </button>
  );
}
