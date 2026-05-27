"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { useCart } from "@/context/CartContext";

import {
  useAuth
}
  from "@/context/AuthContext";

import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";

import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {

  const router = useRouter();

  const { items, clearCart } = useCart();

  const { user } =
    useAuth();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      firstName: "",

      lastName: "",

      email: "",

      phone: "",

      address: "",

      city: "",

      state: "",

      pincode: "",

      country: "India",

      payment: "cod",

    });

  // ─────────────────────────────
  // PLACE ORDER
  // ─────────────────────────────
  async function handlePlaceOrder() {

    // ─────────────────────────────
    // VALIDATE FORM
    // ─────────────────────────────
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {

      toast.error(
        "Please fill all checkout details"
      );

      return;
    }

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {

      toast.error(
        "Please enter valid email"
      );

      return;
    }

    // Phone validation
    if (form.phone.length < 10) {

      toast.error(
        "Please enter valid phone number"
      );

      return;
    }

    // ─────────────────────────────
    // REQUIRE LOGIN
    // ─────────────────────────────
    if (!user) {

      toast.error(
        "Please login to continue"
      );

      router.push(
        "/login?redirect=/checkout"
      );

      return;
    }

    // ─────────────────────────────
    // EMPTY CART
    // ─────────────────────────────
    if (!items.length) {

      toast.error(
        "Your cart is empty"
      );

      return;
    }

    try {

      setLoading(true);

      const orderData = {

        payment_method:
          form.payment,

        payment_method_title:
          form.payment === "cod"
            ? "Cash on Delivery"
            : form.payment,

        set_paid: false,

        billing: {

          first_name:
            form.firstName,

          last_name:
            form.lastName,

          address_1:
            form.address,

          city:
            form.city,

          state:
            form.state,

          postcode:
            form.pincode,

          country: "IN",

          email:
            form.email,

          phone:
            form.phone,
        },

        shipping: {

          first_name:
            form.firstName,

          last_name:
            form.lastName,

          address_1:
            form.address,

          city:
            form.city,

          state:
            form.state,

          postcode:
            form.pincode,

          country: "IN",
        },

        line_items:

          items.map((item) => ({

            product_id:
              item.id,

            quantity:
              item.qty,

          })),
      };

      const res = await fetch(

        "/api/create-order",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              orderData
            ),
        }
      );

      const data =
        await res.json();

      console.log(data);

      if (!res.ok) {

        throw new Error(
          "Order failed"
        );
      }

      toast.success(
        "Order placed successfully"
      );

      clearCart();

      router.push("/orders");

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to place order"
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>

      <CheckoutForm
        form={form}
        setForm={setForm}
      />

      <OrderSummary
        items={items}
        onPlaceOrder={handlePlaceOrder}
        loading={loading}
      />

    </div>
  );
}
