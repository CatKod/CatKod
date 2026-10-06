import styles from './Toolchain.module.css';
import type { Certification } from '@/content/skills';

export default function CertList({ items }: { items: readonly Certification[] }) {
  return (
    <dl className={styles.certList}>
      {items.map((c) => (
        <div className={styles.cert} key={c.title}>
          <dt className={styles.certTitle}>
            {c.href ? (
              <a href={c.href} target="_blank" rel="noopener noreferrer">
                {c.title}
              </a>
            ) : (
              c.title
            )}
          </dt>
          <dd className={styles.certMeta}>
            <span className="readout">{c.issuer}</span>
            {c.period ? <span className={styles.certPeriod}>{c.period}</span> : null}
          </dd>
          {c.items ? (
            <dd className={styles.certItems}>
              <ul>
                {c.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
