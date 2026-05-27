import nodemailer from "nodemailer";

import {

  welcomeEmailTemplate,

  orderEmailTemplate,

  passwordResetTemplate,

} from "./emailTemplates";

const transporter =
  nodemailer.createTransport({

    host:
      process.env.SMTP_HOST,

    port:
      process.env.SMTP_PORT,

    secure: true,

    auth: {

      user:
        process.env.SMTP_USER,

      pass:
        process.env.SMTP_PASS,
    },
  });

export async function sendOTPEmail(

  email,

  otp

) {

  await transporter.sendMail({

    from:
      `"Kriday Lifestyle" <${process.env.SMTP_USER}>`,

    to: email,

    subject:
      "Your OTP Code - Kriday Lifestyle",

    html: `

      <div style="
        font-family: Arial;
        padding: 30px;
        background: #f7f7f7;
      ">

        <div style="
          max-width: 500px;
          margin: auto;
          background: white;
          padding: 40px;
          border-radius: 12px;
        ">

          <h1 style="
            margin-bottom: 10px;
          ">
            Kriday Lifestyle
          </h1>

          <p>
            Your verification OTP is:
          </p>

          <h2 style="
            font-size: 36px;
            letter-spacing: 8px;
            margin: 30px 0;
          ">
            ${otp}
          </h2>

          <p>
            This OTP expires in 10 minutes.
          </p>

        </div>

      </div>

    `,
  });
}

// ─────────────────────────────
// WELCOME EMAIL
// ─────────────────────────────
export async function sendWelcomeEmail(

  email,

  name

) {

  await transporter.sendMail({

    from:
      `"Kriday Lifestyle" <${process.env.SMTP_USER}>`,

    to: email,

    subject:
      "Welcome to Kriday Lifestyle ✨",

    html:
      welcomeEmailTemplate(
        name
      ),
  });
}

// ─────────────────────────────
// ORDER EMAIL
// ─────────────────────────────
export async function sendOrderEmail(

  email,

  orderId,

  total

) {

  await transporter.sendMail({

    from:
      `"Kriday Lifestyle" <${process.env.SMTP_USER}>`,

    to: email,

    subject:
      `Order #${orderId} Confirmed 🎉`,

    html:
      orderEmailTemplate(

        orderId,

        total

      ),
  });
}

// ─────────────────────────────
// PASSWORD RESET EMAIL
// ─────────────────────────────
export async function sendPasswordResetEmail(
  email
) {

  await transporter.sendMail({

    from:
      `"Kriday Lifestyle" <${process.env.SMTP_USER}>`,

    to: email,

    subject:
      "Password Reset Successful",

    html:
      passwordResetTemplate(),
  });
}