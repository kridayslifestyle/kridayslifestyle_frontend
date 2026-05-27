"use client";

import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

export default function AdminDashboardPage() {

  // ✅ INSIDE COMPONENT
  const { user, loading: authLoading } =
    useAuth();

  const router =
    useRouter();

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ─────────────────────────────
  // ADMIN PROTECTION
  // ─────────────────────────────
  useEffect(() => {

    if (authLoading)
      return;

    // Not logged in
    if (!user) {

      router.push("/login");

      return;
    }

    // Not admin
    if (

      user.email !==
      process.env.NEXT_PUBLIC_ADMIN_EMAIL

    ) {

      router.push("/");

      return;
    }

  }, [

    user,

    authLoading,

    router,

  ]);

  // ─────────────────────────────
  // FETCH ANALYTICS
  // ─────────────────────────────
  useEffect(() => {

    async function fetchStats() {

      try {

        const res = await fetch(
          "/api/admin/stats"
        );

        const data =
          await res.json();

        setStats(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    if (user) {
      fetchStats();
    }

  }, [user]);

  // ─────────────────────────────
  // LOADING
  // ─────────────────────────────
  if (loading || authLoading) {

    return (

      <div
        style={{
          padding: "40px",
        }}
      >
        Loading dashboard...
      </div>

    );
  }

  // ─────────────────────────────
  // NO STATS
  // ─────────────────────────────
  if (!stats) {

    return (

      <div
        style={{
          padding: "40px",
        }}
      >
        Failed to load dashboard
      </div>

    );
  }

  return (

    <div
      style={{
        padding: "40px",
        background: "#faf7f8",
        minHeight: "100vh",
      }}
    >

      <h1
        style={{
          fontSize: "42px",
          marginBottom: "30px",
        }}
      >
        Admin Dashboard
      </h1>

      {/* STATS */}
      <div
        style={{

          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",

          gap: "20px",

          marginBottom: "40px",
        }}
      >

        {/* Revenue */}
        <div style={cardStyle}>

          <h3>Total Revenue</h3>

          <p style={valueStyle}>
            ₹{stats.totalRevenue}
          </p>

        </div>

        {/* Orders */}
        <div style={cardStyle}>

          <h3>Total Orders</h3>

          <p style={valueStyle}>
            {stats.totalOrders}
          </p>

        </div>

        {/* Customers */}
        <div style={cardStyle}>

          <h3>Total Customers</h3>

          <p style={valueStyle}>
            {stats.totalCustomers}
          </p>

        </div>

      </div>

      {/* RECENT ORDERS */}
      <div>

        <h2
          style={{
            marginBottom: "20px",
            fontSize: "28px",
          }}
        >
          Recent Orders
        </h2>

        <div
          style={{
            display: "grid",
            gap: "16px",
          }}
        >

          {stats.recentOrders?.map(
            (order) => (

              <div

                key={order.id}

                style={orderStyle}

              >

                <div>

                  <h3>
                    #{order.id}
                  </h3>

                  <p>
                    {
                      order.billing
                        ?.first_name
                    }
                  </p>

                </div>

                <div>

                  <p>
                    ₹{order.total}
                  </p>

                  <p>
                    {order.status}
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}

// ─────────────────────────────
// STYLES
// ─────────────────────────────

const cardStyle = {

  background: "#fff",

  borderRadius: "24px",

  padding: "24px",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.05)",

};

const valueStyle = {

  fontSize: "36px",

  fontWeight: "700",

  marginTop: "12px",

};

const orderStyle = {

  background: "#fff",

  borderRadius: "20px",

  padding: "20px",

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  boxShadow:
    "0 6px 20px rgba(0,0,0,0.05)",

};