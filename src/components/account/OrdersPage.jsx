"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./Orders.module.css";

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      // Wait for AuthContext to finish restoring user
      if (authLoading) {
        return;
      }

      if (!user?.id) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(
          `/api/orders?customerId=${user.id}`
        );

        const data = await res.json();

        console.log("ORDERS API STATUS:", res.status);
        console.log("ORDERS API RESPONSE:", data);

        if (!res.ok) {
          throw new Error(
            data.error || "Failed to fetch orders"
          );
        }

        setOrders(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {
        console.error(
          "FETCH ORDERS ERROR:",
          error
        );

        setOrders([]);

      } finally {
        setLoading(false);
      }
    }

    fetchOrders();

  }, [user, authLoading]);

  // Wait for authentication to initialize
  if (authLoading || loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h1 className={styles.title}>
            My Orders
          </h1>

          <p className={styles.subtitle}>
            Track and manage your orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div>
            <p>No orders found.</p>
          </div>
        ) : (
          <div className={styles.ordersList}>

            {orders.map((order) => (

              <div
                key={order.id}
                className={styles.orderCard}
              >

                <div className={styles.orderLeft}>

                  <h2
                    className={styles.orderId}
                  >
                    Order #{order.id}
                  </h2>

                  <p
                    className={styles.orderMeta}
                  >
                    {new Date(
                      order.date_created
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>

                </div>

                <div className={styles.orderMiddle}>

                  <span
                    className={`${styles.status}
                    ${
                      order.status === "pending"
                        ? styles.pending
                        : order.status === "processing"
                        ? styles.processing
                        : order.status === "completed"
                        ? styles.delivered
                        : styles.shipped
                    }`}
                  >
                    {order.status}
                  </span>

                  <p
                    className={styles.orderMeta}
                  >
                    {order.line_items.length} item(s)
                  </p>

                </div>

                <div className={styles.orderRight}>

                  <h3
                    className={styles.total}
                  >
                    ₹{order.total}
                  </h3>

                  <a
                    href={`/orders/${order.id}`}
                    className={styles.viewBtn}
                  >
                    View Details
                  </a>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}