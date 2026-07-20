"use client";

import { Card } from "@/components/ui/Card";
import type { Employee } from "@/lib/mock-data";

interface EmployeeHistoryHeaderProps {
  employee: Employee;
}

export const EmployeeHistoryHeader: React.FC<EmployeeHistoryHeaderProps> = ({
  employee,
}) => {
  return (
    <Card className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            История сотрудника
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            {employee.name}
          </h1>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
          {employee.status === "ready_for_outstaff"
            ? "Готов к аутстаффу"
            : employee.status}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-sm text-slate-600">
        <span>Score: {employee.readinessScore}%</span>
        <span>Текущая задача: {employee.task}</span>
      </div>
    </Card>
  );
};
