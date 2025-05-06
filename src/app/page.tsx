import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import MapContainer from "@/components/MapContainer";
import Banner from "@/components/Banner";
import Family from "@/components/Family";
import Video from "@/components/Video";
import Photos from "@/components/Photos";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesGrid />
      <Video />
      <Photos />
      <Banner />
      <Family />
      <MapContainer />
    </main>
  );
}
