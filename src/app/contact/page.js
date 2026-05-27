import styles from "./ContactPage.module.css";

export default function ContactPage() {

  return (

    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>

        <div className={styles.container}>

          <span className={styles.badge}>
            Contact Us
          </span>

          <h1 className={styles.title}>
            We'd Love To Hear From You
          </h1>

          <p className={styles.subtitle}>
            Have questions about orders, shipping,
            returns, or collaborations?
            Our team is here to help.
          </p>

        </div>

      </section>

      {/* Contact Section */}
      <section className={styles.section}>

        <div className={styles.container}>

          <div className={styles.grid}>

            {/* Left */}
            <div className={styles.infoCard}>

              <h2 className={styles.heading}>
                Get In Touch
              </h2>

              <div className={styles.infoList}>

                <div className={styles.infoItem}>
                  <span className={styles.label}>
                    Email
                  </span>

                  <a
                    href="mailto:kridaylifestyle@gmail.com"
                    className={styles.link}
                  >
                    kridaylifestyle@gmail.com
                  </a>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.label}>
                    Phone
                  </span>

                  <a
                    href="tel:+919032445466"
                    className={styles.link}
                  >
                    +91 90324 45466
                  </a>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.label}>
                    Address
                  </span>

                  <p className={styles.text}>
                    Hyderabad, Telangana,
                    India
                  </p>
                </div>

              </div>

            </div>

            {/* Right */}
            <div className={styles.formCard}>

              <h2 className={styles.heading}>
                Send Message
              </h2>

              <form className={styles.form}>

                <input
                  type="text"
                  placeholder="Your Name"
                  className={styles.input}
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className={styles.input}
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className={styles.input}
                />

                <textarea
                  placeholder="Your Message"
                  className={styles.textarea}
                />

                <button
                  type="submit"
                  className={styles.button}
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}