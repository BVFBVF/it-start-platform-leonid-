"use client";

import type { Employee } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";

interface TeamJuniorCardProps {
  junior: Employee;
}

export const TeamJuniorCard: React.FC<TeamJuniorCardProps> = ({ junior }) => {
  return (
    <Card className="grid gap-3 rounded-3xl p-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <p className="font-medium text-slate-900">{junior.name}</p>
        <p className="text-sm text-slate-500">
          {junior.status === "ready_for_outstaff"
            ? "Готов к аутстаффу"
            : junior.status}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 sm:justify-end">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          {junior.readinessScore}%
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          {junior.task}
        </span>
      </div>
    </Card>
  );
};
