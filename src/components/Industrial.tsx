'use client';

import styles from './Industrial.module.css';
import { nda } from '@/content/industrial';
import { asset } from '@/lib/assets';
import BorrowDiagram from './BorrowDiagram';
import PowerRingLazy from './PowerRingLazy';
import Reveal from '@/lib/Reveal';

export default function Industrial() {
  return (
    <section className="section" id="power-sharing" aria-labelledby="power-title">
      <div className="section-head">
        <h2 className="h-section" id="power-title">
          Industrial firmware
        </h2>
      </div>

      {/* The NDA marker is amber, the same colour as power on the ring. It
          is a status, not a decoration. */}
      <Reveal as="p" className={styles.badge}>
        <span className={styles.badgeDot} aria-hidden="true" />
        {nda.badge}
      </Reveal>

      <Reveal as="p" className={styles.disclaimer}>
        {nda.disclaimer}
      </Reveal>

      {/* ------------------------------------------------ the ring - */}
      <div className={styles.block}>
        <Reveal as="h3" className={styles.title}>
          {nda.ring.title}
        </Reveal>
        <Reveal as="p" className={`readout ${styles.sub}`}>
          {nda.ring.sub}
        </Reveal>
        <Reveal as="p" className={styles.summary}>
          {nda.ring.summary}
        </Reveal>

        <PowerRingLazy />

        <Reveal as="div" className={styles.diagram}>
          <h4 className={styles.diagramHead}>
            How the search is actually done
          </h4>
          <BorrowDiagram />
        </Reveal>

        {/* Each point carries a number, because "I worked on it" and "here is
            the engineering" have to be distinguishable in an interview. */}
        <Reveal as="ol" className={styles.points} stagger staggerStep={50}>
          {nda.ring.points.map((p) => (
            <li className={styles.point} key={p.title}>
              <h4 className={styles.pointTitle}>{p.title}</h4>
              <p className={styles.pointBody}>{p.body}</p>
            </li>
          ))}
        </Reveal>

        <Reveal as="ul" className={styles.tags} stagger staggerStep={25} aria-label="Technologies used">
          {nda.ring.tags.map((t) => (
            <li className="readout" key={t}>
              {t}
            </li>
          ))}
        </Reveal>
      </div>

      {/* -------------------------------------------- two-gun - */}
      <div className={styles.block}>
        <Reveal as="h3" className={styles.title}>
          {nda.twoGun.title}
        </Reveal>
        <Reveal as="p" className={`readout ${styles.sub}`}>
          {nda.twoGun.sub}
        </Reveal>
        <Reveal as="dl" className={styles.defList} stagger staggerStep={50}>
          {nda.twoGun.points.map((p) => (
            <div className={styles.defRow} key={p.title}>
              <dt className={styles.defTitle}>{p.title}</dt>
              <dd className={styles.defBody}>{p.body}</dd>
            </div>
          ))}
        </Reveal>
        <Reveal as="ul" className={styles.tags} stagger staggerStep={25} aria-label="Technologies used">
          {nda.twoGun.tags.map((t) => (
            <li className="readout" key={t}>
              {t}
            </li>
          ))}
        </Reveal>
      </div>

      {/* --------------------------------------------- robotics - */}
      <div className={styles.block}>
        <Reveal as="h3" className={styles.title}>
          {nda.robot.title}
        </Reveal>
        <Reveal as="p" className={styles.robotBadge}>
          {nda.robot.badge}
        </Reveal>
        <Reveal as="p" className={styles.summary}>
          {nda.robot.body}
        </Reveal>

        {/* Collapsed by default: supporting evidence, not the headline. */}
        <Reveal as="details" className={styles.details}>
          <summary className={styles.summary}>
            View the control interface
          </summary>
          {/* A plain <img> with width/height, not next/image: this project
              sets `images.unoptimized` for static export, under which
              next/image emits the src verbatim and never applies the basePath.
              Going through asset() is the one place the prefix is applied. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.robotImage}
            src={asset(nda.robot.image.src)}
            width={nda.robot.image.width}
            height={nda.robot.image.height}
            loading="lazy"
            decoding="async"
            alt={nda.robot.image.alt}
          />
        </Reveal>
      </div>
    </section>
  );
}
