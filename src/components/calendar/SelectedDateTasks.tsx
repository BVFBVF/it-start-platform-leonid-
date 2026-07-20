"use client";

import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { employees } from "@/lib/mock-data";
import type { Task } from "@/lib/mock-data";

interface SelectedDateTasksProps {
  selectedDate: Date | null;
  selectedTasks: Task[];
  priorityStyles: Record<NonNullable<Task["priority"]>, string>;
  formatDateLabel: (date: Date) => string;
}

export const SelectedDateTasks: React.FC<SelectedDateTasksProps> = ({
  selectedDate,
  selectedTasks,
  priorityStyles,
  formatDateLabel,
}) => {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {selectedDate ? formatDateLabel(selectedDate) : "Выберите дату"}
          </h2>
          <p className="text-sm text-slate-500">
            {selectedTasks.length > 0
              ? `${selectedTasks.length} ${selectedTasks.length === 1 ? "задача" : "задачи"}`
              : "Нет дедлайнов на выбранную дату"}
          </p>
        </div>
      </div>

      {selectedTasks.length === 0 ? (
        <EmptyState
          icon="📅"
          title="Нет задач"
          description="Выберите другой день, чтобы увидеть дедлайны"
        />
      ) : (
        <div className="space-y-3">
          {selectedTasks.map((task) => {
            const assignee = employees.find(
              (employee) => employee.id === task.assigneeId,
            );
            return (
              <div
                key={task.id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {task.title}
                    </h3>
                    {assignee && (
                      <p className="mt-1 text-sm text-slate-600">
                        {assignee.name}
                      </p>
                    )}
                  </div>
                  {task.priority && (
                    <Badge
                      variant="outline"
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
