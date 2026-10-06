'use client';

import dynamic from 'next/dynamic';
import styles from './Industrial.module.css';

/**
 * Client boundary for the 3D scene.
 *
 * `ssr: false` is not permitted in a Server Component, so the dynamic import
 * lives here instead. This is the wrapper that keeps Three.js out of the
 * initial bundle: the library is fetched only when this section approaches
 * the viewport, and never on the critical path to LCP.
 */
const PowerRing = dynamic(() => import('./PowerRing'), {
  ssr: false,
  loading: () => <div className={styles.ringPlaceholder} aria-hidden="true" />,
});

export default function PowerRingLazy() {
  return <PowerRing />;
}
