"use client";

import { useAuth } from "@/context/AuthContext";

import AccountSidebar from "./AccountSidebar";
import AccountOverview from "./AccountOverview";

import styles from "./Account.module.css";

export default function AccountPage() {

  const { user, loading } = useAuth();

  // Loading
  if (loading) {
    return (
      <div className={styles.loading}>
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className={styles.empty}>

        <h1>Please login first</h1>

        <a
          href="/login"
          className={styles.loginBtn}
        >
          Go To Login
        </a>

      </div>
    );
  }

  return (

    <div className={styles.page}>

      <div className={styles.container}>

        {/* Sidebar */}
        <div className={styles.sidebarWrap}>
          <AccountSidebar />
        </div>

        {/* Main */}
        <div className={styles.content}>
          <AccountOverview />
        </div>

      </div>

    </div>

  );
}