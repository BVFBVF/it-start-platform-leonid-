"use client";

import { Card } from "@/components/ui/Card";

interface TimeTrackerSummaryProps {
  dayHours: number;
  weekHours: number;
  monthHours: number;
  totalHours: number;
  progressPercent: number;
}

const formatHours = (hours: number) => `${hours.toFixed(1)} ч`;

export const TimeTrackerSummary = ({
  dayHours,
  weekHours,
  monthHours,
  totalHours,
  progressPercent,
}: TimeTrackerSummaryProps) => {
  return (
    <div className="space-y-4">
      <Card className="p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Цель
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              {formatHours(totalHours)} / 1000 ч
            </h2>
          </div>
          <div className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            {Math.round(progressPercent)}%
          </div>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <p className="text-sm text-slate-500">За день</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {formatHours(dayHours)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500">За неделю</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {formatHours(weekHours)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500">За месяц</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {formatHours(monthHours)}
          </p>
        </Card>
      </div>
    </div>
  );
};
