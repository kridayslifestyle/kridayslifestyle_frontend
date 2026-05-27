"use client";

import { useState } from "react";

import styles from "./FaqsPage.module.css";

const FAQS = [
  {
    question: "How long does delivery take?",
    answer:
      "Orders are usually delivered within 3–7 business days depending on your location.",
  },
  {
    question: "Do you offer Cash On Delivery?",
    answer:
      "Yes, Cash On Delivery is available for eligible orders across India.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Yes, products can be returned within 7 days if unused and in original condition.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You can track your order using the Track Order page available in the footer.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes, free shipping is available on orders above ₹1999.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept UPI, Cards, Net Banking, Razorpay, and Cash On Delivery.",
  },
];

export default function FaqsPage() {

  const [openIndex, setOpenIndex] = useState(null);

  function toggleFAQ(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (

    <div className={styles.page}>

      <div className={styles.container}>

        <span className={styles.badge}>
          Help Center
        </span>

        <h1 className={styles.title}>
          Frequently Asked Questions
        </h1>

        <p className={styles.subtitle}>
          Everything you need to know about shopping with Kriday Lifestyle.
        </p>

        <div className={styles.faqList}>

          {FAQS.map((faq, index) => (

            <div
              key={faq.question}
              className={styles.card}
            >

              <button
                className={styles.questionBtn}
                onClick={() => toggleFAQ(index)}
              >

                <span className={styles.question}>
                  {faq.question}
                </span>

                <span className={styles.icon}>
                  {openIndex === index ? "−" : "+"}
                </span>

              </button>

              {openIndex === index && (

                <div className={styles.answerWrap}>

                  <p className={styles.answer}>
                    {faq.answer}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}