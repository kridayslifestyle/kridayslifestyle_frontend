"use client";

import Link from "next/link";
import styles from "./CartPage.module.css";

export default function EmptyCart() {
  return (
    <div className={styles.emptyCart}>

      <div className={styles.emptyIcon}>🛍️</div>

      <h2>Your cart is empty</h2>

      <p>
        Looks like you haven’t added anything yet.
      </p>

      <Link href="/shop" className={styles.continueBtn}>
        Continue Shopping
      </Link>

    </div>
  );
}