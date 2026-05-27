import styles from "./TermsPage.module.css";

export default function TermsPage() {

  return (

    <div className={styles.page}>

      <div className={styles.container}>

        <span className={styles.badge}>
          Legal
        </span>

        <h1 className={styles.title}>
          Terms & Conditions
        </h1>

        <p className={styles.updated}>
          Last updated: May 2026
        </p>

        <div className={styles.content}>

          <section className={styles.section}>

            <h2>
              Acceptance Of Terms
            </h2>

            <p>
              By accessing and using Kriday Lifestyle,
              you agree to comply with these Terms
              & Conditions and all applicable laws
              and regulations.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Product Information
            </h2>

            <p>
              We strive to display product details,
              pricing, and images as accurately as possible.
              However, slight variations in color or
              appearance may occur.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Orders & Payments
            </h2>

            <p>
              All orders are subject to availability
              and confirmation. Payments must be completed
              through approved payment methods available
              on our website.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Shipping & Delivery
            </h2>

            <p>
              Delivery timelines are estimates and may vary
              depending on location, courier services,
              or unforeseen circumstances.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Returns & Refunds
            </h2>

            <p>
              Returns are accepted according to our
              Returns Policy. Products must be unused
              and returned in original condition.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Intellectual Property
            </h2>

            <p>
              All content, logos, images, and branding
              on Kriday Lifestyle are protected by
              intellectual property laws and may not
              be reused without permission.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Contact Information
            </h2>

            <p>
              For any questions regarding these Terms,
              please contact us:
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