export async function getProducts() {

  try {

    const res = await fetch(
      "http://localhost:3000/api/products",
      {
        next: { revalidate: 60 },
      }
    );

    const data =
      await res.json();

    const normalizedProducts =
      data.map((product) => ({

        id: product.id,

        name: product.name,

        slug: product.slug,

        price:
          product.price || 0,

        originalPrice:
          product.originalPrice || null,

        image: product.image || "",

        images: product.images || [],

        category:
          product.categorySlugs?.[0]
            ?.toLowerCase()
            ?.replace(/\s+/g, "-") || "uncategorized",

        categorySlugs:
          product.categorySlugs?.map((slug) =>
            slug.toLowerCase().replace(/\s+/g, "-")
          ) || [],


        sizes:
          product.sizes || ["XS", "S", "M", "L", "XL", "XXL"],

        // IMPORTANT FOR COLOR FILTER
        color:
          product.color || "#000000",

        // IMPORTANT FOR DISCOUNT FILTER
        discount:
          product.discount || 0,

        description:
          product.description,

        shortDescription:
          product.short_description,

        rating: product.rating || 0,

        reviewCount: product.reviewCount || 0,

        inStock: product.inStock || false,

        sale: product.badge === "SALE",

        featured: false,

      }));

    return normalizedProducts;

  } catch (error) {

    console.log(error);

    return [];
  }
}