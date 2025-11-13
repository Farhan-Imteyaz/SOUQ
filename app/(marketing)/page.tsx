"use client";

import Link from 'next/link';
import { Package, Truck, Globe, Shield, Calculator, Clock, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <span className="text-xl sm:text-2xl font-bold">ParcelForward</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/how-it-works" className="hover:text-blue-600 transition-colors">How It Works</Link>
            <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/dashboard" className="hover:text-blue-600 transition-colors">My Dashboard</Link>
            <Link href="/login" className="hover:text-blue-600 transition-colors">Login</Link>
            <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t py-4 px-4">
            <div className="flex flex-col space-y-4">
              <Link href="/how-it-works" className="py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                How It Works
              </Link>
              <Link href="/services" className="py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              <Link href="/pricing" className="py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </Link>
              <Link href="/contact" className="py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <div className="border-t pt-4 flex flex-col space-y-3">
                <Link href="/dashboard" className="py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  My Dashboard
                </Link>
                <Link href="/login" className="py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg text-center font-semibold hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-700 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Shop From India,<br />Ship Worldwide
          </h1>
          <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Get your Indian virtual address and shop from Amazon India, Flipkart, Myntra and more. 
            We handle consolidation, repackaging and international shipping.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link href="/register" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all text-center">
              Get Started Free
            </Link>
            <Link href="/how-it-works" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg text-base sm:text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all text-center">
              See How It Works
            </Link>
          </div>
          <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 text-sm opacity-90">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white-400" />
              <span className="text-xs sm:text-sm">Secure Shipping</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white-400" />
              <span className="text-xs sm:text-sm">7-10 Days Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-white-400" />
              <span className="text-xs sm:text-sm">Ship to 50+ Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: 1, title: 'Sign Up', desc: 'Create your free account and get your Indian virtual address', icon: Package },
              { step: 2, title: 'Shop Online', desc: 'Use your address to shop from any Indian e-commerce site', icon: Globe },
              { step: 3, title: 'We Receive', desc: 'We receive, inspect, and photograph your packages', icon: Truck },
              { step: 4, title: 'Ship Worldwide', desc: 'We consolidate and ship to your doorstep with tracking', icon: Shield }
            ].map((item) => (
              <div key={item.step} className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-pink-50 rounded-full mb-3 sm:mb-4">
                  <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-purple-600 mb-2">STEP {item.step}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-pink-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: 'Shop & Ship', desc: 'Get your Indian address and start shopping immediately', icon: Package },
              { title: 'Package Consolidation', desc: 'Combine multiple packages into one to save on shipping costs', icon: Truck },
              { title: 'Assisted Purchase', desc: 'We can help you buy products that don\'t accept international cards', icon: Globe },
              { title: 'Repackaging', desc: 'We remove unnecessary packaging to reduce weight and costs', icon: Shield },
              { title: 'International Shipping', desc: 'Fast and reliable shipping to 50+ countries worldwide', icon: Globe },
              { title: 'Package Insurance', desc: 'Protect your valuable items with optional insurance coverage', icon: Shield }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <service.icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-purple-600 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Stores */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4">Shop From Popular Indian Stores</h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">We support all major Indian e-commerce platforms</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {['Amazon India', 'Flipkart', 'Myntra', 'Meesho', 'Nykaa', 'Ajio', 'FirstCry', 'Snapdeal'].map((store) => (
              <div key={store} className="flex items-center justify-center p-3 sm:p-4 lg:p-6 bg-white border rounded-lg hover:shadow-md transition-shadow text-center min-h-[80px]">
                <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700">{store}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator CTA */}
      <section id="pricing" className="bg-gradient-to-r from-purple-600 to-pink-700 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <Calculator className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mx-auto mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Calculate Your Shipping Cost</h2>
          <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Get instant estimates for shipping from India to your country
          </p>
          <Link href="/calculator" className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all">
            Use Shipping Calculator
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: 'Rajesh Kumar', country: 'UAE', text: 'Excellent service! Received my packages in just 7 days. The team was very professional.' },
              { name: 'Sarah Johnson', country: 'USA', text: 'The consolidation service saved me so much money. Highly recommended!' },
              { name: 'Michael Chen', country: 'Singapore', text: 'Fast, reliable and great customer support. Will definitely use again.' }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-800">{testimonial.name}</div>
                <div className="text-xs sm:text-sm text-gray-500">{testimonial.country}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-700 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Shopping?</h2>
          <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of happy customers shipping from India to worldwide destinations
          </p>
          <Link href="/register" className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Package className="h-6 w-6 sm:h-8 sm:w-8" />
                <span className="text-lg sm:text-xl font-bold">ParcelForward</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Your trusted partner for international parcel forwarding from India.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Services</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><Link href="/services/shop-ship" className="hover:text-white transition-colors">Shop & Ship</Link></li>
                <li><Link href="/services/consolidation" className="hover:text-white transition-colors">Consolidation</Link></li>
                <li><Link href="/services/assisted-purchase" className="hover:text-white transition-colors">Assisted Purchase</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>&copy; 2025 ParcelForward. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}