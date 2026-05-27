"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchOverlay from "@/components/search/SearchOverlay";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },

  {
    label: "Clothing",
    href: "/shop/clothing",
  },

  {
    label: "Accessories",
    href: "/shop/accessories",
  },

  {
    label: "Footwear",
    href: "/shop/footwear",
  },


  {
    label: "Sale",
    href: "/sale",
    badge: "20% Off",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // ── Real counts from contexts ──
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>

        {/* ── Logo ── */}
        <Link
          href="/"
          scroll={true}
          className={styles.logo}
          onClick={() => setMenuOpen(false)}
        >
          <span className={styles.logoMain}>Kriday</span>
          <span className={styles.logoAccent}>Lifestyle</span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
              {link.badge && (
                <span className={styles.navBadge}>{link.badge}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* ── Actions ── */}
        <div className={styles.actions}>

          {/* Search */}
          <button
            className={styles.iconBtn}
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16.5 16.5 4 4" />
            </svg>
          </button>

          {/* Wishlist — real count ✅ */}
          <Link href="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {totalWishlistItems > 0 && (
              <span className={styles.badge}>
                {totalWishlistItems > 99 ? "99+" : totalWishlistItems}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link href="/account" className={styles.iconBtn} aria-label="My Account">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          {/* Cart — real count ✅ */}
          <Link href="/cart" className={`${styles.iconBtn} ${styles.cartBtn}`} aria-label="Cart">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className={`${styles.badge} ${styles.badgeRose}`}>
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.isOpen : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ""}`}>
        <nav className={styles.mobileNav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              {link.badge && <span className={styles.navBadge}>{link.badge}</span>}
            </Link>
          ))}
          <Link href="/account" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>My Account</Link>
          <Link href="/wishlist" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            Wishlist
            {totalWishlistItems > 0 && (
              <span className={styles.navBadge}>{totalWishlistItems}</span>
            )}
          </Link>
        </nav>

        <div className={styles.mobileCta}>
          <Link href="/shop" className={styles.mobileShopBtn} onClick={() => setMenuOpen(false)}>
            Shop All Collections
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      <SearchOverlay
        open={searchOpen}
        onClose={() =>
          setSearchOpen(false)
        }
      />
    </header>
  );
}