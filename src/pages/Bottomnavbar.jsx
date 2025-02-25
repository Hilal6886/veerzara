import React, { useState, useEffect } from 'react';
import { FaHome, FaBox, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BottomNavbar = ({ sidebarOpen }) => {
    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowNavbar(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const phoneNumber = '7006522744'; // Replace with your WhatsApp number
    const message = 'Hello, I am interested in your services.'; // Default message
  
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    return (
        <div
            className={` md:hidden lg:hidden p-2 fixed bottom-0 left-0 w-full   transition-transform duration-300 ${
                showNavbar ? 'transform translate-y-0' : 'transform translate-y-full'
            } `}
        >
            <div className="px-7 bg-white shadow-lg rounded-2xl border border:gray-100">
                <div className="flex justify-around">
                    <div className="flex-1">
                        <Link
                            to="/"
                            className="flex flex-col items-center justify-center text-center px-4 pt-2 text-gray-400 group-hover:text-indigo-500"
                        >
                            <FaHome className="text-xl mb-1" />
                            <span className="text-xs">Home</span>
                            <span className="block w-5 h-1 mt-1 bg-transparent group-hover:bg-indigo-500 rounded-full"></span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <Link
                            to="/pakages"
                            className="flex flex-col items-center justify-center text-center px-4 pt-2 text-gray-400 group-hover:text-indigo-500"
                        >
                            <FaBox className="text-xl mb-1" />
                            <span className="text-xs">Packages</span>
                            <span className="block w-5 h-1 mt-1 bg-transparent group-hover:bg-indigo-500 rounded-full"></span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <a
                              href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center text-center px-4 pt-2 text-gray-400 group-hover:text-indigo-500"
                        >
                            <FaWhatsapp className="text-xl mb-1" />
                            <span className="text-xs">WhatsApp</span>
                            <span className="block w-5 h-1 mt-1 bg-transparent group-hover:bg-indigo-500 rounded-full"></span>
                        </a>
                    </div>
                    <div className="flex-1">
                        <a
                            href="tel:+917006522744"
                            className="flex flex-col items-center justify-center text-center px-4 pt-2 text-gray-400 group-hover:text-indigo-500"
                        >
                            <FaPhoneAlt className="text-xl mb-1" />
                            <span className="text-xs">Call</span>
                            <span className="block w-5 h-1 mt-1 bg-transparent group-hover:bg-indigo-500 rounded-full"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BottomNavbar;
