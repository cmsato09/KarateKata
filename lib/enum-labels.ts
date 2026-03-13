import type {
  TechniqueType,
  MoveTiming,
  Direction,
  LeadFoot,
  HipPosition,
  ActiveSide,
  Speed,
  SnapThrust,
  TechniqueLevel,
  Breath,
} from "@/app/generated/prisma/browser";

// Converts a record of enum labels to an array of filter options for use in dropdowns or select components.
export function toFilterOptions<T extends string>(
  labels: Record<T, string>,
): { value: string; label: string }[] {
  return (Object.entries(labels) as [T, string][]).map(([value, label]) => ({
    value,
    label,
  }));
}

export const TechniqueTypeLabel: Record<TechniqueType, string> = {
  BLOCK: "Block",
  PUNCH: "Punch",
  KICK: "Kick",
  STRIKE: "Strike",
  PREP: "Prep",
};

export const MoveTimingLabel: Record<MoveTiming, string> = {
  SIMULTANEOUS: "Simultaneous",
  SEQUENTIAL: "Sequential",
};

export const DirectionLabel: Record<Direction, string> = {
  N: "North",
  S: "South",
  E: "East",
  W: "West",
  NE: "Northeast",
  NW: "Northwest",
  SE: "Southeast",
  SW: "Southwest",
};

export const LeadFootLabel: Record<LeadFoot, string> = {
  LEFT: "Left",
  RIGHT: "Right",
  NEITHER: "Neither",
};

export const HipPositionLabel: Record<HipPosition, string> = {
  HANMI: "Hanmi",
  SHOMEN: "Shomen",
  GYAKUHANMI: "Gyaku Hanmi",
};

export const ActiveSideLabel: Record<ActiveSide, string> = {
  LEFT: "Left",
  RIGHT: "Right",
  BOTH: "Both",
  NEITHER: "Neither",
};

export const SpeedLabel: Record<Speed, string> = {
  FAST: "Fast",
  SLOW: "Slow",
  FAST_SLOW: "Fast → Slow",
  SLOW_FAST: "Slow → Fast",
};

export const SnapThrustLabel: Record<SnapThrust, string> = {
  SNAP: "Snap",
  THRUST: "Thrust",
};

export const TechniqueLevelLabel: Record<TechniqueLevel, string> = {
  GEDAN: "Gedan (Lower)",
  CHUDAN: "Chudan (Middle)",
  JODAN: "Jodan (Upper)",
  GEDAN_JODAN: "Gedan & Jodan",
};

export const BreathLabel: Record<Breath, string> = {
  IN: "Inhale",
  OUT: "Exhale",
  IN_OUT: "In → Out",
};
