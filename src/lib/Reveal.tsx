'use client';

/**
 * Reveal: a thin wrapper that toggles `.reveal.in` when the element enters
 * the viewport. Used wherever the entrance is "a single element arriving,
 * no per-child choreography" — section headings, single cards, prose.
 *
 * For lists with stagger, use `<Reveal as="ul" stagger>` instead, or apply
 * the `reveal` + `reveal-stagger` classes directly (see Industrial.module.css
 * for an example).
 *
 * The wrapper is intentionally a single element with no DOM cost beyond
 * the hook's ref. `as` controls the tag so semantics stay correct.
 */

import { useInView } from './useInView';
import type { ElementType, ReactNode } from 'react';

type Props = {
  /** Tag to render. Defaults to `div`. Use the same semantics the section
   *  would have used if the reveal were not there. */
  as?: ElementType;
  /** When the element is a flex/grid container, this will apply the
   *  `.reveal-stagger` group to its direct children. */
  stagger?: boolean;
  /** Stagger step between children, in ms. */
  staggerStep?: number;
  /** Optional className passthrough. */
  className?: string;
  children: ReactNode;
};

export default function Reveal({
  as: Tag = 'div',
  stagger = false,
  staggerStep = 60,
  className,
  children,
}: Props) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 });
  const cls = [
    'reveal',
    inView ? 'in' : '',
    stagger ? 'reveal-stagger' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  // CSS variables can't be set as React props directly through `style`
  // shorthand on the JSX form for an unknown tag; using a plain object
  // works for every case here.
  const style = stagger ? ({ ['--reveal-stagger-step']: `${staggerStep}ms` } as React.CSSProperties) : undefined;
  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={cls} style={style}>
      {children}
    </Tag>
  );
}
