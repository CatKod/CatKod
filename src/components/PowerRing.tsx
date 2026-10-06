/**
 * Power-sharing ring — Three.js.
 *
 * This is the hardest algorithm in the portfolio (power_borrow / power_reclaim
 * from the Sac_Link firmware) rendered as something a reader can watch run.
 * SPEC 6.5.4 chose Canvas 2D, but 14.1 overrode that to Three.js. The
 * compromise that keeps both constraints satisfiable: Three.js carries only
 * this one hero-grade moment and is code-split out of the initial bundle, so
 * the +150 KB never touches first paint. The precise part of the story -- the
 * two-directional search -- is drawn in 2D further down, where a diagram is
 * the correct tool.
 *
 * The ring is 16 cabinets in perspective, each holding two guns. A requesting
 * gun pulses; the algorithm walks the ring outward in both directions, ramps
 * an idle gun, transfers load, then reclaims it when the vehicle leaves.
 *
 * Deliberately not built from bare Three.js primitives as the main subject:
 * the cabinets are extruded and chamfered forms with edge lines, and the only
 * primitive used for atmosphere is the floor grid.
 */
import { useEffect, useRef, useState } from 'react';
import styles from './PowerRing.module.css';
// Type-only import: erased at compile time, so it adds nothing to the
// bundle. The runtime `import('three')` below stays dynamic and lazy.
import type * as THREE from 'three';

const CABINETS = 16;
const TOTAL_GUNS = CABINETS * 2;

type Phase = 'idle' | 'discover' | 'ramp' | 'transfer' | 'settle' | 'reclaim';

const COPY: Record<Phase, { title: string; body: string; step: string; supplying: number }> = {
  idle: {
    title: 'Waiting',
    body: 'All guns idle. The ring is in DISCOVERY, broadcasting station state roughly every 100 ms.',
    step: 'DISCOVERY',
    supplying: 1,
  },
  discover: {
    title: 'A gun needs more than it has',
    body: 'A vehicle requests more power than one power module can deliver. The firmware scans the ring outward in both directions looking for an idle gun.',
    step: 'power_borrow',
    supplying: 1,
  },
  ramp: {
    title: 'Ramping the donor',
    body: 'The donor gun’s current ramps up gradually. Ramp, never step — an abrupt load step would trip the upstream protection.',
    step: 'local_ctrl',
    supplying: 2,
  },
  transfer: {
    title: 'Load transferred',
    body: 'Capacity is shared across the link contactors. The requesting gun reaches its target without any single module exceeding its rating.',
    step: 'RUN',
    supplying: 3,
  },
  settle: {
    title: 'Borrowed power in use',
    body: 'The station is sharing load exactly as designed. No blocking, no HAL_Delay — everything is driven from the 1 ms soft-timer bank.',
    step: 'RUN',
    supplying: 3,
  },
  reclaim: {
    title: 'Reclaiming capacity',
    body: 'The vehicle finishes, or a new one arrives. Capacity is reclaimed from the edges inward, so the highest-priority demand is served first.',
    step: 'power_reclaim',
    supplying: 2,
  },
};

type PhaseSetter = (p: Phase) => void;

/** Live scene state, read each frame without re-running the effect. */
type SceneState = {
  readonly running: boolean;
  readonly hovered: number | null;
  hover: number | null;
};

