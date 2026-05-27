import api from "@/lib/woocommerce";

import {
  NextResponse
}
from "next/server";

export async function GET(
  request
) {

  try {

    // Get email
    const {
      searchParams
    } = new URL(
      request.url
    );

    const email =
      searchParams.get(
        "email"
      );

    // Fetch customers
    const response =
      await api.get(
        "customers",
        {

          email,
        }
      );

    // Return first match
    return NextResponse.json(

      response.data[0]
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(

      {
        error:
          "Failed to fetch customer",
      },

      { status: 500 }
    );
  }
}

export async function PUT(
  request
) {

  try {

    const body =
      await request.json();

    const response =
      await api.put(

        `customers/${body.id}`,

        {

          first_name:
            body.first_name,

          last_name:
            body.last_name,

          billing: {

            phone:
              body.phone,

            address_1:
              body.address,

            city:
              body.city,

            state:
              body.state,

            postcode:
              body.pincode,
          },

          shipping: {

            first_name:
              body.first_name,

            last_name:
              body.last_name,

            address_1:
              body.address,

            city:
              body.city,

            state:
              body.state,

            postcode:
              body.pincode,
          },
        }
      );

    return NextResponse.json(
      response.data
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(

      {
        error:
          "Failed to update customer",
      },

      { status: 500 }
    );
  }
}