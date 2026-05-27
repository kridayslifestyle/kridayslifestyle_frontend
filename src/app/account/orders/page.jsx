"use client";

import {
  useEffect,
  useState,
} from "react";

import OrdersPage
from "@/components/account/OrdersPage";

import {
  useAuth
}
from "@/context/AuthContext";

export default function Page() {

  const { user } =
    useAuth();

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // Fetch orders
  useEffect(() => {

    async function fetchOrders() {

      try {

        if (!user?.email)
          return;

        const res =
          await fetch(

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

    return (
      <div>
        Loading orders...
      </div>
    );
  }

  return (
    <OrdersPage
      orders={orders}
    />
  );
}