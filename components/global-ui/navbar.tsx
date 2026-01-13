"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const user = session?.user;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/">
              <span className="font-bold text-xl text-blue-600">TechBlog</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/blogs" className="hover:text-blue-600">
              Blogs
            </Link>
            <Link href="/categories" className="hover:text-blue-600">
              Categories
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </div>

          {/* Desktop User Auth */}
          <div className="hidden md:flex">
            {status === "loading" ? (
              <span>Checking...</span>
            ) : user ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">{user.name || user.email}</span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <Link href="/blogs" className="block hover:text-blue-600">
              Blogs
            </Link>
            <Link href="/categories" className="block hover:text-blue-600">
              Categories
            </Link>
            <Link href="/about" className="block hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="block hover:text-blue-600">
              Contact
            </Link>

            {/* Mobile User Auth */}
            {status === "loading" ? (
              <span className="block text-gray-700">Checking...</span>
            ) : user ? (
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-700">{user.name || user.email}</span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mt-2"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
