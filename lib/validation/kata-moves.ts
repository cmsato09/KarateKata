export interface ValidatedMoveData {
  move_number: number
  sequence: number
  timing: "SIMULTANEOUS" | "SEQUENTIAL" | null
  stance_id: number
  technique_id: number
  direction: "N" | "S" | "E" | "W" | "NE" | "NW" | "SE" | "SW"
  lead_foot: "LEFT" | "RIGHT"
  hip: "HANMI" | "SHOMEN" | "GYAKUHANMI"
  active_side: "LEFT" | "RIGHT" | "BOTH" | "NEITHER"
  speed: "FAST" | "SLOW" | "FAST_SLOW" | "SLOW_FAST"
  snap_thrust: "SNAP" | "THRUST"
  level: "GEDAN" | "CHUDAN" | "JODAN" | "GEDAN_JODAN"
  breath: "IN" | "OUT" | "IN_OUT"
  interm_move: boolean
  kiai: boolean
}

export interface MoveFormState {
  move_number: number | ""
  sequence: number | ""
  timing: string
  stance_id: string
  technique_id: string
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

// Validates a single move entry from the manual entry form before adding to the queue
export function validateMoveForm(
  form: MoveFormState,
): { data: ValidatedMoveData | null; errors: string[] } {
  const errors: string[] = []

  const move_number = Number(form.move_number)
  if (!form.move_number || isNaN(move_number) || move_number < 1)
    errors.push("Move number must be a positive integer")

  const sequence = Number(form.sequence)
  if (!form.sequence || isNaN(sequence) || sequence < 1)
    errors.push("Sequence must be a positive integer")

  if (!form.stance_id) errors.push("Stance is required")
  if (!form.technique_id) errors.push("Technique is required")
  if (!form.direction) errors.push("Direction is required")
  if (!form.lead_foot) errors.push("Lead foot is required")
  if (!form.hip) errors.push("Hip position is required")
  if (!form.active_side) errors.push("Active side is required")
  if (!form.speed) errors.push("Speed is required")
  if (!form.snap_thrust) errors.push("Snap/thrust is required")
  if (!form.level) errors.push("Level is required")
  if (!form.breath) errors.push("Breath is required")
  if (!form.interm_move) errors.push("Interm. move is required")
  if (!form.kiai) errors.push("Kiai is required")

  if (errors.length > 0) return { data: null, errors }

  return {
    data: {
      move_number,
      sequence,
      timing: (form.timing === "NONE" || !form.timing ? null : form.timing) as ValidatedMoveData["timing"],
      stance_id: Number(form.stance_id),
      technique_id: Number(form.technique_id),
      direction: form.direction as ValidatedMoveData["direction"],
      lead_foot: form.lead_foot as ValidatedMoveData["lead_foot"],
      hip: form.hip as ValidatedMoveData["hip"],
      active_side: form.active_side as ValidatedMoveData["active_side"],
      speed: form.speed as ValidatedMoveData["speed"],
      snap_thrust: form.snap_thrust as ValidatedMoveData["snap_thrust"],
      level: form.level as ValidatedMoveData["level"],
      breath: form.breath as ValidatedMoveData["breath"],
      interm_move: form.interm_move === "true",
      kiai: form.kiai === "true",
    },
    errors: [],
  }
}
