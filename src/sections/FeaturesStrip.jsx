import styles from "./FeaturesStrip.module.css";

const FEATURES = [
  {
    id: 1,
    icon: (
      <svg width="22" height="22" fill="none" stroke="#E8627A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: "Premium Quality",
    desc: "Handpicked fabrics & finishes",
  },
  {
    id: 2,
    icon: (
      <svg width="22" height="22" fill="none" stroke="#E8627A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: "Free Shipping",
    desc: "On orders above ₹1999",
  },
  {
    id: 3,
    icon: (
      <svg width="22" height="22" fill="none" stroke="#E8627A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
      </svg>
    ),
    title: "Easy Returns",
    desc: "7-day hassle-free returns",
  },
  {
    id: 4,
    icon: (
      <svg width="22" height="22" fill="none" stroke="#E8627A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z"/>
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z"/>
      </svg>
    ),
    title: "Customer Support",
    desc: "Always here to help",
  },
];

export default function FeaturesStrip() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {FEATURES.map((f, i) => (
          <div key={f.id} className={styles.feature}>
            <div className={styles.iconWrap}>{f.icon}</div>
            <div className={styles.text}>
              <span className={styles.title}>{f.title}</span>
              <span className={styles.desc}>{f.desc}</span>
            </div>
            {/* Divider between items */}
            {i < FEATURES.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </div>
    </section>
  );
}