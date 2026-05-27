import api from "@/lib/woocommerce";

import {
  NextResponse
}
  from "next/server";

export async function GET(
  request,
  { params }
) {

  try {

    // 1. GET CATEGORY USING SLUG
    const categoryRes =
      await api.get(

        `products/categories?slug=${params.category}`

      );

    const category =
      categoryRes.data[0];

    if (!category) {

      return Response.json([]);

    }

    // 2. GET PRODUCTS USING CATEGORY ID
    const response =
      await api.get(

        `products?category=${category.id}`

      );

    return NextResponse.json(
      response.data
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(

      {
        error:
          "Failed to fetch related products",
      },

      { status: 500 }

    );
  }
}