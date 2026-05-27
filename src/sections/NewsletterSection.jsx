"use client";

import { useState } from "react";
import styles from "./NewsletterSection.module.css";

export default function NewsletterSection() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    // TODO: connect to your email service / WooCommerce
   
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className={styles.section}>
      {/* Dot pattern */}
      <div className={styles.dots} />

      <div className={styles.container}>

        {/* ── Left: Text ── */}
        <div className={styles.left}>
          <p className={styles.eyebrow}>Stay in the Loop</p>
          <h2 className={styles.title}>
            Get Exclusive Deals<br />
            <span className={styles.accent}>&amp; New Arrivals First</span>
          </h2>
          <p className={styles.desc}>
            Subscribe to our newsletter and be the first to know about
            new collections, flash sales, and style tips curated just for you.
          </p>

          {/* Perks */}
          <ul className={styles.perks}>
            {[
              "Early access to new collections",
              "Members-only discount codes",
              "Style tips & lookbook drops",
            ].map((p) => (
              <li key={p} className={styles.perk}>
                <span className={styles.perkDot}>✦</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: Form ── */}
        <div className={styles.right}>
          <div className={styles.formCard}>

            {submitted ? (
              /* Success state */
              <div className={styles.success}>
                <div className={styles.successIcon}>🌸</div>
                <h3 className={styles.successTitle}>You're in!</h3>
                <p className={styles.successText}>
                  Thank you for subscribing. Your first exclusive offer
                  is on its way to your inbox.
                </p>
                <button
                  className={styles.resetBtn}
                  onClick={() => setSubmitted(false)}
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} noValidate>
                <h3 className={styles.formTitle}>Join the Kriday Family</h3>
                <p className={styles.formSub}>No spam, only style. Unsubscribe anytime.</p>

                {/* Name */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="kl-name">
                    Full Name
                  </label>
                  <input
                    id="kl-name"
                    type="text"
                    placeholder="Ananya Mehta"
                    className={styles.input}
                  />
                </div>

                {/* Email */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="kl-email">
                    Email Address
                  </label>
                  <input
                    id="kl-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className={`${styles.input} ${error ? styles.inputError : ""}`}
                  />
                  {error && <span className={styles.errorMsg}>{error}</span>}
                </div>

                {/* Submit */}
                <button type="submit" className={styles.submitBtn}>
                  Subscribe Now
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <p className={styles.privacy}>
                  🔒 We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}