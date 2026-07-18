import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "indigo";
}

export function Badge({ className = "", variant = "default", children, ...props }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors border";

  const variants = {
    default:
      "bg-zinc-900 text-white border-transparent dark:bg-zinc-100 dark:text-zinc-950",
    secondary:
      "bg-zinc-100 text-zinc-800 border-transparent dark:bg-zinc-850 dark:text-zinc-300",
    outline:
      "border-zinc-200 text-zinc-700 bg-transparent dark:border-zinc-800 dark:text-zinc-300",
    indigo:
      "bg-indigo-50 text-indigo-700 border-indigo-150 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/60",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
