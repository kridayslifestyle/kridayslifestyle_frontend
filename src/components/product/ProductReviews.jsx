"use client";

import {
  useEffect,
  useState,
} from "react";

import styles from "./ProductReviews.module.css";

export default function ProductReviews({
  productId,
}) {

  // ─────────────────────────────
  // STATE
  // ─────────────────────────────
  const [reviews, setReviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [name, setName] =
    useState("");

  const [review, setReview] =
    useState("");

  const [rating, setRating] =
    useState(5);

  const [submitting, setSubmitting] =
    useState(false);

  // ─────────────────────────────
  // FETCH REVIEWS
  // ─────────────────────────────
  useEffect(() => {

    async function fetchReviews() {

      try {

        const res = await fetch(

          `/api/reviews?product=${productId}`

        );

        const data =
          await res.json();

        setReviews(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    if (productId) {
      fetchReviews();
    }

  }, [productId]);

  // ─────────────────────────────
  // AVERAGE RATING
  // ─────────────────────────────
  const average =
    reviews.length

      ? (
        reviews.reduce(

          (acc, r) =>

            acc + Number(r.rating),

          0

        ) / reviews.length

      ).toFixed(1)

      : "0.0";

  // ─────────────────────────────
  // SUBMIT REVIEW
  // ─────────────────────────────
  async function handleSubmit(e) {

    e.preventDefault();

    if (!name || !review) {
      return;
    }

    try {

      setSubmitting(true);

      const res = await fetch(

        "/api/reviews",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({

              product_id:
                productId,

              reviewer:
                name,

              reviewer_email:
                `${Date.now()}@kriday.com`,

              review,

              rating,
            }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {

        throw new Error(
          data.error
        );
      }

      // Add instantly
      setReviews([
        data,
        ...reviews,
      ]);

      // Reset
      setName("");

      setReview("");

      setRating(5);

    } catch (error) {

      console.log(error);

    } finally {

      setSubmitting(false);
    }
  }

  // ─────────────────────────────
  // LOADING
  // ─────────────────────────────
  if (loading) {

    return (
      <section className={styles.section}>

        <div className={styles.top}>

          <h2 className={styles.title}>
            Loading Reviews...
          </h2>

        </div>

      </section>
    );
  }

  return (

    <section className={styles.section}>

      {/* HEADER */}
      <div className={styles.top}>

        <div>

          <h2 className={styles.title}>
            Customer Reviews
          </h2>

          <div className={styles.ratingWrap}>

            <div className={styles.bigRating}>
              {average}
            </div>

            <div>

              <div className={styles.stars}>
                ★★★★★
              </div>

              <p className={styles.count}>

                Based on
                {" "}
                {reviews.length}
                {" "}
                reviews

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* WRITE REVIEW */}
      <div className={styles.formCard}>

        <h3 className={styles.formTitle}>
          Write a Review
        </h3>

        <form

          className={styles.form}

          onSubmit={handleSubmit}

        >

          {/* NAME */}
          <input

            type="text"

            placeholder="Your Name"

            className={styles.input}

            value={name}

            onChange={(e) =>

              setName(
                e.target.value
              )

            }

          />

          {/* RATING */}
          <select

            className={styles.select}

            value={rating}

            onChange={(e) =>

              setRating(
                Number(
                  e.target.value
                )
              )

            }

          >

            <option value={5}>
              5 Stars
            </option>

            <option value={4}>
              4 Stars
            </option>

            <option value={3}>
              3 Stars
            </option>

            <option value={2}>
              2 Stars
            </option>

            <option value={1}>
              1 Star
            </option>

          </select>

          {/* REVIEW */}
          <textarea

            placeholder="Write your review..."

            className={styles.textarea}

            value={review}

            onChange={(e) =>

              setReview(
                e.target.value
              )

            }

          />

          {/* SUBMIT */}
          <button

            type="submit"

            className={styles.submitBtn}

            disabled={submitting}

          >

            {submitting

              ? "Submitting..."

              : "Submit Review"}

          </button>

        </form>

      </div>

      {/* REVIEWS */}
      <div className={styles.list}>

        {reviews.length === 0 && (

          <div className={styles.card}>

            <p className={styles.reviewText}>
              No reviews yet.
            </p>

          </div>

        )}

        {reviews.map((r) => (

          <div

            key={r.id}

            className={styles.card}

          >

            <div className={styles.cardTop}>

              <div>

                <h3 className={styles.user}>
                  {r.reviewer}
                </h3>

                <div className={styles.meta}>

                  <span>

                    {"★".repeat(
                      Number(r.rating)
                    )}

                  </span>

                  <span
                    className={
                      styles.verified
                    }
                  >
                    Verified Buyer
                  </span>

                </div>

              </div>

              <span className={styles.date}>

                {new Date(

                  r.date_created

                ).toLocaleDateString()}

              </span>

            </div>

            <p className={styles.reviewText}>
              {r.review}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}