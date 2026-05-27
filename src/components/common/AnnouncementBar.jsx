"use client";

import { useState } from "react";
import styles from "./AnnouncementBar.module.css";

// ── Edit messages here ──────────────────────
const MESSAGES = [
  "🚚  Free Shipping Above ₹1999",
  "🎉  Flat 20% Off On Your First Order — Use Code: KRIDAY20",
  "✨  New SS26 Collection Is Now Live",
  "💎  Premium Quality · Handpicked Fabrics",
  "↩   7-Day Hassle-Free Returns",
];
// ────────────────────────────────────────────

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  // Duplicate so marquee loops seamlessly
  const items = [...MESSAGES, ...MESSAGES];

  return (
    <div className={styles.bar} aria-label="Announcements">
      <div className={styles.track}>
        {items.map((msg, i) => (
          <span key={i} className={styles.item}>
            {msg}
            <span className={styles.separator} aria-hidden="true">·</span>
          </span>
        ))}
      </div>

      <button
        className={styles.close}
        onClick={() => setVisible(false)}
        aria-label="Close announcement bar"
      >
        ✕
      </button>
    </div>
  );
}