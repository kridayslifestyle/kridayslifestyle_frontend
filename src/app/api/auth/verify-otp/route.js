import {
  NextResponse
}
from "next/server";

import {
  otpStore
}
from "../send-otp/route";

export async function POST(
  request
) {

  try {

    const {

      email,

      otp,

    } = await request.json();

    const storedOTP =
      otpStore.get(email);

    // No OTP
    if (!storedOTP) {

      return NextResponse.json(

        {
          error:
            "OTP not found",
        },

        { status: 400 }
      );
    }

    // Expired
    if (
      Date.now() >
      storedOTP.expires
    ) {

      otpStore.delete(email);

      return NextResponse.json(

        {
          error:
            "OTP expired",
        },

        { status: 400 }
      );
    }

    // Invalid
    if (
      storedOTP.otp !== otp
    ) {

      return NextResponse.json(

        {
          error:
            "Invalid OTP",
        },

        { status: 400 }
      );
    }

    // Success
    otpStore.delete(email);

    return NextResponse.json({

      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(

      {
        error:
          "OTP verification failed",
      },

      { status: 500 }
    );
  }
}