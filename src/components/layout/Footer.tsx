import React from 'react';
import Link from 'next/link';
import { FiGithub, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-primary">
              SpecdR
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              The community for car enthusiasts to share and discover amazing custom builds.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <FiGithub size={20} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/explore" className="text-gray-500 hover:text-primary">
                  Browse Builds
                </Link>
              </li>
              <li>
                <Link href="/explore?category=popular" className="text-gray-500 hover:text-primary">
                  Popular Builds
                </Link>
              </li>
              <li>
                <Link href="/explore?category=recent" className="text-gray-500 hover:text-primary">
                  Recent Uploads
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-500 hover:text-primary">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/blog" className="text-gray-500 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-gray-500 hover:text-primary">
                  Build Guides
                </Link>
              </li>
              <li>
                <Link href="/parts-directory" className="text-gray-500 hover:text-primary">
                  Parts Directory
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-500 hover:text-primary">
                  Tools & Equipment
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-gray-500 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-500 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} SpecdR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 