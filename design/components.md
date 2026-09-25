# GroomingHer Design System (v0.1)

Principles: calm, private, non-sexualized, age-12 readable, high contrast, large touch targets, low-data, discreet mode for shared phones.

Tokens: see `tokens.json`. Preview: open `preview.html` in a browser.

## Components
- **Button:** primary (plum), accent (rose), outline, ghost. Min 48px height, 16px bold.
- **Input:** 2px border, 14px radius, 48px min height, helper text below.
- **PIN pad:** 4 boxes, plum border, large digits, session timeout.
- **Calendar cell:** solid rose = period day, light rose = predicted range, ring = today. No fertile window anywhere.
- **Symptom chip:** pill toggle, rose-light when on. One-tap logging.
- **Card:** white, 20px radius, 1px warm border. Used for triage results, summaries, Learn.
- **Disclaimer banner:** info (teal) / warn (amber) / danger (red). Every AI output ends with one.
- **Bottom nav:** Home, Calendar, Ask Her, Learn, Parent. Icon + label, active = plum bold.

## States
Empty (friendly prompt) / Loading (skeleton, no spinners) / Error (retry) / Offline (log + Learn still work).

## Accessibility
WCAG AA, 16px base, plain language, icon + text always paired, discreet palette toggle.
