export const compassDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

export function normalizeDegrees(value) {
  return ((Number(value) % 360) + 360) % 360;
}

export function degreesToCompass(value) {
  const normalized = normalizeDegrees(value);
  return compassDirections[Math.round(normalized / 45) % compassDirections.length];
}

export function windFromCloudMotion(motionTowardDegrees) {
  const toward = normalizeDegrees(motionTowardDegrees);
  const from = normalizeDegrees(toward + 180);
  return {
    toward,
    from,
    towardLabel: degreesToCompass(toward),
    fromLabel: degreesToCompass(from),
  };
}
