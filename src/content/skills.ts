/** SPEC §6.6 — six skill groups, and SPEC §6.7 certifications. */

export type SkillGroup = {
  id: string;
  title: string;
  items: readonly string[];
};

export const skills: readonly SkillGroup[] = [
  {
    id: 'firmware',
    title: 'Firmware & embedded',
    items: [
      'STM32H7 / STM32F4',
      'STM32Cube HAL',
      'Bare-metal register work',
      'CAN 2.0B 29-bit',
      'FDCAN',
      'SPI-to-CAN (MCP2515)',
      'MISRA C:2012',
      'cppcheck',
      'Hierarchical state machines',
      'Non-blocking + soft timers',
      'FreeRTOS',
      'ESP-IDF',
      'PlatformIO',
      'Bootloader / IAP',
      'USB Host',
      'FATFS',
    ],
  },
  {
    id: 'protocols',
    title: 'Protocols & connectivity',
    items: [
      'OCPP',
      'GB/T 27930',
      'DLT-645',
      'MQTT — topic design, QoS, retain, LWT',
      'UART / RS485 / Modbus',
      'WIZnet Ethernet (W5100 → W6300)',
      'Wi-Fi provisioning',
      'Framed ASCII protocol with checksum + resync',
    ],
  },
  {
    id: 'hardware',
    title: 'Hardware & power',
    items: [
      'EasyEDA Pro',
      'Contactor, power module, current/voltage ramping',
      'DHT · PIR · RFID RC522 · LDR · NTC · rain',
      '74HC595 shift register',
      'PT1000',
      'Insulation monitoring (IMD)',
      'Safe sequential switching',
      'Logic analyser',
      'Fault injection',
    ],
  },
  {
    id: 'gui',
    title: 'Embedded GUI',
    items: [
      'TouchGFX on STM32H7',
      'LVGL on ESP32-P4',
      'EEZ Studio',
      'MIPI-DSI — ST7701, ILI9881C',
      'I/O expander PCA9536',
      'Layout and screen-state design',
    ],
  },
  {
    id: 'ai',
    title: 'Edge AI & software',
    items: [
      'YOLOv11n',
      'PyTorch',
      'On-device inference (decision tree, rule-based)',
      'OpenCV',
      'Python',
      'FastAPI',
      'Flask',
      'TypeScript',
      'NestJS',
      'PostgreSQL',
      'Prisma',
      'WebSocket',
      'Flutter',
      'React',
    ],
  },
  {
    id: 'quality',
    title: 'Quality & process',
    items: [
      'Host unit tests for firmware against a mocked HAL',
      'Enforced four-layer architecture',
      'Single-writer ownership',
      'Test bench and soak testing',
      'Bus load and jitter measurement',
      'Automated report generation (Python, Node.js)',
      'Markdown → docx',
    ],
  },
];

/**
 * SPEC §6.7. Grouped by specialisation rather than listed flat, and ordered
 * so the language certificate is visible before the AI ones — JLPT N3 is the
 * reason a Japan recruiter keeps reading, the Coursera courses only explain
 * the Edge AI work.
 */
export type Certification = {
  title: string;
  issuer: string;
  period?: string;
  href?: string;
  items?: readonly string[];
};

export const certifications: readonly Certification[] = [
  {
    title: 'Japanese Language Proficiency Test — N3',
    issuer: 'Japan Foundation',
    href: 'https://www.jlpt.jp/',
  },
  {
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI × Stanford University',
    period: 'Apr – May 2025',
    items: [
      'Supervised ML: Regression & Classification',
      'Advanced Learning Algorithms',
      'Unsupervised Learning, Recommender Systems & RL',
      'ML Capstone',
    ],
  },
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    period: 'Jul 2025',
    items: ['Neural Networks and Deep Learning'],
  },
];
