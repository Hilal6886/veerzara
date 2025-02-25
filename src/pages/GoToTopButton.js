import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaBlog, FaInfoCircle, FaPhoneAlt, FaHotel, FaImages } from 'react-icons/fa';

const Menu = ({ closeMenu }) => {
  return (
    <ul>
      <li>
        <Link to="/" onClick={closeMenu}
          className="text-lg uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
          <FaHome className="inline-block mr-2" /> Home
        </Link>
      </li>
      <li>
        <Link to="/packages" onClick={closeMenu} className="text-lg uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
          <FaBox className="inline-block mr-2" /> Packages
          <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
        </Link>
      </li>
      <li>
        <Link to="/blog" onClick={closeMenu} className="text-lg uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
          <FaBlog className="inline-block mr-2" /> Blog
          <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
        </Link>
      </li>
      <li>
        <Link to="/aboutus" onClick={closeMenu} className="text-lg uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
          <FaInfoCircle className="inline-block mr-2" /> About Us
          <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
        </Link>
      </li>
      <li>
        <Link to="/contact" onClick={closeMenu} className="text-lg uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
          <FaPhoneAlt className="inline-block mr-2" /> Contact
          <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
        </Link>
      </li>
      <li>
        <Link to="/hotels" onClick={closeMenu} className="text-lg uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
          <FaHotel className="inline-block mr-2" /> Hotels
          <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
        </Link>
      </li>
      <li>
        <Link to="/gallery" onClick={closeMenu} className="text-lg uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
          <FaImages className="inline-block mr-2" /> Gallery
          <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
