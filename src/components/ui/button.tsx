import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "ghost";
};

const VARIANTS = {
  primary: "bg-green text-white",
  ghost: "bg-card text-green",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`min-h-[50px] w-full rounded-2xl text-base font-bold transition-opacity disabled:opacity-40 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
