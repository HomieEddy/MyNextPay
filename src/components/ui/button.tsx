import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "ghost";
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const look = variant === "ghost" ? "btn ghost" : "btn";
  return <button type={type} className={`${look} ${className}`} {...props} />;
}
