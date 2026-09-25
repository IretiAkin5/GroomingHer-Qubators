# Phase 2 — User Flows (GroomingHer MVP)

Notation: [screen] → (action) → [screen]. Components in `components.md`, tokens in `tokens.json`.

## F1 — Onboarding (first run)
[Welcome] → (Start) → [Age band: 12–14 / 15–17 / 18–19] → [Period started? Yes/No] →
- No → [What to expect + Learn teaser] → [Language] → [Set PIN] → [Home/empty]
- Yes → [Last period start? + flow] → [Language] → [Set PIN] → [Home]
- Exit: `profiles` row + `onboarding_completed` event. Skip allowed → defaults (15–17, English).

## F2 — Log period (Calendar)
[Home] → (Log period / Calendar tab) → [Calendar month] → (tap day → Start/End + flow chips) → (Save) → [Calendar updated + regularity badge if ≥2 cycles]
- Empty state: "No periods yet — add your first." Error: retry banner. Offline: saved locally, "will sync" note.

## F3 — Log symptoms → Triage
[Home/Calendar] → (Log symptoms) → [Symptom chips: pain 1–5 + location, flow, discharge, acne, bloating, mood, missed school] → (Save <60s) → [Prompt: "Check — Is This Normal?"] → (Yes) → F4; (Not now) → [Calendar]

## F4 — Is This Normal? result
[Computing: skeleton] → [Result card: band + explanation + watch-for + disclaimer] →
- monitor → [Self-care + "remind me to re-check in X days"] → [Home]
- adult → [Tell Parent helper (F6)] + [Learn links]
- professional → [Clinic checklist (3 dates, flow, pain) + urgent wording if R6] + [Tell Parent helper (F6)]

## F5 — Ask Her
[Ask tab] → [Chat + suggested starters] → (send) → [Streaming answer + disclaimer footer + follow-up chips + "Check Is This Normal?" handoff if flags]
- Empty: 3 starter questions by age band. Delete chat available in header.

## F6 — Tell My Parent
[Result/share entry] → [Summary card preview + script A (direct) / B (gentle)] → (Copy / Show on screen / Send to Parent view) → [Shared ✓ + consent log] → [Home]
- Parent side: card appears under Shared tab only (see parent-preview.html).

## F7 — Parent view (separate entry, own PIN optional)
[Parent Home] → tabs: Guides / Shared / Learn / Help / Settings (per PRD §9). No route reaches teen raw data — enforced by API tests.

## Global
Discreet toggle (header) on all teen screens. Disclaimers on F1-end, F4, F5, parent home. Offline: F2/F3 + Learn work, sync later; F4/F5 show "needs connection" with queued-input option for F4.
