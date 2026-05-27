"use client";

import styles from "./ShopToolbar.module.css";

const SORT_OPTIONS = [
  { value: "date_desc",    label: "Newest First"        },
  { value: "popularity",   label: "Most Popular"         },
  { value: "rating",       label: "Top Rated"            },
  { value: "price_asc",    label: "Price: Low to High"   },
  { value: "price_desc",   label: "Price: High to Low"   },
];

export default function ShopToolbar({
  total,
  filters,
  onChange,
  gridCols,
  onGridToggle,
  onMobileFilter,
}) {
  return (
    <div className={styles.toolbar}>

      {/* Left — results + mobile filter btn */}
      <div className={styles.left}>

        {/* Mobile: filter button */}
        <button className={styles.mobileFilterBtn} onClick={onMobileFilter}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <line x1="4"  y1="6"  x2="20" y2="6"  strokeLinecap="round"/>
            <line x1="8"  y1="12" x2="20" y2="12" strokeLinecap="round"/>
            <line x1="12" y1="18" x2="20" y2="18" strokeLinecap="round"/>
          </svg>
          Filters
        </button>

        {/* Results count */}
        <p className={styles.results}>
          Showing <strong>{total}</strong> product{total !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Right — sort + grid toggle */}
      <div className={styles.right}>

        {/* Sort dropdown */}
        <div className={styles.sortWrap}>
          <label className={styles.sortLabel} htmlFor="shop-sort">Sort by:</label>
          <select
            id="shop-sort"
            className={styles.sortSelect}
            value={filters.sort || "date_desc"}
            onChange={(e) => onChange({ ...filters, sort: e.target.value, page: 1 })}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Grid view toggle — 3 col / 4 col */}
        <div className={styles.gridToggle}>
          <button
            className={`${styles.gridBtn} ${gridCols === 3 ? styles.gridBtnActive : ""}`}
            onClick={() => onGridToggle(3)}
            aria-label="3 columns"
          >
            {/* 3x3 grid icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="0" width="4" height="4" rx="1"/>
              <rect x="6" y="0" width="4" height="4" rx="1"/>
              <rect x="12" y="0" width="4" height="4" rx="1"/>
              <rect x="0" y="6" width="4" height="4" rx="1"/>
              <rect x="6" y="6" width="4" height="4" rx="1"/>
              <rect x="12" y="6" width="4" height="4" rx="1"/>
              <rect x="0" y="12" width="4" height="4" rx="1"/>
              <rect x="6" y="12" width="4" height="4" rx="1"/>
              <rect x="12" y="12" width="4" height="4" rx="1"/>
            </svg>
          </button>

          <button
            className={`${styles.gridBtn} ${gridCols === 4 ? styles.gridBtnActive : ""}`}
            onClick={() => onGridToggle(4)}
            aria-label="4 columns"
          >
            {/* 4-col icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0"  y="0" width="3" height="4" rx="1"/>
              <rect x="4.3" y="0" width="3" height="4" rx="1"/>
              <rect x="8.7" y="0" width="3" height="4" rx="1"/>
              <rect x="13"  y="0" width="3" height="4" rx="1"/>
              <rect x="0"  y="6" width="3" height="4" rx="1"/>
              <rect x="4.3" y="6" width="3" height="4" rx="1"/>
              <rect x="8.7" y="6" width="3" height="4" rx="1"/>
              <rect x="13"  y="6" width="3" height="4" rx="1"/>
              <rect x="0"  y="12" width="3" height="4" rx="1"/>
              <rect x="4.3" y="12" width="3" height="4" rx="1"/>
              <rect x="8.7" y="12" width="3" height="4" rx="1"/>
              <rect x="13"  y="12" width="3" height="4" rx="1"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}