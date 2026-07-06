export interface Employee {
  id: number;
  name: string;
  stack: string[];
  mentorId: number;
  status?: string;
  readinessScore?: number;
  task?: string;
  photo?: string;
}

export interface Mentor {
  id: number;
  name: string;
  specialization?: string;
  photo?: string;
}

export interface Task {
  id: number;
  title: string;
  assigneeId?: number;
  status?: string;
}

export type SearchResultType = "employee" | "task" | "mentor";

export interface SearchResult {
  type: SearchResultType;
  id: number;
  primaryText: string;
  secondaryText?: string;
}

export interface SearchResults {
  employees: Employee[];
  tasks: Task[];
  mentors: Mentor[];
}
