'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, Play, ArrowRight, Download, BookOpen, Video, CheckCircle, Menu, X } from 'lucide-react';

export default function GuidePage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const guideSections = [
    {
      id: 'shop-ship',
      title: 'Shop & Ship Guide',
      description: 'Learn how to use your Indian virtual address and ship packages worldwide',
      icon: '🛍️',
      videoId: 'dQw4w9WgXcQ',
      steps: [
        'Sign up and get your free Indian address',
        'Shop from Indian stores using your virtual address',
        'We receive and store your packages',
        'Request shipping to your international address',
        'Track your package until delivery'
      ],
      features: [
        'Free Indian virtual address',
        '30 days free storage',
        'Package consolidation',
        'Real-time tracking',
        'Insurance options'
      ],
      resources: [
        { name: 'Complete Shop & Ship PDF Guide', url: '/guides/shop-ship.pdf' },
        { name: 'Supported Stores List', url: '/guides/supported-stores.pdf' },
        { name: 'Shipping Calculator', url: '/pricing' }
      ]
    },
    {
      id: 'assisted-purchase',
      title: 'Assisted Purchase Guide',
      description: 'Let us handle the shopping for you from any Indian website',
      icon: '👨‍💼',
      videoId: 'dQw4w9WgXcQ',
      steps: [
        'Send us product links and details',
        'We provide a complete cost quote',
        'Approve the quote and make payment',
        'We purchase and handle everything',
        'Items shipped to your address'
      ],
      features: [
        'We handle payments in Indian Rupees',
        'Overcome regional restrictions',
        'Customer service support',
        'Quality verification',
        'Return handling'
      ],
      resources: [
        { name: 'Assisted Purchase Process PDF', url: '/guides/assisted-purchase.pdf' },
        { name: 'Service Fee Calculator', url: '/pricing' },
        { name: 'Request Form Template', url: '/guides/request-form.pdf' }
      ]
    },
    {
      id: 'international-shipment',
      title: 'International Shipment Guide',
      description: 'Understand the complete shipping process and customs requirements',
      icon: '✈️',
      videoId: 'dQw4w9WgXcQ',
      steps: [
        'Prepare your package for shipping',
        'Calculate shipping costs',
        'Complete customs declaration',
        'Choose shipping method',
        'Track international delivery'
      ],
      features: [
        '50+ countries supported',
        'Express shipping options',
        'Customs documentation help',
        'Package insurance',
        'Duty & tax calculation'
      ],
      resources: [
        { name: 'International Shipping PDF Guide', url: '/guides/international-shipping.pdf' },
        { name: 'Customs Declaration Form', url: '/guides/customs-form.pdf' },
        { name: 'Prohibited Items List', url: '/prohibited-items' }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold">ParcelForward</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/how-it-works" className="hover:text-blue-600">How It Works</Link>
              <Link href="/services" className="hover:text-blue-600">Services</Link>
              <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>
              <Link href="/contact" className="hover:text-blue-600">Contact</Link>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/dashboard" className="hover:text-blue-600">My Dashboard</Link>
              <Link href="/login" className="hover:text-blue-600">Login</Link>
              <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-4">
                <Link href="/how-it-works" className="hover:text-blue-600 py-2">How It Works</Link>
                <Link href="/services" className="hover:text-blue-600 py-2">Services</Link>
                <Link href="/pricing" className="hover:text-blue-600 py-2">Pricing</Link>
                <Link href="/contact" className="hover:text-blue-600 py-2">Contact</Link>
                <div className="border-t pt-4 flex flex-col space-y-3">
                  <Link href="/dashboard" className="hover:text-blue-600 py-2">My Dashboard</Link>
                  <Link href="/login" className="hover:text-blue-600 py-2">Login</Link>
                  <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 md:h-16 md:w-16 bg-white/20 rounded-full mb-4">
            <BookOpen className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Complete User Guides</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Step-by-step tutorials and video guides to help you master parcel forwarding
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-3 gap-2 scrollbar-hide -mx-4 px-4">
            {guideSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full whitespace-nowrap transition-colors text-sm md:text-base flex-shrink-0"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
              >
                <span className="text-base md:text-lg">{section.icon}</span>
                <span className="font-medium">{section.title}</span>
              </a>
            ))}
            <a
              href="#resources"
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full whitespace-nowrap transition-colors text-sm md:text-base flex-shrink-0"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
            >
              <Download className="h-4 w-4" />
              <span className="font-medium">All Resources</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Guide Sections */}
            <div className="space-y-8 md:space-y-16">
              {guideSections.map((section, index) => (
                <section key={section.id} id={section.id} className="scroll-mt-32">
                  <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border overflow-hidden">
                    {/* Section Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-8 border-b">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 md:gap-4">
                          <span className="text-2xl md:text-3xl">{section.icon}</span>
                          <div className="flex-1 min-w-0">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 break-words">
                              {section.title}
                            </h2>
                            <p className="text-sm md:text-lg text-gray-600 mt-1 md:mt-2">
                              {section.description}
                            </p>
                          </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 bg-white rounded-full border flex-shrink-0 ml-2">
                          <Video className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
                          <span className="text-xs md:text-sm font-medium text-blue-600">Video Guide</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:p-6 lg:p-8">
                      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                        {/* Video Section */}
                        <div className="lg:flex-1">
                          <div className="bg-black rounded-lg md:rounded-xl overflow-hidden aspect-video relative">
                            {activeVideo === section.id ? (
                              <iframe
                                src={`https://www.youtube.com/embed/${section.videoId}?autoplay=1`}
                                title={`${section.title} Video Guide`}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                <button
                                  onClick={() => setActiveVideo(section.id)}
                                  className="flex items-center gap-2 md:gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base"
                                >
                                  <Play className="h-4 w-4 md:h-5 md:w-5" />
                                  Play Video Guide
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {/* Video Description */}
                          <div className="mt-3 md:mt-4">
                            <p className="text-xs md:text-sm text-gray-600">
                              Watch this {section.title.toLowerCase()} tutorial to learn the complete process from start to finish.
                            </p>
                          </div>
                        </div>

                        {/* Steps & Features */}
                        <div className="lg:flex-1 space-y-4 md:space-y-6">
                          {/* Steps */}
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                              <span>📋</span>
                              Step-by-Step Process
                            </h3>
                            <div className="space-y-2 md:space-y-3">
                              {section.steps.map((step, stepIndex) => (
                                <div key={stepIndex} className="flex items-start gap-2 md:gap-3">
                                  <div className="flex-shrink-0 h-5 w-5 md:h-6 md:w-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold mt-0.5">
                                    {stepIndex + 1}
                                  </div>
                                  <span className="text-sm md:text-base text-gray-700 leading-relaxed">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Features */}
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                              <span>⭐</span>
                              Key Features
                            </h3>
                            <div className="grid gap-1 md:gap-2">
                              {section.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                                  <span className="text-sm md:text-base text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Resources */}
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                              <Download className="h-4 w-4 md:h-5 md:w-5" />
                              Download Resources
                            </h3>
                            <div className="space-y-2">
                              {section.resources.map((resource, resourceIndex) => (
                                <a
                                  key={resourceIndex}
                                  href={resource.url}
                                  className="flex items-center justify-between p-2 md:p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors group text-sm md:text-base"
                                >
                                  <span className="text-gray-700 font-medium truncate pr-2">{resource.name}</span>
                                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t">
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                          <Link
                            href={`/services/${section.id.replace('-', '-')}`}
                            className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center text-sm md:text-base"
                          >
                            Learn More About This Service
                            <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                          </Link>
                          <Link
                            href="/dashboard"
                            className="px-4 py-2 md:px-6 md:py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2 justify-center text-sm md:text-base"
                          >
                            Try in Dashboard
                            <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {/* All Resources Section */}
            <section id="resources" className="scroll-mt-32 mt-12 md:mt-16">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border p-4 md:p-6 lg:p-8">

                {/* Additional Resources */}
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Additional Help Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <Link
                      href="/faq"
                      className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors group"
                    >
                      <div className="flex-shrink-0 h-8 w-8 md:h-12 md:w-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-4 w-4 md:h-6 md:w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm md:text-base">FAQ Section</h4>
                        <p className="text-gray-600 text-xs md:text-sm mt-1">Find answers to common questions</p>
                      </div>
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href="/contact"
                      className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 transition-colors group"
                    >
                      <div className="flex-shrink-0 h-8 w-8 md:h-12 md:w-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <Video className="h-4 w-4 md:h-6 md:w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm md:text-base">Live Support</h4>
                        <p className="text-gray-600 text-xs md:text-sm mt-1">Get personalized help from our team</p>
                      </div>
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom CTA */}
            <div className="mt-12 md:mt-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl md:rounded-2xl p-6 md:p-8 text-white text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Ready to Get Started?</h3>
              <p className="text-sm md:text-lg opacity-90 mb-4 md:mb-6 max-w-2xl mx-auto">
                Join thousands of customers who are already enjoying hassle-free parcel forwarding from India.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link 
                  href="/register" 
                  className="px-6 py-2 md:px-8 md:py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
                >
                  Create Free Account
                </Link>
                <Link 
                  href="/dashboard" 
                  className="px-6 py-2 md:px-8 md:py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-sm md:text-base"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-3 md:mb-4">
                <Package className="h-6 w-6 md:h-8 md:w-8" />
                <span className="text-lg md:text-xl font-bold">ParcelForward</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base">Your trusted partner for international parcel forwarding from India.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2 md:mb-4 text-sm md:text-base">Services</h3>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li><Link href="/services/shop-ship" className="hover:text-white">Shop & Ship</Link></li>
                <li><Link href="/services/consolidation" className="hover:text-white">Consolidation</Link></li>
                <li><Link href="/services/assisted-purchase" className="hover:text-white">Assisted Purchase</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2 md:mb-4 text-sm md:text-base">Company</h3>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2 md:mb-4 text-sm md:text-base">Legal</h3>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/shipping-policy" className="hover:text-white">Shipping Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
            <p>&copy; 2025 ParcelForward. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}