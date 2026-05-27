export async function getSingleProduct(
  slug
) {

  try {

    const res = await fetch(

      `http://localhost:3000/api/products/${slug}`,

      {
        cache: "no-store",
      }

    );

    return res.json();

  } catch (error) {

    console.log(error);

    return null;
  }
}