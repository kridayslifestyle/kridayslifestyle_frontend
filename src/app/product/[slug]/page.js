import { getSingleProduct } from "@/lib/getSingleProduct";

import styles from "./ProductPage.module.css";

import ProductImageGallery from "@/components/product/ProductImageGallery";

import ProductInfo from "@/components/product/ProductInfo";

import ProductTabs from "@/components/product/ProductTabs";

import RelatedProducts from "@/components/product/RelatedProducts";

import { getRelatedProducts } from "@/lib/getRelatedProducts";

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = await getSingleProduct(slug);

  if (!product) {
    return <h1>Product not found</h1>;
  }

  const normalizedProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,

    price: Number(product.price),

    originalPrice: Number(product.originalPrice || 0),

    image: product.images?.[0],

    gallery: product.images || [],

    description: product.description,

    shortDescription: product.shortDescription,

    stockStatus: product.stockStatus,

    sizes: product.sizes || ["S", "M", "L", "XL", "XXL"],

    rating: 0,

    reviewCount: 0,

    category: "",

    features: ["Premium Quality", "Elegant Design", "Comfort Fit"],
  };

  const relatedProducts = await getRelatedProducts(product.categories?.[0]?.id);

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.productGrid}>
          <ProductImageGallery
            images={normalizedProduct.gallery}
            name={normalizedProduct.name}
          />

          <div className={styles.infoCol}>
            <ProductInfo product={normalizedProduct} />
          </div>
        </div>

        <div className={styles.tabsSection}>
          <ProductTabs product={normalizedProduct} />
        </div>

        <RelatedProducts products={relatedProducts} currentId={product.id} />
      </div>
    </main>
  );
}
