"use client";

import Link from "next/link";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

import styles from "./WishlistPage.module.css";

export default function WishlistItem({ item }) {

  const { removeFromWishlist } =
    useWishlist();

  const { addToCart } = useCart();

  function handleAddToCart() {

    addToCart({
      ...item,
      size: "M",
      qty: 1,
    });

  }

  return (

    <div className={styles.card}>

      <Link
        href={`/product/${item.slug}`}
      >

        <img
          src={item.image}
          alt={item.name}
          className={styles.image}
        />

      </Link>

      <div className={styles.info}>

        <h3 className={styles.name}>
          {item.name}
        </h3>

        <div className={styles.priceRow}>

          <span className={styles.price}>
            ₹{item.price}
          </span>

          {item.originalPrice && (
            <span className={styles.oldPrice}>
              ₹{item.originalPrice}
            </span>
          )}

        </div>

        <div className={styles.actions}>

          <button
            className={styles.cartBtn}
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>

          <button
            className={styles.removeBtn}
            onClick={() =>
              removeFromWishlist(item.id)
            }
          >
            Remove
          </button>

        </div>

      </div>

    </div>

  );
}