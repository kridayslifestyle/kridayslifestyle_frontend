"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";

import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";

import styles from "./Auth.module.css";

export default function LoginPage() {

  const router = useRouter();

  const { login } = useAuth();

  // Form state
  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const searchParams =
    useSearchParams();

  const redirect =
    searchParams.get(
      "redirect"
    ) || "/account";

  // Submit
  async function handleSubmit(e) {

    e.preventDefault();

    if (!email || !password) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    const res = await login(
      email,
      password
    );

    if (res.success) {

      toast.success(
        "Login successful"
      );

      router.push(redirect);

    } else {

      toast.error(
        res.error || "Login failed"
      );
    }
  }

  return (

    <div className={styles.page}>

      <div className={styles.card}>

        <h1 className={styles.title}>
          Welcome Back
        </h1>

        <p className={styles.subtitle}>
          Login to continue shopping
        </p>

        {/* Form */}
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className={styles.input}

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className={styles.input}

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <div className={styles.forgotWrap}>
            <a
              href="/forgot-password"
              className={styles.forgotLink}
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={styles.submitBtn}
          >
            Login
          </button>

        </form>

        {/* Bottom */}
        <div className={styles.bottomText}>

          Don’t have an account?

          <Link href="/register">
            Register
          </Link>

        </div>

      </div>

    </div>

  );
}