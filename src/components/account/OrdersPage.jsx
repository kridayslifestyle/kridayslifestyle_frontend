"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";

import styles from "./Orders.module.css";

export default function OrdersPage() {

  const { user } = useAuth();

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function fetchOrders() {

      if (!user?.email) return;

      try {

        const res = await fetch(

          `/api/orders?email=${user.email}`

        );

        const data =
          await res.json();

        setOrders(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    fetchOrders();

  }, [user]);

  if (loading) {

    return <h1>Loading...</h1>;
  }

  return (

    <div className={styles.page}>

      <div className={styles.container}>

        {/* HEADER */}
        <div className={styles.header}>

          <h1 className={styles.title}>
            My Orders
          </h1>

          <p className={styles.subtitle}>
            Track and manage your orders
          </p>

        </div>

        {/* ORDERS */}
        <div className={styles.ordersList}>

          {orders.map((order) => (

            <div
              key={order.id}
              className={styles.orderCard}
            >

              {/* LEFT */}
              <div className={styles.orderLeft}>

                <h2 className={styles.orderId}>
                  Order #{order.id}
                </h2>

                <p className={styles.orderMeta}>
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

              {/* MIDDLE */}
              <div className={styles.orderMiddle}>

                <span
                  className={`${styles.status}

${order.status === "pending"
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

                <p className={styles.orderMeta}>
                  {order.line_items.length}
                  {" "}
                  item(s)
                </p>

              </div>

              {/* RIGHT */}
              <div className={styles.orderRight}>

                <h3 className={styles.total}>
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

      </div>

    </div>
  );
}