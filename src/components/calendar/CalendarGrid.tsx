"use client";

import { Card } from "@/components/ui/Card";
import type { Task } from "@/lib/mock-data";

const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

interface CalendarGridProps {
  currentYear: number;
  currentMonth: number;
  selectedDate: Date | null;
  today: Date;
  tasks: Task[];
  priorityStyles: Record<NonNullable<Task["priority"]>, string>;
  onSelectDate: (date: Date) => void;
}

const getDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getTasksByDate = (date: Date, tasks: Task[]) => {
  return tasks.filter((task) => task.dueDate === getDateKey(date));
};

const getCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;

  const dates: Array<Date | null> = [];

  for (let i = 0; i < startOffset; i += 1) {
    dates.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    dates.push(new Date(year, month, day));
  }

  while (dates.length % 7 !== 0) {
    dates.push(null);
  }

  return dates;
};

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentYear,
  currentMonth,
  selectedDate,
  today,
  tasks,
  priorityStyles,
  onSelectDate,
}) => {
  const currentMonthLabel = new Date(
    currentYear,
    currentMonth,
    1,
  ).toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  });
  const calendarDays = getCalendarDays(currentYear, currentMonth);
  const todayKey = getDateKey(today);
  const selectedKey = selectedDate ? getDateKey(selectedDate) : null;

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {currentMonthLabel}
          </h2>
          <p className="text-sm text-slate-500">
            Выбери дату для просмотра задач
          </p>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-xs text-center text-slate-600">
        {WEEK_DAYS.map((day) => (
          <span key={day} className="font-medium">
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          const isSelected = day ? getDateKey(day) === selectedKey : false;
          const isToday = day ? getDateKey(day) === todayKey : false;
          const dayTasks = day ? getTasksByDate(day, tasks) : [];
          const badge = dayTasks.length > 0 ? dayTasks[0].priority : undefined;

          return (
            <button
              type="button"
              key={`${day?.toISOString() ?? "empty"}-${index}`}
              onClick={() => day && onSelectDate(day)}
              disabled={!day}
              className={`min-h-20 rounded-3xl border p-3 text-left transition ${
                day
                  ? "bg-white shadow-sm hover:border-slate-400"
                  : "cursor-default bg-slate-50 opacity-30"
              } ${isSelected ? "border-indigo-500 bg-indigo-50" : "border-slate-200"}`}
            >
              {day && (
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      isToday ? "bg-slate-900 text-white" : "text-slate-900"
                    }`}
                  >
                    {day.getDate()}
                  </span>
                  {badge && (
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${priorityStyles[badge as NonNullable<Task["priority"]>]}`}
                    >
                      {badge === "high" ? "!" : badge === "medium" ? "!" : "✓"}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
};
