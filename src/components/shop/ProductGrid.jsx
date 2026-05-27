"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import styles from "./ProductGrid.module.css";



// ── Skeleton ──
function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={`${styles.skeletonImage} skeleton`} />
      <div className={styles.skeletonInfo}>
        <div className={`${styles.skeletonLine} skeleton`} style={{ width: "70%" }} />
        <div className={`${styles.skeletonLine} skeleton`} style={{ width: "40%" }} />
      </div>
    </div>
  );
}

// ── Single product card ──
function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const wishlisted = isWishlisted(product.id);

  // ✅ Only show discount if originalPrice actually > price
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const imgSrc =
    product.image ||
    product.images?.[0] ||
    "/placeholder.png";

  return (
    <div className={styles.card}>

      {/* Image wrap */}
      <div className={styles.imageWrap} style={{ background: product.bg || "#FDF6F8" }}>

        {/* Badge */}
        {product.badge && (
          <span className={`${styles.badge} ${styles[`badge_${product.badgeType}`]}`}>
            {product.badge}
          </span>
        )}

        {/* Discount pill */}
        {discount > 0 && (
          <span className={styles.discountPill}>−{discount}%</span>
        )}

        {/* Wishlist button */}
        <button
          className={`${styles.wishBtn} ${wishlisted ? styles.wishlisted : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist({
              id: product.id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              image: imgSrc,
              slug: product.slug,
              bg: product.bg,
              category: product.category || "",
            });
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg width="15" height="15" viewBox="0 0 24 24"
            fill={wishlisted ? "#E8627A" : "none"}
            stroke={wishlisted ? "#E8627A" : "#2D1A1E"}
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* ✅ Plain img — no Next.js Image size requirements */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img
          src={imgSrc}
          alt={product.name}
          className={styles.productImg}
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
        /> */}

        <Image
          src={imgSrc || "/placeholder.png"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={styles.productImg}
          unoptimized={false}
        />

        {/* Hover overlay */}
        <div className={styles.overlay}>
          <button
            type="button"
            className={styles.cartBtn}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart({
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                originalPrice: product.originalPrice,
                image: imgSrc,
                size: "M",
                qty: 1,
                bg: product.bg,
              });
            }}
          >
            Add to Cart
          </button>
          <Link href={`/product/${product.slug}`} className={styles.shopNowBtn}>
            View Details
          </Link>
        </div>

      </div>

      {/* Info row */}
      <div className={styles.info}>
        <Link href={`/product/${product.slug}`} className={styles.name}>
          {product.name}
        </Link>
        <div className={styles.priceGroup}>
          <span className={styles.price}>
            ₹{Number(product.price || 0).toLocaleString("en-IN")}
          </span>
          {/* ✅ Only show strikethrough if originalPrice > price */}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className={styles.original}>
              ₹{Number(product.originalPrice).toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>

      {/* ✅ Rating — only show if rating > 0 (hides "NaN" and "0") */}
      {Number(product.rating) > 0 && (
        <div className={styles.ratingRow}>
          <span className={styles.star}>★</span>
          <span className={styles.ratingVal}>
            {product.rating}
          </span>

          {product.reviewCount > 0 && (
            <span className={styles.ratingCount}>
              ({product.reviewCount})
            </span>
          )}
        </div>
      )}

    </div>
  );
}

// ── Grid ──
export default function ProductGrid({ products = [], loading = false, cols = 4 }) {

  if (loading) {
    return (
      <div className={styles.grid} style={{ "--cols": cols }}>
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🔍</div>
        <h3 className={styles.emptyTitle}>No products found</h3>
        <p className={styles.emptyDesc}>Try adjusting your filters or search for something different.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid} style={{ "--cols": cols }}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}