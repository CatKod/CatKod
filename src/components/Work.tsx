'use client';

import styles from './Work.module.css';
import { featured, others } from '@/content/projects';
import Reveal from '@/lib/Reveal';

export default function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="section-head">
        <h2 className="h-section" id="work-title">
          Selected work
        </h2>
      </div>

      <Reveal as="p" className={`lede ${styles.intro}`}>
        Everything here is public and can be cloned. The commercial firmware above is
        not — which is why this repository leads: it is the part a reviewer can
        actually run.
      </Reveal>

      <Reveal as="ul" className={styles.list} stagger staggerStep={70}>
        {featured.map((p) => (
          <li className={styles.item} key={p.id}>
            <div className={styles.itemHead}>
              <h3 className={styles.itemTitle}>
                <a href={p.href} target="_blank" rel="noopener noreferrer">
                  {p.title}
                </a>
              </h3>
              <span className={styles.badge}>{p.badge}</span>
            </div>

            <p className={`readout ${styles.sub}`}>{p.sub}</p>

            <p className={styles.body}>{p.description}</p>

            {/* The one line that makes a tech lead lean in. Only the two
                projects that have a genuine design decision get one. */}
            {p.callout ? <p className={styles.callout}>{p.callout}</p> : null}

            {p.outcome ? (
              <p className={styles.outcome}>
                <span className={styles.outcomeMark} aria-hidden="true" />
                {p.outcome}
              </p>
            ) : null}

            {p.image ? (
              <img
                className={styles.image}
                src={p.image.src}
                width={p.image.width}
                height={p.image.height}
                loading="lazy"
                decoding="async"
                alt={p.image.alt}
              />
            ) : null}

            <ul className={styles.tech} aria-label={`Technologies used in ${p.title}`}>
              {p.tech.map((t) => (
                <li className="readout" key={t}>
                  {t}
                </li>
              ))}
            </ul>

            <a
              className={styles.repo}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="readout">{p.hrefLabel}</span>
            </a>
          </li>
        ))}
      </Reveal>

      {/* The remainder as a ledger, not a card grid: this is reference
          material a reader scans, not work they are being sold. */}
      <div className={styles.more}>
        <h3 className={`label ${styles.moreHead}`}>Also on GitHub</h3>
        <Reveal as="dl" className={styles.ledger} stagger staggerStep={35}>
          {others.map((o) => (
            <div className={styles.ledgerRow} key={o.name}>
              <dt className={`readout ${styles.ledgerName}`}>
                <a href={o.href} target="_blank" rel="noopener noreferrer">
                  {o.name}
                </a>
              </dt>
              <dd className={styles.ledgerShows}>{o.shows}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
