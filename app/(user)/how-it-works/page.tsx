import Link from 'next/link';
import { Package, ShoppingCart, Warehouse, Plane, CheckCircle, Clock, Shield, Camera, Box, Truck } from 'lucide-react';

export default function HowItWorksPage() {
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
            <Link href="/how-it-works" className="text-blue-600 font-semibold">How It Works</Link>
            <Link href="/services" className="hover:text-blue-600">Services</Link>
            <Link href="#" className="hover:text-blue-600">Pricing</Link>
            <Link href="#" className="hover:text-blue-600">Contact</Link>
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
            How It Works
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Ship from India to anywhere in the world in 4 simple steps. 
            We make international shopping easy, affordable, and hassle-free.
          </p>
        </div>
      </section>

      {/* Main Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Step 1 */}
          <div className="mb-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                  STEP 1
                </div>
                <h2 className="text-4xl font-bold mb-6">Sign Up & Get Your Indian Address</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Create your free account in minutes. Once registered, you'll instantly receive your unique Indian virtual address. 
                  This address can be used for all your Indian e-commerce shopping needs.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Instant Address Generation</h3>
                      <p className="text-gray-600">Get your virtual Indian address immediately after signing up</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Free Registration</h3>
                      <p className="text-gray-600">No subscription fees - only pay for shipping when you need it</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Personal Dashboard</h3>
                      <p className="text-gray-600">Access your personalized dashboard to manage all shipments</p>
                    </div>
                  </div>
                </div>
                <Link href="/register" className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                  Create Free Account
                </Link>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-linear-to-br from-blue-50 to-indigo-100 p-12 rounded-2xl">
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Your Virtual Address</h3>
                        <p className="text-sm text-gray-500">Use this for all orders</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Name</p>
                        <p className="font-semibold">John Doe (PFWD12345)</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Address Line 1</p>
                        <p className="font-semibold">Building No. 42, Sector 18</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Address Line 2</p>
                        <p className="font-semibold">Warehouse Complex</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-gray-500 mb-1">City</p>
                          <p className="font-semibold">Mumbai</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">State</p>
                          <p className="font-semibold">Maharashtra</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-gray-500 mb-1">PIN Code</p>
                          <p className="font-semibold">400001</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Phone</p>
                          <p className="font-semibold">+91 98765 43210</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-linear-to-br from-purple-50 to-pink-100 p-12 rounded-2xl">
                  <div className="space-y-4">
                    {['Amazon India', 'Flipkart', 'Myntra', 'Meesho'].map((store, idx) => (
                      <div key={store} className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4 transform hover:scale-105 transition-transform">
                        <div className="h-12 w-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold">{store}</h3>
                          <p className="text-sm text-gray-500">Shop with confidence</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
                  STEP 2
                </div>
                <h2 className="text-4xl font-bold mb-6">Shop from Indian E-commerce Sites</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Use your Indian virtual address to shop from any Indian e-commerce website. 
                  Enter the address during checkout just like any local Indian customer.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">All Major Stores Supported</h3>
                      <p className="text-gray-600">Amazon, Flipkart, Myntra, Nykaa, Meesho, Ajio & more</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Multiple Orders Welcome</h3>
                      <p className="text-gray-600">Order from different sites - we'll consolidate them for you</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Assisted Purchase Available</h3>
                      <p className="text-gray-600">Don't have an Indian payment method? We can help!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
                  STEP 3
                </div>
                <h2 className="text-4xl font-bold mb-6">We Receive & Process Your Packages</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Once your packages arrive at our warehouse, our team carefully receives, inspects, 
                  photographs, and prepares them for international shipping.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Camera className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Photo Documentation</h3>
                      <p className="text-gray-600">We photograph every package for your peace of mind</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Box className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Quality Inspection</h3>
                      <p className="text-gray-600">We check for damages and verify contents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Warehouse className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Secure Storage</h3>
                      <p className="text-gray-600">Free storage for up to 30 days in our secure facility</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Smart Consolidation</h3>
                      <p className="text-gray-600">Combine multiple packages to save on shipping costs</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-linear-to-br from-green-50 to-emerald-100 p-12 rounded-2xl">
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="font-bold text-lg mb-6">Package Processing Timeline</h3>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                          <div className="w-0.5 h-16 bg-green-600"></div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="font-semibold mb-1">Package Received</h4>
                          <p className="text-sm text-gray-500">Notification sent immediately</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                          <div className="w-0.5 h-16 bg-green-600"></div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="font-semibold mb-1">Inspection & Photos</h4>
                          <p className="text-sm text-gray-500">Within 24 hours</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <Clock className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="font-semibold mb-1">Ready to Ship</h4>
                          <p className="text-sm text-gray-500">Awaiting your shipping request</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-linear-to-br from-orange-50 to-red-100 p-12 rounded-2xl">
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-lg">Shipment Tracking</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">In Transit</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center shrink-0">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">Departed from Mumbai</p>
                          <p className="text-xs text-gray-500">Oct 1, 2025 - 10:30 AM</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center shrink-0">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">Arrived at Dubai Hub</p>
                          <p className="text-xs text-gray-500">Oct 2, 2025 - 8:15 PM</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0 animate-pulse">
                          <Plane className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">In Transit to USA</p>
                          <p className="text-xs text-gray-500">Estimated: Oct 5, 2025</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 opacity-40">
                        <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center shrink-0">
                          <Truck className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">Out for Delivery</p>
                          <p className="text-xs text-gray-500">Pending</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                  STEP 4
                </div>
                <h2 className="text-4xl font-bold mb-6">International Shipping to Your Door</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Once you request shipping, we carefully repackage and send your items via trusted international couriers 
                  with full tracking. Typical delivery time is 7-10 days worldwide.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-orange-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Fully Insured Shipping</h3>
                      <p className="text-gray-600">Your packages are protected during transit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Plane className="h-6 w-6 text-orange-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Express & Economy Options</h3>
                      <p className="text-gray-600">Choose the shipping speed that fits your budget</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-orange-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Real-time Tracking</h3>
                      <p className="text-gray-600">Monitor your shipment every step of the way</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="h-6 w-6 text-orange-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Door-to-Door Delivery</h3>
                      <p className="text-gray-600">Direct delivery to your address worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Additional Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We offer extra services to make your international shopping experience even better
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Box className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Repackaging</h3>
              <p className="text-gray-600">
                We remove unnecessary packaging and consolidate items to reduce weight and shipping costs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-14 w-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Assisted Purchase</h3>
              <p className="text-gray-600">
                Don't have an Indian payment method? We can purchase items on your behalf.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="h-14 w-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Package Insurance</h3>
              <p className="text-gray-600">
                Add insurance coverage to protect your valuable items during international shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-br from-purple-600 to-pink-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who shop from India and ship worldwide with us
          </p>
          <Link href="/register" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100">
            Create Free Account
          </Link>
          <p className="mt-6 opacity-75">No credit card required • Free to sign up</p>
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