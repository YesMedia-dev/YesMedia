import GoogleMap from "@/components/GoogleMap";

export default function Careers() {
  return (
    <section className="pt-10 pb-32 bg-white text-center animate-fadeIn">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          All Sun Mar Locations
        </h2>
      </div>
      <GoogleMap />
    </section>
  );
}
