import React from "react";
import { Package } from "lucide-react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <Package className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="text-lg sm:text-xl font-bold">
                ParcelForward
              </span>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Your trusted partner for international parcel forwarding from
              India.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
              Services
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>
                <Link
                  href="/services/shop-ship"
                  className="hover:text-white transition-colors"
                >
                  Shop & Ship
                </Link>
              </li>
              <li>
                <Link
                  href="/services/consolidation"
                  className="hover:text-white transition-colors"
                >
                  Consolidation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/assisted-purchase"
                  className="hover:text-white transition-colors"
                >
                  Assisted Purchase
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
              Company
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
              Legal
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-policy"
                  className="hover:text-white transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
          <p>&copy; 2025 ParcelForward. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
