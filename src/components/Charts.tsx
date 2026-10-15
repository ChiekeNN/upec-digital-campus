"use client";

import { useMemo } from "react";

export type ChartDatum = { label: string; value: number; color?: string };

const PALETTE = ["#003b73", "#0070c9", "#f7b733", "#10b981", "#8b5cf6", "#ef4444", "#06b6d4"];

export function BarChart({
  data,
  height = 220,
  title,
}: {
  data: ChartDatum[];
  height?: number;
  title?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      {title && <h3 className="mb-4 text-sm font-black uppercase tracking-wide text-[#003b73]">{title}</h3>}
      <div className="flex items-end gap-3" style={{ height }}>
        {data.map((d, i) => {
          const color = d.color || PALETTE[i % PALETTE.length];
          const h = (d.value / max) * (height - 30);
          return (
            <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-bold text-slate-600">{d.value}</span>
              <div
                className="w-full rounded-t-xl transition-all duration-700 ease-out"
                style={{ height: h, backgroundColor: color, minHeight: 4 }}
              />
              <span className="text-[10px] font-semibold text-slate-500 text-center leading-tight">
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DonutChart({
  data,
  size = 180,
  title,
  centerLabel,
}: {
  data: ChartDatum[];
  size?: number;
  title?: string;
  centerLabel?: string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = size / 2 - 12;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  const segments = useMemo(() => {
    let offset = 0;
    return data.map((d, i) => {
      const color = d.color || PALETTE[i % PALETTE.length];
      const frac = d.value / total;
      const dash = frac * circumference;
      const seg = { ...d, color, dash, offset, frac };
      offset += dash;
      return seg;
    });
  }, [data, total, circumference]);

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      {title && <h3 className="mb-4 text-sm font-black uppercase tracking-wide text-[#003b73]">{title}</h3>}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-around">
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eef2f7" strokeWidth={20} />
          {segments.map((s, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={20}
              strokeDasharray={`${s.dash} ${circumference - s.dash}`}
              strokeDashoffset={-s.offset}
              strokeLinecap="butt"
              className="transition-all duration-700"
            />
          ))}
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            className="rotate-90"
            style={{ transform: `rotate(90deg)`, transformOrigin: `${cx}px ${cy}px` }}
            fontSize={16}
            fontWeight={900}
            fill="#003b73"
          >
            {centerLabel ?? total}
          </text>
        </svg>
        <ul className="space-y-2">
          {segments.map((s, i) => (
            <li key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
              <span>{s.label}</span>
              <span className="ml-auto font-bold text-[#003b73]">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MiniStat({
  label,
  value,
  trend,
  color = "#003b73",
}: {
  label: string;
  value: string | number;
  trend?: string;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-black" style={{ color }}>
        {value}
      </p>
      {trend && <p className="mt-1 text-xs font-semibold text-emerald-600">{trend}</p>}
    </div>
  );
}
