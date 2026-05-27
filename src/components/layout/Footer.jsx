import Link from "next/link";
import styles from "./Footer.module.css";

const SHOP_LINKS = [
  { label: "New Arrivals", href: "/#new-arrivals" },
  { label: "Best Sellers", href: "/#best-sellers" },
  { label: "Dresses",        href: "/shop/dresses" },
  { label: "Sarees",         href: "/shop/sarees" },
  { label: "Kurtis",         href: "/shop/kurtis" },
  { label: "Western Wear",   href: "/shop/western-wear" },
  { label: "Jewelry",        href: "/shop/jewelry" },
  { label: "Sale",           href: "/sale" },
];

const HELP_LINKS = [
  { label: "Track My Order",       href: "/track-order" },
  { label: "Returns & Exchanges",  href: "/returns" },
  { label: "Shipping Policy",      href: "/shipping" },
  { label: "Size Guide",           href: "/size-guide" },
  { label: "FAQs",                 href: "/faqs" },
  { label: "Contact Us",           href: "/contact" },
];

const COMPANY_LINKS = [
  { label: "About Us",       href: "/about" },
  { label: "Our Story",      href: "/story" },
  { label: "Careers",        href: "/careers" },
  { label: "Press",          href: "/press" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use",   href: "/terms" },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  
  {
    name: "WhatsApp",
    href: "https://wa.me/919032445466",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  },
];

const PAYMENT_ICONS = ["Visa", "Mastercard", "UPI", "Razorpay", "COD"];

export default function Footer() {
  return (
    <footer className={styles.footer}>

      {/* ── TOP STRIP ── */}
      <div className={styles.topStrip}>
        <div className={styles.container}>
          <p className={styles.topStripText}>
            🌸 &nbsp; Free shipping on orders above ₹1999 &nbsp;·&nbsp; Easy 7-day returns &nbsp;·&nbsp; Authentic premium quality
          </p>
        </div>
      </div>

      {/* ── MAIN FOOTER BODY ── */}
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.grid}>

            {/* ── Col 1: Brand ── */}
            <div className={styles.brandCol}>
              {/* Logo */}
              <Link href="/" className={styles.logo}>
                <span className={styles.logoMain}>Kriday</span>
                <span className={styles.logoAccent}>Lifestyle</span>
              </Link>

              <p className={styles.brandDesc}>
                Premium women's fashion curated for every moment —
                elegant, trendy, and made to make you feel your best.
              </p>

              {/* Social icons */}
              <div className={styles.socials}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Contact info */}
              <div className={styles.contactInfo}>
                <a href="mailto:kridaylifestyle@gmail.com" className={styles.contactLink}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  kridaylifestyle@gmail.com
                </a>
                <a href="tel:+919032445866" className={styles.contactLink}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  +91 90324 45466
                </a>
              </div>
            </div>

            {/* ── Col 2: Shop ── */}
            <div className={styles.linkCol}>
              <h4 className={styles.colTitle}>Shop</h4>
              <ul className={styles.linkList}>
                {SHOP_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={styles.footerLink}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Help ── */}
            <div className={styles.linkCol}>
              <h4 className={styles.colTitle}>Help</h4>
              <ul className={styles.linkList}>
                {HELP_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={styles.footerLink}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 4: Company ── */}
            <div className={styles.linkCol}>
              <h4 className={styles.colTitle}>Company</h4>
              <ul className={styles.linkList}>
                {COMPANY_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={styles.footerLink}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <div className={styles.bottomInner}>

            {/* Copyright */}
            <p className={styles.copy}>
              © {new Date().getFullYear()} Kriday Lifestyle. All rights reserved.
            </p>

            {/* Payment icons */}
            <div className={styles.payments}>
              <span className={styles.payLabel}>We accept:</span>
              {PAYMENT_ICONS.map((p) => (
                <span key={p} className={styles.payChip}>{p}</span>
              ))}
            </div>

            {/* Made in India */}
            <p className={styles.madeIn}>
              🇮🇳 &nbsp;Made with love in India
            </p>

          </div>
        </div>
      </div>

    </footer>
  );
}