import styles from "./Testimonials.module.css";

const REVIEWS = [
  {
    id: 1,
    name: "Ananya Mehta",
    initial: "A",
    location: "Mumbai",
    rating: 5,
    text: '"The fabric quality is unreal — feels like couture at boutique prices. The pink saree is now my forever favourite."',
  },
  {
    id: 2,
    name: "Priya Sharma",
    initial: "P",
    location: "Delhi",
    rating: 5,
    text: '"Every piece feels handpicked. Packaging was beautiful and the fit was perfect. Already ordered three more!"',
  },
  {
    id: 3,
    name: "Riya Kapoor",
    initial: "R",
    location: "Bangalore",
    rating: 5,
    text: '"Truly elegant designs. The kurti collection is so unique and feminine — I get compliments every single time."',
  },
  {
    id: 4,
    name: "Sneha Iyer",
    initial: "S",
    location: "Chennai",
    rating: 5,
    text: '"Absolutely obsessed with my co-ord set! The quality is top notch and delivery was super fast. Will shop again!"',
  },
  {
    id: 5,
    name: "Meera Nair",
    initial: "M",
    location: "Hyderabad",
    rating: 5,
    text: '"The saree collection is breathtaking. I wore it to my sister\'s wedding and received so many compliments!"',
  },
  {
    id: 6,
    name: "Divya Reddy",
    initial: "D",
    location: "Pune",
    rating: 5,
    text: '"Love how every piece feels luxurious yet affordable. The packaging itself feels like a gift. Highly recommend!"',
  },
];

// Star renderer
function Stars({ count = 5 }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={styles.star}>★</span>
      ))}
    </div>
  );
}

// Single review card
function ReviewCard({ review }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.avatar}>{review.initial}</div>
        <div className={styles.meta}>
          <span className={styles.name}>{review.name}</span>
          <Stars count={review.rating} />
        </div>
      </div>
      <p className={styles.text}>{review.text}</p>
    </div>
  );
}

export default function Testimonials() {
  // Duplicate reviews so marquee loops seamlessly
  const items = [...REVIEWS, ...REVIEWS];

  return (
    <section className={styles.section}>
      {/* Dot pattern */}
      <div className={styles.dots} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>Loved by Women</p>
          <h2 className={styles.title}>What Our Customers Say</h2>
        </div>
      </div>

      {/* Marquee — full width, outside container */}
      <div className={styles.marqueeOuter}>
        {/* Left fade */}
        <div className={`${styles.fade} ${styles.fadeLeft}`} />

        <div className={styles.marqueeTrack}>
          {items.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>

        {/* Right fade */}
        <div className={`${styles.fade} ${styles.fadeRight}`} />
      </div>
    </section>
  );
}