import Link from 'next/link';
import { Package, CheckCircle, ShoppingBag, MapPin, Bell, Clock, Shield, Star } from 'lucide-react';

export default function ShopShipPage() {
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
      <section className="bg-gradient-to-br from-blue-600 to-green-400 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
                CORE SERVICE
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Shop & Ship from India
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Get your personal Indian address and shop from any Indian e-commerce site. 
                We receive, store, and forward your packages worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 text-center">
                  Get Your Indian Address
                </Link>
                <Link href="/pricing" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 text-center">
                  View Pricing
                </Link>
              </div>
            </div>
            <div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="bg-white p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    <h3 className="font-bold text-lg">Your Indian Address</h3>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="font-semibold">Your Name (ID: PFWD12345)</p>
                    <p>ParcelForward Warehouse</p>
                    <p>Plot No. 42, Sector 18</p>
                    <p>Mumbai, Maharashtra 400001</p>
                    <p>India</p>
                    <p className="font-semibold mt-3">Phone: +91 98765 43210</p>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-500">Use this address for all your Indian online orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How Shop & Ship Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four simple steps to shop from India and ship anywhere in the world
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 mb-4">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Sign Up Free</h3>
              <p className="text-gray-600">
                Create your account and instantly get your unique Indian virtual address
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 mb-4">
                <span className="text-3xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Start Shopping</h3>
              <p className="text-gray-600">
                Use your address to shop from Amazon India, Flipkart, Myntra and more
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-4">
                <span className="text-3xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">We Receive</h3>
              <p className="text-gray-600">
                Your packages arrive at our facility and we notify you immediately
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 mb-4">
                <span className="text-3xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Ship Worldwide</h3>
              <p className="text-gray-600">
                Request shipping and we'll deliver to your doorstep with tracking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What's Included</h2>
            <p className="text-xl text-gray-600">
              Everything you need for hassle-free international shopping
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Virtual Indian Address</h3>
              <p className="text-gray-600">
                Get a real Indian street address in Mumbai with phone number that you can use for all orders
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Notifications</h3>
              <p className="text-gray-600">
                Get email and dashboard alerts the moment your packages arrive at our warehouse
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Storage</h3>
              <p className="text-gray-600">
                Store your packages free for 30 days while you decide when to ship them
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multiple Packages</h3>
              <p className="text-gray-600">
                Order from different stores and we'll consolidate them to save on shipping
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Handling</h3>
              <p className="text-gray-600">
                Your packages are stored in our secure, climate-controlled warehouse facility
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Processing</h3>
              <p className="text-gray-600">
                All packages are checked in and processed within 24 hours of arrival
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Stores */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Shop from Popular Indian Stores</h2>
            <p className="text-xl text-gray-600">
              Use your address with any Indian e-commerce platform
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              'Amazon India',
              'Flipkart',
              'Myntra',
              'Meesho',
              'Nykaa',
              'Ajio',
              'FirstCry',
              'Snapdeal',
              'Pepperfry',
              'BigBasket'
            ].map((store) => (
              <div key={store} className="bg-white border-2 border-gray-200 rounded-xl p-6 flex items-center justify-center hover:border-blue-600 hover:shadow-lg transition-all">
                <span className="font-semibold text-gray-700">{store}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">And many more Indian e-commerce sites!</p>
            <Link href="/stores" className="text-blue-600 font-semibold hover:underline">
              View All Supported Stores →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600">
                Pay only for what you use - no monthly fees or subscriptions
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$0</div>
                  <div className="text-sm text-gray-600">Sign up & address</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">$0</div>
                  <div className="text-sm text-gray-600">30 days storage</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">$0</div>
                  <div className="text-sm text-gray-600">Package receiving</div>
                </div>
              </div>

              <div className="border-t pt-8">
                <h3 className="font-bold text-lg mb-4">You only pay for:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">International shipping costs based on weight and destination</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Optional services like consolidation and repackaging (saves you money!)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Optional package insurance for valuable items</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 text-center">
                <Link href="/pricing" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                  View Full Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">
              Join thousands of happy customers shipping from India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "The process was so smooth! I got my Indian address instantly and started shopping the same day. Packages arrived safely in the USA within 8 days."
              </p>
              <div>
                <div className="font-bold">Sarah Johnson</div>
                <div className="text-sm text-gray-500">New York, USA</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "I've been using this service for 6 months now. The team is very professional and responsive. Never had any issues with my packages."
              </p>
              <div>
                <div className="font-bold">Ahmed Hassan</div>
                <div className="text-sm text-gray-500">Dubai, UAE</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "Finally, I can buy Indian products and ship them to Singapore! The consolidation service saved me a lot on shipping costs."
              </p>
              <div>
                <div className="font-bold">Michael Chen</div>
                <div className="text-sm text-gray-500">Singapore</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">How quickly do I get my Indian address?</h3>
                <p className="text-gray-600">
                  Instantly! Once you complete the registration, your unique Indian virtual address is generated immediately and displayed in your dashboard.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">Can I use this address for any Indian website?</h3>
                <p className="text-gray-600">
                  Yes! Your address works with all Indian e-commerce sites including Amazon India, Flipkart, Myntra, Nykaa, and any other online store that ships within India.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">How long can I store my packages?</h3>
                <p className="text-gray-600">
                  We offer free storage for 30 days. After that, a small storage fee applies. This gives you time to accumulate multiple packages for consolidation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">What if my package gets damaged?</h3>
                <p className="text-gray-600">
                  We photograph every package upon arrival. If you notice damage, contact us immediately. We also offer optional insurance for valuable items.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">Are there any prohibited items?</h3>
                <p className="text-gray-600">
                  Yes, we cannot ship certain items like liquids, batteries, flammables, and restricted goods. Check our prohibited items list before ordering.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/faq" className="text-blue-600 font-semibold hover:underline">
                View All FAQs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-green-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Shopping from India?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get your free Indian address today and start enjoying unlimited access to Indian e-commerce
          </p>
          <Link href="/register" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100">
            Get Your Free Address Now
          </Link>
          <p className="mt-6 opacity-75">No credit card required • Free forever</p>
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