"use client";

import type { ChangeEvent, FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import type { Employee } from "@/lib/mock-data";

export interface TimeTrackerFormValues {
  employeeId: number;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
}

interface TimeTrackerFormProps {
  employees: Employee[];
  formValues: TimeTrackerFormValues;
  error: string | null;
  onFieldChange: (
    field: keyof TimeTrackerFormValues,
    value: string | number,
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const TimeTrackerForm = ({
  employees,
  formValues,
  error,
  onFieldChange,
  onSubmit,
}: TimeTrackerFormProps) => {
  const handleChange =
    (field: keyof TimeTrackerFormValues) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const value =
        event.target.type === "number"
          ? Number(event.target.value)
          : event.target.value;

      onFieldChange(field, value);
    };

  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Новая сессия</h2>
          <p className="text-sm text-slate-600">
            Зафиксируй, сколько времени ушло на задачу и что именно делал.
          </p>
        </div>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Сотрудник
            </label>
            <select
              value={formValues.employeeId}
              onChange={handleChange("employeeId")}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            >
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Дата"
            type="date"
            value={formValues.date}
            onChange={handleChange("date")}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Начало"
            type="time"
            value={formValues.startTime}
            onChange={handleChange("startTime")}
          />
          <Input
            label="Окончание"
            type="time"
            value={formValues.endTime}
            onChange={handleChange("endTime")}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Что делал
          </label>
          <textarea
            value={formValues.description}
            onChange={handleChange("description")}
            rows={4}
            placeholder="Кратко опиши, чем занимался в этот период"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Сохранить сессию
        </button>
      </form>
    </Card>
  );
};
