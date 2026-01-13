import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Logo / Site Name */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-bold text-white">Tech Blog</h1>
            <p className="text-gray-400 max-w-xs">
              Sharing the latest updates on laptops, mobiles, PCs, and accessories in Nepal.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-white">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-white">Follow Us</h2>
            <div className="flex gap-4 mt-2">
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-400 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-pink-500 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-700 p-2 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Tech Blog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
