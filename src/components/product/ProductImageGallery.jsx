

"use client";

import { useState } from "react";
import styles from "./ProductImageGallery.module.css";

export default function ProductImageGallery({ images = [], name = "" }) {

  console.log("GALLERY IMAGES:", images);
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.placeholder}>
          <span>No image available</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>

      {/* ── Left: Thumbnails ── */}
      <div className={styles.thumbs}>
        {images.map((img, i) => (
          <button
            key={i}
            className={`${styles.thumb} ${active === i ? styles.thumbActive : ""}`}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={`${name} ${i + 1}`}
              className={styles.thumbImg}
            />
          </button>
        ))}
      </div>

      {/* ── Right: Main image ── */}
      <div
        className={`${styles.mainWrap} ${zoomed ? styles.zoomed : ""}`}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={active}
          src={images[active]}
          alt={name}
          className={styles.mainImg}
        />

        {!zoomed && (
          <div className={styles.zoomHint}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7"/>
              <path d="m16.5 16.5 4 4" strokeLinecap="round"/>
            </svg>
            Hover to zoom
          </div>
        )}

        <div className={styles.counter}>{active + 1} / {images.length}</div>

        {active > 0 && (
          <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={() => setActive(active - 1)}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        {active < images.length - 1 && (
          <button className={`${styles.navBtn} ${styles.navNext}`} onClick={() => setActive(active + 1)}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

    </div>
  );
}