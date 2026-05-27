import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/sections/HeroSection";
import CategorySection from "@/sections/CategorySection";
import NewArrivals from "@/sections/NewArrivals";
import FeaturedBanner from "@/sections/FeaturedBanner";
import BestSellers from "@/sections/BestSellers";
import Testimonials from "@/sections/Testimonials";
import FeaturesStrip from "@/sections/FeaturesStrip";
import NewsletterSection from "@/sections/NewsletterSection";


export default function Home() {
  return (
    <main className="bg-[#FFF7F8] min-h-screen">

      <Navbar />

      <HeroSection />
      <CategorySection />
      <NewArrivals />
      <FeaturedBanner />
      <BestSellers />
      <Testimonials />
      <FeaturesStrip />
      <NewsletterSection />


    </main>
  );
}