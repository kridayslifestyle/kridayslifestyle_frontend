import styles from "./PressPage.module.css";

const ARTICLES = [
  {
    title: "Kriday Lifestyle Launches New Premium Collection",
    source: "Fashion Daily",
    date: "May 2026",
  },
  {
    title: "Emerging Fashion Brands To Watch In India",
    source: "Style Insider",
    date: "April 2026",
  },
  {
    title: "Modern Elegance Meets Comfort At Kriday",
    source: "Luxury Vogue",
    date: "March 2026",
  },
];

export default function PressPage() {

  return (

    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>

        <div className={styles.overlay} />

        <div className={styles.heroContent}>

          <span className={styles.badge}>
            Press & Media
          </span>

          <h1 className={styles.heroTitle}>
            Featured In Fashion
            & Lifestyle Media
          </h1>

          <p className={styles.heroText}>
            Discover the latest stories,
            media mentions, and press coverage
            featuring Kriday Lifestyle.
          </p>

        </div>

      </section>

      {/* ARTICLES */}
      <section className={styles.section}>

        <div className={styles.container}>

          <div className={styles.center}>

            <span className={styles.smallTitle}>
              PRESS COVERAGE
            </span>

            <h2 className={styles.sectionTitle}>
              Latest Media Highlights
            </h2>

          </div>

          <div className={styles.grid}>

            {ARTICLES.map((article) => (

              <div
                key={article.title}
                className={styles.card}
              >

                <span className={styles.date}>
                  {article.date}
                </span>

                <h3 className={styles.cardTitle}>
                  {article.title}
                </h3>

                <p className={styles.source}>
                  {article.source}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>
  );
}