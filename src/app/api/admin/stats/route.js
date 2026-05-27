import api from "@/lib/woocommerce";

import {
  NextResponse
}
from "next/server";

export async function GET() {

  try {

    // ─────────────────────────────
    // FETCH DATA
    // ─────────────────────────────

    const [

      ordersRes,

      customersRes,

      productsRes,

    ] = await Promise.all([

      api.get("orders", {

        per_page: 20,
      }),

      api.get("customers", {

        per_page: 100,
      }),

      api.get("products", {

        per_page: 100,
      }),

    ]);

    const orders =
      ordersRes.data;

    const customers =
      customersRes.data;

    const products =
      productsRes.data;

    // ─────────────────────────────
    // TOTAL REVENUE
    // ─────────────────────────────
    const totalRevenue =
      orders.reduce(

        (sum, order) =>

          sum +
          Number(order.total),

        0
      );

    // ─────────────────────────────
    // TOTAL ORDERS
    // ─────────────────────────────
    const totalOrders =
      orders.length;

    // ─────────────────────────────
    // TOTAL CUSTOMERS
    // ─────────────────────────────
    const totalCustomers =
      customers.length;

    // ─────────────────────────────
    // BEST SELLING PRODUCTS
    // ─────────────────────────────
    const bestSelling =
      [...products]

        .sort(

          (a, b) =>

            b.total_sales -
            a.total_sales
        )

        .slice(0, 5);

    // ─────────────────────────────
    // RESPONSE
    // ─────────────────────────────
    return NextResponse.json({

      totalRevenue:
        totalRevenue.toFixed(2),

      totalOrders,

      totalCustomers,

      recentOrders:
        orders.slice(0, 5),

      bestSelling,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(

      {
        error:
          "Failed to fetch admin stats",
      },

      { status: 500 }
    );
  }
}