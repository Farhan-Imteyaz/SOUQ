import Link from 'next/link';
import { Package, Box, TrendingDown, CheckCircle, DollarSign, Scale, Layers, Shield } from 'lucide-react';

export default function ConsolidationPage() {
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
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
                SAVE UP TO 70%
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Package Consolidation
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Combine multiple packages into one shipment and save significantly on international shipping costs. 
                Smart consolidation = Smart savings!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="px-8 py-4 bg-white text-purple-600 rounded-lg text-lg font-semibold hover:bg-gray-100 text-center">
                  Start Saving Today
                </Link>
                <Link href="/pricing" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 text-center">
                  Calculate Savings
                </Link>
              </div>
            </div>
            <div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Example Savings</h3>
                <div className="space-y-4">
                  <div className="bg-white/20 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="opacity-90">3 Separate Shipments</span>
                      <span className="font-bold text-xl line-through">$180</span>
                    </div>
                    <div className="text-sm opacity-75">Package 1: $60 • Package 2: $60 • Package 3: $60</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-purple-600">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">1 Consolidated Shipment</span>
                      <span className="font-bold text-3xl">$75</span>
                    </div>
                    <div className="text-sm">Combined weight optimized</div>
                  </div>
                  <div className="bg-green-500 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">You Save</span>
                      <span className="font-bold text-3xl">$105</span>
                    </div>
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
            <h2 className="text-4xl font-bold mb-4">How Consolidation Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make it easy to combine your packages and maximize your savings
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="h-16 w-16 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-2xl">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Order from Multiple Stores</h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Shop from different Indian e-commerce sites using your virtual address. 
                    Order as many items as you want from various stores.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Amazon: Clothes & Accessories</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm mt-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Flipkart: Electronics</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm mt-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Nykaa: Beauty Products</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="h-16 w-16 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-2xl">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Packages Arrive at Our Facility</h3>
                  <p className="text-lg text-gray-600 mb-4">
                    All your packages arrive at our secure warehouse. We receive, inspect, and photograph each one.
                    You'll get instant notifications for every arrival.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <Box className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold">Package 1</div>
                      <div className="text-xs text-gray-500">2.5 kg</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <Box className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold">Package 2</div>
                      <div className="text-xs text-gray-500">1.8 kg</div>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-lg text-center">
                      <Box className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold">Package 3</div>
                      <div className="text-xs text-gray-500">3.2 kg</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="h-16 w-16 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-2xl">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Request Consolidation</h3>
                  <p className="text-lg text-gray-600 mb-4">
                    From your dashboard, select the packages you want to combine and request consolidation. 
                    We'll remove excess packaging and combine everything into one box.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Before consolidation:</span>
                      <span className="font-bold">7.5 kg (3 boxes)</span>
                    </div>
                    <div className="flex items-center justify-between text-green-600">
                      <span className="text-sm font-semibold">After consolidation:</span>
                      <span className="font-bold">5.8 kg (1 box)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="h-16 w-16 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-2xl">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Ship & Save</h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Your consolidated package is professionally repackaged and shipped internationally. 
                    Track your single shipment all the way to your door and enjoy massive savings!
                  </p>
                  <div className="bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-500 p-6 rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingDown className="h-12 w-12 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold text-green-600">Save 40-70%</div>
                        <div className="text-sm text-gray-600">on international shipping costs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Consolidate Your Packages?</h2>
            <p className="text-xl text-gray-600">
              Smart consolidation means smart savings and better logistics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-14 w-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Massive Cost Savings</h3>
              <p className="text-gray-600">
                Save 40-70% on shipping costs by combining multiple packages. Why pay separate shipping for each item when you can ship once?
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Scale className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Reduced Weight</h3>
              <p className="text-gray-600">
                We remove unnecessary packaging materials, reducing dimensional weight and saving you money on volumetric charges.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-14 w-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Layers className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Better Organization</h3>
              <p className="text-gray-600">
                Receive one consolidated package instead of multiple shipments arriving at different times. Easier tracking and delivery.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-14 w-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Packaging</h3>
              <p className="text-gray-600">
                Professional repackaging ensures all items are securely protected during international transit with proper cushioning.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-14 w-14 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Box className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Unlimited Consolidation</h3>
              <p className="text-gray-600">
                Combine as many packages as you want. No limits on the number of items we can consolidate for you.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-14 w-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Service</h3>
              <p className="text-gray-600">
                Consolidation service is completely free! You only pay for the reduced international shipping cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Example */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Real Savings Example</h2>
              <p className="text-xl text-gray-600">
                See how much you can save with package consolidation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Without Consolidation */}
              <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-red-700 mb-6">❌ Without Consolidation</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">Package 1 - Amazon</span>
                      <span className="text-red-600 font-bold">$65</span>
                    </div>
                    <div className="text-sm text-gray-600">2.5 kg • 30×25×15 cm</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">Package 2 - Flipkart</span>
                      <span className="text-red-600 font-bold">$55</span>
                    </div>
                    <div className="text-sm text-gray-600">1.8 kg • 25×20×12 cm</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">Package 3 - Nykaa</span>
                      <span className="text-red-600 font-bold">$70</span>
                    </div>
                    <div className="text-sm text-gray-600">3.2 kg • 35×30×18 cm</div>
                  </div>
                  <div className="bg-red-600 text-white p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total Cost</span>
                      <span className="font-bold text-3xl">$190</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* With Consolidation */}
              <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-green-700 mb-6">✅ With Consolidation</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="font-semibold mb-2">Combined Package</div>
                    <div className="text-sm text-gray-600 mb-3">
                      • All items professionally repackaged<br/>
                      • Excess packaging removed<br/>
                      • Optimized dimensions
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Weight (reduced):</span>
                      <span className="font-semibold">5.8 kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Dimensions:</span>
                      <span className="font-semibold">40×35×20 cm</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-center text-green-700">
                      <span className="font-semibold">Consolidation Fee</span>
                      <span className="font-bold">FREE</span>
                    </div>
                  </div>
                  <div className="bg-green-600 text-white p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg">Total Cost</span>
                      <span className="font-bold text-3xl">$72</span>
                    </div>
                  </div>
                  <div className="bg-yellow-400 text-gray-900 p-4 rounded-lg font-bold text-center">
                    <div className="text-2xl">💰 You Save $118!</div>
                    <div className="text-sm mt-1">That's 62% savings!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="bg-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Consolidation Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Wait for All Packages</h3>
                    <p className="text-sm text-gray-600">
                      Wait until all your expected packages arrive before requesting consolidation for maximum savings.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Remove Extra Packaging</h3>
                    <p className="text-sm text-gray-600">
                      We automatically remove unnecessary boxes and packaging to reduce weight and save money.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Use Free Storage</h3>
                    <p className="text-sm text-gray-600">
                      Take advantage of 30 days free storage to accumulate packages without worrying about timing.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Add Insurance</h3>
                    <p className="text-sm text-gray-600">
                      Consider adding insurance for valuable items in your consolidated shipment for peace of mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-br from-purple-600 to-pink-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Saving on Shipping Today</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who save money with our free consolidation service
          </p>
          <Link href="/register" className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg text-lg font-semibold hover:bg-gray-100">
            Get Started for Free
          </Link>
          <p className="mt-6 opacity-75">Consolidation service is 100% free</p>
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