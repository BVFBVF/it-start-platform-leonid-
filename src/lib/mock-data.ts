export interface Mentor {
  id: number;
  name: string;
  specialization: string;
  photo?: string;
}

export interface Employee {
  id: number;
  name: string;
  stack: string[];
  mentorId: number;
  status: "active" | "blocked" | "in_review" | "ready_for_outstaff";
  readinessScore: number;
  task: string;
  photo?: string;
}

export const tasks = [
  {
    id: 10,
    title: "Реализовать Dashboard",
  },
  {
    id: 13,
    title: "Реализовать страницу поиска",
  },
  {
    id: 14,
    title: "Реализовать страницу профиля",
  },
];

export const mentors: Mentor[] = [
  {
    id: 1,
    name: "Иванов Иван Иванович",
    specialization: "React / TypeScript",
    photo: "/images/mentor-ivanov.jpg",
  },
  {
    id: 2,
    name: "Петров Петр Петрович",
    specialization: "Node.js / Backend",
    photo: "/images/mentor-petrov.jpg",
  },
  {
    id: 3,
    name: "Сидоров Сидор Сидорович",
    specialization: "Python / Django",
    photo: "/images/mentor-sidorov.jpg",
  },
];

export const employees: Employee[] = [
  {
    id: 56,
    name: "Андрей Андреевич Андреев",
    stack: ["React", "TypeScript"],
    mentorId: 1,
    status: "active",
    readinessScore: 82,
    task: "Реализовать Dashboard",
    photo: "/images/junior-andrey.jpg",
  },
  {
    id: 57,
    name: "Борис Борисович Борисов",
    stack: ["JavaScript", "Node.js"],
    mentorId: 2,
    status: "blocked",
    readinessScore: 48,
    task: "Реализовать страницу поиска",
    photo: "/images/junior-boris.jpg",
  },
  {
    id: 58,
    name: "Владимир Владимирович Владимиров",
    stack: ["Python", "Django"],
    mentorId: 3,
    status: "in_review",
    readinessScore: 69,
    task: "Реализовать страницу профиля",
    photo: "/images/junior-vladimir.jpg",
  },
  {
    id: 59,
    name: "Мария Сергеевна Смирнова",
    stack: ["React", "GraphQL"],
    mentorId: 1,
    status: "active",
    readinessScore: 91,
    task: "Доработать компонент профиля",
    photo: "/images/junior-maria.jpg",
  },
  {
    id: 60,
    name: "Наталья Александровна Кузнецова",
    stack: ["Node.js", "Express"],
    mentorId: 2,
    status: "ready_for_outstaff",
    readinessScore: 84,
    task: "Подготовить тестовое API",
    photo: "/images/junior-natalia.jpg",
  },
  {
    id: 61,
    name: "Сергей Олегович Соколов",
    stack: ["Python", "FastAPI"],
    mentorId: 3,
    status: "active",
    readinessScore: 77,
    task: "Написать документацию по API",
    photo: "/images/junior-sergey.jpg",
  },
];

export interface ActivityEvent {
  id: number;
  type:
    | "employee_added"
    | "status_changed"
    | "review_created"
    | "task_completed"
    | "pr_merged"
    | "ready_for_outstaff";
  timestamp: string;
  actorName: string;
  actorRole?: string;
  targetName?: string;
  statusFrom?: string;
  statusTo?: string;
  taskTitle?: string;
  prTitle?: string;
  comment?: string;
}

export const activityEvents: ActivityEvent[] = [
  {
    id: 1,
    type: "employee_added",
    timestamp: "2026-07-08T11:05:00.000Z",
    actorName: "Иван Иванов",
    actorRole: "Руководитель",
    targetName: "Мария Смирнова",
  },
  {
    id: 2,
    type: "status_changed",
    timestamp: "2026-07-08T09:30:00.000Z",
    actorName: "Алексей Петров",
    actorRole: "HR",
    targetName: "Виктория Кузнецова",
    statusFrom: "active",
    statusTo: "blocked",
  },
  {
    id: 3,
    type: "review_created",
    timestamp: "2026-07-07T18:15:00.000Z",
    actorName: "Настя Ольхова",
    actorRole: "Ментор",
    taskTitle: "Реализовать страницу поиска",
  },
  {
    id: 4,
    type: "task_completed",
    timestamp: "2026-07-07T17:00:00.000Z",
    actorName: "Сергей Соколов",
    taskTitle: "Реализовать Dashboard",
  },
  {
    id: 5,
    type: "pr_merged",
    timestamp: "2026-07-06T14:40:00.000Z",
    actorName: "Елена Захарова",
    prTitle: "fix/ui-bugs",
  },
  {
    id: 6,
    type: "ready_for_outstaff",
    timestamp: "2026-07-06T12:10:00.000Z",
    actorName: "Дмитрий Козлов",
  },
];
