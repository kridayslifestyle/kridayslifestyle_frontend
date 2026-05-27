import api from "@/lib/woocommerce";

import {
  NextResponse
}
from "next/server";

export async function POST(
  request
) {

  try {

    const {

      email,

      password,

    } = await request.json();

    // ─────────────────────────────
    // FIND CUSTOMER
    // ─────────────────────────────
    const customerResponse =
      await api.get(
        "customers",
        {

          email,
        }
      );

    const customer =
      customerResponse.data[0];

    // Customer not found
    if (!customer) {

      return NextResponse.json(

        {
          error:
            "Customer not found",
        },

        { status: 404 }
      );
    }

    // ─────────────────────────────
    // UPDATE PASSWORD
    // ─────────────────────────────
    const response =
      await api.put(

        `customers/${customer.id}`,

        {

          password,
        }
      );

    return NextResponse.json({

      success: true,

      customer:
        response.data,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(

      {
        error:
          "Failed to reset password",
      },

      { status: 500 }
    );
  }
}