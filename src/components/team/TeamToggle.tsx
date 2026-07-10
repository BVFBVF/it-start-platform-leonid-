"use client";

interface TeamToggleProps {
  view: "tree" | "table";
  onChange: (value: "tree" | "table") => void;
}

export const TeamToggle: React.FC<TeamToggleProps> = ({ view, onChange }) => {
  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
      <button
        type="button"
        onClick={() => onChange("tree")}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
          view === "tree"
            ? "bg-slate-900 text-white"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        Дерево
      </button>
      <button
        type="button"
        onClick={() => onChange("table")}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
          view === "table"
            ? "bg-slate-900 text-white"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        Таблица
      </button>
    </div>
  );
};
