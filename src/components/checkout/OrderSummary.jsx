"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import styles from "./CheckoutPage.module.css";

export default function OrderSummary({
    onPlaceOrder,
    loading,
}) {

    const {
        items,
        subtotal,
        shippingCost,
        gst,
        total,
        coupon,
        discount,
        applyCoupon,
        removeCoupon,
    } = useCart();

    const [couponCode, setCouponCode] = useState("");

    function handleApplyCoupon() {

        const code =
            couponCode.trim().toUpperCase();

        // Demo coupons
        if (code === "SAVE10") {

            applyCoupon({
                code: "SAVE10",
                type: "percent",
                value: 10,
            });

            toast.success(
                "10% discount applied"
            );

            return;
        }

        if (code === "FLAT200") {

            applyCoupon({
                code: "FLAT200",
                type: "flat",
                value: 200,
            });

            toast.success(
                "₹200 discount applied"
            );

            return;
        }

        toast.error("Invalid coupon");
    }

    return (

        <div className={styles.summary}>

            <h2 className={styles.summaryTitle}>
                Order Summary
            </h2>

            {/* Products */}
            <div className={styles.summaryItems}>

                {items.map((item) => (

                    <div
                        key={`${item.id}-${item.size}`}
                        className={styles.summaryItem}
                    >

                        <img
                            src={item.image}
                            alt={item.name}
                            className={styles.summaryImage}
                        />

                        <div className={styles.summaryInfo}>

                            <p className={styles.summaryName}>
                                {item.name}
                            </p>

                            <p className={styles.summaryMeta}>
                                Size: {item.size}
                            </p>

                            <p className={styles.summaryMeta}>
                                Qty: {item.qty}
                            </p>

                        </div>

                        <div className={styles.summaryPrice}>
                            ₹{item.price * item.qty}
                        </div>

                    </div>

                ))}

            </div>

            {/* Coupon */}
            <div className={styles.couponBox}>

                <input
                    type="text"

                    placeholder="Coupon code"

                    className={styles.couponInput}

                    value={couponCode}

                    onChange={(e) =>
                        setCouponCode(e.target.value)
                    }
                />

                <button
                    className={styles.applyBtn}
                    onClick={handleApplyCoupon}
                >
                    Apply
                </button>

            </div>

            {/* Applied */}
            {coupon && (

                <div className={styles.appliedCoupon}>

                    <span>
                        {coupon.code} applied
                    </span>

                    <button
                        onClick={removeCoupon}
                    >
                        Remove
                    </button>

                </div>

            )}

            {discount > 0 && (

                <div className={styles.summaryRow}>

                    <span>Discount</span>

                    <span>
                        -₹{discount}
                    </span>

                </div>

            )}

            {/* Totals */}
            <div className={styles.summaryRows}>

                <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                </div>

                <div className={styles.summaryRow}>
                    <span>Shipping</span>
                    <span>
                        {shippingCost === 0
                            ? "Free"
                            : `₹${shippingCost}`}
                    </span>
                </div>

                <div className={styles.summaryRow}>
                    <span>GST (3%)</span>
                    <span>₹{gst}</span>
                </div>

                <div className={styles.totalRow}>
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>

            </div>
            <button
                className={styles.placeOrderBtn}
                onClick={onPlaceOrder}
                disabled={loading}
            >
                {loading ? "Processing..." : "Place Order"}
            </button>

        </div>



    );
}