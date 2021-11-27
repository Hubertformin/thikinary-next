import React from "react";

export function TagChip({key, name}) {
    return (
        <span key={`tag-chip-${key}`} className="tag-chip mx-3 py-2 px-4 text-theme-primary rounded-full border border-teal-400">
          {name}
       </span>
    )
}