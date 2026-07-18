import React, { forwardRef } from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", hoverEffect = false, glass = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 overflow-hidden transition-all duration-300 ${
          glass ? "glass" : ""
        } ${
          hoverEffect
            ? "hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700/80 hover:translate-y-[-2px]"
            : ""
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`p-6 flex flex-col space-y-1.5 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={`text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={`text-sm text-zinc-500 dark:text-zinc-400 ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`p-6 pt-0 flex items-center border-t border-zinc-100 dark:border-zinc-900 mt-4 ${className}`} {...props}>
      {children}
    </div>
  );
};
