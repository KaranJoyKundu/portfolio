import type { Project } from "@/lib/schema";

/**
 * Bee biped robot — full case study from Karan's own project README
 * (Desktop\Bee\README.md + docs\engineering-decisions.md), submitted to
 * Khulna City College on 19 August 2026. Every figure below is one of
 * the real build photos at web-optimized size with real dimensions.
 */
const beeBipedRobot = {
  slug: "bee-biped-robot",
  title: "Bee biped robot",
  summary:
    "A Bluetooth-controlled biped teaching robot — Arduino Nano, six servo joints, an LED-matrix face, and a 3D-printed body — built to make microcontrollers fun to learn.",
  status: "shipped",
  year: "2026",
  tags: ["Embedded", "Robotics"],
  tech: [
    "Arduino Nano",
    "C/C++ (Arduino)",
    "6× SG90 servos",
    "MAX7219 8×8 LED matrix",
    "HC-05 Bluetooth",
    "HC-SR04 ultrasonic",
    "3D printing (PLA/PETG)",
    "Otto DIY base",
  ],
  order: 1,
  featured: true,
  images: {
    status: "verified",
    figures: [
      {
        src: "/images/bee/photo1.jpg",
        alt: "The Bee biped robot standing on a table beside its detached 3D-printed hat and other parts.",
        width: 1600,
        height: 1200,
        caption: "Bee — completed working prototype",
      },
      {
        src: "/images/bee/20260819_141629.jpg",
        alt: "The inside of Bee's torso: the Arduino Nano among jumper wires, servo connectors, and the parallel battery pack.",
        width: 1200,
        height: 1600,
        caption: "Electronics: Nano, servo wiring, parallel battery pack",
      },
      {
        src: "/images/bee/20260819_142150.jpg",
        alt: "A close-up of the 3D-printed stepped pyramid hat that tops the robot.",
        width: 1200,
        height: 1600,
        caption: "3D-printed hat — character and physical stabilizer",
      },
    ],
  },
  detail: {
    status: "verified",
    problem:
      "Teaching microcontrollers from slides makes the topic feel abstract. Khulna City College wanted a hands-on demonstration for its students, so the brief was a durable walking robot that shows servos, sensors, wireless control, and human–robot interaction in one machine. Bee is that machine.",
    constraints:
      "Student budget and off-the-shelf parts only: SG90 micro servos, an Arduino Nano, HC-05 Bluetooth, and a 3D-printed PLA/PETG chassis customized from the Otto DIY humanoid base. The robot had to survive demos by students, run for a meaningful time on its own battery, and reach the college against a real deadline. Soldering had to be learned from scratch when the help that was planned fell through.",
    decisions: [
      {
        title: "Compensate for a miscalibrated servo in software",
        body: "The right-leg servo never returned to a true 0°. Servo replacement was considered, but a software calibration constant (RL_c) achieves the same behavior without teardown — the pattern already existed because every motion computes offsets from six per-servo center constants.",
      },
      {
        title: "Sourced replacement Bluetooth modules rather than debugging failures",
        body: "The HC-05 modules on hand could not hold a stable connection. Fresh modules were sourced and tested, with reliable Bluetooth as a hard requirement; testing included verifying behavior at the operational baud rate from serial logs.",
      },
      {
        title: "Ship timing-based motion, defer a non-blocking scheduler",
        body: "Gestures are sequences of poses driven by delay(), and commands are dispatched through a single case-insensitive ladder. It is the simplest system that works at demo time; a millis()-based scheduler (so a new command can interrupt a routine) is planned future work instead of a rushed replacement.",
      },
      {
        title: "No voice output at v1 — scope it as future work",
        body: "An earlier ESP32 + Edge Impulse + microphone voice/AI experiment worked in isolation, but integrating it alongside the leg movement and the rest of the robot's code was not realistic within the timeline. Bee \"speaks\" through its LED-matrix text instead; a DFPlayer Mini + 3W speaker is on the roadmap.",
      },
    ],
    challenges: [
      {
        problem: "Servo calibration: the first leg servo never returned to true 0°.",
        fix: "Compensated in code for the actual behavior of that specific servo.",
      },
      {
        problem: "Balance: early walking attempts caused frequent falls.",
        fix: "Tuned the walking gait over many rounds with the 3D-printed frame holding up through repeated testing.",
      },
      {
        problem: "Bluetooth reliability was one of the biggest blockers before the deadline.",
        fix: "Sourced additional HC-05 modules from Kundu Electronics and tested until stable communication was achieved.",
      },
      {
        problem: "Soldering: the planned help fell through near the deadline.",
        fix: "Learned to solder independently and completed all wiring by hand.",
      },
    ],
    results:
      "A completed working prototype submitted to Khulna City College on 19 August 2026 after roughly a month and a half and 50+ hardware/software iterations. Bee walks, dances, and gestures on 30+ case-insensitive plain-text Bluetooth commands, shows emotions on its 8×8 LED matrix, reads out ultrasonic distance on demand, and runs about 6 hours per charge on two 1100 mAh cells in parallel (in normal use, not lab-measured). MIT-licensed, with all source and STL parts on disk.",
    improvements:
      "The planned upgrades: a non-blocking millis() motion scheduler, an autonomous distance-band reaction system using the already-wired HC-SR04, DFPlayer Mini voice output, revisiting the ESP32 + Edge Impulse voice experiment, and code cleanups (randomSeed(), unifying duplicate wave functions, and referencing the calibration constants everywhere).",
    bom: [
      { ref: "MCU", part: "Arduino Nano", value: "ATmega328P", quantity: 1, notes: "Main controller" },
      { ref: "J1-J6", part: "SG90 micro servo", value: "9 g, ~180°", quantity: 6, notes: "Legs ×2, feet ×2, hands ×2" },
      { ref: "DISP", part: "MAX7219 LED matrix", value: "8×8", quantity: 1, notes: "Face display" },
      { ref: "BT", part: "HC-05 Bluetooth module", value: "9600 baud", quantity: 1, notes: "Plain-text commands, SoftwareSerial" },
      { ref: "SENS", part: "HC-SR04 ultrasonic sensor", value: "Echo/Trig", quantity: 1, notes: "On-demand distance readout" },
      { ref: "PWR", part: "Sunfort battery", value: "1100 mAh", quantity: 2, notes: "Wired in parallel" },
      { ref: "BOOST", part: "Power-bank boost module", value: "Micro-USB charging", quantity: 1, notes: "Regulates output" },
      { ref: "CHAS", part: "3D-printed chassis", value: "PLA/PETG", quantity: 1, notes: "Customized from Otto DIY \"Fat Version\" base" },
    ],
  },
  contentStatus: "verified",
} satisfies Project;

export default beeBipedRobot;
