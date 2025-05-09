import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const services = [
  {
    title: "Rehabilitation",
    image: "/assets/services2.png",
    path: "/services/rehabilitation",
    size: 80,
  },
  {
    title: "Skilled Nursing",
    image: "/assets/services3.png",
    path: "/services/nursing",
    size: 130,
  },
  {
    title: "Social Services",
    image: "/assets/services4.png",
    path: "/services/social",
    size: 140,
  },
  {
    title: "Activities",
    image: "/assets/services5.png",
    path: "/services/activities",
    size: 130,
  },
];

const ServicesList = () => {
  const pathname = usePathname();
  const filteredServices = services.filter((service) => service.path !== pathname);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-[#428f47] text-2xl mb-12 text-center">Explore Other Services</h1>

      <div className="grid grid-cols-2 gap-8 place-items-center">
        {filteredServices.map(({ title, image, path, size }, index) => (
          <Link
            href={path}
            key={title}
            className={`text-center group w-full max-w-xs col-span-1 ${
              filteredServices.length === 3 && index === 2 ? "col-span-2 justify-self-center" : ""
            }`}
          >
            <div className="transition-transform duration-300 group-hover:scale-105 flex flex-col items-center">
              <div className="relative">
                <Image
                  src={image}
                  alt={title}
                  width={size}
                  height={size}
                  className="mx-auto transition duration-300 ease-in-out group-hover:scale-105 group-hover:drop-shadow-xl"
                />
              </div>
              <p className="text-blue-900 font-semibold text-lg mt-4">{title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
