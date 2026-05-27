import Link from "next/link";
import styles from "./FeaturedBanner.module.css";

export default function FeaturedBanner() {
  return (
    <section className={styles.section}>

      {/* Dot pattern */}
      <div className={styles.dots} />

      <div className={styles.container}>

        {/* ── LEFT — Text ── */}
        <div className={styles.left}>

          <p className={styles.eyebrow}>Editor's Pick</p>

          <h2 className={styles.title}>
            Most Loved<br />Collection
          </h2>

          <p className={styles.desc}>
            Elegant styles curated for the modern woman —
            silhouettes that move with grace and feel like a second skin.
          </p>

          <Link href="/shop/best-sellers" className={styles.btn}>
            Explore Now
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

        </div>

        {/* ── RIGHT — Portrait card ── */}
        <div className={styles.right}>
          <div className={styles.imageCard}>
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=85&fit=crop&crop=top"
              alt="Most Loved Collection"
              className={styles.image}
            />
          </div>
        </div>

      </div>
    </section>
  );
}