"use client";

import React from "react";
import { SearchResultItem } from "./SearchResultItem";
import { Employee, Mentor, Task } from "@/types/search";

interface SearchResultGroupProps {
  title: string;
  type: "employees" | "tasks" | "mentors";
  results: Employee[] | Task[] | Mentor[];
}

export const SearchResultGroup: React.FC<SearchResultGroupProps> = ({
  title,
  type,
  results,
}) => {
  if (results.length === 0) return null;

  const renderItem = (item: Employee | Task | Mentor) => {
    if (type === "employees") {
      const emp = item as Employee;
      return (
        <SearchResultItem
          key={emp.id}
          type="employee"
          id={emp.id}
          primaryText={emp.name}
          secondaryText={emp.stack.join(", ")}
        />
      );
    }

    if (type === "tasks") {
      const task = item as Task;
      return (
        <SearchResultItem
          key={task.id}
          type="task"
          id={task.id}
          primaryText={task.title}
        />
      );
    }

    const mentor = item as Mentor;
    return (
      <SearchResultItem
        key={mentor.id}
        type="mentor"
        id={mentor.id}
        primaryText={mentor.name}
      />
    );
  };

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
        {title}
      </h2>
      <div className="space-y-2">{results.map(renderItem)}</div>
    </section>
  );
};
