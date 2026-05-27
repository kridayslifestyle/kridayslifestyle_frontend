import OrderDetailsPage from "@/components/account/OrderDetailsPage";

import ProtectedRoute
  from "@/components/auth/ProtectedRoute";

export default async function Page({
  params,
}) {

  const resolvedParams =
    await params;

  return (

    <ProtectedRoute>

      <OrderDetailsPage
        orderId={resolvedParams.id}
      />

    </ProtectedRoute>

  );
}