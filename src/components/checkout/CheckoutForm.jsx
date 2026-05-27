"use client";

import styles from "./CheckoutPage.module.css";

export default function CheckoutForm({

  form,

  setForm,

  onPlaceOrder,

  loading,

}) {

  return (

    <form
      className={styles.form}

      onSubmit={(e) => {
        e.preventDefault();
        onPlaceOrder();
      }}
    >

      {/* ───────────────────── */}
      {/* CONTACT */}
      {/* ───────────────────── */}
      <div className={styles.section}>

        <h2 className={styles.sectionTitle}>
          Contact Information
        </h2>

        <div className={styles.grid2}>

          <input

            type="text"

            placeholder="First Name"

            className={styles.input}

            value={form.firstName}

            onChange={(e) =>

              setForm({

                ...form,

                firstName:
                  e.target.value,

              })

            }

          />

          <input

            type="text"

            placeholder="Last Name"

            className={styles.input}

            value={form.lastName}

            onChange={(e) =>

              setForm({

                ...form,

                lastName:
                  e.target.value,

              })

            }

          />

        </div>

        <input

          type="email"

          placeholder="Email Address"

          className={styles.input}

          value={form.email}

          onChange={(e) =>

            setForm({

              ...form,

              email:
                e.target.value,

            })

          }

        />

        <input

          type="tel"

          placeholder="Phone Number"

          className={styles.input}

          value={form.phone}

          onChange={(e) =>

            setForm({

              ...form,

              phone:
                e.target.value,

            })

          }

        />

      </div>

      {/* ───────────────────── */}
      {/* ADDRESS */}
      {/* ───────────────────── */}
      <div className={styles.section}>

        <h2 className={styles.sectionTitle}>
          Shipping Address
        </h2>

        <input

          type="text"

          placeholder="Address"

          className={styles.input}

          value={form.address}

          onChange={(e) =>

            setForm({

              ...form,

              address:
                e.target.value,

            })

          }

        />

        <div className={styles.grid2}>

          <input

            type="text"

            placeholder="City"

            className={styles.input}

            value={form.city}

            onChange={(e) =>

              setForm({

                ...form,

                city:
                  e.target.value,

              })

            }

          />

          <input

            type="text"

            placeholder="State"

            className={styles.input}

            value={form.state}

            onChange={(e) =>

              setForm({

                ...form,

                state:
                  e.target.value,

              })

            }

          />

        </div>

        <div className={styles.grid2}>

          <input

            type="text"

            placeholder="ZIP Code"

            className={styles.input}

            value={form.pincode}

            onChange={(e) =>

              setForm({

                ...form,

                pincode:
                  e.target.value,

              })

            }

          />

          <input

            type="text"

            placeholder="Country"

            className={styles.input}

            value={form.country}

            onChange={(e) =>

              setForm({

                ...form,

                country:
                  e.target.value,

              })

            }

          />

        </div>

      </div>

      {/* ───────────────────── */}
      {/* PAYMENT */}
      {/* ───────────────────── */}
      <div className={styles.section}>

        <h2 className={styles.sectionTitle}>
          Payment Method
        </h2>

        <label className={styles.radioRow}>

          <input

            type="radio"

            name="payment"

            checked={
              form.payment === "cod"
            }

            onChange={() =>

              setForm({

                ...form,

                payment: "cod",

              })

            }

          />

          Cash On Delivery

        </label>

        <label className={styles.radioRow}>

          <input

            type="radio"

            name="payment"

            checked={
              form.payment === "razorpay"
            }

            onChange={() =>

              setForm({

                ...form,

                payment:
                  "razorpay",

              })

            }

          />

          Razorpay

        </label>

        <label className={styles.radioRow}>

          <input

            type="radio"

            name="payment"

            checked={
              form.payment === "stripe"
            }

            onChange={() =>

              setForm({

                ...form,

                payment: "stripe",

              })

            }

          />

          Stripe

        </label>

      </div>

      

    </form>

  );
}