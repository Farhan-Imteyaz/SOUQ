import Link from 'next/link';
import { Package, Shield, AlertTriangle, Ban, Skull, Gem, Flame, Droplets } from 'lucide-react';

export default function ProhibitedItemsPage() {
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
      <section className="bg-gradient-to-br from-red-600 to-orange-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-white/20 rounded-full mb-4">
            <Ban className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Prohibited Items</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Important restrictions for shipping from India to international destinations
          </p>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="bg-orange-50 border-b border-orange-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-orange-800 font-semibold">
                Important: Shipments containing prohibited items may be refused, seized, destroyed, or incur penalties.
              </p>
              <p className="text-orange-700 text-sm mt-1">
                You (the sender) will be held liable for any costs and legal consequences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
              <p className="text-gray-700 mb-4">
                To comply with IATA air transport regulations, Indian export laws, and international import/customs rules, 
                certain items cannot be shipped via our forward parcel service.
              </p>
              <p className="text-gray-700 font-semibold">
                The list below is indicative and not exhaustive. When in doubt, please contact our support team before dispatching.
              </p>
            </div>

            {/* Prohibited Items Categories */}
            <div className="space-y-8">
              {/* Category 1 */}
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="bg-red-50 border-b border-red-200 p-6">
                  <div className="flex items-center gap-3">
                    <Flame className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold text-red-900">1. Dangerous, Combustible & Hazardous Materials</h2>
                  </div>
                  <p className="text-red-700 mt-2">
                    These items pose safety, fire, or chemical risks and are typically banned for air transport
                  </p>
                </div>
                <div className="p-6">
                  <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Flammable liquids, gases, or vapors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Perfumes, colognes, fragrance sprays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Nail polish, nail polish removers, solvents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Alcohol-based sanitizers, aftershaves</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Fuels, gasoline, kerosene, lighter fluid</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Paints, thinners, turpentine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Adhesives, glues with volatile solvents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Compressed gases, aerosol cans, spray cans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Bleach, oxidizers, peroxides</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Fertilizers, pesticides, herbicides, insecticides</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Battery fluids and corrosive chemicals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Any material that may release toxic fumes</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800 font-semibold">
                      ⚠️ Note: Lithium batteries are generally prohibited unless they strictly comply with specific packaging, 
                      labeling, and shipping regulations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Category 2 */}
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="bg-red-50 border-b border-red-200 p-6">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold text-red-900">2. Weapons, Firearms & Related Items</h2>
                  </div>
                  <p className="text-red-700 mt-2">
                    These are typically banned under both export and import regulations
                  </p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Firearms, ammunition, and explosives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Firearm parts (barrels, triggers, magazines, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Imitation or replica weapons (toy guns, replica grenades, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Sharp weapons: swords, hunting knives, daggers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Police or military gear: handcuffs, batons, restraints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Fireworks, flares, firecrackers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Devices resembling weapons (e.g. cigarette lighters shaped like guns)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Category 3 */}
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="bg-red-50 border-b border-red-200 p-6">
                  <div className="flex items-center gap-3">
                    <Skull className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold text-red-900">3. Drugs, Controlled Substances & Pharmaceuticals</h2>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Narcotics, psychotropic substances, illicit drugs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Prescription medicines without valid prescription documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Unlicensed or unauthorized pharmaceuticals or medical compounds</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Category 4 */}
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="bg-red-50 border-b border-red-200 p-6">
                  <div className="flex items-center gap-3">
                    <Gem className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold text-red-900">4. Valuables, Currency & High-Risk Items</h2>
                  </div>
                  <p className="text-red-700 mt-2">
                    These carry high risk of theft or regulatory issues
                  </p>
                </div>
                <div className="p-6">
                  <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Currency notes, coins, traveler's cheques, bullion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Precious metals (gold, silver, platinum)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Precious stones, gemstones, diamonds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>High-value jewelry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Antiques, rare art pieces, museum-grade artifacts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Counterfeit, replica, or pirated goods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Pornographic or obscene material</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Magnetic or radioactive materials</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Category 5 */}
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="bg-red-50 border-b border-red-200 p-6">
                  <div className="flex items-center gap-3">
                    <Droplets className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold text-red-900">5. Perishables, Plants & Animal Products</h2>
                  </div>
                  <p className="text-red-700 mt-2">
                    These are often restricted due to biosecurity and spoilage risks
                  </p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Fresh fruits, vegetables, seeds, plants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Meat, fish, dairy products, eggs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Live animals, insects, or biological specimens</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Soil, sand, compost, or fertilizers requiring quarantine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Items requiring strict temperature control (unless prior approved)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Category 6 */}
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="bg-red-50 border-b border-red-200 p-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold text-red-900">6. Miscellaneous & Other Restrictions</h2>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Items requiring special licensing or approval under export control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Items that are illegal or prohibited in destination countries under local law</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Objects misdeclared or falsely labeled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Items violating import regulations not specifically listed above</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Disclaimer Section */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 mt-12">
              <h2 className="text-2xl font-bold text-red-900 mb-6">Important Disclaimers & Sender Responsibilities</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-red-800 mb-2">Not Exhaustive</h3>
                  <p className="text-red-700">
                    This list is illustrative. Destination country customs or Indian export authorities may deny items even if not listed here.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-red-800 mb-2">Compliance</h3>
                  <p className="text-red-700">
                    All shipments must meet both Indian and destination country regulations, plus IATA/airline safety rules.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-red-800 mb-2">Liability</h3>
                  <p className="text-red-700">
                    You are responsible for ensuring your parcel does not violate any laws or regulations. Costs arising from penalties, 
                    seizure, destruction, or return will be borne by the sender.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-red-800 mb-2">Inspection</h3>
                  <p className="text-red-700">
                    Shipments may be opened and inspected by customs or carriers.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-red-800 mb-2">Special Exceptions</h3>
                  <p className="text-red-700">
                    Some restricted items may be shipped under special permit or license. Contact us beforehand if you believe your item qualifies.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white rounded-lg border">
                <p className="text-center text-gray-700 font-semibold">
                  When in doubt, contact our support team before shipping!
                </p>
                <div className="flex justify-center mt-4">
                  <Link href="/contact" className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold">
                    Contact Support
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