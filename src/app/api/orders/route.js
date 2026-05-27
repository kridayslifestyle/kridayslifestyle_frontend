import api from "@/lib/woocommerce";
import { NextResponse } from "next/server";

export async function GET(req) {

  try {

    const { searchParams } =
      new URL(req.url);

    const email =
      searchParams.get("email");

    if (!email) {

      return NextResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const response = await api.get(
      `orders?billing.email=${email}`
    );

    return NextResponse.json(
      response.data
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}