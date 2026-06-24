export async function getProducts() {
  try {
    const res = await fetch(
      "https://kridaylifestyle.in/api/products",
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    console.log("API DATA:", data);

    return data.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price || 0,
      categorySlugs: product.categorySlugs || [],
      image: product.image || "",
      images: product.images || [],
      inStock: product.inStock || false,
    }));

  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return [];
  }
}