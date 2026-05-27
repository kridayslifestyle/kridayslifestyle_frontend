import { NextResponse } from "next/server";

import api from "@/lib/woocommerce";

export async function GET(
  request,
  { params }
) {

  try {

    // IMPORTANT
    const { id } = await params;

    const response =
      await api.get(
        `orders/${id}`
      );

    return NextResponse.json(
      response.data
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(

      {
        error:
          "Failed to fetch order",
      },

      {
        status: 500,
      }
    );
  }
}