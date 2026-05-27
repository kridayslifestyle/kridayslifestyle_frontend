import ShopClient
from "./ShopClient";

import {
  getProducts
}
from "@/lib/getProducts";

export const metadata = {

  title:
    "Shop All — Kriday Lifestyle",

  description:
    "Browse premium women's fashion.",

};

export default async function ShopPage() {

  const products =
    await getProducts();

  return (

    <ShopClient

      products={products}

      initialCategory=""

      pageTitle="All Products"

    />

  );
}