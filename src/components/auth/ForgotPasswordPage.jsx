"use client";

import { useState } from "react";

import {
  useRouter
} from "next/navigation";

import toast from "react-hot-toast";

import styles from "./Auth.module.css";

export default function ForgotPasswordPage() {

  const router =
    useRouter();

  // ─────────────────────────────
  // STATE
  // ─────────────────────────────
  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [

    newPassword,

    setNewPassword,

  ] = useState("");

  const [

    otpSent,

    setOtpSent,

  ] = useState(false);

  const [

    otpVerified,

    setOtpVerified,

  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  // ─────────────────────────────
  // SEND OTP
  // ─────────────────────────────
  async function handleSendOTP() {

    try {

      setLoading(true);

      const res = await fetch(

        "/api/auth/send-otp",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              email,
            }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {

        throw new Error(
          data.error
        );
      }

      setOtpSent(true);

      toast.success(
        "OTP sent successfully"
      );

    } catch (error) {

      toast.error(
        error.message
      );

    } finally {

      setLoading(false);
    }
  }

  // ─────────────────────────────
  // VERIFY OTP
  // ─────────────────────────────
  async function handleVerifyOTP() {

    try {

      setLoading(true);

      const res = await fetch(

        "/api/auth/verify-otp",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({

              email,

              otp,

            }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {

        throw new Error(
          data.error
        );
      }

      setOtpVerified(true);

      toast.success(
        "OTP verified"
      );

    } catch (error) {

      toast.error(
        error.message
      );

    } finally {

      setLoading(false);
    }
  }

  // ─────────────────────────────
  // RESET PASSWORD
  // ─────────────────────────────
  async function handleResetPassword() {

    try {

      setLoading(true);

      const res = await fetch(

        "/api/auth/reset-password",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({

              email,

              password:
                newPassword,

            }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {

        throw new Error(
          data.error
        );
      }

      toast.success(
        "Password reset successful"
      );

      router.push("/login");

    } catch (error) {

      toast.error(
        error.message
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <div className={styles.page}>

      <div className={styles.card}>

        <h1 className={styles.title}>
          Forgot Password
        </h1>

        <p className={styles.subtitle}>
          Reset your password securely
        </p>

        <div className={styles.form}>

          {/* EMAIL */}
          <input

            type="email"

            placeholder="Email Address"

            className={styles.input}

            value={email}

            onChange={(e) =>

              setEmail(
                e.target.value
              )

            }

          />

          {/* SEND OTP */}
          {!otpSent && (

            <button

              className={styles.submitBtn}

              onClick={
                handleSendOTP
              }

            >

              {loading
                ? "Sending..."
                : "Send OTP"}

            </button>

          )}

          {/* OTP */}
          {otpSent &&
            !otpVerified && (

              <>

                <input

                  type="text"

                  placeholder="Enter OTP"

                  className={styles.input}

                  value={otp}

                  onChange={(e) =>

                    setOtp(
                      e.target.value
                    )

                  }

                />

                <button

                  className={styles.submitBtn}

                  onClick={
                    handleVerifyOTP
                  }

                >

                  {loading
                    ? "Verifying..."
                    : "Verify OTP"}

                </button>

              </>

            )}

          {/* RESET */}
          {otpVerified && (

            <>

              <input

                type="password"

                placeholder="New Password"

                className={styles.input}

                value={
                  newPassword
                }

                onChange={(e) =>

                  setNewPassword(
                    e.target.value
                  )

                }

              />

              <button

                className={styles.submitBtn}

                onClick={
                  handleResetPassword
                }

              >

                {loading
                  ? "Resetting..."
                  : "Reset Password"}

              </button>

            </>

          )}

        </div>

      </div>

    </div>
  );
}