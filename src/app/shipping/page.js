import styles from "./ShippingPage.module.css";

export default function ShippingPage() {

  return (

    <div className={styles.page}>

      <div className={styles.container}>

        <span className={styles.badge}>
          Help Center
        </span>

        <h1 className={styles.title}>
          Shipping Policy
        </h1>

        <p className={styles.updated}>
          Last updated: May 2026
        </p>

        <div className={styles.content}>

          <section className={styles.section}>

            <h2>
              Order Processing
            </h2>

            <p>
              Orders are usually processed within
              1–2 business days after successful payment
              confirmation.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Shipping Timeline
            </h2>

            <p>
              Standard delivery typically takes
              3–7 business days depending on
              your location across India.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Shipping Charges
            </h2>

            <p>
              We offer free shipping on orders
              above ₹1999. Orders below this amount
              may include a shipping fee.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Order Tracking
            </h2>

            <p>
              Once your order is shipped,
              tracking details will be shared
              via email or SMS.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Delays
            </h2>

            <p>
              Delivery delays may occur due to
              weather conditions, courier issues,
              public holidays, or unforeseen circumstances.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Contact Support
            </h2>

            <p>
              For shipping-related support,
              contact us at:
            </p>

            <a
              href="mailto:kridaylifestyle@gmail.com"
              className={styles.email}
            >
              kridaylifestyle@gmail.com
            </a>

          </section>

        </div>

      </div>

    </div>
  );
}