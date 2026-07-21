"use client";

import { useMemo, useState } from "react";
import { employees, workSessions } from "@/lib/mock-data";
import type { WorkSession } from "@/lib/mock-data";
import { TimeTrackerForm, type TimeTrackerFormValues } from "./TimeTrackerForm";
import { TimeTrackerSummary } from "./TimeTrackerSummary";
import { TimeTrackerSessionList } from "./TimeTrackerSessionList";
import { TimeTrackerEmployeeTable } from "./TimeTrackerEmployeeTable";

const initialFormValues: TimeTrackerFormValues = {
  employeeId: employees[0]?.id ?? 56,
  date: "2026-07-21",
  startTime: "09:00",
  endTime: "10:00",
  description: "",
};

const calculateDurationHours = (session: WorkSession) => {
  const [startHours, startMinutes] = session.startTime.split(":").map(Number);
  const [endHours, endMinutes] = session.endTime.split(":").map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  return (endTotalMinutes - startTotalMinutes) / 60;
};

const TimeTracker = () => {
  const [sessions, setSessions] = useState<WorkSession[]>(workSessions);
  const [selectedDate, setSelectedDate] = useState("2026-07-21");
  const [formValues, setFormValues] =
    useState<TimeTrackerFormValues>(initialFormValues);
  const [error, setError] = useState<string | null>(null);

  const filteredSessions = useMemo(() => {
    if (!selectedDate) {
      return sessions;
    }

    return sessions.filter((session) => session.date === selectedDate);
  }, [selectedDate, sessions]);

  const totals = useMemo(() => {
    const dayHours = filteredSessions.reduce(
      (sum, session) => sum + calculateDurationHours(session),
      0,
    );

    const weekHours = sessions
      .filter(
        (session) =>
          session.date >= "2026-07-20" && session.date <= "2026-07-26",
      )
      .reduce((sum, session) => sum + calculateDurationHours(session), 0);

    const monthHours = sessions
      .filter((session) => session.date.startsWith("2026-07"))
      .reduce((sum, session) => sum + calculateDurationHours(session), 0);

    const totalHours = sessions.reduce(
      (sum, session) => sum + calculateDurationHours(session),
      0,
    );

    return { dayHours, weekHours, monthHours, totalHours };
  }, [filteredSessions, sessions]);

  const progressPercent = (totals.totalHours / 1000) * 100;

  const employeeTotals = useMemo(() => {
    return employees
      .map((employee) => ({
        employee,
        hours: sessions
          .filter((session) => session.employeeId === employee.id)
          .reduce((sum, session) => sum + calculateDurationHours(session), 0),
      }))
      .sort((left, right) => right.hours - left.hours);
  }, [sessions]);

  const handleFieldChange = (
    field: keyof TimeTrackerFormValues,
    value: string | number,
  ) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formValues.date ||
      !formValues.startTime ||
      !formValues.endTime ||
      !formValues.description.trim()
    ) {
      setError("Заполни все поля, чтобы сохранить сессию.");
      return;
    }

    const [startHours, startMinutes] = formValues.startTime
      .split(":")
      .map(Number);
    const [endHours, endMinutes] = formValues.endTime.split(":").map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    if (endTotalMinutes <= startTotalMinutes) {
      setError("Время окончания должно быть позже времени начала.");
      return;
    }

    const newSession: WorkSession = {
      id: Date.now(),
      employeeId: Number(formValues.employeeId),
      date: formValues.date,
      startTime: formValues.startTime,
      endTime: formValues.endTime,
      description: formValues.description.trim(),
    };

    setSessions((current) => [newSession, ...current]);
    setSelectedDate(formValues.date);
    setFormValues({
      ...initialFormValues,
      employeeId: Number(formValues.employeeId),
    });
    setError(null);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">
            Feature 3
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Трекер рабочего времени
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Веди учёт времени по задачам, следи за нагрузкой и держи под
            контролем общий прогресс.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <TimeTrackerForm
            employees={employees}
            formValues={formValues}
            error={error}
            onFieldChange={handleFieldChange}
            onSubmit={handleSubmit}
          />
          <TimeTrackerSessionList
            sessions={filteredSessions}
            employees={employees}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        <div className="space-y-6">
          <TimeTrackerSummary
            dayHours={totals.dayHours}
            weekHours={totals.weekHours}
            monthHours={totals.monthHours}
            totalHours={totals.totalHours}
            progressPercent={progressPercent}
          />
          <TimeTrackerEmployeeTable employeeTotals={employeeTotals} />
        </div>
      </div>
    </main>
  );
};

export default TimeTracker;
