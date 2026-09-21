import api from "@/lib/woocommerce";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const customerId =
      searchParams.get("customerId");

    if (!customerId) {
      return NextResponse.json(
        {
          error: "Customer ID required",
        },
        {
          status: 400,
        }
      );
    }

    const customer = Number(customerId);

    if (!Number.isInteger(customer) || customer <= 0) {
      return NextResponse.json(
        {
          error: "Invalid customer ID",
        },
        {
          status: 400,
        }
      );
    }

    console.log(
      "FETCHING ORDERS FOR CUSTOMER:",
      customer
    );

    const response = await api.get(
      "orders",
      {
        customer: customer,
        per_page: 100,
        order: "desc",
        orderby: "date",
      }
    );

    console.log(
      "ORDERS FOUND:",
      response.data.map(
        (order) => ({
          id: order.id,
          customer_id:
            order.customer_id,
        })
      )
    );

    return NextResponse.json(
      response.data
    );

  } catch (error) {

    console.error(
      "FETCH ORDERS ERROR:",
      error.response?.data ||
        error.message ||
        error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch orders",
      },
      {
        status: 500,
      }
    );
  }
}