import Link from 'next/link';
import { Package, Truck, ShoppingCart, Box, Shield, Camera, Globe, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      id: 'shop-ship',
      title: 'Shop & Ship',
      icon: Package,
      color: 'blue',
      description: 'Get your personal Indian address and shop from any Indian e-commerce site',
      features: [
        'Instant virtual Indian address',
        'Shop from 100+ Indian stores',
        'Free storage for 30 days',
        'Email notifications on arrival'
      ],
      link: '/services/shop-ship'
    },
    {
      id: 'consolidation',
      title: 'Package Consolidation',
      icon: Box,
      color: 'purple',
      description: 'Combine multiple packages into one shipment to save on international shipping costs',
      features: [
        'Save up to 70% on shipping',
        'Unlimited package consolidation',
        'Smart weight optimization',
        'Professional repackaging'
      ],
      link: '/services/consolidation'
    },
    {
      id: 'assisted-purchase',
      title: 'Assisted Purchase',
      icon: ShoppingCart,
      color: 'green',
      description: 'We buy products on your behalf from Indian stores that don\'t accept international payments',
      features: [
        'Purchase from any Indian site',
        'Dedicated shopping assistant',
        'Transparent pricing',
        'Money-back guarantee'
      ],
      link: '/services/assisted-purchase'
    },
    {
      id: 'repackaging',
      title: 'Smart Repackaging',
      icon: Truck,
      color: 'orange',
      description: 'We remove unnecessary packaging to reduce weight and save you money',
      features: [
        'Remove excess packaging',
        'Reduce dimensional weight',
        'Eco-friendly materials',
        'Photo documentation'
      ],
      link: '/services/repackaging'
    },
    {
      id: 'inspection',
      title: 'Package Inspection',
      icon: Camera,
      color: 'pink',
      description: 'Every package is carefully inspected and photographed for quality assurance',
      features: [
        'Detailed photo documentation',
        'Quality verification',
        'Damage reporting',
        'Content verification'
      ],
      link: '/services/inspection'
    },
    {
      id: 'insurance',
      title: 'Package Insurance',
      icon: Shield,
      color: 'indigo',
      description: 'Protect your valuable items with comprehensive insurance coverage',
      features: [
        'Full value protection',
        'Easy claims process',
        'Affordable premiums',
        'Global coverage'
      ],
      link: '/services/insurance'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    pink: 'bg-pink-100 text-pink-600',
    indigo: 'bg-indigo-100 text-indigo-600'
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">ParcelForward</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/how-it-works" className="hover:text-blue-600">How It Works</Link>
            <Link href="/services" className="text-blue-600 font-semibold">Services</Link>
            <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hover:text-blue-600">Login</Link>
            <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-linear-to-br from-purple-600 to-pink-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Everything you need to shop from India and ship worldwide. 
            Professional, reliable, and affordable international forwarding services.
          </p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link 
                  key={service.id}
                  href={service.link}
                  className="group bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-600 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-xl mb-6 ${colorClasses[service.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose ParcelForward?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best international forwarding experience
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Processing</h3>
              <p className="text-gray-600">Packages processed within 24 hours of arrival</p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Safe</h3>
              <p className="text-gray-600">State-of-the-art warehouse with 24/7 security</p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Worldwide Shipping</h3>
              <p className="text-gray-600">We ship to 50+ countries across the globe</p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 mb-4">
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">No hidden fees, clear pricing structure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How Our Services Work Together</h2>
              <p className="text-xl text-gray-600">
                Our integrated services make international shopping simple and cost-effective
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Sign Up & Get Address</h3>
                  <p className="text-gray-600">
                    Register for free and receive your unique Indian virtual address instantly. 
                    Use this address for all your Indian online shopping.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="h-12 w-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Shop & Order</h3>
                  <p className="text-gray-600">
                    Shop from your favorite Indian stores or use our Assisted Purchase service if you need help buying products.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="h-12 w-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">We Receive & Process</h3>
                  <p className="text-gray-600">
                    Your packages arrive at our facility where we inspect, photograph, and optionally consolidate them to save on shipping costs.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="h-12 w-12 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Ship Worldwide</h3>
                  <p className="text-gray-600">
                    We professionally repackage and ship your items internationally with full tracking and optional insurance protection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-br from-purple-600 to-pink-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Our Services?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their international shipping needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100">
              Get Started Free
            </Link>
            <Link href="/pricing" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Package className="h-8 w-8" />
                <span className="text-xl font-bold">ParcelForward</span>
              </div>
              <p className="text-gray-400">Your trusted partner for international parcel forwarding from India.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/shop-ship" className="hover:text-white">Shop & Ship</Link></li>
                <li><Link href="/services/consolidation" className="hover:text-white">Consolidation</Link></li>
                <li><Link href="/services/assisted-purchase" className="hover:text-white">Assisted Purchase</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/shipping-policy" className="hover:text-white">Shipping Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ParcelForward. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}