import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const places = [
  { name: "Dal Lake", distance: "Srinagar", img: "dal_lake_ps4ci1.jpg" },
  { name: "Gulmarg", distance: "51 km from Srinagar", img: "gulmarg_ivlfr4.jpg" },
  { name: "Pahalgam", distance: "95 km from Srinagar", img: "pahalgam_komqaj.jpg" },
  { name: "Mughal Gardens", distance: "Srinagar", img: "mughal_gurdans_xxmx5q.jpg" },
  { name: "Betaab Valleys", distance: "15 km from Pahalgam", img: "Betaab_Valleys_tbtxpg.jpg" },
  { name: "Sonamarg", distance: "80 km from Srinagar", img: "Sonamarg_lwsulh.jpg" },
];

const settings = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 5000,
  cssEase: "linear",
  slidesToShow: 4,
  slidesToScroll: 1,
 
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 3 } },
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};



const ExploreCarousel = () => {
  const cloudinaryBase = "https://res.cloudinary.com/ddccbvbku/image/upload/";
  const transformations = "w_800,h_500,c_fill,q_auto,f_auto";

  return (
    <div className="container">
      <div className="text-center lg:mt-[-3rem] mb-1">
        <h1 className="inline-block bg-[#FFE6C9] text-[#4B164C] uppercase tracking-wide px-3 py-1 rounded-xl">
          Top Destinations
        </h1>
        <p className="text-xl md:text-2l  font-semold text-gray-200 p-6 mt-2">
          Explore the most breathtaking locations for your next vacation in Kashmir.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 rounded-xl relative">
        <Slider {...settings}>
          {places.map((place, index) => (
            <div key={index} className="p-4">
              <div className="relative">
                <img
                  src={`${cloudinaryBase}${transformations}/${place.img}`}
                  alt={place.name}
                  className="w-full h-80 object-cover rounded-xl transition-transform duration-300 hover:scale-105 shadow-lg"
                  loading="lazy"
                />
                {/* Overlay with name and distance at the top */}
                <div className="absolute top-1 left-4 right-4  p-3 rounded-md text-center">
                  <h3 className="text-lg font-semibold text-white">{place.name}</h3>
                  <p className="text-sm text-white">{place.distance}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ExploreCarousel;
