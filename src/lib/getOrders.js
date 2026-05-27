export async function getOrders(
  email
) {

  try {

    const res = await fetch(

      `http://localhost:3000/api/orders?email=${email}`,

      {
        cache: "no-store",
      }
    );

    return res.json();

  } catch (error) {

    console.log(error);

    return [];
  }
}