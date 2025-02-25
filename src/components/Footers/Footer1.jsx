import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-[#09122C] text-gray-200 pt-12 mt-12">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Column */}
          <div>
            <h4 className="text-white text-xl font-semibold mb-4">Company</h4>
            <ul>
              <li>
                <Link to="/about" className="hover:underline block mb-2">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline block mb-2">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline block mb-2">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline block mb-2">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:underline block mb-2">
                  FAQs &amp; Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white text-xl font-semibold mb-4">Contact</h4>
            <p className="mb-3 flex items-center">
              <i className="fas fa-map-marker-alt mr-3"></i>
              45 Srinagar Road, Kashmir, India
            </p>
            <p className="mb-3 flex items-center">
              <i className="fas fa-phone-alt mr-3"></i>
              +91 98765 43210
            </p>
            <p className="mb-3 flex items-center">
              <i className="fas fa-envelope mr-3"></i>
              info@veerzara.com
            </p>
            <div className="flex space-x-3 mt-4">
              <a
                href="#"
                className="p-2 border border-gray-200 rounded hover:bg-gray-700"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                className="p-2 border border-gray-200 rounded hover:bg-gray-700"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="#"
                className="p-2 border border-gray-200 rounded hover:bg-gray-700"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="p-2 border border-gray-200 rounded hover:bg-gray-700"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Gallery Column */}
          <div>
            <h4 className="text-white text-xl font-semibold mb-4">Gallery</h4>
            <div className="grid grid-cols-3 gap-2">
              <img
                className="w-full h-20 object-cover rounded"
                src="https://img.freepik.com/free-photo/beautiful-landscape-arang-kel-kashmir-with-green-fields-local-houses-with-hidden-clouds_505751-5864.jpg?t=st=1740323785~exp=1740327385~hmac=d5d9c45720766a9c5b11dbcf9374ebd56c6168ee4945a6715d6b86174e9a7535&w=996"
                alt="Gallery 1"
              />
              <img
                className="w-full h-20 object-cover rounded"
                src="https://img.freepik.com/free-photo/beautiful-landscape-arang-kel-kashmir-with-green-fields-local-houses-with-hidden-clouds_505751-5865.jpg?t=st=1740323844~exp=1740327444~hmac=513f8458796ce43be9d5bd60c43e70798f9e6c39a8a3d9d86483f991d48ffc66&w=996"
                alt="Gallery 2"
              />
              <img
                className="w-full h-20 object-cover rounded"
                src="https://img.freepik.com/free-photo/tourists-taking-photos-beautiful-scenery-skiing-around-deogyusan_335224-426.jpg?uid=R99272721&ga=GA1.1.75996077.1721973869&semt=ais_hybrid"
                alt="Gallery 3"
              />
              <img
                className="w-full h-20 object-cover rounded"
                src="https://img.freepik.com/free-photo/beautiful-landscape-with-snowy-mountains-blue-sky-horizontal-alps-austria_1220-1304.jpg?uid=R99272721&ga=GA1.1.75996077.1721973869&semt=ais_hybrid"
                alt="Gallery 4"
              />
              <img
                className="w-full h-20 object-cover rounded"
                src="https://img.freepik.com/free-photo/gondola-cable-car-mountains_1204-284.jpg?uid=R99272721&ga=GA1.1.75996077.1721973869&semt=ais_hybrid"
                alt="Gallery 5"
              />
              <img
                className="w-full h-20 object-cover rounded"
                src="https://img.freepik.com/free-photo/ban-rak-thai-mae-hong-son-thailand_335224-942.jpg?uid=R99272721&ga=GA1.1.75996077.1721973869&semt=ais_hybrid"
                alt="Gallery 6"
              />
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white text-xl font-semibold mb-4">Newsletter</h4>
            <p className="mb-4">
              Stay updated with our latest travel deals and news from Kashmir.
            </p>
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Your email"
                className="w-full py-3 pl-4 pr-32 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="absolute top-0 right-0 mt-2 mr-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-2 md:mb-0">
            ©{" "}
            <span className="border-b border-transparent hover:border-gray-200">
              Veer Zara Tour and Travel
            </span>
            . All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/" className="hover:underline">
              Cookies
            </Link>
            <Link to="/" className="hover:underline">
              Help
            </Link>
            <Link to="/" className="hover:underline">
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
