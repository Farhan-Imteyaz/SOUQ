'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail } from 'lucide-react';

export default function FAQPage() {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const faqData = [
    {
      id: 'general',
      title: 'General Questions',
      icon: '📦',
      questions: [
        {
          q: 'What is ParcelForward?',
          a: 'ParcelForward is a package forwarding service that provides you with an Indian virtual address. You can shop from any Indian e-commerce store and we\'ll receive, store, and forward your packages to your international address.'
        },
        {
          q: 'How does parcel forwarding work?',
          a: '1. Sign up and get your free Indian address → 2. Shop from Indian stores using your address → 3. We receive and store your packages → 4. You request shipping to your international address → 5. We ship with tracking and insurance options.'
        },
        {
          q: 'Which Indian stores can I shop from?',
          a: 'You can shop from ANY Indian e-commerce website including Amazon India, Flipkart, Myntra, Nykaa, Ajio, FirstCry, Snapdeal, and thousands of other online stores that ship within India.'
        },
        {
          q: 'Is there a sign-up fee or monthly subscription?',
          a: 'No! Signing up is completely free. You only pay for the international shipping costs when you request to ship your packages. No monthly fees or hidden charges.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Dashboard',
      icon: '👤',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click the "Sign Up" button on our website, fill in your details including your international address, and you\'ll instantly receive your Indian virtual address. The whole process takes less than 2 minutes.'
        },
        {
          q: 'What can I see in my dashboard?',
          a: 'Your dashboard shows: Package status (received, in transit, delivered), your Indian virtual address, shipping calculator, billing history, address book, and quick action buttons for new shipments.'
        },
        {
          q: 'Can I manage multiple packages in my dashboard?',
          a: 'Yes! You can track all your packages, see photos of received items, request consolidation, and manage shipping for multiple packages simultaneously.'
        },
        {
          q: 'How do I update my personal information?',
          a: 'You can update your personal details, shipping address, and notification preferences anytime from your dashboard under "Account Settings".'
        }
      ]
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      icon: '🚚',
      questions: [
        {
          q: 'How long does shipping take?',
          a: 'Typically 7-14 days depending on your destination country. Express shipping options (5-7 days) are also available for most locations.'
        },
        {
          q: 'Which countries do you ship to?',
          a: 'We ship to 50+ countries including USA, UK, Canada, Australia, UAE, Singapore, Malaysia, and most European countries.'
        },
        {
          q: 'How is shipping cost calculated?',
          a: 'Shipping cost is based on package weight, dimensions, destination country, and shipping speed. Use our shipping calculator in your dashboard for instant quotes.'
        },
        {
          q: 'Do you provide tracking information?',
          a: 'Yes! You\'ll receive a tracking number as soon as your package is dispatched. You can track your package in real-time from our dashboard.'
        },
        {
          q: 'What happens if my package gets lost or damaged?',
          a: 'We offer optional package insurance. For insured packages, we cover lost or damaged items. All packages are photographed upon arrival for verification.'
        }
      ]
    },
    {
      id: 'packaging',
      title: 'Packaging & Consolidation',
      icon: '📦',
      questions: [
        {
          q: 'What is package consolidation?',
          a: 'We can combine multiple packages into one shipment to save you money on international shipping. This is especially useful when you shop from different stores.'
        },
        {
          q: 'How much can I save with consolidation?',
          a: 'Consolidation can save you 30-60% on shipping costs by eliminating multiple international shipping fees and optimizing package weight.'
        },
        {
          q: 'Do you remove original packaging?',
          a: 'Yes, we can remove unnecessary outer packaging to reduce weight and size (and save you money), while keeping the product packaging intact.'
        },
        {
          q: 'How long can you store my packages?',
          a: 'We offer free storage for 30 days. This gives you time to receive multiple packages from different stores before consolidating and shipping.'
        }
      ]
    },
    {
      id: 'pricing',
      title: 'Pricing & Payments',
      icon: '💰',
      questions: [
        {
          q: 'What are the costs involved?',
          a: 'You pay only for international shipping. There are no fees for sign-up, address, package receiving, or storage (first 30 days). Optional services like consolidation and insurance have small fees.'
        },
        {
          q: 'When do I pay for shipping?',
          a: 'You pay when you request to ship your packages from our warehouse to your international address. We\'ll provide a quote for your approval before processing.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit/debit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for international customers.'
        },
        {
          q: 'Are there any hidden fees?',
          a: 'No hidden fees. You see the complete shipping cost breakdown before confirming your shipment. This includes shipping, consolidation (if any), and insurance (if selected).'
        }
      ]
    },
    {
      id: 'assisted',
      title: 'Assisted Purchase',
      icon: '🛍️',
      questions: [
        {
          q: 'What is Assisted Purchase?',
          a: 'If you can\'t shop directly from Indian websites (due to payment issues, regional restrictions, etc.), our team will purchase items on your behalf for a small service fee.'
        },
        {
          q: 'How does Assisted Purchase work?',
          a: '1. Send us product links → 2. We provide a quote → 3. You approve and pay → 4. We purchase and handle everything → 5. Items shipped to your address.'
        },
        {
          q: 'What is the service fee for Assisted Purchase?',
          a: 'We charge 10% of the product value (minimum $5) for handling payments, ordering, customer service, and quality verification.'
        },
        {
          q: 'Can you handle returns and exchanges?',
          a: 'Yes! We manage the entire return/exchange process with Indian sellers on your behalf, following the store\'s return policies.'
        }
      ]
    },
    {
      id: 'prohibited',
      title: 'Prohibited Items',
      icon: '🚫',
      questions: [
        {
          q: 'What items cannot be shipped?',
          a: 'We cannot ship dangerous goods, weapons, drugs, currencies, perishables, and restricted items. See our detailed Prohibited Items list for complete information.'
        },
        {
          q: 'What happens if I ship prohibited items?',
          a: 'Prohibited items will be refused, seized, or destroyed by customs. You will be liable for any costs and penalties. Always check before shipping.'
        },
        {
          q: 'Can I ship electronics and batteries?',
          a: 'Most electronics are allowed, but lithium batteries have strict regulations. Contact us before shipping items with batteries.'
        },
        {
          q: 'Are liquids and perfumes allowed?',
          a: 'No, flammable liquids, perfumes, aerosols, and alcohol-based products are prohibited for international air shipping.'
        }
      ]
    },
    {
      id: 'support',
      title: 'Support & Contact',
      icon: '📞',
      questions: [
        {
          q: 'How can I contact customer support?',
          a: 'You can reach us via: Live chat on our website, email at support@parcelforward.com, or WhatsApp at +91-XXXXX-XXXXX. We\'re available 24/7.'
        },
        {
          q: 'What is your response time?',
          a: 'We typically respond within 2-4 hours for emails and instantly for live chat. Emergency shipping issues get priority response.'
        },
        {
          q: 'Do you have regional support?',
          a: 'Yes, we have support teams familiar with regional requirements for major destinations like USA, UAE, Europe, and Australia.'
        }
      ]
    }
  ];

  const filteredFAQs = faqData.map(section => ({
    ...section,
    questions: section.questions.filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.questions.length > 0);

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
            <Link href="/services" className="hover:text-blue-600">Services</Link>
            <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="hover:text-blue-600">My Dashboard</Link>
            <Link href="/login" className="hover:text-blue-600">Login</Link>
            <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Find answers to common questions about our parcel forwarding services
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Navigation */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div className="bg-white rounded-xl shadow-sm border p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search FAQs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Navigation Menu */}
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="p-4 border-b">
                    <h3 className="font-bold text-gray-900">FAQ Categories</h3>
                  </div>
                  <nav className="p-2">
                    {faqData.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => {
                          document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-3"
                      >
                        <span className="text-lg">{section.icon}</span>
                        <span className="font-medium">{section.title}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Quick Help */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200 p-6">
                  <h3 className="font-bold text-lg mb-3">Need More Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <div className="space-y-3">
                    <Link href="/contact" className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200 hover:shadow-sm transition-shadow">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">Live Chat</span>
                    </Link>
                    <Link href="mailto:support@parcelforward.com" className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200 hover:shadow-sm transition-shadow">
                      <Mail className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">Email Support</span>
                    </Link>
                    <Link href="tel:+911234567890" className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200 hover:shadow-sm transition-shadow">
                      <Phone className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">Call Us</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - FAQ Sections */}
            <div className="lg:w-3/4">
              {searchTerm && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-700">
                    Showing results for: <strong>"{searchTerm}"</strong>
                  </p>
                </div>
              )}

              <div className="space-y-8">
                {filteredFAQs.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                      {/* Section Header */}
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{section.icon}</span>
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                            <p className="text-gray-600 mt-1">
                              {section.questions.length} question{section.questions.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        {openSections[section.id] ? (
                          <ChevronUp className="h-6 w-6 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-6 w-6 text-gray-400" />
                        )}
                      </button>

                      {/* Section Content */}
                      {openSections[section.id] && (
                        <div className="border-t">
                          {section.questions.map((item, index) => (
                            <div key={index} className="border-b last:border-b-0">
                              <div className="p-6">
                                <h3 className="font-bold text-lg text-gray-900 mb-3">{item.q}</h3>
                                <p className="text-gray-700 leading-relaxed">{item.a}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </section>
                ))}
              </div>

              {/* No Results */}
              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-gray-50 rounded-xl p-8 max-w-md mx-auto">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600 mb-4">
                      We couldn't find any FAQs matching "{searchTerm}"
                    </p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear search and show all FAQs
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom CTA */}
              <div className="mt-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                  Our customer support team is available 24/7 to help you with any questions about parcel forwarding.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contact" 
                    className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Contact Support
                  </Link>
                  <Link 
                    href="/dashboard" 
                    className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            </div>
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