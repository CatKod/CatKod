'use client';

/**
 * IntersectionObserver hook for "reveal on view" entrance animations.
 *
 * Why a custom hook and not a library:
 *   1. The whole reveal layer is 3 CSS rules. Pulling in framer-motion for
 *      that costs ~30 kB gz and a runtime the page does not need.
 *   2. The hook only adds the class once, which is what the
 *      prefers-reduced-motion branch is also asking for: a reader who has
 *      scrolled past should not have the element reverse.
 *   3. It honours `prefers-reduced-motion` by resolving `inView: true`
 *      immediately on mount when the user has asked for less motion.
 *
 * Usage:
 *   const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
 *   return <div ref={ref} className={inView ? 'reveal in' : 'reveal'}>...</div>;
 */

import { useEffect, useRef, useState } from 'react';

type Options = {
  /** Fraction of the element that must be visible to trigger. */
  threshold?: number;
  /** CSS selector for an ancestor to observe against instead of the
   *  viewport — useful when the element is inside a scrolling pane. */
  root?: Element | null;
  /** Extra rootMargin, in CSS pixels. */
  rootMargin?: string;
};

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function useInView<T extends Element>({
  threshold = 0.15,
  root = null,
  rootMargin = '0px 0px -8% 0px',
}: Options = {}): { ref: React.RefObject<T | null>; inView: boolean } {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(REDUCED_MOTION);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (REDUCED_MOTION) {
      setInView(true);
      return;
    }

    // IntersectionObserver is supported in every browser that runs this
    // site, but a single defensive check keeps SSR + a missing polyfill
    // from throwing.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, root, rootMargin },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, root, rootMargin]);

  return { ref, inView };
}
