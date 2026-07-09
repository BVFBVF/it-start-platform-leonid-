"use client";

import type { ActivityEvent } from "@/lib/mock-data";
import { ActivityEventItem } from "./ActivityEventItem";

interface ActivityGroupProps {
  label: string;
  events: ActivityEvent[];
}

export const ActivityGroup: React.FC<ActivityGroupProps> = ({
  label,
  events,
}) => {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-slate-800">{label}</h2>
      <div className="space-y-3">
        {events.map((event) => (
          <ActivityEventItem key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};
