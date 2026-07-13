"use client";

import { useMemo, useState } from "react";
import { TeamToggle } from "./TeamToggle";
import { TeamMentorCard } from "./TeamMentorCard";
import { TeamJuniorCard } from "./TeamJuniorCard";
import { TeamTable } from "./TeamTable";
import { mentors, employees } from "@/lib/mock-data";
import type { Employee } from "@/lib/mock-data";

const sortEmployees = (
  employeesList: Employee[],
  sortKey: string,
  sortDirection: "asc" | "desc",
) => {
  return [...employeesList].sort((a, b) => {
    let left: string | number = "";
    let right: string | number = "";

    if (sortKey === "name") {
      left = a.name;
      right = b.name;
    }

    if (sortKey === "mentor") {
      const leftMentor =
        mentors.find((mentor) => mentor.id === a.mentorId)?.name ?? "";
      const rightMentor =
        mentors.find((mentor) => mentor.id === b.mentorId)?.name ?? "";
      left = leftMentor;
      right = rightMentor;
    }

    if (sortKey === "status") {
      left = a.status;
      right = b.status;
    }

    if (sortKey === "score") {
      left = a.readinessScore;
      right = b.readinessScore;
    }

    if (sortKey === "task") {
      left = a.task;
      right = b.task;
    }

    if (left < right) return sortDirection === "asc" ? -1 : 1;
    if (left > right) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
};

const Team: React.FC = () => {
  const [view, setView] = useState<"tree" | "table">("tree");
  const [sortKey, setSortKey] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const mentorsWithJuniors = useMemo(() => {
    return mentors.map((mentor) => ({
      mentor,
      juniors: employees.filter((employee) => employee.mentorId === mentor.id),
    }));
  }, []);

  const sortedEmployees = useMemo(
    () => sortEmployees(employees, sortKey, sortDirection),
    [sortKey, sortDirection],
  );

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Страница команды
          </h1>
          <p className="text-slate-600">
            Выбери вид: дерево менторов или таблицу всех сотрудников.
          </p>
        </div>
        <TeamToggle view={view} onChange={setView} />
      </div>

      {view === "tree" ? (
        <div className="space-y-6">
          {mentorsWithJuniors.map(({ mentor, juniors }) => (
            <section key={mentor.id} className="space-y-4">
              <TeamMentorCard mentor={mentor} juniors={juniors} />
              <div className="grid gap-4 sm:grid-cols-2">
                {juniors.map((junior) => (
                  <TeamJuniorCard key={junior.id} junior={junior} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <TeamTable
          employees={sortedEmployees}
          mentors={mentors}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      )}
    </main>
  );
};

export default Team;
