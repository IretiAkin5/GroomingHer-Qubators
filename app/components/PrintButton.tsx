"use client";
export default function PrintButton() {
  return (
    <button
      type="button"
      className="button secondary print-action"
      onClick={() => window.print()}
    >
      Print sample / Save as PDF
    </button>
  );
}
