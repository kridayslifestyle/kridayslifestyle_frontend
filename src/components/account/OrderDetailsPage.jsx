"use client";

import {
  useEffect,
  useState,
} from "react";

import styles from "./OrderDetails.module.css";

export default function OrderDetailsPage({
  orderId,
}) {

  // ─────────────────────────────
  // STATE
  // ─────────────────────────────
  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ─────────────────────────────
  // FETCH ORDER
  // ─────────────────────────────
  useEffect(() => {

    async function fetchOrder() {

      try {

        const res = await fetch(
          `/api/orders/${orderId}`
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch order"
          );
        }

        const data =
          await res.json();

        

        setOrder(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    if (orderId) {
      fetchOrder();
    }

  }, [orderId]);

  // ─────────────────────────────
  // LOADING
  // ─────────────────────────────
  if (loading) {

    return (

      <div className={styles.page}>

        <div className={styles.container}>
          Loading order...
        </div>

      </div>
    );
  }

  // ─────────────────────────────
  // NOT FOUND
  // ─────────────────────────────
  if (!order) {

    return (

      <div className={styles.page}>

        <div className={styles.container}>
          Order not found
        </div>

      </div>
    );
  }

  // ─────────────────────────────
  // TRACKING STEPS
  // ─────────────────────────────
  const trackingSteps = [

    "pending",

    "processing",

    "shipped",

    "completed",

  ];

  const statusMap = {

    pending: 0,

    processing: 1,

    shipped: 2,

    completed: 3,

    cancelled: 0,

    refunded: 0,

  };

  const currentStep =
    statusMap[
    order.status?.toLowerCase()
    ] || 0;

  // ─────────────────────────────
  // CALCULATIONS
  // ─────────────────────────────
  const subtotal =
    order?.line_items?.reduce(

      (sum, item) =>

        sum +
        Number(
          item.total || 0
        ),

      0

    ) || 0;

  const gst =
    Math.round(
      subtotal * 0.03
    );

  const shipping =
    Number(
      order?.shipping_total || 0
    );

  const total =
    Number(
      order?.total || 0
    );

  // ─────────────────────────────
  // UI
  // ─────────────────────────────
  return (

    <div className={styles.page}>

      <div className={styles.container}>

        {/* HERO */}
        <div className={styles.detailsHero}>

          <div>

            <h1 className={styles.title}>

              Order #
              {order?.id || "----"}

            </h1>

            <p className={styles.subtitle}>

              Placed on{" "}

              {
                order?.date_created
                  ? new Date(
                    order.date_created
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )
                  : "Date unavailable"
              }

            </p>

          </div>

          {/* STATUS */}
          <div className={styles.statusBadge}>

            {order.status}

          </div>

        </div>

        {/* TRACKING */}
        <div className={styles.trackingCard}>

          <div className={styles.trackTop}>

            <div>

              <h2>
                Order Tracking
              </h2>

              <p className={styles.deliveryText}>

                Payment Method:
                {" "}

                <b>

                  {
                    order.payment_method_title ||
                    "Cash on Delivery"
                  }

                </b>

              </p>

            </div>

          </div>

          {/* TIMELINE */}
          <div className={styles.timeline}>

            {trackingSteps.map(
              (step, index) => (

                <div
                  key={step}
                  className={styles.step}
                >

                  {/* LINE */}
                  {index !==
                    trackingSteps.length - 1 && (

                      <div
                        className={`${styles.line}
              ${index < currentStep
                            ? styles.activeLine
                            : ""
                          }`}
                      />

                    )}

                  {/* CIRCLE */}
                  <div
                    className={`${styles.circle}
          ${index <= currentStep
                        ? styles.activeCircle
                        : ""
                      }`}
                  />

                  {/* TEXT */}
                  <div
                    className={styles.stepContent}
                  >

                    <p
                      className={`${index <= currentStep
                        ? styles.activeText
                        : ""
                        }`}
                    >
                      {step}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* ORDER ITEMS */}
        <div className={styles.summaryCard}>

          <h2>
            Ordered Items
          </h2>

          <div className={styles.itemsList}>

            {order.line_items?.map(
              (item) => (

                <div

                  key={item.id}

                  className={styles.orderItem}

                >

                  {/* IMAGE */}
                  <img

                    src={
                      item.image?.src ||
                      "/placeholder.png"
                    }

                    alt={item.name}

                    className={styles.itemImage}

                  />

                  {/* INFO */}
                  <div className={styles.itemInfo}>

                    <h3>
                      {item.name}
                    </h3>

                    <p>

                      Quantity:
                      {" "}

                      {item.quantity}

                    </p>

                  </div>

                  {/* PRICE */}
                  <div className={styles.itemPrice}>

                    ₹
                    {Number(
                      item.total || 0
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* SHIPPING + PAYMENT */}
        <div className={styles.infoGrid}>

          {/* SHIPPING */}
          <div className={styles.infoCard}>

            <h2>
              Shipping Address
            </h2>

            <div className={styles.addressBox}>

              <p>

                {
                  order.shipping?.first_name ||
                  order.billing?.first_name
                }

                {" "}

                {
                  order.shipping?.last_name ||
                  order.billing?.last_name
                }

              </p>

              <p>

                {
                  order.shipping?.address_1 ||
                  order.billing?.address_1
                }

              </p>

              <p>

                {
                  order.shipping?.city ||
                  order.billing?.city
                }

                ,
                {" "}

                {
                  order.shipping?.state ||
                  order.billing?.state
                }

              </p>

              <p>

                {
                  order.shipping?.postcode ||
                  order.billing?.postcode
                }

              </p>

              <p>

                {
                  order.billing?.phone ||
                  "No phone number"
                }

              </p>

            </div>

          </div>

          {/* PAYMENT */}
          <div className={styles.infoCard}>

            <h2>
              Payment Method
            </h2>

            <div className={styles.paymentBox}>

              <span className={styles.paymentBadge}>

                {
                  order.payment_method_title ||
                  "Cash on Delivery"
                }

              </span>

            </div>

          </div>

        </div>

        {/* TOTALS */}
        <div className={styles.summaryCard}>

          <h2>
            Order Summary
          </h2>

          <div className={styles.summaryRow}>

            <span>
              Subtotal
            </span>

            <span>

              ₹
              {subtotal.toLocaleString(
                "en-IN"
              )}

            </span>

          </div>

          <div className={styles.summaryRow}>

            <span>
              Shipping
            </span>

            <span>

              {
                shipping === 0
                  ? "Free"
                  : `₹${shipping}`
              }

            </span>

          </div>

          <div className={styles.summaryRow}>

            <span>
              GST (3%)
            </span>

            <span>

              ₹{gst}

            </span>

          </div>

          <div className={styles.totalRow}>

            <span>
              Total
            </span>

            <span>

              ₹
              {total.toLocaleString(
                "en-IN"
              )}

            </span>

          </div>

        </div>

      </div>

    </div>
  );
}