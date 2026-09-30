// Reminders (Must-lite): pure computation over logged data. No push infra —
// cards surface in-app (and later feed Web Push). Kinds: period | log | check.
export interface Reminder { kind: string; title: string; body: string }

function iso(d: Date) { return d.toISOString().slice(0, 10); }
function addDays(s: string, n: number) { const d = new Date(s + "T12:00:00"); d.setDate(d.getDate() + n); return iso(d); }
function diff(a: string, b: string) { return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000); }

export function computeReminders(
  starts: string[], lastSymptomDate: string | null, badge: string | null, today = iso(new Date()),
): Reminder[] {
  const out: Reminder[] = [];
  if (starts.length >= 2) {
    const asc = [...starts].sort();
    const lens = asc.slice(1).map((s, i) => diff(asc[i], s));
    const avg = Math.round(lens.reduce((a, b) => a + b, 0) / lens.length);
    const next = addDays(asc[asc.length - 1], avg);
    const d = diff(today, next);
    if (d >= 0 && d <= 3) out.push({ kind: "period", title: "Period likely soon", body: `Expected around ${next} (±1 day). Pack your kit.` });
    if (d < -45) out.push({ kind: "check", title: "No period logged in a while", body: "If 45+ days passed, consider running Is This Normal? or telling a trusted adult." });
  }
  if (lastSymptomDate !== today) out.push({ kind: "log", title: "60-second check-in", body: "Log how you feel today — patterns only show when you track." });
  if (badge && badge.startsWith("Irregular")) out.push({ kind: "check", title: "Irregular pattern spotted", body: "Your cycles vary widely. Running Is This Normal? turns this into clear next steps." });
  return out;
}
