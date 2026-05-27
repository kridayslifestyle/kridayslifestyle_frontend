import styles from "./ReturnsPage.module.css";

export default function ReturnsPage() {

  return (

    <div className={styles.page}>

      <div className={styles.container}>

        <span className={styles.badge}>
          Help Center
        </span>

        <h1 className={styles.title}>
          Returns & Exchanges
        </h1>

        <p className={styles.updated}>
          Last updated: May 2026
        </p>

        <div className={styles.content}>

          <section className={styles.section}>

            <h2>
              Return Eligibility
            </h2>

            <p>
              Products can be returned within
              7 days of delivery if they are unused,
              unwashed, and in original packaging.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Exchange Policy
            </h2>

            <p>
              We offer size exchanges subject
              to product availability. Exchange
              requests should be raised within
              7 days after delivery.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Refund Process
            </h2>

            <p>
              Refunds are processed after the
              returned product passes quality
              inspection. Refund timelines may
              take 5–7 business days.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Non-Returnable Products
            </h2>

            <p>
              Certain items such as jewelry,
              intimate wear, or customized products
              may not be eligible for return.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Damaged Or Incorrect Orders
            </h2>

            <p>
              If you receive a damaged or incorrect
              item, contact us immediately with
              order details and product images.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Need Help?
            </h2>

            <p>
              Contact our support team for
              returns or exchange assistance:
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