import api from "@/lib/woocommerce";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const customerId =
      searchParams.get("customerId");

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID required" },
        { status: 400 }
      );
    }

    const response = await api.get("orders", {
      params: {
        customer: customerId,
        per_page: 100,
      },
    });

    return NextResponse.json(
      response.data
    );

  } catch (error) {
    console.error(
      "FETCH ORDERS ERROR:",
      error.response?.data || error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch orders",
      },
      {
        status: 500,
      }
    );
  }
}