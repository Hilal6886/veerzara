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
  autoplaySpeed: 2000,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 3 } },
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-indigo-800 text-white p-3 rounded-full shadow-lg hover:bg-indigo-900 transition"
      onClick={onClick}
      style={{ left: ".rem" }}
    >
      <FaChevronLeft size={20} />
    </button>
  );
}

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-indigo-800 text-white p-3 rounded-full shadow-lg hover:bg-indigo-900 transition"
      onClick={onClick}
      style={{ right: ".rem" }}
    >
      <FaChevronRight size={20} />
    </button>
  );
}

const ExploreCarousel = () => {
  const cloudinaryBase = "https://res.cloudinary.com/ddccbvbku/image/upload/";
  const transformations = "w_800,h_500,c_fill,q_auto,f_auto";

  return (
    <div className="py-6">
      <div className="text-center lg:mt-[-5rem] mb-3">
        <h1 className="inline-block  bg-[#4B164C] text-white uppercase tracking-wide px-3 py-1 rounded">
          Top Destinations
        </h1>
        <p className="text-lg md:text-xl text-[#4B164C] p-6 mt-2">
          Explore the most breathtaking locations for your next vacation in Kashmir.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-8 bg-[#FFFBCA] py-8 rounded-xl relative">
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
                <div className="absolute bottom-4 left-5 right-4 bg-white bg-opacity-40 text-indigo-900 p-1 rounded-md text-center">
                  <h3 className="text-lg font-semibold">{place.name}</h3>
                  <p className="text-sm">{place.distance}</p>
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
