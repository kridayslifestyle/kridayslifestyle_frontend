"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./RelatedProducts.module.css";

function RelatedCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered,    setHovered]    = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.imageWrap} style={{ background: product.bg }}>

        {product.badge && (
          <span className={`${styles.badge} ${styles[`badge_${product.badgeType}`]}`}>
            {product.badge}
          </span>
        )}

        <button
          className={`${styles.wishBtn} ${wishlisted ? styles.wishlisted : ""}`}
          onClick={() => setWishlisted(!wishlisted)}
          aria-label="Wishlist"
        >
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill={wishlisted ? "#E8627A" : "none"}
            stroke={wishlisted ? "#E8627A" : "#2D1A1E"}
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        <img src={product.image} alt={product.name} className={styles.img} />

        <div className={`${styles.shopNow} ${hovered ? styles.shopNowVisible : ""}`}>
          <Link href={`/product/${product.slug}`} className={styles.shopNowBtn}>
            Quick View
          </Link>
        </div>
      </div>

      <div className={styles.info}>
        <Link href={`/product/${product.slug}`} className={styles.name}>
          {product.name}
        </Link>
        <div className={styles.priceGroup}>
          <span className={styles.price}>₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice && (
            <span className={styles.original}>₹{product.originalPrice.toLocaleString("en-IN")}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RelatedProducts({

  products = [],

  currentId,

}) {

  const filteredProducts =
    products.filter(

      (p) => p.id !== currentId

    );

  if (!filteredProducts.length)
    return null;

  return (

    <section className={styles.section}>

      <div className={styles.container}>

        <div className={styles.header}>

          <p className={styles.eyebrow}>
            You May Also Like
          </p>

          <h2 className={styles.title}>
            Related Products
          </h2>

        </div>

        <div className={styles.grid}>

          {filteredProducts.map((p) => (

            <RelatedCard
              key={p.id}
              product={p}
            />

          ))}

        </div>

      </div>

    </section>
  );
}