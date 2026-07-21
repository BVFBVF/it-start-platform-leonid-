"use client";

import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { employees } from "@/lib/mock-data";
import type { Task } from "@/lib/mock-data";

interface DeadlineListProps {
  tasks: Task[];
  priorityStyles: Record<NonNullable<Task["priority"]>, string>;
  title: string;
  description: string;
}

export const DeadlineList: React.FC<DeadlineListProps> = ({
  tasks,
  priorityStyles,
  title,
  description,
}) => {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <EmptyState
          icon="⏳"
          title="Нет ближайших дедлайнов"
          description="Все задачи пока не запланированы на ближайшую неделю"
        />
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => {
            const assignee = employees.find(
              (employee) => employee.id === task.assigneeId,
            );
            return (
              <div
                key={task.id}
                className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {task.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {task.dueDate} • {assignee?.name ?? "Не назначена"}
                    </p>
                  </div>
                  {task.priority && (
                    <Badge
                      variant="default"
                      className={
                        priorityStyles[
                          task.priority as NonNullable<Task["priority"]>
                        ]
                      }
                    >
                      {task.priority === "high"
                        ? "Высокий"
                        : task.priority === "medium"
                          ? "Средний"
                          : "Низкий"}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
