"use client";
import HeroSection from "./(Homepage-Sections)/Hero-section";
import Link from "next/link";
import { Package, Truck, Globe, Shield, Calculator } from "lucide-react";
import { useState } from "react";
import CTA from "./(Homepage-Sections)/CTA";
import HowItWorks from "./(Homepage-Sections)/How-it-works";
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* imoprtHero Section */}
      <HeroSection />
      {/* How It Works */}
      <HowItWorks />

      {/* Services */}
      <section id="services" className="bg-pink-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Shop & Ship",
                desc: "Get your Indian address and start shopping immediately",
                icon: Package,
              },
              {
                title: "Package Consolidation",
                desc: "Combine multiple packages into one to save on shipping costs",
                icon: Truck,
              },
              {
                title: "Assisted Purchase",
                desc: "We can help you buy products that don't accept international cards",
                icon: Globe,
              },
              {
                title: "Repackaging",
                desc: "We remove unnecessary packaging to reduce weight and costs",
                icon: Shield,
              },
              {
                title: "International Shipping",
                desc: "Fast and reliable shipping to 50+ countries worldwide",
                icon: Globe,
              },
              {
                title: "Package Insurance",
                desc: "Protect your valuable items with optional insurance coverage",
                icon: Shield,
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <service.icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-purple-600 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Stores */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4">
            Shop From Popular Indian Stores
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">
            We support all major Indian e-commerce platforms
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              "Amazon India",
              "Flipkart",
              "Myntra",
              "Meesho",
              "Nykaa",
              "Ajio",
              "FirstCry",
              "Snapdeal",
            ].map((store) => (
              <div
                key={store}
                className="flex items-center justify-center p-3 sm:p-4 lg:p-6 bg-white border rounded-lg hover:shadow-md transition-shadow text-center min-h-[80px]"
              >
                <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700">
                  {store}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator CTA */}
      <section
        id="pricing"
        className="bg-linear-to-r from-purple-600 to-pink-700 text-white py-12 sm:py-16 lg:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <Calculator className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mx-auto mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Calculate Your Shipping Cost
          </h2>
          <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Get instant estimates for shipping from India to your country
          </p>
          <Link
            href="/calculator"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all"
          >
            Use Shipping Calculator
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Rajesh Kumar",
                country: "UAE",
                text: "Excellent service! Received my packages in just 7 days. The team was very professional.",
              },
              {
                name: "Sarah Johnson",
                country: "USA",
                text: "The consolidation service saved me so much money. Highly recommended!",
              },
              {
                name: "Michael Chen",
                country: "Singapore",
                text: "Fast, reliable and great customer support. Will definitely use again.",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="font-semibold text-gray-800">
                  {testimonial.name}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {testimonial.country}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
    </div>
  );
}
