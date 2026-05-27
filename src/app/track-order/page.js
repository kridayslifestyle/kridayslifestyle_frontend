import styles from "./TrackOrderPage.module.css";

export default function TrackOrderPage() {

  return (

    <div className={styles.page}>

      <div className={styles.container}>

        <span className={styles.badge}>
          Track Order
        </span>

        <h1 className={styles.title}>
          Track Your Order
        </h1>

        <p className={styles.subtitle}>
          Enter your order ID and email address
          to check your order status.
        </p>

        <div className={styles.card}>

          <form className={styles.form}>

            <input
              type="text"
              placeholder="Order ID"
              className={styles.input}
            />

            <input
              type="email"
              placeholder="Email Address"
              className={styles.input}
            />

            <button
              type="submit"
              className={styles.button}
            >
              Track Order
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}