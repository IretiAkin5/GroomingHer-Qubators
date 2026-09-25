// Rules engine FIRST, LLM second (for tone only). Deterministic: same inputs -> same band.
// Bands: monitor | adult | professional | urgent. See research/red-flags-v1.md (needs clinician sign-off).

export type Band = "monitor" | "adult" | "professional" | "urgent";

export interface TriageInput {
  ageBand: string;
  cycleLengths: number[]; // most recent, e.g. [28, 31, 26]
  bleedingDaysOver7: boolean;
  soakingUnder2h: boolean;
  painMax: number; // 0-5
  missedSchool: boolean;
  fainting: boolean;
  feverWithDischarge: boolean;
  suddenSeverePain: boolean;
  noPeriodBy16: boolean;
  stoppedMonths: number;
}

export interface TriageResult {
  band: Band;
  flags: string[];
  nextStep: string;
}

export function triage(i: TriageInput): TriageResult {
  const flags: string[] = [];
  if (i.suddenSeverePain || i.fainting) { flags.push("R6"); return { band: "urgent", flags, nextStep: "Tell a trusted adult right now and go to a clinic or emergency care." }; }
  if (i.soakingUnder2h || i.bleedingDaysOver7) flags.push("R1");
  if (i.painMax >= 4 && i.missedSchool) flags.push("R2");
  if (i.feverWithDischarge) flags.push("R4");
  if (flags.includes("R1") || flags.includes("R2") || flags.includes("R4"))
    return { band: "professional", flags, nextStep: "See a healthcare professional soon. Bring your last 3 period dates, flow, and pain scores." };
  const recurring = i.cycleLengths.filter((l) => l < 21 || l > 45).length >= 2;
  if (recurring) flags.push("R3");
  if (i.noPeriodBy16 || i.stoppedMonths >= 3) flags.push("R5");
  if (flags.length > 0) return { band: "adult", flags, nextStep: "Talk with a trusted adult and consider a clinic visit. Bring your logs." };
  return { band: "monitor", flags, nextStep: "Monitor at home: track one more cycle, rest + heat for pain, re-check if anything changes." };
}

export const DISCLAIMER = "Learning information only, not a medical diagnosis. When in doubt, talk to a trusted adult or healthcare professional.";
