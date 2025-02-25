import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '7006522744'; // Replace with your WhatsApp number
  const message = 'Hello, I am interested in your services.'; // Default message

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-4 right-3 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded flex items-center shadow-lg transition duration-300 ease-in-out"
      >
        <FaWhatsapp className="w-6 h-6 mr-4" />
        WhatsApp
      </a>
    </div>
  );
};

export default WhatsAppButton;
