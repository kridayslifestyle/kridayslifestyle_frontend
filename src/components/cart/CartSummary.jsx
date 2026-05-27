"use client";

import Link from "next/link";
import styles from "./CartPage.module.css";

export default function CartSummary({ subtotal = 0 }) {

    const shipping = subtotal > 1999 ? 0 : 99;

    const gst = Math.round(subtotal * 0.03);

    const total = subtotal + shipping + gst;

    return (
        <div className={styles.summaryCard}>

            <h2 className={styles.summaryTitle}>
                Order Summary
            </h2>

            {/* Subtotal */}
            <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
            </div>

            {/* Shipping */}
            <div className={styles.summaryRow}>
                <span>Shipping</span>

                <span>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                </span>
            </div>

            <div className={styles.summaryRow}>
                <span>GST (3%)</span>
                <span>₹{gst}</span>
            </div>

            {/* Divider */}
            <div className={styles.summaryDivider} />

            {/* Total */}
            <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>₹{total}</span>
            </div>

            {/* Checkout Button */}
            <Link
                href="/checkout"
                className={styles.checkoutBtn}
            >
                Proceed to Checkout
            </Link>

        </div>
    );
}