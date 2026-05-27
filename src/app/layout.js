import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import AnnouncementBar from "../components/common/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Kriday Lifestyle — Premium Women's Fashion",
  description:
    "Discover elegant, feminine fashion at Kriday Lifestyle — boutique dresses, sarees, kurtis, jewelry & accessories curated for the modern woman.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/*
          Provider nesting order:
          CartProvider     → Step 1 ✅
          WishlistProvider → Step 2 ✅
          AuthProvider     → Step 3 (coming next)
        */}
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 2500,
                  style: {
                    background: "#1E1E1E",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "14px 18px",
                  },
                }}
              />
              <AnnouncementBar />
              <Navbar />
              <main style={{ paddingTop: "104px" }}>
                {children}
              </main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}