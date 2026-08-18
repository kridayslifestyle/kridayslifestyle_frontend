import styles from "./CategorySection.module.css";

const CATEGORIES = [
  { id: 1, name: "Dresses", slug: "dresses", icon: "dress" },
  { id: 3, name: "Kurtis", slug: "kurtis", icon: "kurti" },
  { id: 4, name: "Western", slug: "western-wear", icon: "western" },
  { id: 5, name: "Jewelry", slug: "jewelry", icon: "jewelry" },
  { id: 6, name: "Handbags", slug: "handbags", icon: "bag" },
  { id: 7, name: "Shoes", slug: "shoes", icon: "shoe" },
  { id: 8, name: "Accessories", slug: "accessories", icon: "accessories" },
];

function CategoryIcon({ type }) {
  switch (type) {
    case "dress":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M19 7c1.5 3 3 4.5 5 4.5S27.5 10 29 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M19 11l-5 6 4 3-4 21h20l-4-21 4-3-5-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "kurti":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M19 8l-7 5-5 10 6 3 3-6v15h20V20l3 6 6-3-5-10-7-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M19 8c1 3 2.5 4.5 5 4.5S28 11 29 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "western":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M18 8l-6 5-6 11 7 4 4-7v17h18V21l4 7 7-4-6-11-6-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M18 8c1 3 2.5 4.5 6 4.5S29 11 30 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "jewelry":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M24 8l5 7-5 25-5-25 5-7z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M19 15h10M14 15l5 0M29 15l5 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "bag":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect
            x="9"
            y="17"
            width="30"
            height="23"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M16 18v-3a8 8 0 0116 0v3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "shoe":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M7 32c5 0 8-3 11-10l5-9 6 7c3 4 7 6 12 7v8H7z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M7 35h34"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "accessories":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M24 9c-5 0-9 4-9 9 0 5 4 8 9 8s9-3 9-8c0-5-4-9-9-9z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M24 26c-5 0-9 3-9 8s4 6 9 6 9-1 9-6-4-8-9-8z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );

    default:
      return null;
  }
}

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
              <div className={styles.circle}>
                <CategoryIcon type={cat.icon} />
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