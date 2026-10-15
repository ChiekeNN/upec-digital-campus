"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initial = searchParams.get("tab");
  const [active, setActive] = useState(
    tabs.some((t) => t.id === initial) ? (initial as string) : tabs[0]?.id,
  );

  // Sync when URL changes (e.g., sidebar click)
  useEffect(() => {
    const t = searchParams.get("tab");
    if (t && tabs.some((x) => x.id === t) && t !== active) {
      setActive(t);
    }
  }, [searchParams, tabs, active]);

  function handleTab(id: string) {
    setActive(id);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

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
              onClick={() => handleTab(tab.id)}
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
