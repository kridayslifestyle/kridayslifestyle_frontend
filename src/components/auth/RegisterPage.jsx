"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import styles from "./Auth.module.css";

export default function RegisterPage() {

  const router = useRouter();

  // ─────────────────────────────
  // FORM STATE
  // ─────────────────────────────
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [

    confirmPassword,

    setConfirmPassword,

  ] = useState("");

  // OTP
  const [otp, setOtp] =
    useState("");

  const [

    otpSent,

    setOtpSent,

  ] = useState(false);

  const [

    otpVerified,

    setOtpVerified,

  ] = useState(false);

  const [sendingOTP, setSendingOTP] =
    useState(false);

  const [

    verifyingOTP,

    setVerifyingOTP,

  ] = useState(false);

  // ─────────────────────────────
  // SEND OTP
  // ─────────────────────────────
  async function handleSendOTP() {

    try {

      // Validation
      if (!email) {

        toast.error(
          "Enter email first"
        );

        return;
      }

      setSendingOTP(true);

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

      console.log(error);

      toast.error(
        error.message
      );

    } finally {

      setSendingOTP(false);
    }
  }

  // ─────────────────────────────
  // VERIFY OTP
  // ─────────────────────────────
  async function handleVerifyOTP() {

    try {

      if (!otp) {

        toast.error(
          "Enter OTP"
        );

        return;
      }

      setVerifyingOTP(true);

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
        "Email verified successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error.message
      );

    } finally {

      setVerifyingOTP(false);
    }
  }

  // ─────────────────────────────
  // REGISTER
  // ─────────────────────────────
  async function handleSubmit(e) {

    e.preventDefault();

    // Validation
    if (

      !name ||

      !email ||

      !phone ||

      !password ||

      !confirmPassword

    ) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    // OTP verification
    if (!otpVerified) {

      toast.error(
        "Please verify email OTP first"
      );

      return;
    }

    // Password match
    if (
      password !==
      confirmPassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return;
    }

    try {

      // Split name
      const nameParts =
        name.trim().split(" ");

      const firstName =
        nameParts[0];

      const lastName =
        nameParts
          .slice(1)
          .join(" ");

      // Register API
      const res = await fetch(

        "/api/auth/register",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({

              firstName,

              lastName,

              email,

              password,

              phone,

            }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {

        throw new Error(

          data.error ||

          "Registration failed"
        );
      }

      toast.success(
        "Account created successfully"
      );

      router.push("/login");

    } catch (error) {

      console.log(error);

      toast.error(
        error.message
      );
    }
  }

  return (

    <div className={styles.page}>

      <div className={styles.card}>

        <h1 className={styles.title}>
          Create Account
        </h1>

        <p className={styles.subtitle}>
          Join Kriday Lifestyle today
        </p>

        {/* FORM */}
        <form

          className={styles.form}

          onSubmit={handleSubmit}

        >

          {/* NAME */}
          <input

            type="text"

            placeholder="Full Name"

            className={styles.input}

            value={name}

            onChange={(e) =>

              setName(
                e.target.value
              )

            }

          />

          {/* EMAIL */}
          <div
            className={styles.otpRow}
          >

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

              disabled={
                otpVerified
              }

            />

            <button

              type="button"

              className={styles.otpBtn}

              onClick={
                handleSendOTP
              }

              disabled={
                sendingOTP ||
                otpVerified
              }

            >

              {otpVerified

                ? "Verified"

                : sendingOTP

                  ? "Sending..."

                  : "Send OTP"}

            </button>

          </div>

          {/* OTP */}
          {otpSent &&
            !otpVerified && (

              <div
                className={styles.otpRow}
              >

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

                  type="button"

                  className={styles.otpBtn}

                  onClick={
                    handleVerifyOTP
                  }

                  disabled={
                    verifyingOTP
                  }

                >

                  {verifyingOTP

                    ? "Verifying..."

                    : "Verify"}

                </button>

              </div>

            )}

          {/* PHONE */}
          <input

            type="tel"

            placeholder="Phone Number"

            className={styles.input}

            value={phone}

            onChange={(e) =>

              setPhone(
                e.target.value
              )

            }

          />

          {/* PASSWORD */}
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

          {/* CONFIRM PASSWORD */}
          <input

            type="password"

            placeholder="Confirm Password"

            className={styles.input}

            value={confirmPassword}

            onChange={(e) =>

              setConfirmPassword(
                e.target.value
              )

            }

          />

          {/* SUBMIT */}
          <button

            type="submit"

            className={styles.submitBtn}

          >

            Create Account

          </button>

        </form>

        {/* BOTTOM */}
        <div className={styles.bottomText}>

          Already have an account?

          <Link href="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}