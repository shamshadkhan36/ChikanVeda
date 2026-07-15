import React from 'react';
import { brandConfig } from '../config/brand';

export const WhatsAppButton: React.FC = () => {
  // Format the phone number (strip '+' sign)
  const formattedNumber = brandConfig.whatsappNumber.replace('+', '').replace(/\s/g, '');
  const encodedMessage = encodeURIComponent(brandConfig.whatsappMessage);
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contact ChikanVeda on WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '60%', height: '60%' }}
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.903-6.99C16.262 1.86 13.784 1.83 11.47 1.83c-5.437 0-9.863 4.421-9.867 9.867 0 1.808.502 3.496 1.458 4.966L2.082 20.9l4.565-1.746zm11.51-6.125c-.322-.16-.1.082-1.637-.682-.323-.16-.556-.24-.789.11-.233.35-.9 1.1-.1.9-.233.27-.466.29-.788.13-.323-.16-1.362-.503-2.595-1.603-.958-.855-1.605-1.91-1.793-2.23-.188-.322-.02-.497.14-.657.145-.145.32-.372.48-.56.16-.186.212-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.79-1.905-1.08-2.61-.285-.688-.572-.596-.788-.607-.203-.01-.437-.01-.67-.01-.233 0-.612.08-.933.433-.32.35-1.226 1.2-1.226 2.92 0 1.722 1.252 3.385 1.427 3.617.175.233 2.463 3.762 5.968 5.27.834.36 1.485.575 1.993.737.838.266 1.602.228 2.204.138.672-.1 2.072-.848 2.363-1.667.29-.82.29-1.524.204-1.67-.087-.146-.32-.24-.64-.4z" />
      </svg>
    </a>
  );
};
