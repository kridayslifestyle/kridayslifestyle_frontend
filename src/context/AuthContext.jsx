"use client";

import {

  createContext,

  useContext,

  useEffect,

  useState,

} from "react";

const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {

  // ─────────────────────────────
  // STATE
  // ─────────────────────────────
  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ─────────────────────────────
  // AUTO LOGIN
  // ─────────────────────────────
  useEffect(() => {

    try {

      const storedUser =
        localStorage.getItem(
          "kriday_user"
        );

      const storedToken =
        localStorage.getItem(
          "kriday_token"
        );

      if (
        storedUser &&
        storedToken
      ) {

        setUser(
          JSON.parse(
            storedUser
          )
        );

        setToken(
          storedToken
        );
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }

  }, []);

  // ─────────────────────────────
  // LOGIN
  // ─────────────────────────────
  async function login(
    email,
    password
  ) {

    try {

      const res = await fetch(

        "/api/auth/login",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({

              email,

              password,

            }),
        }
      );

      const data =
        await res.json();

      // Error
      if (!res.ok) {

        throw new Error(

          data.error ||

          "Login failed"
        );
      }

      // User object
      const authUser = {

        id:
          data.user_id,

        name:
          data.user_display_name,

        email:
          data.user_email,
      };

      // Save state
      setUser(authUser);

      setToken(data.token);

      // Save localStorage
      localStorage.setItem(

        "kriday_user",

        JSON.stringify(
          authUser
        )
      );

      localStorage.setItem(

        "kriday_token",

        data.token
      );

      return {
        success: true,
      };

    } catch (error) {

      console.log(error);

      return {

        success: false,

        error:
          error.message,
      };
    }
  }

  // ─────────────────────────────
  // LOGOUT
  // ─────────────────────────────
  function logout() {

    setUser(null);

    setToken(null);

    localStorage.removeItem(
      "kriday_user"
    );

    localStorage.removeItem(
      "kriday_token"
    );
  }

  // ─────────────────────────────
  // PROVIDER
  // ─────────────────────────────
  return (

    <AuthContext.Provider

      value={{

        user,

        token,

        loading,

        login,

        logout,

        isAuthenticated:
          !!user,
      }}

    >

      {children}

    </AuthContext.Provider>
  );
}

// ─────────────────────────────
// HOOK
// ─────────────────────────────
export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(

      "useAuth must be used inside AuthProvider"

    );
  }

  return context;
}