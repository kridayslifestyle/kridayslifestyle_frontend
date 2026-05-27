import AccountPage from "@/components/account/AccountPage";

import ProtectedRoute
from "@/components/auth/ProtectedRoute";

export const metadata = {
  title: "My Account — Kriday Lifestyle",
};

export default function Page() {

  return (

    <ProtectedRoute>

      <AccountPage />

    </ProtectedRoute>
  );
}