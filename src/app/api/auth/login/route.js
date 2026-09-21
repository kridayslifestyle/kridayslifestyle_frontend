import { NextResponse } from "next/server";
import api from "@/lib/woocommerce";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        {
          error: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // ─────────────────────────────
    // WORDPRESS JWT LOGIN
    // ─────────────────────────────

    const res = await fetch(
      "https://store.kridaylifestyle.in/wp-json/jwt-auth/v1/token",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: body.email,
          password: body.password,
        }),

        cache: "no-store",
      }
    );

    const data = await res.json();

    console.log(
      "WORDPRESS LOGIN STATUS:",
      res.status
    );

    if (!res.ok) {
      return NextResponse.json(
        {
          error:
            data.message ||
            "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // ─────────────────────────────
    // GET WOOCOMMERCE CUSTOMER
    // ─────────────────────────────

    const customerEmail =
      data.user_email || body.email;

    const customerResponse =
      await api.get("customers", {
        email: customerEmail,
      });

    const customers =
      customerResponse.data;

    if (
      !Array.isArray(customers) ||
      customers.length === 0
    ) {
      console.error(
        "CUSTOMER NOT FOUND:",
        customerEmail
      );

      return NextResponse.json(
        {
          error:
            "Customer account not found",
        },
        { status: 404 }
      );
    }

    const customer =
      customers[0];

    console.log(
      "WOOCOMMERCE CUSTOMER:",
      customer.id,
      customer.email
    );

    // ─────────────────────────────
    // RETURN COMPLETE USER
    // ─────────────────────────────

    return NextResponse.json(
      {
        token: data.token,

        user_id:
          customer.id,

        user_email:
          customer.email,

        user_display_name:
          `${customer.first_name || ""} ${
            customer.last_name || ""
          }`.trim() ||
          data.user_display_name ||
          customer.username,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(
      "LOGIN API ERROR:",
      error.response?.data || error
    );

    return NextResponse.json(
      {
        error:
          "Unable to connect to authentication server",
      },
      { status: 500 }
    );
  }
}