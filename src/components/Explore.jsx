import React from 'react';
import place1 from "../images/pl1.jpg";
import place2 from "../images/pl2.jpg";
import place3 from "../images/pl3.jpg";
import place4 from "../images/pl4.jpg";
import place5 from "../images/pl5.jpg";
import place7 from "../images/pl6.jpg";
import place8 from "../images/pl7.jpg";
import place9 from "../images/pl8.jpg";
import place10 from "../images/pl9.jpg";
import place11 from "../images/pl10.jpg";
import place12 from "../images/pl11.jpg";
import place13 from "../images/pl12.jpg";



const Explore = () => {
  const placesAPI = [
    { "placeImg": place1, "location": "Dal Lake", "distance": "Srinagar" },
    { "placeImg": place2, "location": "Gulmarg", "distance": "51 km from Srinagar" },
    { "placeImg": place3, "location": "Pahalgam", "distance": "95 km from Srinagar" },
    { "placeImg": place4, "location": "Mughal gardens", "distance": "Srinagar" },
    { "placeImg": place5, "location": "Betaab Valleys", "distance": "15 km from Phalgam " },
    { "placeImg": place7, "location": "Sonamarg", "distance": "80 km from Srinagar" },
    { "placeImg": place8, "location": "Hazratbal Shrine", "distance": " Srinagar" },
    { "placeImg": place9, "location": "Yousmarg", "distance": " 43 km from Srinagar" },
    { "placeImg": place10, "location": "Guraz Valley", "distance": " 126 km from Srinagar" },
    { "placeImg": place11, "location": "Sinthantop", "distance": "135 km from Srinagar" },
    { "placeImg": place12, "location": "Shankeracharya Temple", "distance": "Srinagar" },
    { "placeImg": place13, "location": "Doodhpathri", "distance": " 43 km from Srinagar" },
  ];

  return (
    <div className="lg:mt-[-7rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 md:p-12">
      {placesAPI.map((val, i) => (
        <div key={i} className="bg-white p-4 rounded-md shadow-lg transition-transform transform hover:scale-105">
          <div className="flex items-center ">
            <div className="flex-shrink-0">
              <img src={val.placeImg} alt={val.location} className="w-16 h-16 sm:w-14 sm:h-14 rounded-md filter drop-shadow-lg" />
            </div>
            <div className="ml-4">
              <h1 className="text-lg sm:text-base font text-slate-900">{val.location}</h1>
              <p className="text-sm sm:text-xs font-normal text-gray-500">{val.distance}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Explore;
