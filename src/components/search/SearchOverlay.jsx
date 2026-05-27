"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { PRODUCTS } from "@/data/products";

import styles from "./SearchOverlay.module.css";

export default function SearchOverlay({
  open,
  onClose,
}) {

  const [query, setQuery] =
    useState("");

  // Filter products
  const results = useMemo(() => {

    if (!query.trim()) {
      return [];
    }

    return PRODUCTS.filter((product) =>

      product.name
        .toLowerCase()
        .includes(
          query.toLowerCase()
        )

    );

  }, [query]);

  // Hide when closed
  if (!open) return null;

  return (

    <div className={styles.overlay}>

      {/* Backdrop */}
      <div
        className={styles.backdrop}
        onClick={onClose}
      />

      {/* Modal */}
      <div className={styles.modal}>

        {/* Top */}
        <div className={styles.top}>

          <input
            type="text"

            placeholder="Search products..."

            className={styles.input}

            autoFocus

            value={query}

            onChange={(e) =>
              setQuery(e.target.value)
            }
          />

          <button
            className={styles.closeBtn}
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        {/* Results */}
        <div className={styles.results}>

          {!query && (
            <div className={styles.empty}>
              Start typing to search...
            </div>
          )}

          {query &&
            !results.length && (

            <div className={styles.empty}>
              No products found
            </div>

          )}

          {results.map((product) => (

            <Link
              key={product.id}

              href={`/product/${product.slug}`}

              className={styles.product}

              onClick={onClose}
            >

              <img
                src={product.image}
                alt={product.name}
                className={styles.image}
              />

              <div className={styles.info}>

                <h3 className={styles.name}>
                  {product.name}
                </h3>

                <p className={styles.price}>
                  ₹{product.price}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>

  );
}