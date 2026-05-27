import api from "@/lib/woocommerce";

import {
    NextResponse
}
    from "next/server";

import {
    sendWelcomeEmail
}
    from "@/lib/mailer";

export async function POST(
    request
) {

    try {

        const body =
            await request.json();

        const response =
            await api.post(
                "customers",
                {

                    email:
                        body.email,

                    first_name:
                        body.firstName,

                    last_name:
                        body.lastName,

                    username:
                        body.email,

                    password:
                        body.password,

                    billing: {

                        phone:
                            body.phone,

                    },
                }
            );

        await sendWelcomeEmail(

            email,

            firstName

        );
        return NextResponse.json({

            success: true,

            user:
                response.data,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(

            {
                success: false,

                error:
                    error.response?.data
                        ?.message ||

                    "Registration failed",
            },

            { status: 500 }

        );
    }
}