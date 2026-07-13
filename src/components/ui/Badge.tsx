"use client";

import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  className = "",
  children,
  ...props
}) => {
  const variants = {
    default: "bg-indigo-100 text-indigo-700",
    secondary: "bg-slate-100 text-slate-700",
    outline: "border border-slate-300 text-slate-700",
  };

  return (
    <div
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
