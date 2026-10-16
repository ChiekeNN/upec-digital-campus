"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  /** Animation length in milliseconds. */
  duration?: number;
  /** Optional suffix, e.g. "+". */
  suffix?: string;
  className?: string;
};

/**
 * Counts from 0 up to `value` when the number scrolls into view.
 * Respects the user's "reduce motion" setting by showing the final value immediately.
 */
export default function AnimatedCounter({
  value,
  duration = 1600,
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = performance.now();

            const tick = (now: number) => {
              const progress = Math.min((now - startTime) / duration, 1);
              // Ease-out cubic: fast at the start, gentle finish.
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplayValue(Math.round(eased * value));
              if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
