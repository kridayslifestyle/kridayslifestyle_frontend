import styles from "./AboutPage.module.css";

export default function AboutPage() {

  return (

    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>

        <div className={styles.overlay} />

        <div className={styles.heroContent}>

          <span className={styles.badge}>
            About Kriday Lifestyle
          </span>

          <h1 className={styles.heroTitle}>
            Timeless Fashion
            Crafted For Modern Women
          </h1>

          <p className={styles.heroText}>
            We create premium women’s fashion that blends
            elegance, confidence, comfort, and modern luxury
            into every collection.
          </p>

        </div>

      </section>

      {/* STORY */}
      <section className={styles.section}>

        <div className={styles.container}>

          <div className={styles.storyGrid}>

            <div>

              <span className={styles.smallTitle}>
                OUR STORY
              </span>

              <h2 className={styles.sectionTitle}>
                Fashion That Makes You Feel Beautiful
              </h2>

              <p className={styles.text}>
                Kriday Lifestyle was born with a simple vision:
                to create elegant fashion that empowers women
                to feel confident every single day.
              </p>

              <p className={styles.text}>
                From timeless silhouettes to carefully selected
                premium fabrics, every design is created with
                attention to comfort, detail, and modern style.
              </p>

              <p className={styles.text}>
                We believe fashion should not only look beautiful
                but also make women feel strong, graceful, and confident.
              </p>

            </div>

            <div className={styles.imageCard}>

              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000&q=80"
                alt="Fashion"
                className={styles.image}
              />

            </div>

          </div>

        </div>

      </section>

      {/* VALUES */}
      <section className={styles.valuesSection}>

        <div className={styles.container}>

          <div className={styles.center}>

            <span className={styles.smallTitle}>
              WHY CHOOSE US
            </span>

            <h2 className={styles.sectionTitle}>
              Designed Around Quality & Elegance
            </h2>

          </div>

          <div className={styles.valuesGrid}>

            <div className={styles.card}>

              <div className={styles.icon}>
                ✨
              </div>

              <h3>
                Premium Quality
              </h3>

              <p>
                We use premium handpicked fabrics
                for unmatched comfort and durability.
              </p>

            </div>

            <div className={styles.card}>

              <div className={styles.icon}>
                🌸
              </div>

              <h3>
                Elegant Designs
              </h3>

              <p>
                Modern silhouettes crafted for
                timeless elegance and beauty.
              </p>

            </div>

            <div className={styles.card}>

              <div className={styles.icon}>
                ❤️
              </div>

              <h3>
                Customer First
              </h3>

              <p>
                Your satisfaction and confidence
                are always our highest priority.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className={styles.statsSection}>

        <div className={styles.container}>

          <div className={styles.statsGrid}>

            <div>
              <h2>10K+</h2>
              <p>Happy Customers</p>
            </div>

            <div>
              <h2>50+</h2>
              <p>Premium Designs</p>
            </div>

            <div>
              <h2>4.9★</h2>
              <p>Customer Rating</p>
            </div>

            <div>
              <h2>100%</h2>
              <p>Premium Quality</p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}