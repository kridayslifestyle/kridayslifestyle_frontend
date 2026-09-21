import api from "@/lib/woocommerce";
import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/mailer";

export async function POST(request) {
  try {
    const body = await request.json();

    console.log("CREATE ORDER CUSTOMER ID:", body.customer_id);
    console.log("CREATE ORDER EMAIL:", body.billing?.email);

    // Make sure customer_id exists
    if (!body.customer_id) {
      return NextResponse.json(
        {
          error: "Customer ID is missing",
        },
        { status: 400 }
      );
    }

    // Make sure it is a number
    const customerId = Number(body.customer_id);

    if (!Number.isInteger(customerId) || customerId <= 0) {
      return NextResponse.json(
        {
          error: "Invalid customer ID",
        },
        { status: 400 }
      );
    }

    // Create order with explicit customer ID
    const orderData = {
      ...body,
      customer_id: customerId,
    };

    const response = await api.post(
      "orders",
      orderData
    );

    const order = response.data;

    console.log(
      "ORDER CREATED:",
      order.id
    );

    console.log(
      "ORDER CUSTOMER ID:",
      order.customer_id
    );

    // Send confirmation email
    try {
      await sendOrderEmail(
        body.billing.email,
        order.id,
        order.total,
        order.payment_method_title
      );
    } catch (emailError) {
      console.error(
        "ORDER EMAIL ERROR:",
        emailError
      );
    }

    return NextResponse.json(order);

  } catch (error) {

    console.error(
      "CREATE ORDER ERROR:",
      error.response?.data || error
    );

    return NextResponse.json(
      {
        error:
          error.response?.data?.message ||
          "Failed to create order",
      },
      {
        status: 500,
      }
    );
  }
}