'use client';

import styles from './Toolchain.module.css';
import { certifications, skills } from '@/content/skills';
import CertList from './CertList';
import Reveal from '@/lib/Reveal';

export default function Toolchain() {
  return (
    <section className="section" id="toolchain" aria-labelledby="toolchain-title">
      <div className="section-head">
        <h2 className="h-section" id="toolchain-title">
          Toolchain
        </h2>
      </div>

      {/* Six groups on a hairline grid. No cards, no shadows: this is a
          reference table, and reference tables should look like tables. */}
      <Reveal as="dl" className={styles.grid} stagger staggerStep={50}>
        {skills.map((g) => (
          <div className={styles.group} key={g.id}>
            <dt className={styles.groupTitle}>{g.title}</dt>
            <dd className={styles.groupItems}>
              <ul>
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </Reveal>

      <div className={styles.certs}>
        <h3 className={`label ${styles.certsHead}`}>Certifications</h3>
        <CertList items={certifications} />
      </div>
    </section>
  );
}
