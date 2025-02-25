import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const places = [
  { name: "Dal Lake", distance: "Srinagar", img: "dal_lake_ps4ci1.jpg" },
  { name: "Gulmarg", distance: "51 km from Srinagar", img: "gulmarg_ivlfr4.jpg" },
  { name: "Pahalgam", distance: "95 km from Srinagar", img: "pahalgam_komqaj.jpg" },
  { name: "Mughal Gardens", distance: "Srinagar", img: "mughal_gurdans_xxmx5q.jpg" },
  { name: "Betaab Valleys", distance: "15 km from Pahalgam", img: "Betaab_Valleys_tbtxpg.jpg" },
  { name: "Sonamarg", distance: "80 km from Srinagar", img: "Sonamarg_lwsulh.jpg" },
  { name: "Hazratbal Shrine", distance: "Srinagar", img: "Hazratbal_Shrine_pgr1h6.jpg" },
  { name: "Yousmarg", distance: "43 km from Srinagar", img: "Yousmarg_hnf9gr.jpg" },
  { name: "Gurez Valley", distance: "126 km from Srinagar", img: "Guraz_Valley_qps2vx.jpg" },
  { name: "Sinthantop", distance: "135 km from Srinagar", img: "Sinthantop_vo3clr.jpg" },
  { name: "Shankaracharya Temple", distance: "Srinagar", img: "Shankeracharya_Temple_q1kpkc.jpg" },
  { name: "Doodhpathri", distance: "43 km from Srinagar", img: "Doodhpathri_rh9ii2.jpg" }
];

const settings = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 700,
  slidesToShow: 4, // 4 slides visible
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 3 } }, // Large screens
    { breakpoint: 1024, settings: { slidesToShow: 2 } }, // Tablets
    { breakpoint: 768, settings: { slidesToShow: 1 } } // Mobile
  ]
};

const ExploreCarousel = () => {
  const cloudinaryBase = "https://res.cloudinary.com/ddccbvbku/image/upload/";
  const transformations = "w_800,h_500,c_fill,q_auto,f_auto"; // Optimized images

  return (
    <div className="py-6">
      {/* Title & Subtitle */}
      <div className="text-center mb-8">
        <h1 className="inline-block bg-[#FFE6C9] text-[#22177A] uppercase tracking-wide px-3 py-1 rounded mb-4">
          Top Destinations 
        </h1>
        <p className="text-lg md:text-xl text-[#4B164C] p-6 mt-2">
          Explore the most breathtaking locations for your next vacation in Kashmir.
        </p>
      </div>

      {/* Carousel */}
      <div className="max-w-7xl mx-auto px-4">
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

                {/* Background for Name & Distance */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-md text-center">
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
