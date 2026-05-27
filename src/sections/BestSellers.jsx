"use client";

import {

  useEffect,

  useRef,

  useState,

} from "react";

import Link from "next/link";

import styles from "./BestSellers.module.css";

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
              ? styles.visible
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
          className={styles.name}
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
                  styles.original
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
export default function BestSellers() {

  const trackRef =
    useRef(null);

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
                  product.regular_price
                ) || 0,

              badge:
                product.featured
                  ? "BESTSELLER"
                  : "",

              badgeType:
                "bestseller",

              totalSales:
                Number(
                  product.total_sales
                ) || 0,

            })
          )

            // SORT BEST SELLERS
            .sort(
              (a, b) =>
                b.totalSales -
                a.totalSales
            );

        setProducts(
          formatted.slice(0, 8)
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    fetchProducts();

  }, []);

  // SCROLL
  const SCROLL_BY = 320;

  const scrollPrev = () => {

    trackRef.current?.scrollBy({

      left: -SCROLL_BY,

      behavior: "smooth",

    });
  };

  const scrollNext = () => {

    trackRef.current?.scrollBy({

      left: SCROLL_BY,

      behavior: "smooth",

    });
  };

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

          <div>

            <p
              className={
                styles.eyebrow
              }
            >

              Customer Favourites

            </p>

            <h2
              className={
                styles.title
              }
            >

              Best Selling Products

            </h2>

          </div>

          <Link
            href="/shop"
            className={
              styles.viewAll
            }
          >

            View all →

          </Link>

        </div>

      </div>

      {/* SLIDER */}
      <div
        className={
          styles.sliderOuter
        }
      >

        {/* PREV */}
        <button
          className={`${styles.arrow} ${styles.arrowLeft
            }`}
          onClick={scrollPrev}
        >

          ←

        </button>

        {/* TRACK */}
        <div
          className={styles.track}
          ref={trackRef}
        >

          {products.map((p) => (

            <ProductCard
              key={p.id}
              product={p}
            />

          ))}

        </div>

        {/* NEXT */}
        <button
          className={`${styles.arrow} ${styles.arrowRight
            }`}
          onClick={scrollNext}
        >

          →

        </button>

      </div>

    </section>

  );
}