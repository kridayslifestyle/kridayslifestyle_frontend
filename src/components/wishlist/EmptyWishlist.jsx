import Link from "next/link";

import styles from "./WishlistPage.module.css";

export default function EmptyWishlist() {

  return (

    <div className={styles.empty}>

      <h2>
        Your wishlist is empty
      </h2>

      <p>
        Save your favorite styles here.
      </p>

      <Link
        href="/shop"
        className={styles.shopBtn}
      >
        Continue Shopping
      </Link>

    </div>

  );
}