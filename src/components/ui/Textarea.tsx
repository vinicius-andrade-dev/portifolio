import React, { forwardRef } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, id, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-900/50 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/80 transition-all resize-y ${
            error
              ? "border-red-500 focus:ring-red-500/50"
              : "border-zinc-200 dark:border-zinc-800/80 focus:border-zinc-300 dark:focus:border-zinc-700"
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium pl-1">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
