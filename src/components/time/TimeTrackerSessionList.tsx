"use client";

import { Card } from "@/components/ui/Card";
import type { Employee, WorkSession } from "@/lib/mock-data";

interface TimeTrackerSessionListProps {
  sessions: WorkSession[];
  employees: Employee[];
  selectedDate: string;
  onDateChange: (value: string) => void;
}

const formatHours = (hours: number) => `${hours.toFixed(1)} ч`;

export const TimeTrackerSessionList = ({
  sessions,
  employees,
  selectedDate,
  onDateChange,
}: TimeTrackerSessionListProps) => {
  const employeeMap = new Map(
    employees.map((employee) => [employee.id, employee.name]),
  );

  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Список сессий
          </h2>
          <p className="text-sm text-slate-600">
            Смотри, как распределялось время по дням и задачам.
          </p>
        </div>
        <label className="text-sm font-medium text-slate-700">
          <span className="mb-2 block">Фильтр по дате</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => onDateChange(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </label>
      </div>

      {sessions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
          Для выбранной даты ещё нет записей.
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => {
            const startMinutes =
              Number(session.startTime.split(":")[0]) * 60 +
              Number(session.startTime.split(":")[1]);
            const endMinutes =
              Number(session.endTime.split(":")[0]) * 60 +
              Number(session.endTime.split(":")[1]);
            const durationHours = (endMinutes - startMinutes) / 60;

            return (
              <article
                key={session.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-slate-900">
                        {employeeMap.get(session.employeeId) ?? "Сотрудник"}
                      </p>
                      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm">
                        {session.date}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {session.startTime} — {session.endTime}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      {session.description}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
                    {formatHours(durationHours)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </Card>
  );
};
