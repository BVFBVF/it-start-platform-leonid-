"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { activityEvents } from "@/lib/mock-data";
import type { ActivityEvent } from "@/lib/mock-data";
import { ActivityFilters } from "./ActivityFilters";
import { ActivityGroup } from "./ActivityGroup";

const eventTypeOptions = [
  { value: "", label: "Все события" },
  { value: "employee_added", label: "Сотрудник добавлен" },
  { value: "status_changed", label: "Статус изменён" },
  { value: "review_created", label: "Ревью создано" },
  { value: "task_completed", label: "Задача завершена" },
  { value: "pr_merged", label: "PR смержен" },
  { value: "ready_for_outstaff", label: "Готов к аутстаффу" },
] as const;

const getDayLabel = (date: Date) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.floor(
    (today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "Сегодня";
  if (diffDays === 1) return "Вчера";

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
};

const groupEventsByDay = (events: ActivityEvent[]) => {
  const groups: Record<string, ActivityEvent[]> = {};

  events.forEach((event) => {
    const label = getDayLabel(new Date(event.timestamp));

    if (!groups[label]) {
      groups[label] = [];
    }

    groups[label].push(event);
  });

  return Object.entries(groups).map(([label, items]) => ({
    label,
    events: items,
  }));
};

const Activity: React.FC = () => {
  const [selectedType, setSelectedType] =
    useState<(typeof eventTypeOptions)[number]["value"]>("");
  const [visibleCount, setVisibleCount] = useState<number>(5);

  const filteredEvents = useMemo(() => {
    return activityEvents
      .filter((event) => (selectedType ? event.type === selectedType : true))
      .sort(
        (left, right) =>
          new Date(right.timestamp).getTime() -
          new Date(left.timestamp).getTime(),
      );
  }, [selectedType]);

  const visibleEvents = filteredEvents.slice(0, visibleCount);
  const groupedEvents = useMemo(
    () => groupEventsByDay(visibleEvents),
    [visibleEvents],
  );
  const showLoadMore = visibleCount < filteredEvents.length;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          Лента активности
        </h1>
        <p className="text-slate-600">
          Хронология событий на платформе с фильтрацией и загрузкой.
        </p>
      </div>

      <ActivityFilters
        options={eventTypeOptions}
        selectedValue={selectedType}
        onSelect={(value) => {
          setSelectedType(value);
          setVisibleCount(5);
        }}
      />

      {groupedEvents.length === 0 ? (
        <EmptyState
          icon="📭"
          title="Нет событий"
          description="Попробуй выбрать другой фильтр или вернуться позже"
        />
      ) : (
        <div className="space-y-8">
          {groupedEvents.map((group) => (
            <ActivityGroup
              key={group.label}
              label={group.label}
              events={group.events}
            />
          ))}
        </div>
      )}

      {showLoadMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((value) => value + 5)}
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </main>
  );
};

export default Activity;
