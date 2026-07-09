"use client";

import { Card } from "@/components/ui/Card";
import type { ActivityEvent } from "@/lib/mock-data";

interface ActivityEventItemProps {
  event: ActivityEvent;
}

const getEventDescription = (event: ActivityEvent) => {
  switch (event.type) {
    case "employee_added":
      return `${event.actorName} добавил(а) сотрудника ${event.targetName}`;
    case "status_changed":
      return `${event.actorName} изменил(а) статус ${event.targetName} ${event.statusFrom} → ${event.statusTo}`;
    case "review_created":
      return `${event.actorName} создал(а) ревью для задачи "${event.taskTitle}"`;
    case "task_completed":
      return `${event.actorName} завершил(а) задачу "${event.taskTitle}"`;
    case "pr_merged":
      return `${event.actorName} смержил(а) PR "${event.prTitle}"`;
    case "ready_for_outstaff":
      return `${event.actorName} готов(а) к аутстаффу`;
    default:
      return `${event.actorName} выполнил(а) действие`;
  }
};

const getEventIcon = (type: ActivityEvent["type"]) => {
  switch (type) {
    case "employee_added":
      return "➕";
    case "status_changed":
      return "🔁";
    case "review_created":
      return "📝";
    case "task_completed":
      return "✅";
    case "pr_merged":
      return "🔧";
    case "ready_for_outstaff":
      return "🚀";
    default:
      return "•";
  }
};

const formatTime = (timestamp: string) =>
  new Date(timestamp).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const ActivityEventItem: React.FC<ActivityEventItemProps> = ({
  event,
}) => {
  return (
    <Card className="flex items-start gap-4 rounded-3xl p-5">
      <div className="mt-1 text-2xl">{getEventIcon(event.type)}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900">
          {getEventDescription(event)}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          {formatTime(event.timestamp)}
        </p>
      </div>
    </Card>
  );
};