/** Build the scene imperatively; resolves to a teardown function. */
async function buildScene(
  host: HTMLDivElement,
  canvas: HTMLCanvasElement,
  state: SceneState,
  onPhase: PhaseSetter,
  /** Render exactly one frame and stop. Used for reduced motion. */
  still = false,
) {
  const THREE = await import('three');

  const scene = new THREE.Scene();
  /* Fog does two jobs here: it gives the far arc of the ring some aerial
     perspective, and it keeps the horizon from reading as a hard edge. Kept
     deliberately thin -- the cabinets sit 22-34 units out, so density that
     looks reasonable in a small scene erases them completely at this scale. */
  scene.fog = new THREE.FogExp2(0x0b0d10, 0.0085);

  /* 40 degrees is a deliberate compromise. Wider and the cabinets near the
     camera splay outward into a fisheye; narrower and the far arc of the ring
     crops. The camera also sits high enough to look *down* on the ring, so it
     reads as a ring rather than as a wall of cabinets seen edge-on. */
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
  camera.position.set(0, 20, 27);
  camera.lookAt(0, 0.8, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setClearColor(0x0b0d10, 1);
  // Neutral rather than ACES: ACES pulls the midtones down hard, which is the
  // opposite of what this scene needs. Neutral rolls off only the highlights.
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.35;

  const COL = {
    ground: 0x0b0d10,
    panel: 0x8a97ad,
    edge: 0xb9c6da,
    power: 0xf2b632,
    run: 0x3dd68c,
    idle: 0x6f7d92,
  };

  /* ------------------------------------------------------- environment - */
  /* This is not optional decoration. A metalness value without an
     environment map to reflect renders as black, because metal has almost
     no diffuse response and its specular term has nothing to sample. That
     single omission is what made the first build of this scene invisible.
     A 64x32 gradient, prefiltered once, is enough to make the cabinets
     read as formed metal, and costs no meaningful bundle weight. */
  const envData = new Uint8Array(64 * 32 * 4);
  for (let y = 0; y < 32; y++) {
    // 0 at the top of the sphere, 1 at the floor.
    const t = y / 31;
    const k = t * t * (3 - 2 * t);
    for (let x = 0; x < 64; x++) {
      const i = (y * 64 + x) * 4;
      // Cool overhead light falling to a warm floor bounce: the same
      // amber-over-steel relationship the rest of the page is built on.
      envData[i] = Math.round(THREE.MathUtils.lerp(126, 46, k));
      envData[i + 1] = Math.round(THREE.MathUtils.lerp(152, 44, k));
      envData[i + 2] = Math.round(THREE.MathUtils.lerp(190, 42, k));
      envData[i + 3] = 255;
    }
  }
  const envSource = new THREE.DataTexture(envData, 64, 32, THREE.RGBAFormat);
  envSource.mapping = THREE.EquirectangularReflectionMapping;
  envSource.needsUpdate = true;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromEquirectangular(envSource);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 1.15;
  pmrem.dispose();
  envSource.dispose();

  /* ---------------------------------------------------------- lighting - */
  scene.add(new THREE.AmbientLight(0x9fb0c6, 0.7));

  const key = new THREE.DirectionalLight(0xfff4e2, 2.4);
  key.position.set(9, 20, 12);
  scene.add(key);

  // Cool rim from behind and to the left. Without a rim the far cabinets
  // have no edge separation from the background.
  const rim = new THREE.DirectionalLight(0x7fa8d8, 1.15);
  rim.position.set(-14, 7, -16);
  scene.add(rim);

  // Warm bounce from below, so the amber of the power glow reads on the
  // cabinet faces rather than only on the ring itself.
  const fill = new THREE.DirectionalLight(COL.power, 0.55);
  fill.position.set(-10, -4, -8);
  scene.add(fill);

  scene.add(new THREE.HemisphereLight(0x6d819c, 0x151a22, 0.85));

  /* ------------------------------------------------------------- floor - */
  // The one place a bare primitive is appropriate: atmosphere, not subject.
  const grid = new THREE.GridHelper(120, 40, COL.edge, 0x334052);
  const gridMat = grid.material as THREE.Material;
  gridMat.transparent = true;
  gridMat.opacity = 0.34;
  grid.position.y = -0.02;
  scene.add(grid);

  /* --------------------------------------------------------- the ring - */
  const R = 11.5;

  /* A pad the ring is set into. Without it the camera looks down onto an
     empty grid and the middle of the composition is a black hole; with it
     the ring reads as a station laid out on a slab. Deliberately plain
     geometry with a soft radial falloff rather than a texture -- the
     falloff is what gives the composition a centre of gravity. */
  const pad = new THREE.Mesh(
    new THREE.CircleGeometry(R * 1.16, 64),
    new THREE.MeshStandardMaterial({ color: 0x1b2330, metalness: 0.1, roughness: 0.9 }),
  );
  pad.rotation.x = -Math.PI / 2;
  pad.position.y = -0.04;
  scene.add(pad);

  // A bright apron just outside the ring, fading out to nothing. This is what
  // separates the cabinets from the horizon instead of letting them dissolve
  // into the fog, and it costs two primitives.
  const apron = new THREE.Mesh(
    new THREE.RingGeometry(R * 1.14, R * 2.6, 96, 1),
    new THREE.MeshBasicMaterial({
      color: 0x2b3648,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  apron.rotation.x = -Math.PI / 2;
  apron.position.y = -0.02;
  scene.add(apron);

  const linkMat = new THREE.MeshStandardMaterial({
    color: COL.idle,
    metalness: 0.4,
    roughness: 0.55,
  });

  type Cabinet = {
    group: THREE.Group;
    body: THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshStandardMaterial>;
    glow: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
    shaft: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshBasicMaterial>;
  };

  const cabinets: Cabinet[] = [];

  for (let i = 0; i < CABINETS; i++) {
    const angle = (i / CABINETS) * Math.PI * 2;
    const x = Math.cos(angle) * R;
    const z = Math.sin(angle) * R;

    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = -angle;

    // Cabinet: a chamfered extruded profile, so it reads as an enclosure
    // with a bevelled edge rather than as a box.
    const shape = new THREE.Shape();
    const w = 1.05;
    const d = 0.68;
    const c = 0.14;
    shape.moveTo(-w + c, -d);
    shape.lineTo(w - c, -d);
    shape.lineTo(w, -d + c);
    shape.lineTo(w, d - c);
    shape.lineTo(w - c, d);
    shape.lineTo(-w + c, d);
    shape.lineTo(-w, d - c);
    shape.lineTo(-w, -d + c);
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 2.1,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 2,
    });
    const body = new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({
        color: COL.panel,
        metalness: 0.35,
        roughness: 0.48,
      }),
    );
    body.rotation.x = -Math.PI / 2;
    body.position.y = 2.1;
    g.add(body);

    // Edge lines: the cheapest single thing that makes a form read as
    // technical hardware rather than as a grey blob.
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo, 25),
      new THREE.LineBasicMaterial({ color: COL.edge, transparent: true, opacity: 0.75 }),
    );
    edges.rotation.copy(body.rotation);
    edges.position.copy(body.position);
    g.add(edges);

    // The status band on the cabinet face. Separate mesh, because this is
    // what changes colour with the algorithm state.
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.7, 0.1),
      new THREE.MeshBasicMaterial({ color: COL.idle, transparent: true, opacity: 0.9 }),
    );
    glow.position.set(0, 1.72, 0.71);
    g.add(glow);

    // Two charging guns on the front face.
    const gunMat = new THREE.MeshStandardMaterial({
      color: 0x6b7689,
      metalness: 0.6,
      roughness: 0.3,
    });
    for (let k = 0; k < 2; k++) {
      const gun = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.5, 16), gunMat);
      gun.position.set(k === 0 ? -0.42 : 0.42, 1.15, 0.74);
      gun.rotation.x = Math.PI / 2.6;
      g.add(gun);
    }

    // A soft vertical light shaft over supplying guns. This is the one piece
    // of glow -- it is how a reader finds the active guns among 32.
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.5, 5.5, 12, 1, true),
      new THREE.MeshBasicMaterial({
        color: COL.run,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    shaft.position.set(0, 3.0, 0.7);
    g.add(shaft);

    // Contactor link toward the next cabinet.
    const nextAngle = ((i + 1) / CABINETS) * Math.PI * 2;
    const link = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.16, 0.4), linkMat);
    link.position.set((x + Math.cos(nextAngle) * R) / 2, 0.1, (z + Math.sin(nextAngle) * R) / 2);
    link.rotation.y = -nextAngle + Math.PI / 2;
    scene.add(link);

    scene.add(g);
    cabinets.push({ group: g, body, glow, shaft });
  }

  /* --------------------------------------------- the flow on the bus --- */
  // A tube carrying animated packets. The packets are the periodic
  // broadcast, so the ring is visibly alive even while paused.
  const flow = new THREE.Mesh(
    new THREE.TorusGeometry(R, 0.035, 8, 180),
    new THREE.MeshBasicMaterial({ color: COL.power, transparent: true, opacity: 0.5 }),
  );
  flow.rotation.x = Math.PI / 2;
  flow.position.y = 0.14;
  scene.add(flow);

  const packetMesh = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.13, 10, 10),
    new THREE.MeshBasicMaterial({ color: COL.power, transparent: true, opacity: 0.5 }),
    18,
  );
  const dummy = new THREE.Object3D();
  scene.add(packetMesh);

  /* ------------------------------------------------------ the cycle -- */
  const SEQUENCE: Phase[] = ['discover', 'ramp', 'transfer', 'settle', 'reclaim', 'idle'];

  /** Which cabinets are supplying, per phase. */
  const supplying = (p: Phase): number[] => {
    switch (p) {
      case 'discover':
      case 'idle':
        return [0];
      case 'ramp':
      case 'reclaim':
        return [0, 7];
      case 'transfer':
      case 'settle':
        return [0, 5, 11];
    }
  };

  /** What a click on a given cabinet means. */
  const phaseFor = (cabinet: number): Phase =>
    cabinet === 0 ? 'discover' : cabinet === 5 || cabinet === 11 ? 'ramp' : 'transfer';

  let step = 0;
  let clock = 0;
  let current = 0;
  let raf = 0;
  let last = performance.now();

  const setPhase = (p: Phase) => {
    const idx = SEQUENCE.indexOf(p);
    if (idx >= 0) step = idx;
    onPhase(p);
  };

  const setCabinet = (i: number, color: number, intensity: number) => {
    const cab = cabinets[i];
    cab.glow.material.color.setHex(color);
    cab.glow.material.opacity = intensity;
    cab.shaft.material.opacity = intensity * 0.16;
    cab.shaft.material.color.setHex(color);
  };

  /* ----------------------------------------------------- raycasting --- */
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let pointerActive = false;

  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    pointerActive = true;
  };
  const onPointerLeave = () => {
    pointerActive = false;
    state.hover = null;
  };
  const onClick = () => {
    // Clicking a cabinet is a real action, so this is legitimate
    // interaction: the narrative switches to that cabinet's role.
    if (state.hovered != null) setPhase(phaseFor(state.hovered));
  };
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerleave', onPointerLeave);
  canvas.addEventListener('click', onClick);

  /* -------------------------------------------------------- resizing -- */
  /* The framing is expressed as a single base derived from the ring's own
     radius, so the values that must stay in relationship -- camera height,
     distance, and the fov -- cannot drift apart at a breakpoint. resize()
     recomputes the base; the orbit below only ever adds an offset to it. */
  /** Distance the camera must sit back to frame a ring of radius R at fovY. */
  const frameRing = (r: number, fovY: number) =>
    (r * 1.34) / Math.tan((fovY * Math.PI) / 360) / 1.9;

  let baseRadius = frameRing(R, 40);
  let baseHeight = baseRadius * 0.74;
  /** Set once the render loop exists; used by resize() in still mode. */
  let redraw: (() => void) | null = null;

  const resize = () => {
    const rect = host.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    camera.aspect = w / h;
    // On a narrow viewport the frame goes tall, so widen the fov and pull
    // back to keep the whole ring in shot rather than cropping the far arc.
    const narrow = w < 640;
    const fov = narrow ? 46 : 40;
    camera.fov = fov;
    baseRadius = frameRing(R, fov) * (narrow ? 1.12 : 1);
    baseHeight = baseRadius * (narrow ? 0.8 : 0.74);
    camera.position.set(0, baseHeight, baseRadius);
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    // In still mode there is no rAF loop to pick up the new size, so a
    // resize has to trigger the redraw itself.
    if (redraw) redraw();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  const loop = () => {
    // A still frame is drawn once and then the loop stops rescheduling. The
    // resize observer stays live so the frame is re-rendered if the reader
    // rotates a phone, but no motion is ever produced.
    if (!still) raf = requestAnimationFrame(loop);
    const now = performance.now();
    // Cap dt so returning to a backgrounded tab does not fast-forward the
    // whole algorithm in a single frame.
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    clock += dt;

    if (state.running) {
      clock += dt * 1.6;
      if (clock > 3.4) {
        clock = 0;
        step = (step + 1) % SEQUENCE.length;
        onPhase(SEQUENCE[step]);
      }
    }
    current += ((state.running ? 1 : 0) - current) * 0.08;

    const phase: Phase = SEQUENCE[step];
    const active = supplying(phase);

    for (let i = 0; i < CABINETS; i++) {
      const isActive = active.includes(i);
      if (isActive) {
        // Ramp the colour in rather than snapping it, because the algorithm
        // itself ramps current.
        const t = phase === 'ramp' || phase === 'reclaim' ? 0.55 : 0.9;
        setCabinet(i, i === 0 ? COL.power : COL.run, t);
        cabinets[i].group.position.y = Math.sin(clock * 2.4 + i) * 0.05;
      } else {
        setCabinet(i, COL.idle, 0.45);
        cabinets[i].group.position.y *= 0.9;
      }
      cabinets[i].body.material.emissive.setHex(
        state.hovered === i ? 0x1a2436 : 0x000000,
      );
    }

    // Packets travel the ring; speed follows the play state, so pausing
    // genuinely pauses the system rather than just hiding the narration.
    const speed = 0.09 + current * 0.16;
    for (let p = 0; p < 18; p++) {
      const t = (clock * speed + p / 18) % 1;
      const a = t * Math.PI * 2;
      dummy.position.set(Math.cos(a) * R, 0.2, Math.sin(a) * R);
      dummy.scale.setScalar(0.7 + 0.3 * Math.sin(t * Math.PI));
      dummy.updateMatrix();
      packetMesh.setMatrixAt(p, dummy.matrix);
    }
    packetMesh.instanceMatrix.needsUpdate = true;
    packetMesh.material.opacity = 0.35 + current * 0.5;

    // A slow camera orbit keeps the perspective readable without becoming a
    // turntable that fights the content. It offsets the base framing from
    // resize() rather than replacing it.
    const orbit = Math.sin(clock * 0.12) * 0.16;
    camera.position.x = Math.sin(orbit) * baseRadius;
    camera.position.z = Math.cos(orbit) * baseRadius;
    camera.position.y = baseHeight;
    camera.lookAt(0, 1.1, 0);

    // Hover picking, only while the pointer is genuinely over the canvas.
    if (pointerActive) {
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(
        cabinets.map((c) => c.body),
        false,
      )[0];
      const found = hit ? cabinets.findIndex((c) => c.body === hit.object) : -1;
      state.hover = found >= 0 ? found : null;
      canvas.style.cursor = found >= 0 ? 'pointer' : 'default';
    }

    renderer.render(scene, camera);
  };
  redraw = loop;
  loop();

  return () => {
    cancelAnimationFrame(raf);
    redraw = null;
    ro.disconnect();
    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerleave', onPointerLeave);
    canvas.removeEventListener('click', onClick);

    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      mesh.geometry?.dispose();
      const m = mesh.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else if (m) (m as THREE.Material).dispose();
    });
    renderer.dispose();
  };
}

