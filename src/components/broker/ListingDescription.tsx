"use client";

import { useState } from "react";

type ListingDescriptionProps = {
  paragraphs: string[];
};

export function ListingDescription({ paragraphs }: ListingDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const longCopy =
    paragraphs.length > 2 || paragraphs.reduce((total, paragraph) => total + paragraph.length, 0) > 520;

  if (paragraphs.length === 0) return null;

  const visible = expanded || !longCopy ? paragraphs : paragraphs.slice(0, 2);

  return (
    <div className={`listing-detail__description${longCopy && !expanded ? " is-collapsed" : ""}`}>
      {visible.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
      {longCopy && (
        <button type="button" className="listing-detail__toggle" onClick={() => setExpanded((open) => !open)}>
          {expanded ? "Show less" : "Read full description"}
        </button>
      )}
    </div>
  );
}
