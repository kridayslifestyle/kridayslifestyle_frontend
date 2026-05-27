"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import FilterSidebar from "../../components/shop/FilterSidebar";
import ShopToolbar from "../../components/shop/ShopToolbar";
import dynamic from "next/dynamic";

const ProductGrid = dynamic(
    () => import("../../components/shop/ProductGrid"),
    {
        loading: () => <p>Loading products...</p>,
    }
);
import Pagination from "../../components/shop/Pagination";
import styles from "./ShopPage.module.css";



const PER_PAGE = 12;

export default function ShopClient({

    products = [],

    initialCategory = "",

    pageTitle = "All Products",

}) {

    const [filters, setFilters] = useState({
        category: initialCategory,
        subCategory: "",
        priceMin: 0,
        priceMax: 10000,
        sizes: [],
        colors: [],
        discount: null,
        availability: [],
        rating: null,
        sort: "date_desc",
        page: 1,
    });

    const [gridCols, setGridCols] = useState(4);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);


    // ── Filter + sort products (mock logic) ──
    // TODO: replace this with WooCommerce API call:
    // GET /wp-json/wc/v3/products?category=X&per_page=12&page=1&orderby=date
    const filtered = useMemo(() => {

        return products.filter((p) => {

            // ── CATEGORY FILTERING ──
            if (
                filters.category &&
                filters.category !== "clothing"
            ) {

                // Accessories parent category
                if (
                    filters.category === "accessories" &&
                    !p.categorySlugs?.some((slug) =>
                        [
                            "accessories",
                            "jewelry",
                            "handbags"
                        ].includes(slug)
                    )
                ) {
                    return false;
                }

                // Footwear parent category
                else if (
                    filters.category === "footwear" &&
                    !p.categorySlugs?.includes("shoes")
                ) {
                    return false;
                }

                // Direct category filtering
                else if (
                    !["accessories", "footwear"].includes(filters.category) &&
                    !p.categorySlugs?.includes(filters.category)
                ) {
                    return false;
                }
            }

            // ── CLOTHING SUB CATEGORY FILTER ──
            if (
                filters.category === "clothing" &&
                filters.subCategory &&
                !p.categorySlugs?.includes(filters.subCategory)
            ) {
                return false;
            }

            // ── PRICE FILTER ──
            if (p.price < filters.priceMin) return false;
            if (p.price > filters.priceMax) return false;

            // ── SIZE FILTER ──
            if (filters.sizes.length > 0) {

                const productSizes =
                    p.sizes || [];

                const hasSize =
                    filters.sizes.some((size) =>
                        productSizes.includes(size)
                    );

                if (!hasSize) {
                    return false;
                }
            }

            // ── COLOR FILTER ──
            if (
                filters.colors?.length > 0 &&
                !filters.colors.includes(p.color)
            ) {
                return false;
            }

            // ── DISCOUNT FILTER ──
            if (
                filters.discount &&
                (!p.discount ||
                    p.discount < filters.discount)
            ) {
                return false;
            }

            // ── AVAILABILITY FILTER ──
            if (
                filters.availability?.includes("sale") &&
                !p.sale
            ) {
                return false;
            }

            if (
                filters.availability?.includes("stock") &&
                !p.inStock
            ) {
                return false;
            }

            // ── RATING FILTER ──
            if (
                filters.rating &&
                p.rating < filters.rating
            ) {
                return false;
            }

            return true;

        }).sort((a, b) => {

            switch (filters.sort) {

                case "price_asc":
                    return a.price - b.price;

                case "price_desc":
                    return b.price - a.price;

                case "popularity":
                    return (b.reviewCount || 0) - (a.reviewCount || 0);

                case "rating":
                    return (b.rating || 0) - (a.rating || 0);

                default:
                    return b.id - a.id;
            }

        });

    }, [products, filters]);

    const totalPages = useMemo(() => {

        return Math.ceil(filtered.length / PER_PAGE);

    }, [filtered]);

    const paginated = useMemo(() => {

        const start =
            (filters.page - 1) * PER_PAGE;

        const end =
            filters.page * PER_PAGE;

        return filtered.slice(start, end);

    }, [filtered, filters.page]);

    // Simulate loading when filters change
    const handleFilterChange = useCallback((newFilters) => {

        setFilters(newFilters);

    }, []);

    function handleClearFilters() {
        handleFilterChange({
            category: initialCategory || "",
            subCategory: "",
            priceMin: 0,
            priceMax: 10000,
            sizes: [],
            colors: [],
            discount: null,
            availability: [],
            rating: null,
            sort: "date_desc",
            page: 1,
        });
    }

    // Close mobile filter on resize
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > 900) setMobileFilterOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <div className={styles.page}>

            {/* ── Page header ── */}
            <div className={styles.pageHeader}>
                <div className={styles.container}>
                    <p className={styles.breadcrumb}>

                        <Link href="/">Home</Link>

                        <span>›</span>

                        <Link href="/shop">Shop</Link>

                        <span>›</span>

                        <strong>{pageTitle}</strong>

                    </p>
                    <h1 className={styles.pageTitle}>{pageTitle}</h1>
                    <p className={styles.pageDesc}>
                        Discover our curated collection of premium women's fashion
                    </p>
                </div>
            </div>

            {/* ── Main layout: sidebar + content ── */}
            <div className={styles.container}>
                <div className={styles.layout}>

                    {/* Filter sidebar */}
                    {/* Desktop Sidebar */}
                    <div className={styles.desktopSidebar}>
                        <FilterSidebar
                            filters={filters}
                            onChange={handleFilterChange}
                            onClear={handleClearFilters}
                            products={products}
                        />
                    </div>

                    {/* Mobile Sidebar */}
                    {mobileFilterOpen && (
                        <>
                            <div
                                className={`${styles.sidebarWrap} ${styles.sidebarOpen}`}
                            >
                                <FilterSidebar
                                    filters={filters}
                                    onChange={handleFilterChange}
                                    onClear={handleClearFilters}
                                    products={products}
                                />
                            </div>

                            <div
                                className={styles.mobileOverlay}
                                onClick={() => setMobileFilterOpen(false)}
                            />
                        </>
                    )}

                    {/* Right: toolbar + grid + pagination */}
                    <div className={styles.content}>
                        <ShopToolbar
                            total={filtered.length}
                            filters={filters}
                            onChange={handleFilterChange}
                            gridCols={gridCols}
                            onGridToggle={setGridCols}
                            onMobileFilter={() => setMobileFilterOpen(true)}
                        />

                        <ProductGrid
                            products={paginated}
                            loading={false}
                            cols={gridCols}
                        />

                        <Pagination
                            currentPage={filters.page}
                            totalPages={totalPages}
                            onChange={(page) => handleFilterChange({ ...filters, page })}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}