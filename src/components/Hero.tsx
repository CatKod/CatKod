'use client';

import styles from './Hero.module.css';
import { heroTags, site, stats } from '@/content/site';
import CountUp from '@/lib/CountUp';

const CTA = [
  { label: 'See the ring algorithm', href: '#power-sharing', primary: true },
  { label: 'Toolkit on GitHub', href: 'https://github.com/CatKod/embedded-iot-toolkit' },
  { label: 'GitHub', href: site.links.github },
  { label: 'LinkedIn', href: site.links.linkedin },
];

// `display` is the static text rendered when JS is off or the user has
// asked for less motion. The counter reads `value` and an optional
// `suffix`; for the capstone, `value` is 10 and the "/10" sits in the
// static note below, so the counter just paints "10".
const plainFormat = (n: number) => String(Math.round(n));

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* The single orchestrated moment on the page. Everything after this
          appears in place, without a per-section entrance animation. */}
      <div className={styles.stagger}>
        <p className={`label ${styles.eyebrow}`}>
          {site.location} · {site.org}
        </p>

        <h1 className={`display ${styles.title}`} id="hero-title">
          Firmware that
          <br />
          <span className={styles.titleAccent}>borrows power.</span>
        </h1>

        <p className={`lede ${styles.lede}`}>{site.lede}</p>

        <ul className={styles.tags} aria-label="Primary technologies">
          {heroTags.map((t) => (
            <li className="readout" key={t}>
              {t}
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          {CTA.map((c) => (
            <a
              className={c.primary ? styles.btnPrimary : styles.btn}
              href={c.href}
              key={c.label}
              {...(c.href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>

      {/* Figures are the evidence, so they get a readout treatment rather
          than being dressed up as four marketing stat cards. */}
      <dl className={styles.stats}>
        {stats.map((s) => (
          <div className={styles.stat} key={s.label}>
            <dt className={styles.statLabel}>{s.label}</dt>
            <dd className={`readout ${styles.statValue}`}>
              <CountUp target={s.value} format={plainFormat} />
            </dd>
            <dd className={styles.statNote}>{s.note}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
