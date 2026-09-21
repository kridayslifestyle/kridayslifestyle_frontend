import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        {
          error: "Email and password are required",
        },
        { status: 400 }
      );
    }

    const res = await fetch(
      "https://store.kridaylifestyle.in/wp-json/jwt-auth/v1/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: body.email,
          password: body.password,
        }),
        cache: "no-store",
      }
    );

    const data = await res.json();

    console.log("WORDPRESS LOGIN STATUS:", res.status);
    console.log("WORDPRESS LOGIN RESPONSE:", data);

    if (!res.ok) {
      return NextResponse.json(
        {
          error: data.message || "Invalid email or password",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("LOGIN API ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to connect to authentication server",
      },
      { status: 500 }
    );
  }
}