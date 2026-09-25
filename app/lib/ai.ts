import { DISCLAIMER, triage, type TriageInput } from "./triage";

// Provider-agnostic LLM layer: rules decide the band, the model only rephrases
// age-appropriately. Every output ends with nextStep + DISCLAIMER.
export const ASK_HER_SYSTEM = `You are Ask Her, a kind health companion for Nigerian girls 12-19. Plain words, short sentences, no shame. Never diagnose or name conditions. Always end with one clear next step and encourage a trusted adult for worrying symptoms.`;

export interface AiAskInput { question: string; ageBand: string; triageHint?: TriageInput }

export async function askHer(input: AiAskInput): Promise<string> {
  const provider = process.env.AI_PROVIDER ?? "stub";
  if (provider === "stub") {
    const hint = input.triageHint ? triage(input.triageHint) : null;
    return `Thanks for asking. ${hint ? hint.nextStep + " " : "Track what you notice and re-check if it changes. "}${DISCLAIMER} (AI not configured — set AI_PROVIDER.)`;
  }
  throw new Error(`AI provider '${provider}' not wired yet (Phase 5).`);
}
