import {
  NextResponse
}
from "next/server";

export async function POST(
  request
) {

  try {

    const body =
      await request.json();

    const res = await fetch(

      "https://kridaylifestyle.in/wp-json/jwt-auth/v1/token",

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify({

            username:
              body.email,

            password:
              body.password,

          }),
      }
    );

    const data =
      await res.json();

    if (!res.ok) {

      return NextResponse.json(

        {
          error:
            data.message ||
            "Login failed",
        },

        { status: 401 }
      );
    }

    return NextResponse.json(
      data
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(

      {
        error:
          "Server error",
      },

      { status: 500 }
    );
  }
}