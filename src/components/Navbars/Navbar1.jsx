import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.png";

import userAvatar from './avatar.png';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { FaHome, FaBox, FaBlog, FaInfoCircle, FaPhoneAlt, FaHotel, FaImages, FaCaretDown, FaCaretLeft } from 'react-icons/fa';
import { MdAddCircle, MdPeople, MdCreate, MdPostAdd, MdTour, MdHotel, MdImage } from 'react-icons/md';
import { TbBrandBooking } from "react-icons/tb";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [AdminTimeout, setAdminTimeout] = useState(null);
  const [view, setView] = useState('main'); // 'main', 'more', 'admin'

  const userData = localStorage.getItem("USER");
  let currentUser = null;
  let isAdmin = false;
  if (userData) {
    currentUser = JSON.parse(userData);
    isAdmin = currentUser.isAdmin;
  }

  const closeMenu = () => {
    setOpen(false);
  };
  const closeadmin = () => {
    setIsAdminOpen(false);
  };
  const toggleAdmin = () => {
    setIsAdminOpen(!isAdminOpen);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("USER");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error during sign out", err);
      });
  };

  const menuItems = [
    { name: "Home", to: "/", icon: <FaHome /> },
    { name: "Packages", to: "/pakages", icon: <FaBox /> },
    { name: "Blog", to: "/Blog", icon: <FaBlog /> },
    { name: "About Us", to: "/aboutus", icon: <FaInfoCircle /> },
    { name: "Contact", to: "/contact", icon: <FaPhoneAlt /> },
    { name: "Hotels", to: "/hotels", icon: <FaHotel /> },
    { name: "Gallery", to: "/allimges", icon: <FaImages /> },
  ];

  const adminItems = [
    { name: "Add FAQ", to: "/addfaq", icon: <MdAddCircle /> },
    { name: "Manage Users", to: "/users", icon: <MdPeople /> },
    { name: "Add Blog", to: "/addblog", icon: <MdPostAdd /> },
    { name: "Add Tours", to: "/tou", icon: <MdTour /> },
    { name: "Add Hotels", to: "/addhotels", icon: <MdHotel /> },
    { name: "Add Gallery", to: "/uplodeimges", icon: <MdImage /> },
    { name: "Bookings", to: "/bookings", icon: <TbBrandBooking /> },
    { name: "Create Package", to: "/create-package", icon: <MdCreate /> },
    { name: "All Packages", to: "/pakageslist", icon: <TbBrandBooking /> },
  ];

  const handleAdminMouseEnter = () => {
    if (AdminTimeout) clearTimeout(AdminTimeout);
    setIsAdminOpen(true);
  };

  const handleAdminMouseLeave = () => {
    setAdminTimeout(setTimeout(() => setIsAdminOpen(false), 200)); // Delay for better UX
  };

  return (
    <nav className="dark:bg-gray-900 border-gray-200 dark:border-gray-600 w-full border-b bg-white sticky top-0 z-20">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-0">
        <div className="z-50 md:w-auto w-full flex justify-between">
          <div className="flex items-center">
            {/* Logo can be placed here if needed */}
            <div className="gap-2 mx-[-0.3rem] mt-2">
              <p className="text-[23px] mt-1 text-center font-bold text-gray-900 md:mt-1 mb-[-0.5rem]">veer zara</p>
              <span className="text-[14px] font-medium ml-2 text-center text-gray-700">TOUR AND TRAVELS</span>
            </div>
          </div>
          {/* Mobile menu toggle */}
          <div 
            className="text-3xl bg-purple-300 rounded-sm text-white text-center justify-center mt-[0.6rem] pt-1 mb-[0.6rem] pl-1 pr-1 mx-[0.3rem] md:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <ion-icon name={`${open ? "close" : "menu"}`} className="bg-purple-500"></ion-icon>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="md:flex hidden uppercase items-center gap-8">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-1 text-lg uppercase text-gray-200 relative hover:text-purple-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-purple-500 md:dark:hover:text-purple-500 group"
              >
                <span>{item.name}</span>
                <div className="h-1.5 bg-purple-500 w-full absolute -bottom-2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
              </Link>
            </li>
          ))}

          {isAdmin && (
            <li
              className="relative group"
              onMouseEnter={handleAdminMouseEnter}
              onMouseLeave={handleAdminMouseLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-lg uppercase text-gray-400 relative hover:text-purple-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-purple-500 md:dark:hover:text-purple-500 group"
                onClick={toggleAdmin}
              >
                <span>Admin</span>
                <FaCaretDown />
              </button>
              {isAdminOpen && (
                <div className="absolute z-10 mt-2 w-56 bg-white text-gray-400 rounded shadow-lg">
                  {adminItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 block px-4 py-2 text-lg uppercase hover:bg-purple-300"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>
          )}
        </ul>
        <div className="md:block hidden">
          <div className="group relative">
            {currentUser ? (
              <Link>
                <button
                  data-collapse-toggle="navbar-sticky"
                  className="bg-purple-800 hover:bg-purple-900 uppercase text-white py-2 px-4 rounded-md focus:outline-none"
                  onClick={logout}
                >
                  Sign Out
                </button>
              </Link>
            ) : (
              <Link to="/login" className="group relative">
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="bg-purple-800 hover:bg-purple-900 uppercase text-white py-2 px-4 rounded-md focus:outline-none"
                >
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <ul
          className={`
            md:hidden bg-white dark:bg-gray-900 border-gray-200 w-[70%] fixed top-0 bottom-0 overflow-y-auto py-6 pl-2 pr-3
            duration-500 ${open ? "left-0" : "left-[-100%]"}
          `}
          style={{ marginTop: "60px" }}
        >
          <li className="flex items-center p-1 border-b border-gray-800">
            <img
              className="w-12 h-12 rounded-full mr-3"
              src={currentUser ? currentUser.photoURL : userAvatar}
              alt="user profile"
            />
            <div>
              <span className="block text-sm font-medium text-gray-900">{currentUser ? currentUser.displayName : "User"}</span>
              <p className="text-xs text-purple-500">Premium User</p>
            </div>
          </li>

          {view === 'main' && (
            <>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-4 border-b border-gray-800 hover:bg-gray-800 flex items-center rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  >
                    <div className="bg-purple-500 text-white p-2 rounded-full">
                      {item.icon}
                    </div>
                    <span className="ml-4 text-gray-400 uppercase font-semibold">{item.name}</span>
                  </Link>
                </li>
              ))}

              {isAdmin && (
                <li className="relative">
                  <button
                    type="button"
                    className="w-full text-left px-6 py-4 border-b border-gray-800 hover:bg-gray-800 flex items-center rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    onClick={() => setView('admin')}
                  >
                    <div className="bg-purple-500 text-white p-2 rounded-full">
                      <FaCaretDown />
                    </div>
                    <span className="ml-4 text-gray-400 uppercase font-semibold">Admin</span>
                  </button>
                </li>
              )}
            </>
          )}

          {view === 'admin' && (
            <>
              <li>
                <button
                  type="button"
                  className="w-full text-left px-6 py-4 border-b border-gray-800 hover:bg-gray-800 flex items-center uppercase rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  onClick={() => setView('main')}
                >
                  <div className="bg-purple-500 text-white p-2 rounded-full">
                    <FaCaretLeft />
                  </div>
                  <span className="ml-4 text-gray-400 uppercase font-semibold">Go Back</span>
                </button>
              </li>
              {adminItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-4 border-b border-gray-800 hover:bg-gray-800 flex items-center rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  >
                    <div className="bg-purple-500 text-white p-2 rounded-full">
                      {item.icon}
                    </div>
                    <span className="ml-4 text-gray-400 uppercase font-semibold">{item.name}</span>
                  </Link>
                </li>
              ))}
            </>
          )}

          <div className="py-5 p-4">
            <div className="group relative">
              {currentUser ? (
                <Link>
                  <button
                    data-collapse-toggle="navbar-sticky"
                    className="bg-purple-500 text-white py-2 px-4 w-full rounded-md hover:bg-purple-600 focus:outline-none"
                    onClick={logout}
                  >
                    Sign Out
                  </button>
                </Link>
              ) : (
                <Link to="/login" className="group relative">
                  <button
                    data-collapse-toggle="navbar-sticky"
                    type="button"
                    className="bg-purple-500 text-white py-2 px-4 w-full rounded-md hover:bg-purple-600 focus:outline-none"
                  >
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
