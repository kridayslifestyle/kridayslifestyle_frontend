"use client";

import { useState } from "react";

import styles from "./FilterSidebar.module.css";



const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const RATINGS = [4, 3, 2];

const COLORS = [
  "#000000",
  "#ffffff",
  "#ff4d6d",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
];

const DISCOUNTS = [10, 20, 30, 40, 50];





export default function FilterSidebar({

  filters,

  onChange,

  onClear,

  products = [],

}) {

  const [open, setOpen] = useState({
    category: true,
    price: true,
    size: true,
    color: true,
    discount: true,
    availability: true,
    rating: true,
  });

  const categoryMap = {};

  products.forEach((product) => {

    const category =
      product.categorySlugs?.[0] ||
      "uncategorized";

    if (!categoryMap[category]) {

      categoryMap[category] = 0;
    }

    categoryMap[category]++;
  });

  const dynamicCategories = [

    {
      label: "All",
      slug: "",
      count: products.length,
    },

    {
      label: "Dresses",
      slug: "dresses",
      count: products.filter((p) =>
        p.categorySlugs?.includes("dresses")
      ).length,
    },

    {
      label: "Western Wear",
      slug: "western-wear",
      count: products.filter((p) =>
        p.categorySlugs?.includes("western-wear")
      ).length,
    },

    {
      label: "Kurtis",
      slug: "kurtis",
      count: products.filter((p) =>
        p.categorySlugs?.includes("kurtis")
      ).length,
    },

  ].filter((cat) => cat.count > 0);

  function toggle(key) {
    setOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  // CATEGORY
  function handleCategory(slug) {

    // Parent clothing page
    if (
      window.location.pathname.includes("/shop/clothing")
    ) {

      onChange({
        ...filters,

        category: "clothing",

        subCategory: slug,

        page: 1,
      });

      return;
    }

    onChange({
      ...filters,

      category: slug,

      subCategory: "",

      page: 1,
    });
  }
  // PRICE
  function handlePriceMin(e) {
    onChange({
      ...filters,
      priceMin: Number(e.target.value),
      page: 1,
    });
  }

  function handlePriceMax(e) {
    onChange({
      ...filters,
      priceMax: Number(e.target.value),
      page: 1,
    });
  }

  // SIZE
  function handleSize(size) {

    const current = filters.sizes || [];

    const updated = current.includes(size)
      ? current.filter((s) => s !== size)
      : [...current, size];

    onChange({
      ...filters,
      sizes: updated,
      page: 1,
    });
  }

  // COLOR
  function handleColor(color) {

    const current = filters.colors || [];

    const updated = current.includes(color)
      ? current.filter((c) => c !== color)
      : [...current, color];

    onChange({
      ...filters,
      colors: updated,
      page: 1,
    });
  }

  // DISCOUNT
  function handleDiscount(discount) {

    onChange({
      ...filters,
      discount:
        filters.discount === discount
          ? null
          : discount,
      page: 1,
    });
  }

  // AVAILABILITY
  function handleAvailability(type) {

    const current =
      filters.availability || [];

    const updated = current.includes(type)
      ? current.filter((a) => a !== type)
      : [...current, type];

    onChange({
      ...filters,
      availability: updated,
      page: 1,
    });
  }

  // RATING
  function handleRating(rating) {

    onChange({
      ...filters,
      rating:
        filters.rating === rating
          ? null
          : rating,
      page: 1,
    });
  }

  return (

    <aside className={styles.sidebar}>

      {/* HEADER */}
      <div className={styles.header}>

        <h3 className={styles.title}>
          Filters
        </h3>

        <button
          className={styles.clearAll}
          onClick={onClear}
        >
          Clear All
        </button>

      </div>

      {/* CATEGORY */}
      <div className={styles.section}>

        <button
          className={styles.sectionTitle}
          onClick={() => toggle("category")}
        >
          Category
          <span>
            {open.category ? "−" : "+"}
          </span>
        </button>

        {open.category && (

          <ul className={styles.categoryList}>

            {dynamicCategories.map((cat) => (

              <li key={cat.slug}>

                <button
                  className={`${styles.categoryBtn} ${filters.category === cat.slug
                    ? styles.categoryActive
                    : ""
                    }`}
                  onClick={() =>
                    handleCategory(cat.slug)
                  }
                >

                  <span>{cat.label}</span>

                  <span className={styles.count}>
                    {cat.count}
                  </span>

                </button>

              </li>

            ))}

          </ul>

        )}

      </div>

      <div className={styles.divider} />

      {/* PRICE */}
      <div className={styles.section}>

        <button
          className={styles.sectionTitle}
          onClick={() => toggle("price")}
        >
          Price Range
          <span>
            {open.price ? "−" : "+"}
          </span>
        </button>

        {open.price && (

          <div className={styles.priceWrap}>

            <div className={styles.priceDisplay}>

              <span className={styles.priceTag}>
                ₹{filters.priceMin || 0}
              </span>

              <span className={styles.priceSep}>
                —
              </span>

              <span className={styles.priceTag}>
                ₹{filters.priceMax || 10000}
              </span>

            </div>

            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={filters.priceMin || 0}
              onChange={handlePriceMin}
              className={styles.slider}
            />

            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={filters.priceMax || 10000}
              onChange={handlePriceMax}
              className={styles.slider}
            />

          </div>

        )}

      </div>

      <div className={styles.divider} />

      {/* SIZE */}
      <div className={styles.section}>

        <button
          className={styles.sectionTitle}
          onClick={() => toggle("size")}
        >
          Sizes
          <span>
            {open.size ? "−" : "+"}
          </span>
        </button>

        {open.size && (

          <div className={styles.sizes}>

            {SIZES.map((size) => (

              <button
                key={size}
                className={`${styles.sizeBtn} ${filters.sizes?.includes(size)
                  ? styles.sizeBtnActive
                  : ""
                  }`}
                onClick={() =>
                  handleSize(size)
                }
              >
                {size}
              </button>

            ))}

          </div>

        )}

      </div>

      <div className={styles.divider} />

      {/* COLORS */}
      <div className={styles.section}>

        <button
          className={styles.sectionTitle}
          onClick={() => toggle("color")}
        >
          Colors
          <span>
            {open.color ? "−" : "+"}
          </span>
        </button>

        {open.color && (

          <div className={styles.colors}>

            {COLORS.map((color) => (

              <button
                key={color}
                className={`${styles.colorBtn} ${filters.colors?.includes(color)
                  ? styles.colorActive
                  : ""
                  }`}
                style={{
                  background: color,
                }}
                onClick={() =>
                  handleColor(color)
                }
              />

            ))}

          </div>

        )}

      </div>

      <div className={styles.divider} />

      {/* DISCOUNTS */}
      <div className={styles.section}>

        <button
          className={styles.sectionTitle}
          onClick={() => toggle("discount")}
        >
          Discounts
          <span>
            {open.discount ? "−" : "+"}
          </span>
        </button>

        {open.discount && (

          <div className={styles.discountList}>

            {DISCOUNTS.map((discount) => (

              <button
                key={discount}
                className={`${styles.discountBtn} ${filters.discount === discount
                  ? styles.discountActive
                  : ""
                  }`}
                onClick={() =>
                  handleDiscount(discount)
                }
              >
                {discount}% & above
              </button>

            ))}

          </div>

        )}

      </div>

      <div className={styles.divider} />

      {/* AVAILABILITY */}
      <div className={styles.section}>

        <button
          className={styles.sectionTitle}
          onClick={() =>
            toggle("availability")
          }
        >
          Availability
          <span>
            {open.availability
              ? "−"
              : "+"}
          </span>
        </button>

        {open.availability && (

          <div className={styles.availability}>

            <label className={styles.checkRow}>

              <input
                type="checkbox"
                checked={!!filters.availability?.includes("stock")}
                onChange={() =>
                  handleAvailability("stock")
                }
              />

              In Stock

            </label>

            <label className={styles.checkRow}>

              <input
                type="checkbox"
                checked={filters.availability?.includes("sale")}
                onChange={() =>
                  handleAvailability("sale")
                }
              />

              Sale Items

            </label>

            <label className={styles.checkRow}>

              <input
                type="checkbox"
                checked={filters.availability?.includes("ready")}
                onChange={() =>
                  handleAvailability("ready")
                }
              />

              Ready To Ship

            </label>

          </div>

        )}

      </div>

      <div className={styles.divider} />

      {/* RATING */}
      <div className={styles.section}>

        <button
          className={styles.sectionTitle}
          onClick={() => toggle("rating")}
        >
          Rating
          <span>
            {open.rating ? "−" : "+"}
          </span>
        </button>

        {open.rating && (

          <div className={styles.ratingList}>

            {RATINGS.map((r) => (

              <button
                key={r}
                className={`${styles.ratingBtn} ${filters.rating === r
                  ? styles.ratingActive
                  : ""
                  }`}
                onClick={() =>
                  handleRating(r)
                }
              >

                <span className={styles.stars}>
                  {"★".repeat(r)}
                </span>

                <span>
                  & above
                </span>

              </button>

            ))}

          </div>

        )}

      </div>

    </aside>
  );
}