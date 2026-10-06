'use client';

import { useEffect, useState } from 'react';
import styles from './ConsoleRail.module.css';
import { site } from '@/content/site';
import { nda } from '@/content/industrial';

/**
 * Console rail — the persistent left pane.
 *
 * The concept: this is not a navigation menu, it is the front panel of the
 * station. It shows the same ring topology as the flagship 3D visualizer, so
 * a reader learns the mental model before they ever reach the algorithm, and
 * the page navigation reads as station addresses rather than as a list of
 * links.
 *
 * The ring here is pure SVG with a CSS-animated dashed stroke: zero
 * JavaScript, and a media query can genuinely stop it.
 */

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'power-sharing', label: 'Power sharing', restricted: true },
  { id: 'work', label: 'Work' },
  { id: 'toolchain', label: 'Toolchain' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;

/** 16 cabinets on the ring. Index 0 is the requesting gun. */
const ACTIVE = new Set([0, 5, 11]);

function RingSchematic() {
  return (
    <svg
      className={styles.ring}
      viewBox="0 0 120 120"
      role="img"
      aria-label={`Schematic of the ${nda.ring.title.toLowerCase()}: sixteen cabinets in a closed ring, with three guns currently supplying power`}
    >
      {/* The bus itself. The dashed overlay is packets on CAN. */}
      <circle className={styles.ringBus} cx="60" cy="60" r="46" />
      <circle className={styles.ringFlow} cx="60" cy="60" r="46" />

      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2 - Math.PI / 2;
        const x = 60 + Math.cos(angle) * 46;
        const y = 60 + Math.sin(angle) * 46;
        const isActive = ACTIVE.has(i);

        return (
          <g key={i}>
            {/* The cabinet. */}
            <rect
              className={isActive ? styles.cabinetActive : styles.cabinet}
              x={x - 4.5}
              y={y - 3.5}
              width="9"
              height="7"
              rx="1"
              transform={`rotate(${(angle * 180) / Math.PI} ${x} ${y})`}
            />
            {/* Its two guns. */}
            <rect
              className={isActive ? styles.gunActive : styles.gun}
              x={x - 5.5}
              y={y - 9}
              width="4"
              height="2.5"
              rx="0.5"
              transform={`rotate(${(angle * 180) / Math.PI} ${x} ${y})`}
            />
            <rect
              className={isActive ? styles.gunActive : styles.gun}
              x={x + 1.5}
              y={y - 9}
              width="4"
              height="2.5"
              rx="0.5"
              transform={`rotate(${(angle * 180) / Math.PI} ${x} ${y})`}
            />
          </g>
        );
      })}

      {/* The requesting gun, called out. */}
      <circle className={styles.request} cx="60" cy="14" r="2.5" />
    </svg>
  );
}

export default function ConsoleRail() {
  const [active, setActive] = useState<string>('overview');
  const [utc, setUtc] = useState<string>('');

  // Scroll-spy. Written by hand rather than pulled from a library: this is
  // the only part of the page that needs a scroll listener, and a dependency
  // for it would cost more than the twenty lines below.
  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The section occupying the most of the viewport wins, which avoids
        // the flicker you get when two sections both cross the threshold.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.75, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // A Japan-targeted portfolio should state its own timezone rather than
  // leave a reader in Hanoi wondering whether to wait until morning.
  useEffect(() => {
    const tick = () =>
      setUtc(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Ho_Chi_Minh',
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <aside className={styles.rail} aria-label="Station console">
      <div className={styles.ident}>
        <a className={styles.wordmark} href="#overview">
          <span className={styles.mark}>KV</span>
          <span className={styles.markDot} aria-hidden="true" />
        </a>
        <p className={styles.name}>{site.name}</p>
        <p className={styles.role}>{site.role}</p>
        <p className={styles.affil}>
          {site.org} · {site.studentId}
        </p>
      </div>

      <div className={styles.status}>
        <span className={styles.pip} aria-hidden="true" />
        <span>Open to Embedded roles in Japan</span>
      </div>

      {/* The panel that names the page. Learning the ring shape here is
          deliberate: it is the same topology the 3D section expands on. */}
      <figure className={styles.panel}>
        <RingSchematic />
        <figcaption>
          <span className="label">Station topology</span>
          <span className={styles.caption}>
            16 cabinets · 32 guns · closed CAN ring
          </span>
        </figcaption>
      </figure>

      <nav className={styles.nav} aria-label="Sections">
        <h2 className={`label ${styles.navHead}`}>Navigate</h2>
        <ul className={styles.navList}>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                className={styles.navLink}
                data-active={active === s.id || undefined}
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
              >
                <span className={styles.navLed} aria-hidden="true" />
                <span className={styles.navLabel}>{s.label}</span>
                {'restricted' in s && s.restricted ? (
                  <span className={styles.navTag}>NDA</span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.foot}>
        <a className={styles.mail} href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <dl className={styles.footMeta}>
          <div>
            <dt className="label">Local</dt>
            <dd className="readout">{utc || '—:—'}</dd>
          </div>
          <div>
            <dt className="label">TZ</dt>
            <dd className="readout">GMT+7</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}
