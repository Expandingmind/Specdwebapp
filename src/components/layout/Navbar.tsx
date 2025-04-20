'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { FiMenu, FiX, FiHome, FiUser, FiUpload, FiLogOut, FiLogIn } from 'react-icons/fi';
import Button from '@/components/ui/Button';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">SpecdR</span>
              <span className="hidden md:block text-sm text-gray-500">Car Enthusiasts Community</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link href="/explore" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary">
              Explore
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/upload" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary">
                  Share Build
                </Link>
                <Link href="/profile" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary">
                  My Profile
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => logout()}
                  className="text-gray-700 hover:text-primary"
                >
                  Sign Out
                </Button>
                {user?.image ? (
                  <Link href="/profile" className="ml-2">
                    <Image
                      src={user.image}
                      alt={user.name || 'User'}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </Link>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Join Now</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <FiHome />
                <span>Home</span>
              </div>
            </Link>
            <Link href="/explore"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <FiUser />
                <span>Explore</span>
              </div>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/upload"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <FiUpload />
                    <span>Share Build</span>
                  </div>
                </Link>
                <Link href="/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <FiUser />
                    <span>My Profile</span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    <FiLogOut />
                    <span>Sign Out</span>
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <FiLogIn />
                    <span>Sign In</span>
                  </div>
                </Link>
                <Link href="/auth/signup"
                  className="block px-3 py-2 text-base font-medium text-primary hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <FiUser />
                    <span>Join Now</span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 