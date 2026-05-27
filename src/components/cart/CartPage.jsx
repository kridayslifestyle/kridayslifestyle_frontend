"use client";

import { useCart } from "@/context/CartContext";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

import styles from "./CartPage.module.css";

export default function CartPage() {

  const {
    items,
    removeFromCart,
    updateQty,
  } = useCart();

  // ── Empty cart state ──
  if (items.length === 0) {
    return <EmptyCart />;
  }

  // ── Calculate subtotal ──
  const subtotal = items.reduce(
    (acc, item) =>
      acc + item.price * item.qty,
    0
  );

  // ── Increase quantity ──
  function handleIncrease(id, size) {

    const item = items.find(
      (item) =>
        item.id === id &&
        item.size === size
    );

    updateQty(
      id,
      size,
      item.qty + 1
    );
  }

  // ── Decrease quantity ──
  function handleDecrease(id, size) {

    const item = items.find(
      (item) =>
        item.id === id &&
        item.size === size
    );

    if (item.qty <= 1) {

      removeFromCart(id, size);

      return;
    }

    updateQty(
      id,
      size,
      item.qty - 1
    );
  }

  return (
    <div className={styles.cartPage}>

      <div className={styles.container}>

        {/* Header */}
        <div className={styles.pageHeader}>

          <h1 className={styles.pageTitle}>
            Shopping Cart
          </h1>

          <p className={styles.pageSubtitle}>
            {items.length} item(s) in your cart
          </p>

        </div>

        {/* Layout */}
        <div className={styles.cartLayout}>

          {/* Left: Items */}
          <div className={styles.cartItems}>

            {items.map((item) => (

              <CartItem
                key={`${item.id}-${item.size}`}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={removeFromCart}
              />

            ))}

          </div>

          {/* Right: Summary */}
          <div className={styles.summaryWrap}>

            <CartSummary subtotal={subtotal} />

          </div>

        </div>

      </div>

    </div>
  );
}