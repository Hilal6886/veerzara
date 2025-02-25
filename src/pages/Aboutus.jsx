import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div>
      {/* Hero Header */}
      <div className="w-full bg-indigo-700 py-16 mb-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white">
            About Veer Zara Tour and Travel
          </h1>
          <nav aria-label="breadcrumb" className="mt-4">
            <ol className="inline-flex space-x-2 text-white">
              <li>
                <Link to="/" className="hover:underline">Home</Link>
              </li>
              <li>/</li>
              <li className="font-semibold">About</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto py-20 px-4">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Image Column */}
          <div className="md:w-1/2 min-h-[400px] relative">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://img.freepik.com/free-photo/kashmir-landscape_181624-36419.jpg"
              alt="Kashmir Landscape"
            />
          </div>
          {/* Text Column */}
          <div className="md:w-1/2">
            <div className="inline-block bg-white text-indigo-700 uppercase tracking-wide px-3 py-1 rounded mb-4">
              About Us
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Welcome to <span className="text-indigo-700">Veer Zara Tour and Travel</span>
            </h1>
            <p className="text-gray-700 mb-4">
              Discover the breathtaking beauty of Kashmir with us. Our mission is to offer unforgettable journeys through the serene landscapes, majestic mountains, and rich cultural heritage of Kashmir.
            </p>
            <p className="text-gray-700 mb-6">
              At Veer Zara Tour and Travel, we specialize in personalized tours that showcase the true essence of Kashmir—from scenic helicopter rides and handpicked houseboats to immersive cultural tours and trekking adventures.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-indigo-700 mr-2">→</span>
                <p className="m-0">Scenic Helicopter Rides</p>
              </div>
              <div className="flex items-center">
                <span className="text-indigo-700 mr-2">→</span>
                <p className="m-0">Handpicked Houseboats</p>
              </div>
              <div className="flex items-center">
                <span className="text-indigo-700 mr-2">→</span>
                <p className="m-0">Luxury Accommodations</p>
              </div>
              <div className="flex items-center">
                <span className="text-indigo-700 mr-2">→</span>
                <p className="m-0">Cultural Tours & Treks</p>
              </div>
              <div className="flex items-center">
                <span className="text-indigo-700 mr-2">→</span>
                <p className="m-0">Customized Itineraries</p>
              </div>
              <div className="flex items-center">
                <span className="text-indigo-700 mr-2">→</span>
                <p className="m-0">24/7 Support</p>
              </div>
            </div>
            <Link
              to="/about"
              className="bg-indigo-700 hover:bg-indigo-800 text-white py-3 px-5 rounded-md block text-center"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto py-20 px-4">
        <div className="text-center mb-10">
          <div className="inline-block bg-white text-indigo-700 uppercase tracking-wide px-3 py-1 rounded mb-4">
            Our Kashmir Guides
          </div>
          <h1 className="text-4xl font-bold">Meet Our Expert Guides</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-hidden">
              <img
                className="w-full h-56 object-cover"
                src="https://images.unsplash.com/photo-1603415526960-f33fa1b16b5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Guide Amina"
              />
            </div>
            <div className="flex justify-center -mt-8">
              <div className="bg-white rounded-full p-2 shadow-lg flex space-x-2">
                <a href="#" className="text-indigo-700 hover:text-indigo-900">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-indigo-700 hover:text-indigo-900">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-indigo-700 hover:text-indigo-900">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="p-4 text-center">
              <h5 className="text-xl font-bold">Amina Khan</h5>
              <p className="text-gray-500">Senior Guide</p>
            </div>
          </div>
          {/* Team Member 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-hidden">
              <img
                className="w-full h-56 object-cover"
                src="https://images.unsplash.com/photo-1618220054264-bd4ecbb3cc1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Guide Rahul"
              />
            </div>
            <div className="flex justify-center -mt-8">
              <div className="bg-white rounded-full p-2 shadow-lg flex space-x-2">
                <a href="#" className="text-indigo-700 hover:text-indigo-900">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-indigo-700 hover:text-indigo-900">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-indigo-700 hover:text-indigo-900">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="p-4 text-center">
              <h5 className="text-xl font-bold">Rahul Sharma</h5>
              <p className="text-gray-500">Adventure Specialist</p>
            </div>
          </div>
          {/* Team Member 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-hidden">
              <img
                className="w-full h-56 object-cover"
                src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Guide Sana"
              />
            </div>
            <div className="flex justify-center -mt-8">
              <div className="bg-white rounded-full p-2 shadow-lg flex space-x-2">
                <a href="#" className="text-indigo-700 hover:text-indigo-900">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-indigo-700 hover:text-indigo-900">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-indigo-700 hover:text-indigo-900">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="p-4 text-center">
              <h5 className="text-xl font-bold">Sana Ali</h5>
              <p className="text-gray-500">Cultural Expert</p>
            </div>
          </div>
          {/* Team Member 4 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-hidden">
              <img
                className="w-full h-56 object-cover"
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Guide Imran"
              />
            </div>
            <div className="flex justify-center -mt-8">
              <div className="bg-white rounded-full p-2 shadow-lg flex space-x-2">
                <a href="#" className="text-indigo-700 hover:text-indigo-900">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-indigo-700 hover:text-indigo-900">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-indigo-700 hover:text-indigo-900">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="p-4 text-center">
              <h5 className="text-xl font-bold">Imran Qureshi</h5>
              <p className="text-gray-500">Local Expert</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
