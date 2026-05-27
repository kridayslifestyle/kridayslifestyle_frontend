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

    const { slug } =
      await params;

    const response =
      await api.get(

        `products?slug=${slug}`

      );

    const product = response.data[0];

    const normalizedProduct = {
      id: product.id,

      name: product.name,

      slug: product.slug,

      price: Number(product.price),

      originalPrice: Number(product.regular_price),

      images:
        product.images?.map((img) => img.src) || [],

      description: product.description,

      shortDescription: product.short_description,

      stockStatus: product.stock_status,

      sku: product.sku,

      sizes: ["S", "M", "L", "XL", "XXL"],

      features: [
        "Premium Quality Fabric",
        "Elegant Luxury Design",
        "Comfort Fit",
        "Breathable Material",
      ],
    };

    return NextResponse.json(normalizedProduct);
  } catch (error) {

    

    return NextResponse.json(

      {
        error:
          "Failed to fetch product",
      },

      { status: 500 }

    );
  }
}