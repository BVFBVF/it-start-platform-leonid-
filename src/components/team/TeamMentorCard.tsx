"use client";

import type { Mentor } from "@/lib/mock-data";
import type { Employee } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";

interface TeamMentorCardProps {
  mentor: Mentor;
  juniors: Employee[];
}

export const TeamMentorCard: React.FC<TeamMentorCardProps> = ({
  mentor,
  juniors,
}) => {
  return (
    <Card className="space-y-4 rounded-3xl p-6">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 overflow-hidden rounded-2xl bg-slate-100">
          {mentor.photo ? (
            <img
              src={mentor.photo}
              alt={mentor.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xl text-slate-500">
              М
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {mentor.name}
          </h3>
          <p className="text-sm text-slate-600">{mentor.specialization}</p>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
        <div>
          <p className="text-sm text-slate-500">Нагрузка</p>
          <p className="text-base font-semibold text-slate-900">
            {juniors.length} джунов
          </p>
        </div>
        <div className="text-sm text-slate-600">
          {juniors.length ? "Ведёт команду" : "Нет джунов"}
        </div>
      </div>
    </Card>
  );
};
