import styles from "./CategorySection.module.css";

const CATEGORIES = [
  { id: 1,  name: "Dresses",     emoji: "👗", slug: "dresses" },
  { id: 3,  name: "Kurtis",      emoji: "👘", slug: "kurtis" },
  { id: 4,  name: "Western",     emoji: "👚", slug: "western-wear" },
  { id: 5,  name: "Jewelry",     emoji: "💎", slug: "jewelry" },
  { id: 6,  name: "Handbags",    emoji: "👜", slug: "handbags" },
  { id: 7,  name: "Shoes",       emoji: "👠", slug: "shoes" },
  { id: 8, name: "Accessories", emoji: "🎀", slug: "accessories" },
];

export default function CategorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Shop by Category</h2>
          <p className={styles.sub}>Explore curated edits</p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {CATEGORIES.map((cat) => (
            <a key={cat.id} href={`/shop/${cat.slug}`} className={styles.card}>
              <div className={styles.circle}>
                <span className={styles.emoji}>{cat.emoji}</span>
              </div>
              <span className={styles.name}>{cat.name}</span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}