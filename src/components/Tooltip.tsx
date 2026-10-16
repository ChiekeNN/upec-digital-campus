"use client";

import { ReactNode, useState } from "react";

export default function Tooltip({
  label,
  children,
  position = "top",
}: {
  label: string;
  children: ReactNode;
  position?: "top" | "bottom";
}) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          className={`pointer-events-none absolute left-1/2 z-[80] -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#00284f] px-2.5 py-1.5 text-xs font-bold text-white shadow-lg ${
            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {label}
          <span
            className={`absolute left-1/2 -translate-x-1/2 border-4 border-transparent ${
              position === "top"
                ? "top-full border-t-[#00284f]"
                : "bottom-full border-b-[#00284f]"
            }`}
          />
        </span>
      )}
    </span>
  );
}
