import React from "react";
import service1 from "../assets/service1.png";
import service2 from "../assets/service2.png";
import service3 from "../assets/service3.png";
import service4 from "../assets/service4.png";

const CardSection = () => {
  const data = [
    {
      icon: service1,
      title: "Get Best Prices",
      subTitle:
        "Pay through our application and save thousands and get amazing rewards.",
    },
    {
      icon: service2,
      title: "Covid Safe",
      subTitle:
        "We have all the curated hotels that have all the precaution for a covid safe environment.",
    },
    {
      icon: service3,
      title: "Flexible Payment",
      subTitle:
        "Enjoy the flexible payment through our app and get rewards on every payment.",
    },
    {
      icon: service4,
      title: "Find The Best Near You",
      subTitle:
        "Find the best hotels and places to visit near you in a single click.",
    },
  ];

  return (
    <section id="services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-12">
      {data.map((service, index) => (
        <div
          key={index}
          className="service flex flex-col gap-4 p-8 bg-aliceblue shadow-lg transition-transform duration-300 hover:transform hover:translate-x-4 hover:-translate-y-4 hover:shadow-xl"
        >
          <div className="icon">
            <img src={service.icon} alt="" className="h-12" />
          </div>
          <h3>{service.title}</h3>
          <p>{service.subTitle}</p>
        </div>
      ))}
    </section>
  );
}
export default CardSection;