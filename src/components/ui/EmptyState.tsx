"use client";

import React from "react";

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 px-4 py-12 text-center sm:px-6 sm:py-16">
      <div className="mb-4 text-5xl sm:text-6xl">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
