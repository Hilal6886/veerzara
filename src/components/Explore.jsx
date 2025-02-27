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
    <div className="py-6 bg-[#FFF2AF] -to-br from-purple-400 to-indigo-500">
      {/* Section Title & Subtitle */}

      {/* Slider */}
      <div className="max-w-7xl mx-auto relative">
        <Slider {...settings}>
          {places.map((place, index) => (
            <div key={index} className="px-4">
              <div className="relative">
                <img
                  src={`${cloudinaryBase}${transformations}/${place.img}`}
                  alt={place.name}
                  className="w-full h-64 object-cover rounded-xl transition-transform duration-500 hover:scale-105 shadow-lg"
                  loading="lazy"
                />
                {/* Overlay for Name and Distance */}
                <div 
                  className="absolute bottom-4 left-4 right-4 p-2 text-center"
                  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                >
                  <h3 className="text-lg font-bold text-white">{place.name}</h3>
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
