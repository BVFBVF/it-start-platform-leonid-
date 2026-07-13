"use client";

import type { ActivityEvent } from "@/lib/mock-data";

export type ActivityEventType = ActivityEvent["type"];
export type ActivityFilterValue = "" | ActivityEventType;

export interface ActivityFilterOption {
  value: ActivityFilterValue;
  label: string;
}

interface ActivityFiltersProps {
  options: ReadonlyArray<ActivityFilterOption>;
  selectedValue: ActivityFilterValue;
  onSelect: (value: ActivityFilterValue) => void;
}

export const ActivityFilters: React.FC<ActivityFiltersProps> = ({
  options,
  selectedValue,
  onSelect,
}) => {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {options.map((option) => {
        const isActive = selectedValue === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              isActive
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
