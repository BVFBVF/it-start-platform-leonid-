"use client";

import { useMemo, useState } from "react";
import { employees, employeeHistoryEvents } from "@/lib/mock-data";
import type { EmployeeHistoryEvent } from "@/lib/mock-data";
import { EmployeeHistoryHeader } from "./EmployeeHistoryHeader";
import { EmployeeHistoryFilters } from "./EmployeeHistoryFilters";
import { EmployeeHistoryTimeline } from "./EmployeeHistoryTimeline";

interface EmployeeHistoryProps {
  employeeId: string;
}

const EmployeeHistory: React.FC<EmployeeHistoryProps> = ({ employeeId }) => {
  const employeeIdNumber = Number(employeeId);
  const employee = employees.find((item) => item.id === employeeIdNumber);

  const [selectedType, setSelectedType] = useState<
    EmployeeHistoryEvent["type"] | "all"
  >("all");

  const events = useMemo(() => {
    return employeeHistoryEvents.filter((event) => {
      const matchesEmployee = event.employeeId === employeeIdNumber;
      const matchesType = selectedType === "all" || event.type === selectedType;
      return matchesEmployee && matchesType;
    });
  }, [employeeIdNumber, selectedType]);

  if (!employee) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            Сотрудник не найден
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Проверьте ID в URL и попробуйте снова.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <EmployeeHistoryHeader employee={employee} />
        <EmployeeHistoryFilters
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
        <EmployeeHistoryTimeline events={events} />
      </div>
    </main>
  );
};

export default EmployeeHistory;
