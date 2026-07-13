"use client";

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, interactive = false, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition ${
          interactive ? "hover:bg-slate-50 hover:shadow-md" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = "Card";
