export async function getOrders(email) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders?email=${encodeURIComponent(email)}`,
      {
        cache: "no-store",
      },
    );

    return res.json();
  } catch (error) {
    console.log(error);

    return [];
  }
}
