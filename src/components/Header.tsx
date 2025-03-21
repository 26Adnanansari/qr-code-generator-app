'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <motion.header 
      className="w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left Side - Logo and Title */}
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/logo-big.png"
              alt="QR Code Generator Logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <h1 className="hidden sm:block text-lg sm:text-xl font-bold">
              FREE QR CODE GENERATOR
            </h1>
          </motion.div>

          {/* Center - Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div 
                key={link.href} 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={link.href}
                  className={`relative py-2 text-sm font-medium transition-colors
                    ${pathname === link.href
                      ? 'text-green-400'
                      : 'text-gray-300 hover:text-white'
                    }
                    group
                  `}
                >
                  {link.label}
                  {/* Animated Underline */}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: pathname === link.href ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Side - Profile Picture */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/adnan-picture.jpg"
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10 border-2 border-white"
            />
            {/* Mobile Menu Button */}
            <button 
              className="ml-4 md:hidden"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.svg 
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ rotate: 0 }}
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation with Slide Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-gray-800 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <motion.div 
                  key={link.href} 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium
                      ${pathname === link.href
                        ? 'bg-green-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
