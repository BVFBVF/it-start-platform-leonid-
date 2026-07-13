"use client";

import { useState, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { employees, mentors, tasks } from "@/lib/mock-data";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchResultGroup } from "./SearchResultGroup";
import type { Employee, Mentor, Task } from "@/types/search";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce<string>(query, 300);

  const normalizedQuery = debouncedQuery.trim().toLowerCase();

  const employeeResults = useMemo<Employee[]>(() => {
    if (!normalizedQuery) return employees;
    return employees.filter((employee: Employee) => {
      const nameMatches = employee.name.toLowerCase().includes(normalizedQuery);
      const stackMatches = employee.stack.some((tech: string) =>
        tech.toLowerCase().includes(normalizedQuery),
      );
      return nameMatches || stackMatches;
    });
  }, [normalizedQuery]);

  const taskResults = useMemo<Task[]>(() => {
    if (!normalizedQuery) return tasks;
    return tasks.filter((task: Task) =>
      task.title.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const mentorResults = useMemo<Mentor[]>(() => {
    if (!normalizedQuery) return mentors;
    return mentors.filter((mentor: Mentor) =>
      mentor.name.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const hasResults =
    employeeResults.length > 0 ||
    taskResults.length > 0 ||
    mentorResults.length > 0;

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          Поиск
        </h1>
        <p className="text-slate-600">
          Найди сотрудника, задачу или наставника
        </p>
      </div>

      <div className="mb-8">
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Введи имя, стек или название задачи..."
          className="text-base"
        />
      </div>

      {!hasResults && normalizedQuery ? (
        <EmptyState
          icon="🔍"
          title="Ничего не найдено"
          description="Попробуй другой запрос: имя, технология или название задачи"
        />
      ) : (
        <div className="space-y-8">
          <SearchResultGroup
            title="Сотрудники"
            type="employees"
            results={employeeResults}
          />
          <SearchResultGroup
            title="Задачи"
            type="tasks"
            results={taskResults}
          />
          <SearchResultGroup
            title="Наставники"
            type="mentors"
            results={mentorResults}
          />
        </div>
      )}
    </main>
  );
};

export default Search;
