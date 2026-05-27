import api from "@/lib/woocommerce";

import {
  NextResponse
}
from "next/server";

// ─────────────────────────────
// GET REVIEWS
// ─────────────────────────────
export async function GET(
  request
) {

  try {

    const {
      searchParams
    } = new URL(
      request.url
    );

    const productId =
      searchParams.get(
        "product"
      );

    const response =
      await api.get(
        "products/reviews",
        {

          product:
            productId,
        }
      );

    return NextResponse.json(
      response.data
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(

      {
        error:
          "Failed to fetch reviews",
      },

      { status: 500 }
    );
  }
}

// ─────────────────────────────
// CREATE REVIEW
// ─────────────────────────────
export async function POST(
  request
) {

  try {

    const body =
      await request.json();

    const response =
      await api.post(
        "products/reviews",
        body
      );

    return NextResponse.json(
      response.data
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(

      {
        error:
          "Failed to submit review",
      },

      { status: 500 }
    );
  }
}