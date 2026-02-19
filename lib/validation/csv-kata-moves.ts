import type { ValidatedMoveData } from "./kata-moves"

export interface MoveRow {
  move_number: string
  sequence: string
  timing: string
  stance: string
  technique: string
  direction: string
  lead_foot: string
  hip: string
  active_side: string
  speed: string
  snap_thrust: string
  level: string
  breath: string
  interm_move: string
  kiai: string
}

export interface ValidatedMoveRow {
  data: ValidatedMoveData | null
  rowNumber: number
  isValid: boolean
  errors: string[]
}

const VALID_DIRECTIONS = ["N", "S", "E", "W", "NE", "NW", "SE", "SW"] as const
const VALID_LEAD_FOOT = ["LEFT", "RIGHT"] as const
const VALID_HIP = ["HANMI", "SHOMEN", "GYAKUHANMI"] as const
const VALID_ACTIVE_SIDE = ["LEFT", "RIGHT", "BOTH", "NEITHER"] as const
const VALID_SPEED = ["FAST", "SLOW", "FAST_SLOW", "SLOW_FAST"] as const
const VALID_SNAP_THRUST = ["SNAP", "THRUST"] as const
const VALID_LEVEL = ["GEDAN", "CHUDAN", "JODAN", "GEDAN_JODAN"] as const
const VALID_TIMING = ["SIMULTANEOUS", "SEQUENTIAL"] as const
const VALID_BREATH = ["IN", "OUT", "IN_OUT"] as const

export function validateMoveCsvRow(
  row: MoveRow,
  rowNumber: number,
  stances: { id: number; name: string }[],
  techniques: { id: number; name: string }[],
): ValidatedMoveRow {
  const errors: string[] = []

  const move_number = parseInt(row.move_number, 10)
  if (isNaN(move_number) || move_number < 1) errors.push("move_number must be a positive integer")

  const sequence = row.sequence ? parseInt(row.sequence, 10) : 1
  if (isNaN(sequence) || sequence < 1) errors.push("sequence must be a positive integer")

  const timingRaw = row.timing?.trim().toUpperCase() || null
  if (timingRaw && !VALID_TIMING.includes(timingRaw as typeof VALID_TIMING[number])) {
    errors.push(`timing must be one of: ${VALID_TIMING.join(", ")}`)
  }
  const timing = (VALID_TIMING.includes(timingRaw as typeof VALID_TIMING[number]) ? timingRaw : null) as ValidatedMoveData["timing"]

  const stance = stances.find((s) => s.name.toLowerCase() === row.stance?.trim().toLowerCase())
  if (!stance) errors.push(`Stance "${row.stance}" not found`)

  const technique = techniques.find((t) => t.name.toLowerCase() === row.technique?.trim().toLowerCase())
  if (!technique) errors.push(`Technique "${row.technique}" not found`)

  const direction = row.direction?.trim().toUpperCase()
  if (!VALID_DIRECTIONS.includes(direction as typeof VALID_DIRECTIONS[number])) {
    errors.push(`direction must be one of: ${VALID_DIRECTIONS.join(", ")}`)
  }

  const lead_foot = row.lead_foot?.trim().toUpperCase()
  if (!VALID_LEAD_FOOT.includes(lead_foot as typeof VALID_LEAD_FOOT[number])) {
    errors.push(`lead_foot must be one of: ${VALID_LEAD_FOOT.join(", ")}`)
  }

  const hip = row.hip?.trim().toUpperCase()
  if (!VALID_HIP.includes(hip as typeof VALID_HIP[number])) {
    errors.push(`hip must be one of: ${VALID_HIP.join(", ")}`)
  }

  const active_side = row.active_side?.trim().toUpperCase()
  if (!VALID_ACTIVE_SIDE.includes(active_side as typeof VALID_ACTIVE_SIDE[number])) {
    errors.push(`active_side must be one of: ${VALID_ACTIVE_SIDE.join(", ")}`)
  }

  const speed = row.speed?.trim().toUpperCase()
  if (!VALID_SPEED.includes(speed as typeof VALID_SPEED[number])) {
    errors.push(`speed must be one of: ${VALID_SPEED.join(", ")}`)
  }

  const snap_thrust = row.snap_thrust?.trim().toUpperCase()
  if (!VALID_SNAP_THRUST.includes(snap_thrust as typeof VALID_SNAP_THRUST[number])) {
    errors.push(`snap_thrust must be one of: ${VALID_SNAP_THRUST.join(", ")}`)
  }

  const level = row.level?.trim().toUpperCase()
  if (!VALID_LEVEL.includes(level as typeof VALID_LEVEL[number])) {
    errors.push(`level must be one of: ${VALID_LEVEL.join(", ")}`)
  }

  const breath = row.breath?.trim().toUpperCase()
  if (!VALID_BREATH.includes(breath as typeof VALID_BREATH[number])) {
    errors.push(`breath must be one of: ${VALID_BREATH.join(", ")}`)
  }

  const intermRaw = row.interm_move?.trim().toLowerCase()
  if (!["true", "false", "yes", "no"].includes(intermRaw)) {
    errors.push("interm_move must be true/false or yes/no")
  }
  const interm_move = intermRaw === "true" || intermRaw === "yes"

  const kiaiRaw = row.kiai?.trim().toLowerCase()
  if (!["true", "false", "yes", "no"].includes(kiaiRaw)) {
    errors.push("kiai must be true/false or yes/no")
  }
  const kiai = kiaiRaw === "true" || kiaiRaw === "yes"

  if (errors.length > 0) {
    return { data: null, rowNumber, isValid: false, errors }
  }

  return {
    data: {
      move_number,
      sequence,
      timing,
      stance_id: stance!.id,
      technique_id: technique!.id,
      direction: direction as ValidatedMoveData["direction"],
      lead_foot: lead_foot as ValidatedMoveData["lead_foot"],
      hip: hip as ValidatedMoveData["hip"],
      active_side: active_side as ValidatedMoveData["active_side"],
      speed: speed as ValidatedMoveData["speed"],
      snap_thrust: snap_thrust as ValidatedMoveData["snap_thrust"],
      level: level as ValidatedMoveData["level"],
      breath: breath as ValidatedMoveData["breath"],
      interm_move,
      kiai,
    },
    rowNumber,
    isValid: true,
    errors: [],
  }
}
