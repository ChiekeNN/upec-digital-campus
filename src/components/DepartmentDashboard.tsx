"use client";

import { useState } from "react";
import { LucideIcon } from "lucide-react";

export type Tab = {
  id: string;
  label: string;
  icon: LucideIcon;
  content: React.ReactNode;
};

export default function DepartmentDashboard({
  title,
  subtitle,
  tabs,
}: {
  title: string;
  subtitle: string;
  tabs: Tab[];
}) {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div>
      <div>
        <h1 className="text-2xl font-black text-[#003b73] sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                isActive
                  ? "bg-[#003b73] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 hover:text-[#003b73]"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6">{current?.content}</div>
    </div>
  );
}
