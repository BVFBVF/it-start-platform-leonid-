import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          IT-Start Platform
        </h1>
        <p className="text-slate-600">
          Платформа для управления командой разработчиков
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Link
            href="/search"
            className="text-lg font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Поиск
          </Link>
          <p className="mt-1 text-sm text-slate-600">
            Глобальный поиск по сотрудникам, задачам и наставникам
          </p>
        </div>
        <div>
          <Link
            href="/activity"
            className="text-lg font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Активность
          </Link>
          <p className="mt-1 text-sm text-slate-600">
            Просмотр активности сотрудников, включая задачи, комментарии и
            изменения в профилях
          </p>
        </div>
        <div>
          <Link
            href="/team"
            className="text-lg font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Команда
          </Link>
          <p className="mt-1 text-sm text-slate-600">
            Просмотр команды в виде дерева менторов и джунов или в виде таблицы
            всех сотрудников
          </p>
        </div>
        <div>
          <Link
            href="/calendar"
            className="text-lg font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Календарь дедлайнов
          </Link>
          <p className="mt-1 text-sm text-slate-600">
            Просмотр дедлайнов задач по датам с выделением по приоритету и
            список ближайших сроков
          </p>
        </div>
        <div>
          <Link
            href="/time"
            className="text-lg font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Трекер рабочего времени
          </Link>
          <p className="mt-1 text-sm text-slate-600">
            Логирование рабочих сессий, суммарный учёт часов и аналитика по
            сотрудникам
          </p>
        </div>
      </div>
    </main>
  );
}
