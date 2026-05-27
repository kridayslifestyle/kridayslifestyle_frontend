"use client";

import { useState } from "react";
import styles from "./ProductTabs.module.css";

const TABS = ["Description", "Product Details", "Shipping & Returns"];

export default function ProductTabs({ product }) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.wrapper}>

      {/* Tab buttons */}
      <div className={styles.tabRow}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`${styles.tab} ${active === i ? styles.tabActive : ""}`}
            onClick={() => setActive(i)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className={styles.content}>

        {/* Description */}
        {active === 0 && (
          <div className={styles.panel}>
            <div
              className={styles.desc}

              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />
            <ul className={styles.features}>
              {product.features?.map((f, i) => (
                <li key={i} className={styles.feature}>
                  <span className={styles.featureDot}>✦</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Product Details */}
        {active === 1 && (
          <div className={styles.panel}>
            <table className={styles.table}>
              <tbody>
                {[
                  ["SKU", product.sku],
                  ["Category", product.category],
                  ["Sizes", product.sizes.join(", ")],
                  ["Availability", product.inStock ? "In Stock" : "Out of Stock"],
                ].map(([key, val]) => (
                  <tr key={key} className={styles.tableRow}>
                    <td className={styles.tableKey}>{key}</td>
                    <td className={styles.tableVal}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Shipping */}
        {active === 2 && (
          <div className={styles.panel}>
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                desc: "Free delivery on all orders above ₹1999. Standard delivery in 3–5 business days.",
              },
              {
                icon: "📦",
                title: "Express Delivery",
                desc: "Express shipping available at ₹99. Delivered within 1–2 business days.",
              },
              {
                icon: "↩",
                title: "Easy Returns",
                desc: "Not happy? Return within 7 days of delivery for a full refund or exchange. Item must be unused with tags.",
              },
              {
                icon: "🔒",
                title: "Secure Packaging",
                desc: "All orders are carefully packed to ensure your item arrives in perfect condition.",
              },
            ].map((item) => (
              <div key={item.title} className={styles.shippingItem}>
                <span className={styles.shippingIcon}>{item.icon}</span>
                <div>
                  <p className={styles.shippingTitle}>{item.title}</p>
                  <p className={styles.shippingDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}