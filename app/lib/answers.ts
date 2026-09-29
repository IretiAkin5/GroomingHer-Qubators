// Stubbed answer library for Ask Her (Slice 5). Reviewed static text only — no live AI.
// Each entry: keywords, tiered answers (young 12-14 vs older 15+), follow-ups, optional triage handoff.
// Later: Learn-linked (Slice 7) via `article` slug.

export interface Answer { keys: string[]; young: string; older: string; follow: string[]; triage?: boolean; article?: string }

export const DISCLAIMER = "Learning info, not a diagnosis. If anything worries you, check Is This Normal? or talk to a trusted adult.";

const A: Answer[] = [
  { keys: ["late", "missed period", "not come"], young: "Periods are often wobbly in the first years — skipping or coming late is common. Track 2–3 cycles to see your pattern.", older: "A late period can come from stress, illness, weight shifts, or early-cycle irregularity. Track dates for 2–3 cycles; repeated long gaps are worth discussing with an adult or clinic.", follow: ["How long is a normal cycle?", "When should I worry?"], article: "cycle-basics" },
  { keys: ["pain", "cramp", "hurt", "stomach"], young: "Cramps happen because your womb squeezes. Heat on your tummy and rest help most girls.", older: "Cramps come from prostaglandins tightening the womb. Heat, rest, and gentle movement help. Pain that stops school or hits 4–5/5 repeatedly deserves a check.", follow: ["What helps period pain?", "Is heavy flow normal?"], triage: true },
  { keys: ["heavy", "soak", "flooding", "lot of blood"], young: "If you soak a pad in under 2 hours or bleed over 7 days, tell a trusted adult soon — that needs a check.", older: "Soaking through in under 2 hours, clots bigger than a coin, or bleeding past 7 days are clinic-check signs. Bring your dates and flow notes.", follow: ["How often should I change my pad?", "Check — Is this normal?"], triage: true },
  { keys: ["discharge", "white", "wet"], young: "Clear or white discharge between periods is usually normal — it keeps things clean.", older: "Clear/white, mild-smelling discharge is typically normal. Itching, bad smell, or yellow/green colour with fever are check-with-a-professional signs.", follow: ["What discharge is not normal?", "Itching down there?"], triage: true },
  { keys: ["smell", "odour", "odor"], young: "A light smell is normal. A strong bad smell, especially with itching, should be checked at a clinic.", older: "Strong odour with itching, burning, or coloured discharge can signal infection — worth a prompt clinic visit. Don't douche; it makes things worse.", follow: ["How do I stay fresh on my period?", "Check — Is this normal?"], triage: true },
  { keys: ["itch", "scratch"], young: "Itching can come from sweat or pads. Change often and keep dry. If it stays or burns when you wee, tell an adult.", older: "Persistent itching/burning, especially with discharge changes, deserves a clinic check. Avoid scented soaps inside.", follow: ["What discharge is not normal?", "Check — Is this normal?"], triage: true },
  { keys: ["acne", "pimple", "face"], young: "Pimples in puberty are very common — wash gently twice a day and don't pick.", older: "Hormonal shifts drive acne. Gentle cleansing, no picking, clean pillowcases. Severe or scarring acne can be shown to a pharmacist or clinic.", follow: ["Why do I get mood swings?", "Hair growing where?"] },
  { keys: ["breast", "boob", "chest"], young: "Breasts grow at different speeds and can feel tender or uneven — all normal.", older: "Tenderness before periods is common from hormone shifts. One side growing faster usually evens out. Sudden hard lumps with pain deserve a check.", follow: ["Why am I moody?", "Am I growing normally?"] },
  { keys: ["mood", "angry", "cry", "emotional", "sad"], young: "Feeling extra sensitive or grumpy sometimes is part of growing. Talking, sleep, and play help.", older: "Hormone shifts plus school stress swing moods. Track if low mood lasts 2+ weeks or stops daily life — then tell a trusted adult.", follow: ["How do I handle school stress?", "Why do I get pimples?"] },
  { keys: ["hair", "armpit", "pubic", "shave"], young: "Hair under arms and around private parts is a normal puberty step. You never have to remove it.", older: "New hair patterns are hormonal and normal. Removal is personal choice; shaving needs clean razors. Sudden heavy facial hair growth is worth mentioning at a clinic.", follow: ["Am I growing normally?", "Why do I sweat more?"] },
  { keys: ["first period", "started", "menarche"], young: "Your first period means growing up is working. Pads changed every 4–6 hours, spare in your bag, and it gets easier.", older: "First periods are often irregular for 1–2 years. Log dates from day one so patterns show early.", follow: ["How long is a normal cycle?", "What should I carry in my bag?"], article: "first-period-ready" },
  { keys: ["cycle", "how long", "regular", "every month"], young: "Most cycles are 21–45 days, especially early on. Count from day 1 of one period to day 1 of the next.", older: "Adult-typical is 21–35 days, but teens range wider. Three repeats under 21 or over 45 days is adult-conversation territory.", follow: ["My period is late?", "Check — Is this normal?"], article: "cycle-basics" },
  { keys: ["school", "class", "teacher", "pad at school"], young: "Keep a small kit: 2 pads, tissue, spare pants in a pouch. Ask a female teacher for the toilet freely.", older: "Track predicted days before school weeks; carry night pads for heavy days. If pain keeps you home often, that pattern belongs in a clinic conversation.", follow: ["What should I carry in my bag?", "How do I tell my teacher?"] },
  { keys: ["weight", "fat", "hips", "curvy"], young: "Hips widening and weight shifting is your body maturing — curves are normal.", older: "Body composition changes with estrogen. Eat regular local meals, move daily. Rapid unexplained weight change with cycle changes is worth checking.", follow: ["What should I eat on my period?", "Am I growing normally?"] },
  { keys: ["food", "eat", "crave", "nutrition"], young: "Eat your normal foods — beans, rice, greens, fruits. Iron foods (beans, ugu, meat) help replace period blood.", older: "Cravings are common pre-period. Prioritize iron + vitamin C (e.g., beans with orange), hydrate, limit excess caffeine for cramps.", follow: ["Why do I feel tired on my period?", "Why do I get pimples?"] },
];

const FALLBACK_YOUNG = "Good question — I don't have a reviewed answer for that yet. Try asking about periods, pain, discharge, acne, or mood. Anything worrying belongs in Is This Normal? or with a trusted adult.";
const FALLBACK_OLDER = "I don't have a reviewed answer for that yet — try periods, pain, discharge, skin, hair, mood, or school tips. If it worries you, run Is This Normal? or talk to a trusted adult.";

export function answer(q: string, young: boolean): { text: string; follow: string[]; triage: boolean; article?: string } {
  const s = q.toLowerCase();
  for (const a of A) {
    if (a.keys.some((k) => s.includes(k))) {
      return { text: (young ? a.young : a.older) + " " + DISCLAIMER, follow: a.follow, triage: !!a.triage, article: a.article };
    }
  }
  return { text: (young ? FALLBACK_YOUNG : FALLBACK_OLDER), follow: ["Is my period normal?", "What helps period pain?", "What discharge is not normal?"], triage: /bleed|faint|severe|emergency|suicide|kill/i.test(q) };
}
