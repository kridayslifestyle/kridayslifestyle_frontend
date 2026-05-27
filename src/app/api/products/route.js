// src/app/api/products/route.js

import api from "@/lib/woocommerce";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await api.get("products", {
      per_page: 100,
      orderby: "date",
      order: "desc",
    });

    const normalizedProducts = response.data.map((product) => {

      // ── Fix 1: originalPrice should be null if same as price ──
      const price = Number(product.price || 0);
      const regularPrice = Number(product.regular_price || 0);
      const originalPrice = regularPrice > price ? regularPrice : null;

      // ── Fix 2: rating — "0.00" string → null if zero ──
      const ratingRaw = parseFloat(product.average_rating || "0");
      const rating = ratingRaw > 0 ? ratingRaw : null;

      const reviewCount = Number(product.rating_count || 0);

      // ── Fix 3: image URL — use proxy path ──
      const featuredImage =
        product.images?.find(
          (img) => img.position === 0
        )?.src;

      const image =
        featuredImage ||
        product.images?.[0]?.src ||
        "/placeholder.png";

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,

        price,
        originalPrice,

        image,
        images: product.images?.map((img) => img.src) || [],

        categorySlugs:
          product.categories?.map((cat) =>
            cat.slug.toLowerCase().replace(/\s+/g, "-")
          ) || [],

        // ✅ ADD THIS
        sizes: ["XS", "S", "M", "L","XL","XXL"],

        // ✅ ADD THIS
        discount:
          originalPrice && originalPrice > price
            ? Math.round(
              ((originalPrice - price) / originalPrice) * 100
            )
            : 0,

        inStock:
          product.stock_status === "instock",

        rating,
        reviewCount,

        badge:
          product.on_sale ? "SALE" : null,

        badgeType:
          product.on_sale ? "sale" : null,

        bg: "#FDF6F8",
      };
    });

    return NextResponse.json(normalizedProducts);

  } catch (error) {
    console.error("WooCommerce Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: 500 }
    );
  }
}