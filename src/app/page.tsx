import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import FeaturedNews from "@/components/FeaturedNews";
import Banner from "@/components/Banner";
import Family from "@/components/Family";
import GoogleMap from "@/components/GoogleMap";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesGrid />
      <FeaturedNews />
      <Banner />
      <Family />
      <GoogleMap />
    </main>
  );
}
