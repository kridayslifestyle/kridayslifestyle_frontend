export async function getRelatedProducts(
  products = [],
  currentProduct
) {

  if (!currentProduct) {
    return [];
  }

  return products

    .filter(

      (product) =>

        product.id !==
        currentProduct.id

    )

    .slice(0, 4);
}