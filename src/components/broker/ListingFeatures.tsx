"use client";

import { useState } from "react";

type ListingFeaturesProps = {
  features: string[];
};

export function ListingFeatures({ features }: ListingFeaturesProps) {
  const [expanded, setExpanded] = useState(false);
  const many = features.length > 6;

  if (features.length === 0) return null;

  const visible = expanded || !many ? features : features.slice(0, 6);

  return (
    <div className="listing-detail__features">
      <h2>Features</h2>
      <ul>
        {visible.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      {many && (
        <button type="button" className="listing-detail__toggle" onClick={() => setExpanded((open) => !open)}>
          {expanded ? "Show fewer features" : `Show all ${features.length} features`}
        </button>
      )}
    </div>
  );
}
