"use client";

import styles from "./CartPage.module.css";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {

  return (
    <div className={styles.cartItem}>

      {/* Product Image */}
      <div className={styles.itemImageWrap}>

        <img
          src={item.image}
          alt={item.name}
          className={styles.itemImage}
        />

      </div>

      {/* Product Info */}
      <div className={styles.itemInfo}>

        <h3 className={styles.itemName}>
          {item.name}
        </h3>

        <p className={styles.itemSize}>
          Size: {item.size || "M"}
        </p>

        <p className={styles.itemPrice}>
          ₹{item.price}
        </p>

        {/* Quantity Controls */}
        <div className={styles.qtyControls}>

          <button
            onClick={() =>
              onDecrease(item.id, item.size)
            }
          >
            −
          </button>

          <span>{item.qty}</span>

          <button
            onClick={() =>
              onIncrease(item.id, item.size)
            }
          >
            +
          </button>

        </div>

      </div>

      {/* Right Side */}
      <div className={styles.itemRight}>

        <button
          className={styles.removeBtn}
          onClick={() =>
            onRemove(item.id, item.size)
          }
        >
          Remove
        </button>

        <div className={styles.itemSubtotal}>
          ₹{item.price * item.qty}
        </div>

      </div>

    </div>
  );
}