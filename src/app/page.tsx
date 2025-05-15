import HeroSection from "@/components/HeroSection";
import MapContainer from "@/components/MapContainer";
import Banner from "@/components/Banner";
import Family from "@/components/Family";
import Video from "@/components/Video";
import Photos from "@/components/Photos";
import ServicesSection from "@/components/ServiceSection";

export default function Home() {
  return (
    <div className="-mt-26">
      <HeroSection />
      <ServicesSection variant="grid" id="services" />
      <Video />
      <Photos />
      <Banner />
      <Family />
      <MapContainer />
    </div>
  );
}
