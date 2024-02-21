import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./ic.png";


import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { MdPersonPin } from "react-icons/md";
import { RiPagesFill, RiAdminFill } from "react-icons/ri";
import {
  FaHome,
  FaBookOpen,
  FaUserGraduate,
  FaMoneyBillWave,
  FaBlog,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaSignInAlt,
  FaSignOutAlt,
  FaYoutube,
} from 'react-icons/fa';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const CHANNEL_ID = 'UCEsefwwmj2PrQBmVVsWDTeQ';
  const userData = localStorage.getItem("USER");
  let currentUser = null;
  let isAdmin = false;
  if (userData) {
    currentUser = JSON.parse(userData);
    isAdmin = currentUser.isAdmin;
  }
  const subscribeToChannel = () => {
    // Open the YouTube subscribe URL in a new tab
    window.open(`https://www.youtube.com/channel/${CHANNEL_ID}?sub_confirmation=1`);
  };



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
    console.log("LOGIINNNGput");
    signOut(auth)
      .then(() => {
        console.log("logout sucessfully");
        localStorage.removeItem("USER");
        window.location.reload(); //location.reload()
        //    toast.success('logged out')
      })
      .catch((err) => {
        console.log("errror", err);
        // toast.error(err.message)
      });
  };

  return (
    <nav className="dark:bg-gray-900 border-gray-200 dark:border-gray-600 w-full border-b bg-white start-0 sticky fixed top-0 z-20 " aria-controls="navbar-sticky">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-0">
        <div className="z-50  md:w-auto w-full flex justify-between">
          <div className="flex">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-[3rem]" alt="Arafa Logo" />
          </Link>
            <div className="gap-[-1rem] mx-[-0.3rem]">
             <p className="text-[16px] mt-[9px] font-bold text-[#03AC13] md:mt-[4px] mb-[-0.6rem]">SJTour&TRAVELS</p>
             <span className="text-[11px] font-medium ml- text-center text-[#03AC13] ">YOUR ADVENTURE AWAITS</span>
            </div>
          </div>
        
          <div className="text-4xl text-center justify-center mt-[0.7rem]  md:hidden" onClick={() => setOpen(!open)}>
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>
        <ul className="md:flex hidden uppercase items-center gap-8 ">
          <li>
            <Link to="/" className="text-lg  uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
              Home
              <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
            </Link>
          </li>
          <li>
            <Link to="/pakages" className="text-lg  uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
              Pakages
              <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
            </Link>
          </li>
          <li>
            <Link to="/Blog" className="text-lg  uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
              Blog
              <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="text-lg  uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
              about us
              <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-lg  uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
              Contact
              <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
            </Link>
          </li>
          <li>
            <Link to="/hotels" className="text-lg  uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
              Hotels
              <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
            </Link>
          </li>
          <li>
            <Link to="/allimges" className="text-lg  uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
              Gallary
              <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
            </Link>
          </li>


          {isAdmin && (
            <li className="group relative">
              <button
                type="button"
                className="uppercase text-lg bold text-gray-400 hover:bg-gray-100 md:hover:bg-transparent dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 block flex items-center rounded py-2 px-3 dark:text-white dark:hover:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500"
                onClick={toggleAdmin}
              >
                Admin
                <svg
                  className={`text-gray-400 dark:text-gray-400 group-hover:text-gray-700 ml-1 h-4 w-4 transform transition-transform duration-300 dark:group-hover:text-white ${isAdminOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
              {isAdminOpen && (
                <div className="absolute z-10 -ml-4 mt-2 w-screen max-w-xs transform px-2 sm:px-0">
                  <div className="ring-black overflow-hidden rounded-lg shadow-lg ring-1 ring-opacity-5">
                    <div className="relative grid gap-6 bg-white p-5">
                      <Link
                        to="/addfaq" onClick={toggleAdmin}
                        className="text-gray-400 hover:bg-gray-100 focus:ring-gray-200 flex items-center rounded py-2 px-3 focus:outline-none focus:ring-2"
                      >
                        Add FAQ
                      </Link>
                      <Link
                        to="/addblog" onClick={toggleAdmin}
                        className="text-gray-400 hover:bg-gray-100 focus:ring-gray-200 flex items-center rounded py-2 px-3 focus:outline-none focus:ring-2"
                      >
                        Add Blog
                      </Link>
                      <Link
                        to="/tou" onClick={toggleAdmin}
                        className="text-gray-400 hover:bg-gray-100 focus:ring-gray-200 flex items-center rounded py-2 px-3 focus:outline-none focus:ring-2"
                      >
                        Add Tours
                      </Link>
                      <Link
                        to="/addhotels" onClick={toggleAdmin}
                        className="text-gray-400 hover:bg-gray-100 focus:ring-gray-200 flex items-center rounded py-2 px-3 focus:outline-none focus:ring-2"
                      >
                        Add Hotels
                      </Link>


                      <Link
                        to="/uplodeimges" onClick={toggleAdmin}
                        className="text-gray-400 hover:bg-gray-100 focus:ring-gray-200 flex items-center rounded py-2 px-3 focus:outline-none focus:ring-2"
                      >
                        Add Gallary
                      </Link>
                      <Link
                        to="/bookings" onClick={toggleAdmin}
                        className="text-gray-400 hover:bg-gray-100 focus:ring-gray-200 flex items-center rounded py-2 px-3 focus:outline-none focus:ring-2"
                      >
                        Bookings
                      </Link>
                    </div>
                  </div>
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
                  className="bg-[#03AC13] uppercase text-white py-2 px-4 rounded-md hover:bg-green-600"

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
                  className="bg-[#03AC13] uppercase text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                  Sign In
                </button>

              </Link>
            )}
          </div>
        </div>
        {/* Mobile nav */}
        <ul
          className={`
    md:hidden bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-600 w-full border-b bg-white gap-x-[6rem] fixed w-[70%] top-0 overflow-y-auto bottom-0 py-6 pl-4
    duration-500 ${open ? "left-0" : "left-[-100%]"}
  `}
          style={{ marginTop: "52px" }} // Add this style to create space
        >
          <li>
            <Link to="/" onClick={closeMenu}
              className="text-lg  uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
              <FaHome className="inline-block mr-2" /> Home

            </Link>
          </li>
          <li>
            <Link to="/pakages" onClick={closeMenu} className="text-lg  uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
              <FaHome className="inline-block mr-2" /> Pakages
              <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
            </Link>
          </li>
          <li>
            <Link to="/Blog" onClick={closeMenu} className="text-lg  uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
              <FaHome className="inline-block mr-2" /> Blog
              <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
            </Link>
          </li>
          <li>
            <Link to="/aboutus" onClick={closeMenu} className="text-lg  uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
              <FaHome className="inline-block mr-2" /> about us
              <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu} className="text-lg  uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
              <FaHome className="inline-block mr-2" /> Contact
              <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
            </Link>
          </li>
          <li>
            <Link to="/hotels" onClick={closeMenu} className="text-lg  uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
              <FaHome className="inline-block mr-2" /> Hotels
              <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
            </Link>
          </li>
          <li>
            <Link to="/allimges" onClick={closeMenu} className="text-lg  uppercase text-gray-400 relative hover:text-green-500 inline-block py-2 px-3 dark:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 group">
              <FaHome className="inline-block mr-2" /> Gallary
              <div className="h-1.5 bg-green-500 w-full absolute bottom--2 left-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
            </Link>
          </li>
          {isAdmin && (
            <li className="group relative">
              <button
                type="button"
                className="uppercase text-lg bold text-gray-400 hover:bg-gray-100 md:hover:bg-transparent dark:hover:bg-gray-700 md:dark:hover:bg-transparent  block flex items-center rounded py-2 px-3 dark:text-white dark:hover:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500"
                onClick={toggleAdmin}
              >
                < RiAdminFill className="inline-block mr-2" /> Admin
                <svg
                  className={`text-gray-400 dark:text-gray-400 group-hover:text-gray-700 ml-1 h-4 w-4 transform transition-transform duration-300 dark:group-hover:text-white ${isAdminOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isAdminOpen && (
                <div className="absolute z-10 -ml-4 mt-2 w-screen max-w-xs transform px-2 sm:px-0">
                  <div className="overflow-hidden rounded-lg ">
                    <div className="relative grid gap-3 bg-white p-5">
                      <Link
                        to="/addfaq" onClick={closeMenu}
                        className="text-gray-400 hover:bg-gray-100 focus:ring-gray-200 flex items-center rounded py- px-3 focus:outline-none focus:ring-2"
                      >
                        Add FAQ
                      </Link>
                      <Link
                        to="/addblog" onClick={closeMenu}
                        className="text-gray-400 hover:bg-gray-100 focus:ring-gray-200 flex items-center rounded py-2 px-3 focus:outline-none focus:ring-2"
                      >
                        Add Blog
                      </Link>
                      <Link
                        to="/tou" onClick={closeMenu}
                        className="text-gray-400 hover:bg-gray-100 focus:ring-gray-200 flex items-center rounded py-2 px-3 focus:outline-none focus:ring-2"
                      >
                        Add Tours
                      </Link>
                      <Link
                        to="/addhotels" onClick={closeMenu}
                        className="text-gray-400 hover:bg-gray-100 focus:ring-gray-200 flex items-center rounded py-2 px-3 focus:outline-none focus:ring-2"
                      >
                        Add Hotels
                      </Link>



                      <Link
                        to="/uplodeimges" onClick={closeMenu}
                        className="text-gray-400 hover:bg-gray-100 focus:ring-gray-200 flex items-center rounded py-2 px-3 focus:outline-none focus:ring-2"
                      >
                        Add Gallary
                      </Link>
                      <Link
                        to="/bookings" onClick={closeMenu}
                        className="text-gray-400 hover:bg-gray-100 focus:ring-gray-200 flex items-center rounded py-2 px-3 focus:outline-none focus:ring-2"
                      >
                        Bookings
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </li>
          )}

          <div className="py-5 p-4">
            <div className="group relative">
              {currentUser ? (
                <Link>
                  <button
                    data-collapse-toggle="navbar-sticky"
                    className="bg-green-500 text-white py-2 px-4 w-full rounded-md hover:bg-green-600"

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
                    className="bg-green-500 text-white py-2 px-4 w-full rounded-md hover:bg-green-600"
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
