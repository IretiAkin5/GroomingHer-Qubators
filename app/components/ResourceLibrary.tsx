"use client";
import { useState } from "react";
import { topics } from "@/lib/content";
import { ResourceCards, ReviewNotice } from "./Public";
export default function ResourceLibrary() {
  const [topic, setTopic] = useState("All topics");
  return (
    <>
      <ReviewNotice />
      <div className="filter-row" aria-label="Filter resources by topic">
        {topics.map((t) => (
          <button
            key={t}
            className="filter-button"
            aria-pressed={topic === t}
            onClick={() => setTopic(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="status-line" aria-live="polite">
        Showing{" "}
        {topic === "All topics"
          ? "all sample resources"
          : topic.toLowerCase() + " samples"}
        . No account required.
      </p>
      <ResourceCards topic={topic} />
    </>
  );
}
