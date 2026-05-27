import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>

      {/* Dot pattern overlay */}
      <div className={styles.dotPattern} />

      <div className={styles.container}>
        <div className={styles.grid}>

          {/* ── LEFT ── */}
          <div className={styles.left}>

            <p className={styles.eyebrow}>New Collection · SS26</p>

            <h1 className={styles.heading}>
              Style That
              <span className={styles.headingAccent}>Speaks You</span>
            </h1>

            <p className={styles.desc}>
              Trendy &amp; elegant fashion for every woman — curated
              boutique pieces designed to make every moment feel like yours.
            </p>

            {/* Buttons */}
            <div className={styles.btnRow}>

              <Link href="/shop" className={styles.btnPrimary}>

                Shop Now

                <svg
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </Link>

              <Link
                href="/new-arrivals"
                className={styles.btnGhost}
              >
                View Lookbook
              </Link>

            </div>

            {/* Stats */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>10k+</span>
                <span className={styles.statLabel}>Happy Customers</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>4.9★</span>
                <span className={styles.statLabel}>Rated Boutique</span>
              </div>
            </div>

          </div>

          {/* ── RIGHT ── */}
          <div className={styles.right}>
            <div className={styles.imageFrame}>
              <img
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&auto=format&fit=crop&crop=top"
                alt="Kriday Lifestyle Fashion"
                className={styles.heroImg}
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}