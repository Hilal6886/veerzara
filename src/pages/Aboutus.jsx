import React from 'react';
import { FaPlane, FaMapMarkedAlt, FaHotel, FaBriefcase, FaGlobe, FaSmile } from 'react-icons/fa';

const InfoCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {icon}
      <h3 className="text-lg font-bold mt-4 mb-2 text-[#163269]">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const AboutUsPage = () => {
  return (
    <section className="mt-[1rem] justify-center ">
          <div className="text-center p-4">
        
        <h1 className="text-4xl text-[#3D2117] font-extrabold leading-tight mb-4 text-center">
        About Us
      </h1>
      <p className="text-lg text-gray-400 mb-8 text-center">
        We are passionate about travel and committed to providing you with the best experiences. 
      </p>

       
      </div>
      <div className="bg-gray-100 mt-[2rem] min-h-screen">
        <div className="container mx-auto p-4">
          <div className="mb-8 text-center">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-flat-design-travel-agency-template_23-2149341216.jpg?1&w=740&t=st=1705874447~exp=1705875047~hmac=fb262d8f09ce081d25a0f0da72467c5d978f0b33d079d6d959f71708f6f8800b"  // Replace with SJ Tour and Travels image URL
              alt="Travel Destinations"
              className="w-full h-auto  object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="text-gray-400">
            <h1 className="text-2xl  text-center md:text-3xl lg:text-3xl font-bold mb-4 leading-tight">
              Welcome to SJ Tour and Travels
            </h1>

            <p className="text-lg text-center text-gray-400 mb-8">
              At SJ Tour and Travels, we are dedicated to providing you with unforgettable travel experiences. Our mission is to
              take you on journeys that go beyond the ordinary, creating memories that last a lifetime. Explore what makes us your
              ideal travel companion and join us on exciting adventures around the world.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {infoItems.map((item) => (
                <InfoCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
              ))}
            </div>

            <h2 className="text-xl text-gray-400 md:text-2xl lg:text-3xl font-bold my-8 leading-tight">
              Exceptional Travel Experiences
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Our success is built on curating exceptional travel experiences for our clients. SJ Tour and Travels is not just a
              travel agency; we are your partners in creating moments of joy, discovery, and relaxation. Our dedicated team is committed
              to making every journey with us a delightful adventure.
              <h4 className='mt-[2rem] font-bold'>The Pillars of Our Service:</h4> <br />
              At SJ Tour and Travels, we pride ourselves on the pillars that form the foundation of our service. These core values define
              our approach to travel and ensure that every trip with us exceeds your expectations.
              <h4 className='mt-[2rem] font-bold'>Excellence in Planning:</h4> <br />

              We believe that meticulous planning is the key to a seamless travel experience. Our team pays attention to every detail, from
              choosing the best destinations to crafting itineraries that capture the essence of each place. With SJ Tour and Travels, you
              can expect journeys that are well-organized and tailored to your preferences.
              <h4 className='mt-[2rem] font-bold'>Passionate Travel Experts:</h4> <br />

              Our travel experts are not just professionals; they are passionate individuals who love exploring the world. Their extensive
              knowledge, coupled with a genuine love for travel, ensures that you receive personalized recommendations and insights. Whether
              you're a seasoned traveler or venturing out for the first time, our experts are here to guide you.
              <h4 className='mt-[2rem] font-bold'>Customer-Centric Approach:</h4> <br />

              Your satisfaction is our priority. We take a customer-centric approach in all that we do, striving to exceed your expectations
              at every turn. From responsive communication to anticipating your needs during the journey, SJ Tour and Travels is committed
              to providing a level of service that goes beyond the ordinary.
              <h4 className='mt-[2rem] font-bold'>Creating Lasting Memories:</h4> <br />

              At the heart of SJ Tour and Travels is the belief that travel should create lasting memories. We curate experiences that
              allow you to connect with different cultures, savor local flavors, and explore the beauty of diverse landscapes. Every journey
              with us is an opportunity to create cherished moments that stay with you forever.
              <h4 className='mt-[2rem] font-bold'>Diverse Destinations:</h4> <br />

              SJ Tour and Travels takes pride in offering a diverse range of destinations to suit every traveler's preferences. Whether you
              seek the tranquility of nature, the excitement of bustling cities, or the charm of historical sites, our portfolio of destinations
              has something for everyone.
              <h4 className='mt-[2rem] font-bold'>Committed to Sustainability:</h4> <br />

              We understand the importance of responsible travel. SJ Tour and Travels is committed to sustainable and eco-friendly practices
              that minimize our impact on the environment. Our goal is to contribute to the preservation of the destinations we visit, ensuring
              that future generations can also enjoy their beauty.
              <h4 className='mt-[2rem] font-bold'>Join Us on the Journey:</h4> <br />

              SJ Tour and Travels invites you to embark on unforgettable journeys that promise adventure, relaxation, and cultural enrichment.
              Whether you're a solo traveler, a couple seeking a romantic getaway, or a family looking for exciting experiences, we have the perfect
              itinerary for you. Explore the world with SJ Tour and Travels and make every journey a chapter in your travel story.
            </p>

            <h2 className="text-xl  text-gray-400 md:text-2xl lg:text-3xl font-bold my-8 leading-tight">
              Explore Our Travel Packages
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              As you navigate through our website, discover the diverse range of travel packages and services offered by SJ Tour and Travels.
              Whether you're dreaming of a beach retreat, a cultural immersion, or an adventure in the great outdoors, we have something for every
              type of traveler. Join us in exploring the possibilities that await you.
            </p>

            <p className="text-lg text-gray-400 mb-8">
              Thank you for considering SJ Tour and Travels for your travel adventures. We look forward to being your companions on the road to
              discovery.
            </p>
      
            <p className="text-lg mb-4 font-bold">Shahid ibn Javaid /Founder And CEO,</p>
            <p className="text-lg text-gray-400">Your SJ Tour and Travels Team</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const infoItems = [
  {
    title: 'Excellence in Planning',
    description: 'Meticulous planning is the key to a seamless travel experience. Our team crafts well-organized itineraries tailored to your preferences.',
    icon: <FaPlane className="text-4xl text-indigo-600 mb-4" />,
  },
  {
    title: 'Passionate Travel Experts',
    description: 'Our travel experts are passionate individuals with extensive knowledge, providing personalized recommendations and insights for your journey.',
    icon: <FaHotel className="text-4xl text-green-600 mb-4" />,
  },
  {
    title: 'Customer-Centric Approach',
    description: 'Your satisfaction is our priority. SJ Tour and Travels takes a customer-centric approach, exceeding your expectations at every turn.',
    icon: <FaBriefcase className="text-4xl text-blue-600 mb-4" />,
  },
  {
    title: 'Creating Lasting Memories',
    description: 'SJ Tour and Travels believes travel should create lasting memories. We curate experiences that allow you to connect with different cultures and explore diverse landscapes.',
    icon: <FaGlobe className="text-4xl text-yellow-600 mb-4" />,
  },
  {
    title: 'Diverse Destinations',
    description: 'SJ Tour and Travels offers a diverse range of destinations to suit every traveler\'s preferences, ensuring there\'s something for everyone.',
    icon: <FaSmile className="text-4xl text-red-600 mb-4" />,
  },
  {
    title: 'Committed to Sustainability',
    description: 'SJ Tour and Travels is committed to sustainable and eco-friendly practices, contributing to the preservation of the destinations we visit.',
    icon: <FaMapMarkedAlt className="text-4xl text-purple-600 mb-4" />,
  },
];

export default AboutUsPage;
