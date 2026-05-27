"use client";

import { useWishlist } from "@/context/WishlistContext";

import WishlistItem from "./WishlistItem";
import EmptyWishlist from "./EmptyWishlist";

import styles from "./WishlistPage.module.css";

export default function WishlistPage() {

  const { items } = useWishlist();

  if (!items.length) {
    return <EmptyWishlist />;
  }

  return (

    <div className={styles.page}>

      <div className={styles.container}>

        <div className={styles.header}>

          <h1 className={styles.title}>
            Your Wishlist
          </h1>

          <p className={styles.subtitle}>
            {items.length} saved item(s)
          </p>

        </div>

        <div className={styles.grid}>

          {items.map((item) => (

            <WishlistItem
              key={item.id}
              item={item}
            />

          ))}

        </div>

      </div>

    </div>

  );
}