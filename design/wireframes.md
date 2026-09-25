# Phase 2 — Wireframes, 8 Screens (low-fi spec)

Layout: mobile 390px, header (title + discreet toggle), content, bottom nav (teen) / tab row (parent). All components from `components.md`. [x] = button, ( ) = input/chip.

## W1 — Onboarding
Header: "Welcome to GroomingHer" + sub.
Body: (age band chips 12–14/15–17/18–19), (Period started? Yes/No), conditional (last start date + flow), (language: English/Pidgin…), (PIN pad 4 boxes).
Footer: [Start] primary; "Skip" ghost. Note: menarche=No skips date/flow.

## W2 — Home (empty + active)
Header: greeting by age band + discreet toggle.
Empty: card "No periods yet" + [Log first period]. Active: next-period range card, regularity badge, [Log period] [Log symptoms] [Ask Her] shortcuts, Learn teaser list.

## W3 — Calendar
Month grid (cells per preview.html: solid=period, light=predicted range, ring=today). Legend row. Tapping day → bottom sheet: (Start/End toggle + flow chips) + [Save]. Below: history list (start–end, length) + regularity explainer link.

## W4 — Log symptoms
Date header (= cycle day N). Chip groups: pain 1–5, location, flow, discharge, acne, bloating, mood, missed school toggle. [Save] → triage prompt sheet: [Check — Is this normal?] / [Not now].

## W5 — Triage result
Result card: band banner (info/warn/danger), explanation (3 short lines), "Watch for" list, self-care list, disclaimer banner. Actions by band: monitor → [Remind me] [Home]; adult/professional → [Tell my parent] [Clinic checklist] + Learn links. R6: full-screen urgent variant + [Tell adult now].

## W6 — Ask Her
Chat list (bubbles: user plum-right, Her white-left), disclaimer footer pinned, input row + send. Header: title + delete-chat icon. Empty: 3 starter chips. After answer: follow-up chips + conditional [Check Is This Normal?] button.

## W7 — Tell My Parent
Summary card preview (pattern + suggested action, share timestamp), script tabs A/B (copyable text), [Copy] [Show on screen] [Send to Parent view], consent note "She sees only this card." Success state: check + [Done].

## W8 — Parent home (see parent-preview.html)
Solid plum header "Parent Space", 6 tab pills, cards per tab, shared-card list with [Mark discussed] [Clinic checklist]. Settings card: language, consent log, disclaimers.

## Handoff checklist (exit criteria)
- [ ] All 8 mapped to flows F1–F7, every button leads somewhere (no dead ends)
- [ ] Every AI/triage screen includes disclaimer banner component
- [ ] Offline/empty/error state specified per screen
- [ ] Prototype tested with 3 teens (notes in research/notes/)