export default function PowerRing() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runRef = useRef(false);
  const hoverRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading');
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    runRef.current = running;
  }, [running]);

  // Respect the OS setting *before* any WebGL context is created. A reader
  // who asked for reduced motion gets a still frame, not a paused loop.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setReduced(mq.matches);
      if (mq.matches) setRunning(false);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let teardown: (() => void) | undefined;
    let cancelled = false;

    const state: SceneState = {
      get running() {
        return runRef.current;
      },
      get hovered() {
        return hoverRef.current;
      },
      hover: null,
    };

    // Build only when the section is close to the viewport: rendering 16
    // cabinets off-screen burns battery and animation frames for nothing.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || teardown || cancelled) return;
        // Under reduced motion the scene is still built, but `still` renders
        // exactly one frame: a reader who asked for less motion gets a static
        // picture of the ring, not a spinner that never resolves.
        buildScene(host, canvas, state, setPhase, reduced)
          .then((fn) => {
            if (cancelled) fn();
            else {
              teardown = fn;
              setStatus('ready');
            }
          })
          .catch(() => setStatus('failed'));
      },
      { rootMargin: '320px' },
    );
    io.observe(host);

    return () => {
      cancelled = true;
      io.disconnect();
      teardown?.();
    };
  }, [reduced]);

  const copy = COPY[phase];

  return (
    <div className={styles.wrap}>
      <div className={styles.stage} ref={hostRef}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          style={{ opacity: status === 'ready' ? 1 : 0 }}
          aria-hidden="true"
        />

        {status === 'loading' && <div className={styles.skeleton} aria-hidden="true" />}

        {status === 'failed' && (
          <p className={styles.failed}>
            This device could not start the 3D view. The diagram below shows the same
            algorithm.
          </p>
        )}

        <div className={styles.controls}>
          <button
            className={styles.play}
            onClick={() => setRunning((r) => !r)}
            disabled={reduced || status === 'failed'}
            aria-pressed={running}
          >
            {running ? 'Pause' : 'Run algorithm'}
          </button>
          {reduced && (
            <span className={styles.note}>Reduced motion is on — showing a still frame</span>
          )}
        </div>

        <dl className={styles.readout}>
          <div>
            <dt className="label">Step</dt>
            <dd className="readout">{copy.step}</dd>
          </div>
          <div>
            <dt className="label">Guns supplying</dt>
            <dd className="readout">
              {copy.supplying} / {TOTAL_GUNS}
            </dd>
          </div>
        </dl>
      </div>

      {/* The narration changes because the algorithm advanced — this motion
          answers a person's action rather than decorating the page. */}
      <div className={styles.narration} aria-live="polite">
        <p className={styles.step}>{copy.step}</p>
        <h3 className={styles.nTitle}>{copy.title}</h3>
        <p className={styles.nBody}>{copy.body}</p>
      </div>
    </div>
  );
}
