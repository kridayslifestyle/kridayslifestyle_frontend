import styles from "./CategorySection.module.css";

const CATEGORIES = [
  {
    id: 1,
    name: "Dresses",
    image: "/images/categories/dresses.jpg",
    slug: "dresses",
  },
  {
    id: 3,
    name: "Kurtis",
    image: "/images/categories/kurtis.jpg",
    slug: "kurtis",
  },
  {
    id: 4,
    name: "Western",
    image: "/images/categories/western.jpg",
    slug: "western-wear",
  },
  {
    id: 5,
    name: "Jewelry",
    image: "/images/categories/jewelry.jpg",
    slug: "jewelry",
  },
  {
    id: 6,
    name: "Handbags",
    image: "/images/categories/handbags.jpg",
    slug: "handbags",
  },
  {
    id: 7,
    name: "Shoes",
    image: "/images/categories/shoes.jpg",
    slug: "shoes",
  },
  {
    id: 8,
    name: "Accessories",
    image: "/images/categories/accessories.jpg",
    slug: "accessories",
  },
];

export default function CategorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>Shop by Category</h2>
          <p className={styles.sub}>Explore curated edits</p>
        </div>

        <div className={styles.grid}>
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`/shop/${cat.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className={styles.image}
                />
              </div>

              <span className={styles.name}>
                {cat.name}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}