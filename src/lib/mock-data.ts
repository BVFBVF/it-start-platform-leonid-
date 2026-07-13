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

// TODO: Подключить к реальному API для получения менторов
// Пока используются mock-данные с реалистичными именами и специализациями
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
