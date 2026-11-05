/**
 * Public work. SPEC §6.4.
 *
 * Ordering is deliberate, not chronological: the toolkit leads because it is
 * the only *public* proof of MISRA-level coding discipline. A recruiter
 * cannot read NDA code, so this repository is what they can actually check.
 */

export type Project = {
  id: string;
  title: string;
  badge: string;
  sub: string;
  description: string;
  /** The line that makes a tech lead lean in. Only the flagship has one. */
  callout?: string;
  tech: readonly string[];
  href: string;
  hrefLabel: string;
  /** Measured / graded outcome, if one exists. Never invent these. */
  outcome?: string;
  /** Set when a screenshot has been supplied for this project. */
  image?: { src: string; width: number; height: number; alt: string };
  featured?: boolean;
};

export const featured: readonly Project[] = [
  {
    id: 'toolkit',
    title: 'embedded-iot-toolkit',
    badge: 'Open source · MIT · 89 tests',
    sub: 'Portable C99 · zero dependencies',
    description:
      'A dependency-free C99 library of the firmware building blocks I keep rewriting: a non-blocking timer bank, an ISR-safe framed serial protocol with checksums and resynchronisation, a CAN 2.0B 29-bit codec with a bit-timing solver, and sensor decoders that report staleness instead of returning a stale value.',
    callout:
      'This is the public evidence of the engineering discipline the commercial firmware has to keep under NDA — a reviewer can clone it and run the tests.',
    tech: ['C99', 'CAN 2.0B', 'MISRA C', 'cppcheck', 'Unity', 'zero dependencies'],
    href: 'https://github.com/CatKod/embedded-iot-toolkit',
    hrefLabel: 'github.com/CatKod/embedded-iot-toolkit',
    outcome: '89 host unit tests passing under -Werror on gcc and clang',
    featured: true,
  },
  {
    id: 'rokid-max-diy-station',
    title: 'rokid-max-diy-station',
    badge: 'Released · MIT · 218 tests',
    sub: 'C# / .NET 8 · Direct3D 11 · USB HID IMU · IddCx virtual display',
    description:
      'Turns Rokid Max AR glasses into a spatial Windows display. The glasses’ onboard IMU is read over USB HID and fused into a stable 3-DoF head pose with a Mahony filter; an IddCx indirect display driver creates a real virtual monitor, Windows.Graphics.Capture grabs its DWM-composed desktop, and Direct3D 11 re-projects it as a 3D-anchored quad on the Micro-OLED that stays where you put it.',
    callout:
      'The panel is a real Windows display, not a recorded video — the OS does the hit-testing, focus and input, so every application works and clicks land where you expect them.',
    tech: [
      'C#',
      '.NET 8',
      'Direct3D 11',
      'WPF',
      'USB HID',
      'Windows Graphics Capture',
      'IddCx',
      'Mahony filter',
      'FreeTrack',
      'xUnit',
    ],
    href: 'https://github.com/CatKod/rokid-max-diy-station',
    hrefLabel: 'github.com/CatKod/rokid-max-diy-station',
    outcome: '218 xUnit tests passing · self-contained Windows release',
  },
  {
    id: 'smarthome',
    title: 'SmartHome',
    badge: 'University capstone · 10/10',
    sub: 'STM32H7 + ESP32-S3 · TouchGFX · RFID · MQTT',
    description:
      'A two-tier architecture where the real-time MCU never depends on the cloud for safety. The ESP32-S3 handles Wi-Fi and MQTT; the STM32H7 owns the hardware. RFID and PIN entry, a shift-register LED bus, environmental sensors and an automatic window actuator.',
    callout:
      'MQTT and the dashboard can never drive hardware directly. Every command is validated by the STM32H7 before an actuator moves.',
    tech: [
      'STM32H7',
      'ESP32-S3',
      'ESP-IDF',
      'TouchGFX',
      'FreeRTOS',
      'MQTT',
      'RFID RC522',
      '74HC595',
    ],
    href: 'https://github.com/CatKod/SmartHome',
    hrefLabel: 'github.com/CatKod/SmartHome',
    outcome: 'Team lead · graded 10/10',
  },
  {
    id: 'outlet',
    title: 'Smart Power Outlet',
    badge: 'Graduation capstone · solo',
    sub: 'EasyEDA PCB · ESP-IDF firmware · Flutter app',
    description:
      'A complete IoT product rather than a board: the PCB was designed in EasyEDA Pro, the firmware is ESP-IDF with Wi-Fi provisioning so no credential is ever hardcoded, a PlatformIO build covers both ESP32 and ESP8266, and a cross-platform Flutter app drives it.',
    tech: [
      'ESP32',
      'ESP8266',
      'ESP-IDF',
      'PlatformIO',
      'Wi-Fi provisioning',
      'EasyEDA Pro',
      'Flutter',
      'Dart',
    ],
    href: 'https://github.com/CatKod/Smart_Power_Outlet',
    hrefLabel: 'github.com/CatKod/Smart_Power_Outlet',
    outcome: 'Solo · final-year capstone',
  },
  {
    id: 'sun-car',
    title: 'Sun-Car Damage Assessment',
    badge: 'SUN scholarship project',
    sub: 'Computer vision · ESP32-CAM → STM32 bridge · Edge AI',
    description:
      'A computer vision pipeline for object detection, instance segmentation and severity scoring, built to apply for a SUN scholarship. An ESP32-CAM captures frames and streams the result to an STM32 over UART, so inference sits on the edge rather than in the cloud.',
    tech: ['Computer vision', 'PyTorch', 'OpenCV', 'ESP32-CAM', 'STM32', 'UART', 'Flask', 'Streamlit'],
    href: 'https://github.com/CatKod/Sun-Car-Damage-AI-Assessment',
    hrefLabel: 'github.com/CatKod/Sun-Car-Damage-AI-Assessment',
  },
];

/** SPEC §6.4 "remaining projects" — a ledger, not a card grid. */
export const others: readonly {
  name: string;
  shows: string;
  href: string;
}[] = [
  {
    name: 'Yootek SmartGarden',
    shows: 'Enterprise internship — ESP32/ESP-IDF firmware with a NestJS + PostgreSQL + MQTT + WebSocket backend, JWT auth and role-based access control',
    href: 'https://github.com/CatKod/Yootek-IOT-intern',
  },
  {
    name: 'Attendance_Check',
    shows: 'A system actually running in production at a university lab — Next.js admin, Electron kiosk, Expo mobile app, Supabase',
    href: 'https://github.com/CatKod/Attendance_Check',
  },
  {
    name: 'AIoT-Face_And_Order',
    shows: 'ESP32-CAM capture to an HTTP server running OpenCV face detection, with a live web stream',
    href: 'https://github.com/CatKod/AIoT-Face_And_Order',
  },
];
