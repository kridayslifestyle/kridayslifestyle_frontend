import styles from "./PrivacyPage.module.css";

export default function PrivacyPage() {

  return (

    <div className={styles.page}>

      <div className={styles.container}>

        <span className={styles.badge}>
          Legal
        </span>

        <h1 className={styles.title}>
          Privacy Policy
        </h1>

        <p className={styles.updated}>
          Last updated: May 2026
        </p>

        <div className={styles.content}>

          <section className={styles.section}>

            <h2>
              Information We Collect
            </h2>

            <p>
              We collect personal information such as
              your name, email address, phone number,
              shipping address, and payment details
              when you place an order or contact us.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              How We Use Your Information
            </h2>

            <p>
              Your information is used to process
              orders, improve customer experience,
              provide support, and send updates
              regarding purchases and services.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Payment Security
            </h2>

            <p>
              All payments are securely processed
              through trusted payment providers.
              We do not store sensitive card details
              on our servers.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Data Protection
            </h2>

            <p>
              We take appropriate security measures
              to protect your personal information
              against unauthorized access or disclosure.
            </p>

          </section>

          <section className={styles.section}>

            <h2>
              Contact Us
            </h2>

            <p>
              For questions regarding this Privacy Policy,
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