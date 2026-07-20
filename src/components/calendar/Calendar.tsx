"use client";

import { useMemo, useState } from "react";
import { tasks } from "@/lib/mock-data";
import type { Task } from "@/lib/mock-data";
import { CalendarGrid } from "./CalendarGrid";
import { SelectedDateTasks } from "./SelectedDateTasks";
import { DeadlineList } from "./DeadlineList";

const priorityStyles: Record<NonNullable<Task["priority"]>, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-emerald-100 text-emerald-700",
};

const getDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getTasksByDate = (date: Date) => {
  return tasks.filter((task) => task.dueDate === getDateKey(date));
};

const getUpcomingTasks = () => {
  const today = new Date();
  const upcoming: Task[] = [];

  for (let offset = 0; offset < 7; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    const dateKey = getDateKey(date);
    upcoming.push(...tasks.filter((task) => task.dueDate === dateKey));
  }

  return upcoming.sort((a, b) =>
    (a.dueDate || "").localeCompare(b.dueDate || ""),
  );
};

const formatDateLabel = (date: Date) => {
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
};

const Calendar: React.FC = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const selectedTasks = useMemo(() => {
    if (!selectedDate) return [];
    return getTasksByDate(selectedDate);
  }, [selectedDate]);

  const upcomingTasks = useMemo(() => getUpcomingTasks(), []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Календарь дедлайнов
          </h1>
          <p className="text-slate-600">
            Смотри дедлайны задач, выбирай дату и смотри ближайшие сроки.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear((year) => year - 1);
                return;
              }
              setCurrentMonth((month) => month - 1);
            }}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Назад
          </button>
          <button
            type="button"
            onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear((year) => year + 1);
                return;
              }
              setCurrentMonth((month) => month + 1);
            }}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Вперед
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="space-y-6">
          <CalendarGrid
            currentYear={currentYear}
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            today={today}
            tasks={tasks}
            priorityStyles={priorityStyles}
            onSelectDate={setSelectedDate}
          />

          <SelectedDateTasks
            selectedDate={selectedDate}
            selectedTasks={selectedTasks}
            priorityStyles={priorityStyles}
            formatDateLabel={formatDateLabel}
          />
        </section>

        <section className="space-y-6">
          <DeadlineList
            tasks={upcomingTasks}
            priorityStyles={priorityStyles}
            title="Ближайшие дедлайны"
            description="Следующие 7 дней"
          />
        </section>
      </div>
    </main>
  );
};

export default Calendar;
