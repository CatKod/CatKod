'use client';

/**
 * Counter-up: animate a number from 0 to `target` over `duration` when the
 * element scrolls into view. Designed for the figures on the Hero
 * (32 / 11 / 89 / 10) where the static "32" did not earn its own line.
 *
 * Behaviour:
 *   - On `prefers-reduced-motion` or no IntersectionObserver support, the
 *     hook renders `target` immediately.
 *   - The animation uses an ease-out curve (matches `--ease-out` in
 *     globals.css), so the number *arrives* early and the last 10% of the
 *     time is a slow settle. That reads as "the number is real" rather
 *     than "the number is being painted on."
 *   - Tabular-nums is on the parent `<dd>` already; the hook just keeps
 *     emitting digits.
 *
 * The rendered text is whatever `format(value)` returns. Pass
 * `format={(n) => `${n}/10`}` for the capstone stat, or a plain integer
 * the rest of the time.
 */

import { useEffect, useRef, useState } from 'react';
import { useInView } from './useInView';

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

type Props = {
  /** Final value the counter is animating towards. */
  target: number;
  /** Animation duration, ms. */
  duration?: number;
  /** Optional formatter; defaults to the integer. */
  format?: (n: number) => string;
};

function easeOut(t: number): number {
  // Cubic ease-out. Same shape as `cubic-bezier(0.16, 1, 0.3, 1)` for
  // t in [0, 1], computed analytically so we don't have to bend the
  // rAF loop around a lookup.
  return 1 - Math.pow(1 - t, 3);
}

export default function CountUp({
  target,
  duration = 1200,
  format = (n) => String(Math.round(n)),
}: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [value, setValue] = useState(REDUCED_MOTION ? target : 0);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    if (REDUCED_MOTION || typeof requestAnimationFrame === 'undefined') {
      setValue(target);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(easeOut(t) * target);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target, duration]);

  return (
    <span ref={ref} aria-label={format(target)}>
      {format(value)}
    </span>
  );
}
