import { NextResponse } from "next/server";

export async function GET(req) {

  const { searchParams } = new URL(req.url);

  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new NextResponse("Missing url", {
      status: 400,
    });
  }

  try {

    const response = await fetch(imageUrl);

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          response.headers.get("content-type") ||
          "image/jpeg",
      },
    });

  } catch (error) {

    return new NextResponse(
      "Failed to fetch image",
      { status: 500 }
    );
  }
}