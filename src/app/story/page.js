import styles from "./StoryPage.module.css";

export default function StoryPage() {

  return (

    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>

        <div className={styles.overlay} />

        <div className={styles.heroContent}>

          <span className={styles.badge}>
            Our Journey
          </span>

          <h1 className={styles.heroTitle}>
            The Story Behind
            Kriday Lifestyle
          </h1>

          <p className={styles.heroText}>
            Every brand has a beginning —
            ours started with a passion for elegance,
            confidence, and timeless women’s fashion.
          </p>

        </div>

      </section>

      {/* STORY */}
      <section className={styles.section}>

        <div className={styles.container}>

          <div className={styles.grid}>

            <div className={styles.imageCard}>

              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
                alt="Kriday Story"
                className={styles.image}
              />

            </div>

            <div>

              <span className={styles.smallTitle}>
                HOW WE STARTED
              </span>

              <h2 className={styles.sectionTitle}>
                Fashion Inspired By Confidence
              </h2>

              <p className={styles.text}>
                Kriday Lifestyle was founded with the vision
                of creating premium women’s fashion that feels
                luxurious yet comfortable for everyday life.
              </p>

              <p className={styles.text}>
                We noticed that modern women wanted clothing
                that blends sophistication, elegance, and
                practicality — without compromising quality.
              </p>

              <p className={styles.text}>
                From carefully selected fabrics to modern
                silhouettes, every design reflects our passion
                for timeless style and confidence.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* TIMELINE */}
      <section className={styles.timelineSection}>

        <div className={styles.container}>

          <div className={styles.center}>

            <span className={styles.smallTitle}>
              OUR JOURNEY
            </span>

            <h2 className={styles.sectionTitle}>
              Milestones Along The Way
            </h2>

          </div>

          <div className={styles.timeline}>

            <div className={styles.timelineItem}>
              <div className={styles.year}>2024</div>
              <div className={styles.content}>
                Brand idea & first premium collection launched.
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.year}>2025</div>
              <div className={styles.content}>
                Expanded into modern western and ethnic collections.
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.year}>2026</div>
              <div className={styles.content}>
                Building a premium fashion experience for women across India.
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}