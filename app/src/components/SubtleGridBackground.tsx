'use client';

import "./SubtleGridBackground.css";

export default function SubtleGridBackground() {
  return (
    <div className="subtle-grid-bg" aria-hidden="true">
      <div className="subtle-grid-overlay" />
      <div className="subtle-grid-noise" />
    </div>
  );
}
