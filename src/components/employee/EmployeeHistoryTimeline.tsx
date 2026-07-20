"use client";

import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import type { EmployeeHistoryEvent } from "@/lib/mock-data";

interface EmployeeHistoryTimelineProps {
  events: EmployeeHistoryEvent[];
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getWeekStart = (date: Date) => {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const groupByWeek = (events: EmployeeHistoryEvent[]) => {
  const groups: Record<string, EmployeeHistoryEvent[]> = {};

  events.forEach((event) => {
    const date = new Date(event.timestamp);
    const weekStart = getWeekStart(date);
    const weekKey = weekStart.toISOString().slice(0, 10);

    if (!groups[weekKey]) {
      groups[weekKey] = [];
    }
    groups[weekKey].push(event);
  });

  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => ({
      key,
      label: `Неделя от ${new Date(key).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      })}`,
      events: value.sort((a, b) => a.timestamp.localeCompare(b.timestamp)),
    }));
};

const getEventLabel = (type: EmployeeHistoryEvent["type"]) => {
  switch (type) {
    case "status_changed":
      return "Изменение статуса";
    case "score_updated":
      return "Обновление score";
    case "task_assigned":
      return "Назначение задачи";
    case "review_received":
      return "Ревью получено";
    case "pr_created":
      return "PR создан";
    default:
      return "Событие";
  }
};

export const EmployeeHistoryTimeline: React.FC<
  EmployeeHistoryTimelineProps
> = ({ events }) => {
  const groupedEvents = groupByWeek(events);

  if (events.length === 0) {
    return (
      <EmptyState
        icon="🗂️"
        title="Нет событий"
        description="Для этого сотрудника ещё нет записей в истории"
      />
    );
  }

  return (
    <div className="space-y-5">
      {groupedEvents.map((group) => (
        <div key={group.key}>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-400" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              {group.label}
            </h2>
          </div>

          <div className="space-y-3">
            {group.events.map((event) => (
              <Card
                key={event.id}
                className="space-y-2 border-l-4 border-l-indigo-500"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {event.title}
                    </p>
                    <p className="text-sm text-slate-600">
                      {event.description}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {getEventLabel(event.type)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span>{formatDate(event.timestamp)}</span>
                  {event.oldValue !== undefined && (
                    <span>Было: {event.oldValue}</span>
                  )}
                  {event.newValue !== undefined && (
                    <span>Стало: {event.newValue}</span>
                  )}
                  {event.taskTitle && <span>Задача: {event.taskTitle}</span>}
                  {event.reviewTitle && <span>Ревью: {event.reviewTitle}</span>}
                  {event.prTitle && <span>PR: {event.prTitle}</span>}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
