import Link from 'next/link';
import { Package, CheckCircle, ShoppingBag, MapPin, Bell, Clock, Shield, Star, CreditCard, Headphones, Globe, Zap } from 'lucide-react';

export default function AssistedPurchasePage() {
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
      <section className="bg-gradient-to-br from-blue-600 to-emerald-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
                PREMIUM SERVICE
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Assisted Purchase Service
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Can't shop from Indian websites? Let us do the shopping for you! 
                We'll purchase items on your behalf and ship them worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 text-center">
                  Start Assisted Purchase
                </Link>
                <Link href="/pricing" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 text-center">
                  View Pricing
                </Link>
              </div>
            </div>
            <div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="bg-white p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Headphones className="h-6 w-6 text-green-600" />
                    <h3 className="font-bold text-lg">Full-Service Shopping</h3>
                  </div>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>We handle payments in Indian Rupees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Deal with Indian payment gateways</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Overcome regional restrictions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Verify product authenticity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Handle customer service issues</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-500">We become your personal shopper in India</p>
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
            <h2 className="text-4xl font-bold mb-4">How Assisted Purchase Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let us handle the complexities of shopping from Indian websites
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-4">
                <span className="text-3xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Send Us Links</h3>
              <p className="text-gray-600">
                Share product links from any Indian website along with size/color preferences
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 mb-4">
                <span className="text-3xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">We Quote & Confirm</h3>
              <p className="text-gray-600">
                We provide a detailed quote including product cost and shipping
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 mb-4">
                <span className="text-3xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">We Purchase</h3>
              <p className="text-gray-600">
                Our team handles payment, ordering, and communication with sellers
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 mb-4">
                <span className="text-3xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Ship to You</h3>
              <p className="text-gray-600">
                We receive, quality-check, and ship your items worldwide with tracking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Use Assisted Purchase?</h2>
            <p className="text-xl text-gray-600">
              Overcome all barriers to shopping from India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Payment Handling</h3>
              <p className="text-gray-600">
                We pay in Indian Rupees using local payment methods that work with all Indian websites
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">No Regional Blocks</h3>
              <p className="text-gray-600">
                Access websites that block international IP addresses or require Indian phone numbers
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Headphones className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer Support</h3>
              <p className="text-gray-600">
                We handle all communication with sellers, returns, and customer service issues
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Verification</h3>
              <p className="text-gray-600">
                We inspect items upon arrival and verify they match your order specifications
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quick Processing</h3>
              <p className="text-gray-600">
                Orders are typically placed within 4-6 hours of payment confirmation
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Any Website</h3>
              <p className="text-gray-600">
                Shop from any Indian website, even those that don't accept international cards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Stores */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">We Can Shop From Any Indian Store</h2>
            <p className="text-xl text-gray-600">
              Including websites that are difficult for international customers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              'Amazon India',
              'Flipkart',
              'Myntra',
              'Nykaa',
              'Ajio',
              'FirstCry',
              'Snapdeal',
              'Tata CLiQ',
              'Reliance Digital',
              'Shoppers Stop'
            ].map((store) => (
              <div key={store} className="bg-white border-2 border-gray-200 rounded-xl p-6 flex items-center justify-center hover:border-green-600 hover:shadow-lg transition-all">
                <span className="font-semibold text-gray-700">{store}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Plus local sellers, boutique stores, and manufacturer websites!</p>
            <Link href="/stores" className="text-green-600 font-semibold hover:underline">
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
              <h2 className="text-4xl font-bold mb-4">Simple Service Fee</h2>
              <p className="text-xl text-gray-600">
                Transparent pricing with no hidden costs
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">10%</div>
                  <div className="text-sm text-gray-600">Service Fee</div>
                  <p className="text-xs text-gray-500 mt-2">of product value (min. $5)</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$0</div>
                  <div className="text-sm text-gray-600">Additional Fees</div>
                  <p className="text-xs text-gray-500 mt-2">No hidden charges</p>
                </div>
              </div>

              <div className="border-t pt-8">
                <h3 className="font-bold text-lg mb-4">What's included in the service fee:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Product research and price verification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Payment processing in Indian Rupees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Order placement and tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Customer service and return handling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Quality inspection upon arrival</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 text-center">
                <Link href="/pricing" className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
                  View Full Pricing Details
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
              Happy customers who used our Assisted Purchase service
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
                "I wanted to buy from a local Indian boutique that didn't accept international cards. The assisted purchase team handled everything perfectly!"
              </p>
              <div>
                <div className="font-bold">Emma Wilson</div>
                <div className="text-sm text-gray-500">London, UK</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "The team helped me navigate a complicated return process with an Indian seller. Their customer service is exceptional!"
              </p>
              <div>
                <div className="font-bold">James Rodriguez</div>
                <div className="text-sm text-gray-500">Miami, USA</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "I needed specific Ayurvedic products that were only available on Indian websites. Assisted purchase made it so easy!"
              </p>
              <div>
                <div className="font-bold">Sophie Martin</div>
                <div className="text-sm text-gray-500">Paris, France</div>
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
                <h3 className="font-bold text-lg mb-2">How do I start an assisted purchase?</h3>
                <p className="text-gray-600">
                  Simply send us the product links, sizes, colors, and quantities via your dashboard. We'll review and provide a quote within 4-6 hours.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">What information do I need to provide?</h3>
                <p className="text-gray-600">
                  Send the product URL, desired size/color, quantity, and any special instructions. The more details you provide, the better we can serve you.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">How long does the process take?</h3>
                <p className="text-gray-600">
                  We typically place orders within 4-6 hours of payment confirmation. Delivery to our warehouse takes 2-7 days depending on the seller.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">What if the item is out of stock?</h3>
                <p className="text-gray-600">
                  We'll immediately notify you and suggest alternatives if available. If no alternative works, we'll refund the full amount for that item.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">Can you handle returns and exchanges?</h3>
                <p className="text-gray-600">
                  Yes! We manage the entire return/exchange process with Indian sellers. Standard return policies of the websites apply.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/faq" className="text-green-600 font-semibold hover:underline">
                View All FAQs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Shop from Any Indian Website?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let us handle the shopping while you enjoy your Indian products delivered worldwide
          </p>
          <Link href="/register" className="inline-block px-8 py-4 bg-white text-green-600 rounded-lg text-lg font-semibold hover:bg-gray-100">
            Start Assisted Purchase
          </Link>
          <p className="mt-6 opacity-75">No commitment • Cancel anytime</p>
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