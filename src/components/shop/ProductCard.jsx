"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

import styles from "./ProductGrid.module.css";

// ─────────────────────────────────────────────
// Skeleton Loader
// ─────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className={styles.card}>

      <div className={`${styles.skeletonImage} skeleton`} />

      <div className={styles.skeletonInfo}>

        <div
          className={`${styles.skeletonLine} skeleton`}
          style={{ width: "70%" }}
        />

        <div
          className={`${styles.skeletonLine} skeleton`}
          style={{ width: "40%" }}
        />

      </div>

    </div>
  );
}

// ─────────────────────────────────────────────
// Product Card
// ─────────────────────────────────────────────

function ProductCard({ product }) {

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round(
      (
        (product.originalPrice - product.price) /
        product.originalPrice
      ) * 100
    )
    : null;

  // ── Add To Cart ──
  function handleAddToCart() {

    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,

      price: product.price,
      originalPrice: product.originalPrice,

      image:
        product.image ||
        product.images?.[0] ||
        "/placeholder.png",

      size: "M",
      qty: 1,

      bg: product.bg,
    });

  }

  // ── Wishlist ──
  function handleWishlist(e) {

    e.preventDefault();

    toggleWishlist({
      id: product.id,
      name: product.name,

      slug: product.slug,

      price: product.price,
      originalPrice: product.originalPrice,

      image:
        product.image ||
        product.images?.[0] ||
        "/placeholder.png",

      bg: product.bg,
    });

  }

  return (

    <div className={styles.card}>

      {/* Image Area */}
      <div
        className={styles.imageWrap}
        style={{
          background:
            product.bg || "#FDF6F8",
        }}
      >

        {/* Badge */}
        {product.badge && (
          <span className={styles.badge}>
            {product.badge}
          </span>
        )}

        {/* Discount */}
        {discount && (
          <span className={styles.discountPill}>
            −{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          className={`${styles.wishlistBtn} ${wishlisted
            ? styles.activeWish
            : ""
            }`}
          onClick={handleWishlist}
        >
          ♡
        </button>

        {/* Product Image */}
        <Link
          href={`/product/${product.slug}`}
        >

          <img
            src={
              product.image ||
              product.images?.[0] ||
              "/placeholder.png"
            }
            alt={product.name}
            className={styles.image}
          />

        </Link>

        {/* Hover Overlay */}
        <div className={styles.overlay}>

          <button
            className={styles.cartBtn}
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>

          <Link
            href={`/product/${product.slug}`}
            className={styles.viewBtn}
          >
            View Details
          </Link>

        </div>

      </div>

      {/* Product Info */}
      <div className={styles.info}>

        <Link
          href={`/product/${product.slug}`}
          className={styles.name}
        >
          {product.name}
        </Link>

        <div className={styles.priceRow}>

          <span className={styles.price}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          {product.originalPrice && (
            <span className={styles.oldPrice}>
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}

        </div>

      </div>

    </div>
  );
}

// ─────────────────────────────────────────────
// Product Grid
// ─────────────────────────────────────────────

export default function ProductGrid({

  products = [],
  loading = false,
  cols = 4,
}) 
{
 
  // ── Loading state ──
  if (loading) {

    return (

      <div
        className={styles.grid}
        style={{ "--cols": cols }}
      >

        {Array.from({ length: 8 }).map(
          (_, i) => (
            <SkeletonCard key={i} />
          )
        )}

      </div>

    );
  }

  // ── Empty state ──
  if (!products.length) {

    return (

      <div className={styles.empty}>

        <div className={styles.emptyIcon}>
          🔍
        </div>

        <h3 className={styles.emptyTitle}>
          No products found
        </h3>

        <p className={styles.emptyDesc}>
          Try adjusting your filters
          or search.
        </p>

      </div>

    );
  }

  // ── Product Grid ──
  return (

    <div
      className={styles.grid}
      style={{ "--cols": cols }}
    >

      {products.map((product) => (

        <ProductCard
          key={product.id}
          product={product}
        />

      ))}

    </div>

  );
}