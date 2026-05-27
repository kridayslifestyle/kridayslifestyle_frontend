import api from "@/lib/woocommerce";

import {
  NextResponse
}
from "next/server";

import {
  sendOrderEmail
}
from "@/lib/mailer";

export async function POST(
  request
) {

  try {

    const body =
      await request.json();

    // Create WooCommerce order
    const response =
      await api.post(
        "orders",
        body
      );

    // ─────────────────────────────
    // SEND ORDER EMAIL
    // ─────────────────────────────
    await sendOrderEmail(

      body.billing.email,

      response.data.id,

      response.data.total

    );

    return NextResponse.json(
      response.data
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(

      {
        error:
          "Failed to create order",
      },

      { status: 500 }

    );
  }
}