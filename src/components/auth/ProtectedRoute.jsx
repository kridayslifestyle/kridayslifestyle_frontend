"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
}) {

  const router =
    useRouter();

  const {

    loading,

    isAuthenticated,

  } = useAuth();

  useEffect(() => {

    if (
      !loading &&
      !isAuthenticated
    ) {

      router.push("/login");
    }

  }, [

    loading,

    isAuthenticated,

    router,

  ]);

  // Loading
  if (loading) {

    return (
      <div>
        Loading...
      </div>
    );
  }

  // Block access
  if (!isAuthenticated) {

    return null;
  }

  // Allow access
  return children;
}