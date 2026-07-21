"use client";

import { Card } from "@/components/ui/Card";
import type { Employee } from "@/lib/mock-data";

interface EmployeeHoursItem {
  employee: Employee;
  hours: number;
}

interface TimeTrackerEmployeeTableProps {
  employeeTotals: EmployeeHoursItem[];
}

const formatHours = (hours: number) => `${hours.toFixed(1)} ч`;

export const TimeTrackerEmployeeTable = ({
  employeeTotals,
}: TimeTrackerEmployeeTableProps) => {
  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Сумма по сотрудникам
        </h2>
        <p className="text-sm text-slate-600">
          Визуально видно, кто вносит больше всего в рабочий процесс.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Сотрудник</th>
              <th className="px-4 py-3 font-medium">Часы</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {employeeTotals.map(({ employee, hours }) => (
              <tr key={employee.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {employee.name}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {formatHours(hours)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
