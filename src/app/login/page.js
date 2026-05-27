import { Suspense } from "react";

import LoginPage from "@/components/auth/LoginPage";

export const metadata = {
  title: "Login — Kriday Lifestyle",
};

export default function Page() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}