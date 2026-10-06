'use client';

import styles from './About.module.css';
import { about, contactIntro, contactLinks } from '@/content/about';
import { site } from '@/content/site';
import Reveal from '@/lib/Reveal';

export default function About() {
  return (
    <>
      <section className="section" id="about" aria-labelledby="about-title">
        <div className="section-head">
          <h2 className="h-section" id="about-title">
            About
          </h2>
        </div>
        <Reveal as="div" className={`prose ${styles.prose}`} stagger staggerStep={70}>
          {about.map((p) => (
            <p key={p.id}>{p.body}</p>
          ))}
        </Reveal>
      </section>

      <section className="section" id="contact" aria-labelledby="contact-title">
        <div className="section-head">
          <h2 className="h-section" id="contact-title">
            Contact
          </h2>
        </div>

        <Reveal as="p" className={`lede ${styles.intro}`}>
          {contactIntro}
        </Reveal>

        {/* Four routes, stacked as a ledger. The email is marked as the
            primary one because it is the one a Japan recruiter will use. */}
        <Reveal as="ul" className={styles.routes} stagger staggerStep={45}>
          {contactLinks.map((c) => (
            <li key={c.id}>
              <a
                className={styles.route}
                href={c.href}
                {...(c.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <span className={`label ${styles.routeLabel}`}>{c.label}</span>
                <span className={styles.routeValue}>
                  {c.id === 'email' ? <span className="readout">{c.value}</span> : c.value}
                </span>
                {c.primary ? <span className={styles.routeTag}>Primary</span> : null}
              </a>
            </li>
          ))}
        </Reveal>

        <p className={styles.colophon}>
          {site.name} · {site.role} · {site.org}
          <br />
          Based in {site.location} ({site.timezone}) · JLPT N3 · open to Embedded roles in
          Japan
        </p>
      </section>
    </>
  );
}
