"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import styles from "./ProductInfo.module.css";

export default function ProductInfo({ product }) {
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // ── Contexts ──
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const wishlisted = isWishlisted(product.id);

  const originalPrice =
    Number(product.regular_price);

  const currentPrice =
    Number(product.price);

  const discount =
    originalPrice
      ? Math.round(
        (
          (originalPrice - currentPrice)
          / originalPrice
        ) * 100
      )
      : null;

  // ── Cart item shape ──
  function buildCartItem() {

    return {

      id: product.id,

      name: product.name,

      price: Number(product.price),

      originalPrice:
        Number(product.regular_price),

      image: product.image,

      slug: product.slug,

      size: selectedSize,

      qty: quantity,

      stockQuantity:
        product.stock_quantity,

      bg: "#FDF6F8",

    };
  }

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      document.getElementById("size-selector")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSizeError(false);
    addToCart(buildCartItem());
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  }

  function handleBuyNow() {
    if (!selectedSize) { setSizeError(true); return; }
    addToCart(buildCartItem());
    window.location.href = "/checkout";
  }

  // ── Wishlist toggle — uses real WishlistContext ──
  function handleWishlist() {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      slug: product.slug,
      bg: product.bg || "#FDF6F8",
      category: product.category,
    });
  }

  return (
    <div className={styles.wrapper}>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <span>Home</span>
        <span className={styles.sep}>›</span>
        <span>{product.categories?.[0]?.name}</span>
        <span className={styles.sep}>›</span>
        <span className={styles.breadActive}>{product.name}</span>
      </div>

      {/* Badge */}
      {product.badge && (
        <span className={styles.badge}>{product.badge}</span>
      )}

      {/* Name */}
      <h1 className={styles.name}>{product.name}</h1>

      {/* Rating */}
      <div className={styles.ratingRow}>

        <div className={styles.stars}>

          {Array.from({ length: 5 }).map((_, i) => (

            <span
              key={i}

              className={
                i <
                  Math.round(
                    Number(product.average_rating)
                  )
                  ? styles.starFilled
                  : styles.starEmpty
              }

            >
              ★
            </span>

          ))}

        </div>

        <span className={styles.ratingNum}>
          {product.average_rating}
        </span>

        <span className={styles.ratingCount}>
          ({product.rating_count} reviews)
        </span>

      </div>

      {/* Price */}
      <div className={styles.priceRow}>

        <span className={styles.price}>

          ₹{Number(product.price)
            .toLocaleString("en-IN")}

        </span>

        {product.regular_price && (

          <>

            <span className={styles.originalPrice}>

              ₹{Number(product.regular_price)
                .toLocaleString("en-IN")}

            </span>

            <span className={styles.discountBadge}>

              {discount}% OFF

            </span>

          </>

        )}

      </div>

      {/* Size selector */}
      <div id="size-selector" className={styles.sizeSection}>
        <div className={styles.sizeHeader}>
          <span className={styles.sizeLabel}>Select Size</span>
          <button className={styles.sizeGuide}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M21 21H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" strokeLinecap="round" />
              <path d="M7 8v8M17 8v8M12 8v4" strokeLinecap="round" />
            </svg>
            Size Guide
          </button>
        </div>

        <div className={styles.sizes}>

          {product?.sizes?.map((size) => (

            <button
              key={size}

              className={`${styles.sizeBtn} ${selectedSize === size
                ? styles.sizeBtnActive
                : ""
                }`}

              onClick={() => {

                setSelectedSize(size);

                setSizeError(false);

              }}
            >

              {size}

            </button>

          ))}

        </div>
        {sizeError && <p className={styles.sizeError}>⚠ Please select a size to continue</p>}
      </div>

      <div className={styles.divider} />

      {/* Quantity */}
      <div className={styles.qtySection}>
        <span className={styles.qtyLabel}>Quantity</span>
        <div className={styles.qtyControl}>
          <button className={styles.qtyBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
          <span className={styles.qtyNum}>{quantity}</span>
          <button className={styles.qtyBtn} onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className={styles.ctaRow}>
        <button
          className={`${styles.addToCart} ${addedToCart ? styles.added : ""}`}
          onClick={handleAddToCart}
        >
          {addedToCart ? (
            <>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Added to Cart!
            </>
          ) : (
            <>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Add to Cart
            </>
          )}
        </button>

        <button className={styles.buyNow} onClick={handleBuyNow}>Buy Now</button>

        {/* Wishlist — real toggle ✅ */}
        <button
          className={`${styles.wishBtn} ${wishlisted ? styles.wishlisted : ""}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24"
            fill={wishlisted ? "#E8627A" : "none"}
            stroke={wishlisted ? "#E8627A" : "#2D1A1E"}
            strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Trust badges */}
      <div className={styles.trustRow}>
        {[
          { icon: "🚚", text: "Free delivery above ₹1999" },
          { icon: "↩", text: "7-day easy returns" },
          { icon: "✦", text: "100% authentic quality" },
        ].map((t) => (
          <div key={t.text} className={styles.trustItem}>
            <span className={styles.trustIcon}>{t.icon}</span>
            <span className={styles.trustText}>{t.text}</span>
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      {/* Meta */}
      <div className={styles.stockWrap}>

        {product.stockStatus === "instock" ||
          product.stockStatus === "in_stock" ? (

          <span className={styles.inStock}>
            ● In Stock
          </span>

        ) : (

          <span className={styles.outStock}>
            ● Out of Stock
          </span>

        )}

      </div>

    </div>
  );
}