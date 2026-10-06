'use client';

import styles from './BorrowDiagram.module.css';
import { useInView } from '@/lib/useInView';

/**
 * The two-directional search, drawn precisely.
 *
 * SPEC §6.5.4 argued that a 2D diagram is the right tool for this part, and
 * that is correct: what needs to be legible here is *which neighbours were
 * examined in which order*, and that is a sequence, not a space. The 3D ring
 * above shows the system; this shows the algorithm.
 *
 * Pure SVG, no JavaScript beyond a single IntersectionObserver. The two
 * search arcs draw themselves in once the figure scrolls into view — it
 * reads as "the search is running" rather than "the search already finished
 * before you got here." Stroke length is normalised with `pathLength="1"`
 * so the CSS keyframes do not have to know the real arc length.
 */

/** Cabinet indices, clockwise, as they appear in the firmware. */
const NODES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] as const;

const SIZE = 420;
const C = SIZE / 2;
const R = 138;

/** Point on the ring for cabinet `i`, 0 at the top, clockwise. */
function pt(i: number, radius = R) {
  const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
  return { x: C + Math.cos(a) * radius, y: C + Math.sin(a) * radius };
}

/**
 * Arc going forward (clockwise) from a to b, the short way round.
 * Both the call sites that need an "outward" arc instead of the short way
 * round — the firmware's counter-clockwise scan — route through `arcBack`,
 * so the two are not conflated.
 */
function arc(a: number, b: number, radius: number) {
  const p1 = pt(a, radius);
  const p2 = pt(b, radius);
  // Modulo arithmetic, same as the firmware.
  const forward = (b - a + NODES.length) % NODES.length;
  const large = forward > NODES.length / 2 ? 1 : 0;
  const sweep = 1; // forward arc
  return `M ${p1.x} ${p1.y} A ${radius} ${radius} 0 ${large} ${sweep} ${p2.x} ${p2.y}`;
}

/**
 * Arc going the *long* way from a to b. Used for the counter-clockwise
 * scan, where the firmware decrements the cabinet index and reaches
 * cabinet `b` by walking backwards through the ring, not by taking the
 * short arc to the next one forward.
 */
function arcBack(a: number, b: number, radius: number) {
  const p1 = pt(a, radius);
  const p2 = pt(b, radius);
  const forward = (b - a + NODES.length) % NODES.length;
  const large = forward > NODES.length / 2 ? 1 : 0;
  const sweep = 0; // backward arc
  return `M ${p1.x} ${p1.y} A ${radius} ${radius} 0 ${large} ${sweep} ${p2.x} ${p2.y}`;
}

const SEARCH_CW = [0, 1, 2, 3, 4];
const SEARCH_CCW = [0, 15, 14, 13, 12];
const TARGETS = new Set([4, 12]);

export default function BorrowDiagram() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.25 });
  return (
    <figure ref={ref} className={`${styles.figure} ${inView ? styles.in : ''}`}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label="Diagram of the two-directional ring search. Cabinet 0 needs more power. The firmware scans clockwise through cabinets 1, 2, 3, 4 and anticlockwise through 15, 14, 13, 12. Cabinets 4 and 12 are the first idle guns found in each direction, and 12 is closer, so it is selected."
      >
        <defs>
          <marker
            id="arrow-cw"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" className={styles.arrowHead} />
          </marker>
          <marker
            id="arrow-ccw"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" className={styles.arrowHeadAlt} />
          </marker>
        </defs>

        {/* The bus. */}
        <circle className={styles.bus} cx={C} cy={C} r={R} />

        {/* The two search paths, drawn as arcs just inside and just outside
            the bus. Radius *and* colour both encode direction, so the
            distinction survives a monochrome print or a colour-blind reader. */}
        <g className={styles.cw}>
          {SEARCH_CW.slice(0, -1).map((from, i) => (
            <path
              key={`cw-${from}`}
              d={arc(from, SEARCH_CW[i + 1], R - 13)}
              pathLength="1"
              markerEnd="url(#arrow-cw)"
            />
          ))}
        </g>
        <g className={styles.ccw}>
          {SEARCH_CCW.slice(0, -1).map((from, i) => (
            <path
              key={`ccw-${from}`}
              d={arcBack(from, SEARCH_CCW[i + 1], R + 13)}
              pathLength="1"
              markerEnd="url(#arrow-ccw)"
            />
          ))}
        </g>

        {/* The cabinets. */}
        {NODES.map((i) => {
          const p = pt(i);
          const isSource = i === 0;
          const isTarget = TARGETS.has(i);
          const isScanned = SEARCH_CW.includes(i) || SEARCH_CCW.includes(i);
          const step = isSource ? 0 : isTarget ? 1 : 2;

          return (
            <g key={i} className={styles.node} data-step={step}>
              <rect
                className={
                  isSource
                    ? styles.cabSource
                    : isTarget
                      ? styles.cabTarget
                      : styles.cab
                }
                x={p.x - 11}
                y={p.y - 8}
                width="22"
                height="16"
                rx="2"
              />
              <text className={styles.nodeNum} x={p.x} y={p.y + 3.5}>
                {i}
              </text>
              {isScanned && !isSource && (
                <circle className={styles.scanned} cx={p.x} cy={p.y - 14} r="2" />
              )}
            </g>
          );
        })}

        {/* Centre annotation: why cabinet 12 wins. */}
        <text className={styles.centre} x={C} y={C - 8}>
          distance
        </text>
        <text className={styles.centreStrong} x={C} y={C + 16}>
          12 wins — 4 hops
        </text>
      </svg>

      <figcaption className={styles.caption}>
        <ul className={styles.legend}>
          <li>
            <span className={`${styles.swatch} ${styles.sSource}`} aria-hidden="true" />
            Requesting gun — needs more than its own power module
          </li>
          <li>
            <span className={`${styles.swatch} ${styles.sTarget}`} aria-hidden="true" />
            First idle gun found in each direction
          </li>
          <li>
            <span className={`${styles.swatch} ${styles.sIdle}`} aria-hidden="true" />
            Already supplying — skipped
          </li>
        </ul>
        <p className={styles.note}>
          Traversal is plain modulo arithmetic over the cabinet count, so the ring
          needs no special case for the wrap between the last cabinet and the first. The
          nearer candidate in hop count wins, which keeps the transfer path short and
          the contactor duty low.
        </p>
      </figcaption>
    </figure>
  );
}
