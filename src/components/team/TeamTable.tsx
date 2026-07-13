"use client";

import type { Employee, Mentor } from "@/lib/mock-data";

interface TeamTableProps {
  employees: Employee[];
  mentors: Mentor[];
  sortKey: string;
  sortDirection: "asc" | "desc";
  onSort: (key: string) => void;
}

const getSortLabel = (key: string, direction: "asc" | "desc") => {
  return direction === "asc" ? "↑" : "↓";
};

export const TeamTable: React.FC<TeamTableProps> = ({
  employees,
  mentors,
  sortKey,
  sortDirection,
  onSort,
}) => {
  const getMentorName = (mentorId: number) => {
    return mentors.find((mentor) => mentor.id === mentorId)?.name ?? "-";
  };

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {[
              { key: "name", label: "Имя" },
              { key: "mentor", label: "Ментор" },
              { key: "status", label: "Статус" },
              { key: "score", label: "Score" },
              { key: "task", label: "Задача" },
            ].map((column) => (
              <th
                key={column.key}
                scope="col"
                className="cursor-pointer px-4 py-3 text-left text-sm font-semibold text-slate-700"
                onClick={() => onSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {sortKey === column.key && (
                    <span className="text-slate-500">
                      {getSortLabel(column.key, sortDirection)}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-slate-50">
              <td className="px-4 py-4 text-sm text-slate-900">
                {employee.name}
              </td>
              <td className="px-4 py-4 text-sm text-slate-700">
                {getMentorName(employee.mentorId)}
              </td>
              <td className="px-4 py-4 text-sm text-slate-700">
                {employee.status === "ready_for_outstaff"
                  ? "Готов к аутстаффу"
                  : employee.status}
              </td>
              <td className="px-4 py-4 text-sm text-slate-700">
                {employee.readinessScore}%
              </td>
              <td className="px-4 py-4 text-sm text-slate-700">
                {employee.task}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
