"use client";

import {

  useEffect,

  useState,

} from "react";

import Link from "next/link";

import styles from "./NewArrivals.module.css";

// ─────────────────────────────
// PRODUCT CARD
// ─────────────────────────────
function ProductCard({ product }) {

  const [

    wishlisted,

    setWishlisted,

  ] = useState(false);

  const [

    hovered,

    setHovered,

  ] = useState(false);

  return (

    <div
      className={styles.card}
      onMouseEnter={() =>
        setHovered(true)
      }
      onMouseLeave={() =>
        setHovered(false)
      }
    >

      {/* IMAGE */}
      <div
        className={styles.imageWrap}
      >

        {/* BADGE */}
        {product.badge && (

          <span
            className={`${styles.badge} ${styles[
              `badge_${product.badgeType}`
            ]
              }`}
          >

            {product.badge}

          </span>

        )}

        {/* WISHLIST */}
        <button
          className={`${styles.wishBtn} ${wishlisted
            ? styles.wishlisted
            : ""
            }`}
          onClick={() =>
            setWishlisted(
              !wishlisted
            )
          }
        >

          ♡

        </button>

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className={
            styles.productImg
          }
        />

        {/* SHOP NOW */}
        <div
          className={`${styles.shopNowWrap} ${hovered
            ? styles.shopNowVisible
            : ""
            }`}
        >

          <Link
            href={`/product/${product.slug}`}
            className={
              styles.shopNowBtn
            }
          >

            Shop Now

          </Link>

        </div>

      </div>

      {/* INFO */}
      <div className={styles.info}>

        <span
          className={
            styles.productName
          }
        >

          {product.name}

        </span>

        <div
          className={
            styles.priceGroup
          }
        >

          <span
            className={
              styles.price
            }
          >

            ₹
            {product.price.toLocaleString(
              "en-IN"
            )}

          </span>

          {product.originalPrice >
            product.price && (

              <span
                className={
                  styles.originalPrice
                }
              >

                ₹
                {product.originalPrice.toLocaleString(
                  "en-IN"
                )}

              </span>

            )}

        </div>

      </div>

    </div>

  );
}

// ─────────────────────────────
// SECTION
// ─────────────────────────────
export default function NewArrivals() {

  const [

    products,

    setProducts,

  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH PRODUCTS
  useEffect(() => {

    async function fetchProducts() {

      try {

        const res =
          await fetch(
            "/api/products"
          );

        const data =
          await res.json();

        // FORMAT PRODUCTS
        const formatted =
          data.map(
            (product) => ({

              id: product.id,

              name:
                product.name,

              slug:
                product.slug,

              image:
                product.image ||
                product.images?.[0] ||
                "/placeholder.jpg",

              price:
                Number(
                  product.price
                ) || 0,

              originalPrice:
                Number(
                  product.originalPrice
                ) || 0,

              badge:
                product.featured
                  ? "HOT"
                  : "",

              badgeType:
                "hot",

            })
          );

        setProducts(
          formatted.slice(0, 4)
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    fetchProducts();

  }, []);

  if (loading) {

    return null;
  }

  return (

    <section
      className={styles.section}
    >

      <div
        className={styles.container}
      >

        {/* HEADER */}
        <div
          className={styles.header}
        >

          <p
            className={
              styles.eyebrow
            }
          >
            Just Landed
          </p>

          <h2
            className={
              styles.title
            }
          >
            New Arrivals
          </h2>

          <p
            className={
              styles.subtitle
            }
          >
            Fresh styles just for
            you
          </p>

        </div>

        {/* GRID */}
        <div
          className={styles.grid}
        >

          {products.map((p) => (

            <ProductCard
              key={p.id}
              product={p}
            />

          ))}

        </div>

        {/* VIEW ALL */}
        <div
          className={
            styles.viewAllWrap
          }
        >

          <Link
            href="/shop"
            className={
              styles.viewAll
            }
          >

            View All New Arrivals

          </Link>

        </div>

      </div>

    </section>

  );
}