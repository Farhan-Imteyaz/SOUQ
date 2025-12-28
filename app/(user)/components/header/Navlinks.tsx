import React from "react";
import Link from "next/link";
const Navlinks = () => {
  return (
    <div className="hidden lg:flex items-center space-x-6">
      <Link
        href="/how-it-works"
        className="hover:text-blue-600 transition-colors"
      >
        How It Works
      </Link>
      <Link href="/services" className="hover:text-blue-600 transition-colors">
        Services
      </Link>
      <Link href="/pricing" className="hover:text-blue-600 transition-colors">
        Pricing
      </Link>
      <Link href="/contact" className="hover:text-blue-600 transition-colors">
        Contact
      </Link>
    </div>
  );
};

export default Navlinks;
