/**
 * The NDA-protected commercial work. SPEC §6.5.
 *
 * Content rule that overrides everything else here (SPEC §13): describe
 * technical scope only. No customer name, no person's name, no phone
 * number, no contract code, no device serial, no staffing table, no
 * internal screenshots. The code cannot be shown, so the *scope* is the
 * evidence — and scope is what a hiring manager actually wants to hear.
 */

export const nda = {
  badge: 'NDA — code not public',
  disclaimer:
    'This work is under a non-disclosure agreement, so there is no code and no repository. What follows is the technical scope I am responsible for, described precisely enough to be useful and vague enough to stay legal.',

  /** The flagship: the ring power-sharing network. */
  ring: {
    id: 'ring',
    title: 'DC fast-charging power-sharing network',
    sub: 'STM32H723 · CAN 2.0B 29-bit ring · MISRA C:2012',
    summary:
      'A multi-gun DC charging network wired as a closed ring. When one vehicle demands more power than its own power module can deliver, the firmware autonomously borrows capacity from idle guns and reclaims it when the vehicle finishes or a new one arrives.',
    points: [
      {
        title: 'Four-layer architecture',
        body: 'Application → Middleware (Service / FSM / Control) → Driver → HAL, with upward-only calls enforced. Drivers hold no state machine and know nothing about the protocol above them.',
      },
      {
        title: 'SPI-to-CAN driver stack',
        body: 'MCP2515 over SPI, bit-timing solved for 125 kbit/s, frames buffered at ISR level, automatic bus-off recovery.',
      },
      {
        title: 'CAN frame codec',
        body: '29-bit IDs packed from six named fields with explicit shift/mask definitions, and a range check on every field before it is accepted.',
      },
      {
        title: 'Distributed power algorithms',
        body: 'Ring traversal by modulo, two-directional search for an idle gun, event-priority reclamation, and a safe contactor open that ramps current to zero before the breaker releases.',
      },
      {
        title: 'Station state machine',
        body: 'INIT → DISCOVERY → RUN → SAFE, absolutely non-blocking. No HAL_Delay() anywhere in the control path; timing comes from a 1 ms soft-timer bank.',
      },
      {
        title: 'Single-writer ownership',
        body: 'Every shared variable has exactly one writing task, which removes data races by construction rather than by locking.',
      },
      {
        title: 'Quality pipeline',
        body: 'cppcheck with the MISRA addon, host unit tests against a mocked HAL, fault injection (welded contactor, unplugged CAN, dead current sensor), logic-analyser verification, and a 24-hour soak test.',
      },
    ],
    tags: [
      'STM32H723',
      'FDCAN',
      'CAN 2.0B 29-bit',
      'MCP2515 over SPI',
      'MISRA C:2012',
      'cppcheck',
      'Unity',
      'bootloader / IAP',
      'USB Host',
      'FATFS',
      'OCPP',
      'GB/T 27930',
      'DLT-645',
      'WIZnet Ethernet',
    ],
  },

  /** The foundation firmware the ring was developed on top of. */
  twoGun: {
    id: 'two-gun',
    title: 'Two-gun DC charger firmware',
    sub: 'STM32 · OCPP · GB/T 27930 · DLT-645',
    points: [
      {
        title: 'Seven WIZnet Ethernet parts',
        body: 'One driver covering W5100, W5100S, W5200, W5300, W5500, W6100 and W6300.',
      },
      {
        title: 'Charging protocol stack',
        body: 'OCPP for charge-point management, GB/T 27930 for the vehicle side, DLT-645 for DC energy metering.',
      },
      {
        title: 'Bootloader and recovery paths',
        body: 'Firmware delivery over both USB and Ethernet, USB Host with FATFS for log export, RFID authorisation, insulation monitoring, and PT1000 temperature measurement.',
      },
    ],
    tags: ['OCPP', 'GB/T 27930', 'DLT-645', 'WIZnet W5100–W6300', 'USB Host', 'FATFS', 'IMD', 'PT1000'],
  },

  /**
   * SPEC §6.5.5. The honesty rule matters more here than anywhere else:
   * the control software ships with the robot, the motion programs are mine.
   * Never let a reader think otherwise — it collapses the moment an
   * interviewer asks a follow-up question.
   */
  robot: {
    id: 'robot',
    title: '6-axis robotic arm — motion programming',
    badge: 'Vendor platform · motion programs by me',
    body: 'The control software for this 6-axis industrial arm is provided by the manufacturer, so the software itself is not mine. What I write are the motion control programs that drive all six axes, in the vendor’s PLC-style control language, on top of an OpenCV template-matching vision pipeline fed by an industrial GigE camera.',
    image: {
      // Intrinsic size is 1918x1078. Stored at the rendered width with the
      // height derived from that exact ratio, so next/image reserves the right
      // box and the image never reflows the section as it loads.
      src: '/Picture/Robot_Control.png',
      width: 820,
      height: 461,
      alt: 'Control interface for a 6-axis robotic arm, showing the axis jog and template-matching vision view',
    },
  },
} as const;
