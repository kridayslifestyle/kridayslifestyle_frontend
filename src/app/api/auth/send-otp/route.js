import {
  NextResponse
}
from "next/server";

import {
  sendOTPEmail
}
from "@/lib/mailer";

// Temporary memory store
const otpStore = new Map();

export async function POST(
  request
) {

  try {

    const { email } =
      await request.json();

    // Generate 6 digit OTP
    const otp =
      Math.floor(

        100000 +
        Math.random() * 900000

      ).toString();

    // Save OTP
    otpStore.set(email, {

      otp,

      expires:
        Date.now() +
        10 * 60 * 1000,
    });

    // Send email
    await sendOTPEmail(
      email,
      otp
    );

    return NextResponse.json({

      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(

      {
        error:
          "Failed to send OTP",
      },

      { status: 500 }
    );
  }
}

// Export store
export { otpStore };