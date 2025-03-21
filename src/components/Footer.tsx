'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <img src="/logo-big.png" alt="Logo" className="w-12 h-12" />
            <h2 className="text-xl font-bold">FREE QR CODE GENERATOR</h2>
          </div>
{/* 
          Navigation Links
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/" className="text-gray-400 hover:text-white transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition">
              About
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition">
              Contact
            </Link>
          </nav> */}

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm mt-6">
          © {new Date().getFullYear()} All Rights Reserved | QR Code Generator
        </div>
      </div>
    </footer>
  );
};

export default Footer;
