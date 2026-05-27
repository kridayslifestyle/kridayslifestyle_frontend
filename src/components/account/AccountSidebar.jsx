"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

import styles from "./Account.module.css";

export default function AccountSidebar() {

  const router = useRouter();

  const { user, logout } = useAuth();

  function handleLogout() {

    logout();

    router.push("/");
  }

  return (

    <div className={styles.sidebar}>

      {/* User */}
      <div className={styles.userCard}>

        <div className={styles.avatar}>
          {user?.name?.charAt(0)}
        </div>

        <h3 className={styles.userName}>
          {user?.name}
        </h3>

        <p className={styles.userEmail}>
          {user?.email}
        </p>

      </div>

      {/* Nav */}
      <nav className={styles.nav}>

        <Link href="/account">
          Dashboard
        </Link>

        <Link href="/orders">
          Orders
        </Link>

        <Link href="/track-order" className={styles.navLink}>
          Order Tracking
        </Link>


        <Link href="/wishlist">
          Wishlist
        </Link>

        <Link href="/cart">
          Cart
        </Link>

      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className={styles.logoutBtn}
      >
        Logout
      </button>

    </div>

  );
}