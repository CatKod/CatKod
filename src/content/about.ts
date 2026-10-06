/** SPEC §6.8 — three paragraphs, and the leadership line. */
export const about = [
  {
    id: 'now',
    body: 'I am a final-year Information Technology student at Hanoi University of Science and Technology. Most of my firmware work happens at APES Lab, where I contribute to a commercial DC fast-charging station developed with a partner manufacturer. The code is under NDA, but the technical scope is what I do every day.',
  },
  {
    id: 'ai',
    body: 'My AI background is formal rather than self-taught: a Machine Learning Specialization (DeepLearning.AI × Stanford) and a Deep Learning Specialization. That foundation is what lets me run models on-device — YOLOv11n for vehicle damage assessment, and a Vietnamese voice-command classifier that runs entirely on an ESP32-P4 with no cloud dependency.',
  },
  {
    id: 'lead',
    body: 'Since my first year I have led or co-led every team project I have been part of. I also keep a personal hardware notebook — schematics, pinouts, datasheets and wiring notes for every board I have touched — so the next time that hardware comes up I am not starting from zero.',
  },
] as const;

/** SPEC §6.9 — the closing line. Plain, direct, no hedging. */
export const contactIntro =
  'I am targeting full-time Embedded / IoT roles, ideally in Japan. If you are hiring and this looks like a fit, I would be glad to talk.';

export type ContactLink = {
  id: string;
  label: string;
  value: string;
  href: string;
  /** Only the email is a route a recruiter will actually use. */
  primary?: boolean;
};

export const contactLinks: readonly ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'kimvinhh6@gmail.com',
    href: 'mailto:kimvinhh6@gmail.com',
    primary: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'Hoàng Kim Vĩnh',
    href: 'https://www.linkedin.com/in/kim-v%C4%A9nh-ho%C3%A0ng-9a306935a/',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/CatKod',
    href: 'https://github.com/CatKod',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    value: 'HoangKiVinh',
    href: 'https://web.facebook.com/HoangKiVinh',
  },
];
