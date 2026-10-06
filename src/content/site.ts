/**
 * Single source of truth for identity, contact and SEO.
 * The CV (§7) and the website are generated from this file so the numbers
 * can never drift apart.
 */

export const site = {
  name: 'Hoàng Kim Vĩnh',
  handle: 'CatKod',
  initials: 'KV',

  role: 'Embedded Firmware Engineer',
  org: 'Hanoi University of Science and Technology',
  studentId: 'HUST 20235876',
  location: 'Hanoi, Vietnam',
  timezone: 'GMT+7',

  /** The positioning statement from SPEC §3.1. */
  positioning:
    'Embedded Firmware Engineer working on commercial DC fast-charging firmware — CAN bus, MISRA C compliance, non-blocking state machines on STM32H7 — and building complete IoT products from PCB to mobile app.',

  /** <meta name="description"> — SPEC §10. */
  description:
    'STM32H7 · CAN 2.0B · MISRA C:2012 · State Machines. Industrial EV-charging firmware at APES Lab, HUST. JLPT N3. Open to Embedded roles in Japan.',

  /** Hero paragraph. Kept to ~30 words so the hero never becomes a wall. */
  lede:
    'I write production firmware for commercial DC fast-charging stations — CAN bus, MISRA C compliance, non-blocking state machines on STM32H7 — and build complete IoT products from PCB to mobile app.',

  url: 'https://catkod.github.io/CatKod/',

  email: 'kimvinhh6@gmail.com',

  links: {
    github: 'https://github.com/CatKod',
    githubUser: 'https://github.com/CatKod',
    linkedin: 'https://www.linkedin.com/in/kim-v%C4%A9nh-ho%C3%A0ng-9a306935a/',
    linkedinLabel: 'Hoàng Kim Vĩnh',
    facebook: 'https://web.facebook.com/HoangKiVinh',
    facebookLabel: 'HoangKiVinh',
    jlpt: 'https://www.jlpt.jp/',
  },

  /** Shown in the console rail. Drives the recruiter's "can I reach them?" test. */
  target: 'Full-time Embedded / IoT roles, ideally in Japan.',
} as const;

/** Hero keyword pills. Monospace, technical, no adjectives. */
export const heroTags = [
  'STM32H7',
  'CAN 2.0B',
  'MISRA C:2012',
  'State Machines',
  'ESP32 / ESP-IDF',
  'Edge AI on MCU',
  'JLPT N3',
] as const;

/**
 * SPEC §6.3. Every figure below is verifiable — three of the four come from
 * the open-source toolkit's CI, one from the capstone. Do not add a number
 * here that cannot be defended in an interview.
 */
export const stats = [
  {
    value: 32,
    display: '32',
    label: 'charging guns per power-sharing network',
    note: '16 cabinets × 2 channels, closed CAN ring',
  },
  {
    value: 11,
    display: '11',
    label: 'firmware modules, SPI-to-CAN to power algorithms',
    note: '4-layer architecture, upward-only calls',
  },
  {
    value: 89,
    display: '89',
    label: 'host unit tests passing under -Werror',
    note: 'CI on both gcc and clang',
  },
  {
    value: 10,
    display: '10/10',
    label: 'capstone grade as team lead',
    note: 'University capstone, graded 10/10',
  },
] as const;
