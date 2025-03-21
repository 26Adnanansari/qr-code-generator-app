'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo & Brand */}
                    <div className="flex items-center space-x-3">
                        <Image width={150} height={150} src="/logo-big.png" alt="Logo" className="w-12 h-12" />
                        <h2 className="text-xl font-bold">FREE QR CODE GENERATOR</h2>
                    </div>
   

                    {/* Social Media Links */}
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="https://www.facebook.com/26adnanAnsari" target="_blank">
                            <span className="text-gray-400 hover:text-white transition cursor-pointer">
                                <FaFacebookF size={20} />
                            </span>
                        </Link>

                        <Link href="https://www.instagram.com/zamzampackages/" target="_blank">
                            <span className="text-gray-400 hover:text-white transition cursor-pointer">
                                <FaInstagram size={20} />
                            </span>
                        </Link>

                        <Link href="https://www.linkedin.com/in/adnan-ansari-b5b6416b/" target="_blank">
                            <span className="text-gray-400 hover:text-white transition cursor-pointer">
                                <FaLinkedinIn size={20} />
                            </span>
                        </Link>
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
