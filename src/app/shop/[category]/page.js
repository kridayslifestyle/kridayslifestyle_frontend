import ShopClient from "../ShopClient";
import { getProducts } from "@/lib/getProducts";

const CATEGORY_LABELS = {
  clothing: "Clothing",
  dresses: "Dresses",
  sarees: "Sarees",
  kurtis: "Kurtis",
  "western-wear": "Western Wear",
  accessories: "Accessories",
  jewelry: "Jewelry",
  handbags: "Handbags",
  shoes: "Shoes",
  footwear: "Footwear",
};

export default async function CategoryPage({
  params,
}) {

  const { category } = await params;

  const label =
    CATEGORY_LABELS[category] ||
    category;

  // GET ALL PRODUCTS
  const allProducts =
    await getProducts();

  // FILTER LOCALLY
  let products = [];

  if (category === "clothing") {

    products = allProducts.filter((product) =>
      product.categorySlugs?.some((slug) =>
        [
          "dresses",
          "kurtis",
          "western-wear",
          "sarees"
        ].includes(slug)
      )
    );

  } else if (category === "accessories") {

    products = allProducts.filter((product) =>
      product.categorySlugs?.some((slug) =>
        [
          "accessories",
          "jewelry",
          "handbags"
        ].includes(slug)
      )
    );

  } else if (category === "footwear") {

    products = allProducts.filter((product) =>
      product.categorySlugs?.includes("shoes")
    );

  } else {

    products = allProducts.filter((product) =>
      product.categorySlugs?.includes(category)
    );
  }

  return (
    <ShopClient
      products={products}
      initialCategory={category}
      pageTitle={label}
    />
  );
}