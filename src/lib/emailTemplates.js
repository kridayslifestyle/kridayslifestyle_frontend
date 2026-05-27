// src/lib/emailTemplates.js

// ─────────────────────────────
// BASE TEMPLATE
// ─────────────────────────────
function baseTemplate(content) {

  return `

  <div style="
    background:#f6f2f3;
    padding:60px 20px;
    font-family:Arial,sans-serif;
  ">

    <div style="
      max-width:620px;
      margin:auto;
      background:white;
      border-radius:28px;
      overflow:hidden;
      box-shadow:
        0 15px 45px rgba(0,0,0,0.06);
    ">

      <!-- HEADER -->
      <div style="
        background:#0f0f0f;
        padding:45px 30px;
        text-align:center;
      ">

        <h1 style="
          margin:0;
          color:white;
          font-size:42px;
          font-weight:700;
          letter-spacing:-1px;
        ">
          Kriday Lifestyle
        </h1>

      </div>

      <!-- CONTENT -->
      <div style="
        padding:50px 45px;
      ">

        ${content}

      </div>

      <!-- FOOTER -->
      <div style="
        border-top:1px solid #f1e4e7;
        padding:28px;
        text-align:center;
      ">

        <p style="
          margin:0;
          color:#8b7b80;
          font-size:14px;
        ">
          © 2026 Kriday Lifestyle
        </p>

      </div>

    </div>

  </div>

  `;
}

// ─────────────────────────────
// WELCOME EMAIL
// ─────────────────────────────
export function welcomeEmailTemplate(
  name
) {

  return baseTemplate(`

    <h2 style="
      font-size:38px;
      color:#111;
      margin-top:0;
      margin-bottom:18px;
    ">
      Welcome ${name} ✨
    </h2>

    <p style="
      color:#666;
      font-size:17px;
      line-height:1.8;
      margin-bottom:30px;
    ">
      Thank you for joining
      <b>Kriday Lifestyle</b>.
    </p>

    <p style="
      color:#777;
      font-size:16px;
      line-height:1.8;
      margin-bottom:35px;
    ">
      Discover premium fashion,
      luxury collections and
      timeless styles curated
      for modern fashion lovers.
    </p>

    <!-- BENEFITS -->
    <div style="
      background:#faf7f8;
      border:1px solid #f0e3e6;
      border-radius:22px;
      padding:28px;
      margin-bottom:35px;
    ">

      <h3 style="
        margin-top:0;
        color:#111;
        font-size:24px;
      ">
        Your Benefits
      </h3>

      <p style="
        color:#666;
        line-height:1.8;
        margin:0;
      ">
        ✓ Exclusive collections<br/>
        ✓ Fast order tracking<br/>
        ✓ Premium shopping experience<br/>
        ✓ Early sale access
      </p>

    </div>

    <!-- BUTTON -->
    <div style="
      text-align:center;
    ">

      <a
        href="https://kridaylifestyle.in"
        style="
          display:inline-block;
          background:#111;
          color:white;
          text-decoration:none;
          padding:16px 34px;
          border-radius:999px;
          font-size:15px;
          font-weight:700;
        "
      >
        Explore Collection
      </a>

    </div>

  `);
}

// ─────────────────────────────
// ORDER EMAIL
// ─────────────────────────────
export function orderEmailTemplate(
  order
) {

  return baseTemplate(`

    <h2 style="
      font-size:38px;
      color:#111;
      margin-top:0;
      margin-bottom:18px;
    ">
      Order Confirmed 🎉
    </h2>

    <p style="
      color:#666;
      font-size:17px;
      line-height:1.8;
      margin-bottom:32px;
    ">
      Thank you for shopping with
      <b>Kriday Lifestyle</b>.
      Your order has been placed successfully.
    </p>

    <!-- ORDER BOX -->
    <div style="
      background:#faf7f8;
      border:1px solid #f0e3e6;
      border-radius:22px;
      padding:28px;
      margin-bottom:35px;
    ">

      <p style="
        margin:0 0 12px;
        font-size:15px;
        color:#888;
      ">
        Order ID
      </p>

      <h3 style="
        margin:0 0 24px;
        font-size:34px;
        color:#111;
      ">
        #${order.id}
      </h3>

      <table width="100%">

        <tr>

          <td style="
            padding-bottom:12px;
            color:#777;
            font-size:15px;
          ">
            Total
          </td>

          <td align="right" style="
            font-weight:700;
            color:#111;
            font-size:16px;
          ">
            ₹${order.total}
          </td>

        </tr>

        <tr>

          <td style="
            color:#777;
            font-size:15px;
          ">
            Payment
          </td>

          <td align="right" style="
            font-weight:700;
            color:#111;
            font-size:16px;
          ">
            ${order.payment_method_title}
          </td>

        </tr>

      </table>

    </div>

    <!-- BUTTON -->
    <div style="
      text-align:center;
    ">

      <a
        href="https://kridaylifestyle.in/orders/${order.id}"
        style="
          display:inline-block;
          background:#111;
          color:white;
          text-decoration:none;
          padding:16px 34px;
          border-radius:999px;
          font-size:15px;
          font-weight:700;
        "
      >
        Track Your Order
      </a>

    </div>

  `);
}

// ─────────────────────────────
// PASSWORD RESET EMAIL
// ─────────────────────────────
export function passwordResetTemplate() {

  return baseTemplate(`

    <h2 style="
      font-size:36px;
      color:#111;
      margin-top:0;
    ">
      Password Reset Successful
    </h2>

    <p style="
      color:#666;
      font-size:16px;
      line-height:1.8;
    ">
      Your password was updated successfully.
    </p>

    <p style="
      color:#777;
      font-size:15px;
      line-height:1.8;
    ">
      If this wasn't you,
      contact support immediately.
    </p>

  `);
}

// ─────────────────────────────
// LOGIN ALERT EMAIL
// ─────────────────────────────
export function loginAlertTemplate(
  name
) {

  return baseTemplate(`

    <h2 style="
      font-size:36px;
      color:#111;
      margin-top:0;
      margin-bottom:18px;
    ">
      Login Successful 👋
    </h2>

    <p style="
      color:#666;
      font-size:17px;
      line-height:1.8;
      margin-bottom:30px;
    ">
      Hi ${name},
      your account was logged in successfully.
    </p>

    <div style="
      background:#faf7f8;
      border:1px solid #f0e3e6;
      border-radius:22px;
      padding:24px;
    ">

      <p style="
        margin:0;
        color:#666;
        line-height:1.8;
      ">
        If this wasn't you,
        please reset your password immediately.
      </p>

    </div>

  `);
}