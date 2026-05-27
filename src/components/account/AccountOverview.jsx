"use client";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";

import styles from "./Account.module.css";

export default function AccountOverview() {

  const { user } = useAuth();

  // ─────────────────────────────
  // STATE
  // ─────────────────────────────
  const [customer, setCustomer] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  // ─────────────────────────────
  // FETCH CUSTOMER
  // ─────────────────────────────
  useEffect(() => {

    async function fetchCustomer() {

      try {

        if (!user?.email)
          return;

        const res = await fetch(
          `/api/customer?email=${user.email}`
        );

        const data =
          await res.json();

        setCustomer({

          id: data.id,

          first_name:
            data.first_name || "",

          last_name:
            data.last_name || "",

          email:
            data.email || "",

          phone:
            data.billing?.phone || "",

          address:
            data.billing?.address_1 || "",

          city:
            data.billing?.city || "",

          state:
            data.billing?.state || "",

          pincode:
            data.billing?.postcode || "",

        });

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    fetchCustomer();

  }, [user]);

  // ─────────────────────────────
  // UPDATE CUSTOMER
  // ─────────────────────────────
  async function handleSave() {

    try {

      setSaving(true);

      const res = await fetch(

        "/api/customer",

        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              customer
            ),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {

        throw new Error(
          data.error
        );
      }

      toast.success(
        "Profile updated successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error.message
      );

    } finally {

      setSaving(false);
    }
  }

  // ─────────────────────────────
  // LOADING
  // ─────────────────────────────
  if (loading) {

    return (
      <div className={styles.loading}>
        Loading profile...
      </div>
    );
  }

  return (

    <div className={styles.overview}>

      {/* HERO */}
      <div className={styles.hero}>

        <h1 className={styles.heroTitle}>

          Welcome back,
          <br />

          {customer?.first_name}

        </h1>

        <p className={styles.heroText}>

          Manage your orders,
          wishlist and account details.

        </p>

      </div>

      {/* STATS */}
      <div className={styles.statsGrid}>

        <div className={styles.statCard}>
          <h3>Orders</h3>
          <p>Active</p>
        </div>

        <div className={styles.statCard}>
          <h3>Wishlist</h3>
          <p>Saved</p>
        </div>

        <div className={styles.statCard}>
          <h3>Account</h3>
          <p>Verified</p>
        </div>

      </div>

      {/* PROFILE */}
      <div className={styles.infoCard}>

        <h2>
          Profile Information
        </h2>

        <form className={styles.profileForm}>

          {/* FIRST NAME */}
          <div className={styles.field}>

            <label>
              First Name
            </label>

            <input
              type="text"

              value={
                customer.first_name
              }

              onChange={(e) =>
                setCustomer({
                  ...customer,
                  first_name:
                    e.target.value,
                })
              }
            />

          </div>

          {/* LAST NAME */}
          <div className={styles.field}>

            <label>
              Last Name
            </label>

            <input
              type="text"

              value={
                customer.last_name
              }

              onChange={(e) =>
                setCustomer({
                  ...customer,
                  last_name:
                    e.target.value,
                })
              }
            />

          </div>

          {/* EMAIL */}
          <div className={styles.field}>

            <label>
              Email
            </label>

            <input
              type="email"

              value={
                customer.email
              }

              disabled
            />

          </div>

          {/* PHONE */}
          <div className={styles.field}>

            <label>
              Phone
            </label>

            <input
              type="tel"

              value={
                customer.phone
              }

              onChange={(e) =>
                setCustomer({
                  ...customer,
                  phone:
                    e.target.value,
                })
              }
            />

          </div>

          {/* ADDRESS */}
          <div className={styles.field}>

            <label>
              Address
            </label>

            <input
              type="text"

              value={
                customer.address
              }

              onChange={(e) =>
                setCustomer({
                  ...customer,
                  address:
                    e.target.value,
                })
              }
            />

          </div>

          {/* CITY */}
          <div className={styles.field}>

            <label>
              City
            </label>

            <input
              type="text"

              value={
                customer.city
              }

              onChange={(e) =>
                setCustomer({
                  ...customer,
                  city:
                    e.target.value,
                })
              }
            />

          </div>

          {/* STATE */}
          <div className={styles.field}>

            <label>
              State
            </label>

            <input
              type="text"

              value={
                customer.state
              }

              onChange={(e) =>
                setCustomer({
                  ...customer,
                  state:
                    e.target.value,
                })
              }
            />

          </div>

          {/* PINCODE */}
          <div className={styles.field}>

            <label>
              Pincode
            </label>

            <input
              type="text"

              value={
                customer.pincode
              }

              onChange={(e) =>
                setCustomer({
                  ...customer,
                  pincode:
                    e.target.value,
                })
              }
            />

          </div>

          {/* SAVE BUTTON */}
          <button

            type="button"

            onClick={handleSave}

            className={styles.saveBtn}

            disabled={saving}

          >

            {saving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </form>

      </div>

    </div>
  );
}