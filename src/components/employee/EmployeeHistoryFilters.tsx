"use client";

import { Card } from "@/components/ui/Card";
import type { EmployeeHistoryEvent } from "@/lib/mock-data";

interface EmployeeHistoryFiltersProps {
  selectedType: EmployeeHistoryEvent["type"] | "all";
  onSelectType: (type: EmployeeHistoryEvent["type"] | "all") => void;
}

const FILTERS: Array<EmployeeHistoryEvent["type"] | "all"> = [
  "all",
  "status_changed",
  "score_updated",
  "task_assigned",
  "review_received",
  "pr_created",
];

const labels: Record<EmployeeHistoryEvent["type"] | "all", string> = {
  all: "Все",
  status_changed: "Статус",
  score_updated: "Score",
  task_assigned: "Назначение",
  review_received: "Ревью",
  pr_created: "PR",
};

export const EmployeeHistoryFilters: React.FC<EmployeeHistoryFiltersProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <Card className="flex flex-wrap gap-2">
      {FILTERS.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onSelectType(type)}
          className={`rounded-full px-3 py-2 text-sm font-medium transition ${
            selectedType === type
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {labels[type]}
        </button>
      ))}
    </Card>
  );
};
