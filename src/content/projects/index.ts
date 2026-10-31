import type { Project } from "@/lib/schema";

import beeBipedRobot from "./bee-biped-robot";
import opampEcgHeartRateMonitor from "./opamp-ecg-heart-rate-monitor";
import lm393BatteryFuelGauge from "./lm393-battery-fuel-gauge";
import ppgPulseSensor from "./ppg-pulse-sensor";
import kairos from "./kairos";

/** Adding a project = adding one file here and one import below. */
export const rawProjects: Project[] = [
  beeBipedRobot,
  opampEcgHeartRateMonitor,
  lm393BatteryFuelGauge,
  ppgPulseSensor,
  kairos,
];
