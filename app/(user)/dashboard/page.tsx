'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Edit2, Wallet, Package, Truck, CheckCircle, ShoppingCart, ShoppingBag, Plane, Plus } from 'lucide-react';

export default function DashboardPage() {
  // This data would come from your backend/API
  const [userData, setUserData] = useState({
    name: 'Rehan',
    userId: 'U8232423', // Unique ID for every user
    email: 'rehan@example.com',
    walletBalance: 0,
    phone: '+88302883684'
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userData.name);
  const [copied, setCopied] = useState(false);

  // Service statistics - would come from backend
  const [serviceStats, setServiceStats] = useState({
    shopNShip: {
      totalOrders: 0,
      currentOrders: 0,
      inProgress: 0,
      inShipment: 0,
      completedRejected: 0
    },
    assistedPurchase: {
      totalOrders: 0,
      currentOrders: 0,
      inProgress: 0,
      inShipment: 0,
      completedRejected: 0
    },
    internationalShipment: {
      totalOrders: 0,
      currentOrders: 0,
      inProgress: 0,
      inShipment: 0,
      completedRejected: 0
    }
  });

  // Virtual address using user's name
  const virtualAddress = {
    name: userData.name,
    userId: userData.userId,
    addressLine1: `IndianParcelForward Pvt Ltd, ${userData.userId}`,
    addressLine2: '#218/190, Outer Ring Road',
    landmark: 'Agra, Sector 1, H.S.R. Layout',
    nearBy: 'Near Hindustan Furnishing & Furniture',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560102',
    country: 'India',
    phone: '+91 98765 43210'
  };

  const handleCopyAddress = () => {
    const fullAddress = `${virtualAddress.name} (${virtualAddress.userId})
${virtualAddress.addressLine1}
${virtualAddress.addressLine2}
${virtualAddress.landmark}
${virtualAddress.nearBy}
${virtualAddress.city}, ${virtualAddress.state} - ${virtualAddress.pincode}
${virtualAddress.country}
Phone: ${virtualAddress.phone}`;
    
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveName = () => {
    // Here you would make an API call to update the name
    setUserData({ ...userData, name: tempName });
    setIsEditingName(false);
  };

  return (
    <div className="p-6">
      {/* Header with Unique ID */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome, {userData.name}</h1>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                Unique ID: {userData.userId}
              </div>
              <div className="text-gray-600">{userData.phone}</div>
              <div className="text-gray-600">{userData.email}</div>
            </div>
          </div>
        </div>

        {/* Right Column - Virtual Address */}
        <div className="lg:col-span-1">
          <div className="bg-linear-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            {/* "Use it" Badge */}
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold transform rotate-12 shadow-lg">
              USE IT
            </div>

            <h2 className="text-2xl font-bold mb-4">Your Indian Virtual Address</h2>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              {/* Name Field with Edit */}
              <div className="mb-3">
                <label className="block text-sm font-semibold mb-2 opacity-90">Name</label>
                {isEditingName ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                      placeholder="Enter your name"
                    />
                    <button
                      onClick={handleSaveName}
                      className="px-3 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setTempName(userData.name);
                      }}
                      className="px-3 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg font-semibold transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-lg">
                    <span className="font-semibold">{userData.name}</span>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="flex items-center gap-1 px-2 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-xs"
                    >
                      <Edit2 className="h-3 w-3" />
                      Edit
                    </button>
                  </div>
                )}
              </div>

              {/* Address Fields */}
              <div className="space-y-2 text-sm">
                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-75">Address Line 1</label>
                  <div className="bg-white/10 px-3 py-2 rounded-lg">
                    <span className="font-medium">{virtualAddress.addressLine1}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-75">Address Line 2</label>
                  <div className="bg-white/10 px-3 py-2 rounded-lg">
                    <span className="font-medium">{virtualAddress.addressLine2}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-75">Landmark</label>
                  <div className="bg-white/10 px-3 py-2 rounded-lg">
                    <span className="font-medium">{virtualAddress.landmark}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-75">City</label>
                    <div className="bg-white/10 px-3 py-2 rounded-lg">
                      <span className="font-medium">{virtualAddress.city}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-75">State</label>
                    <div className="bg-white/10 px-3 py-2 rounded-lg">
                      <span className="font-medium">{virtualAddress.state}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-75">Postal Code</label>
                    <div className="bg-white/10 px-3 py-2 rounded-lg">
                      <span className="font-medium">{virtualAddress.pincode}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-75">Country</label>
                    <div className="bg-white/10 px-3 py-2 rounded-lg">
                      <span className="font-medium">{virtualAddress.country}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-75">Phone</label>
                  <div className="bg-white/10 px-3 py-2 rounded-lg">
                    <span className="font-medium">{virtualAddress.phone}</span>
                  </div>
                </div>
              </div>

              {/* Copy Address Button */}
              <button
                onClick={handleCopyAddress}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl font-bold text-sm shadow-lg transition-all transform hover:scale-105"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Address Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Full Address
                  </>
                )}
              </button>

              <p className="text-xs opacity-90 mt-3 text-center">
                💡 Use this address when shopping on Indian e-commerce sites
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border p-6">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Orders</span>
                <span className="font-semibold">
                  {serviceStats.shopNShip.totalOrders + serviceStats.assistedPurchase.totalOrders + serviceStats.internationalShipment.totalOrders}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Shipments</span>
                <span className="font-semibold">
                  {serviceStats.shopNShip.inShipment + serviceStats.assistedPurchase.inShipment + serviceStats.internationalShipment.inShipment}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Wallet Balance</span>
                <span className="font-semibold">₹ {userData.walletBalance}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Service Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shop n Ship Card */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="bg-linear-to-r from-blue-500 to-blue-600 h-2"></div>
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Shop n Ship</h3>
                    <p className="text-gray-600">Package forwarding from Indian stores</p>
                  </div>
                </div>
                <Link
                  href="/dashboard/shop-n-ship/create-order"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Create Order
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{serviceStats.shopNShip.currentOrders}</div>
                  <div className="text-sm text-gray-600">Current Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{serviceStats.shopNShip.inProgress}</div>
                  <div className="text-sm text-gray-600">Order in Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{serviceStats.shopNShip.inShipment}</div>
                  <div className="text-sm text-gray-600">Orders in Shipment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{serviceStats.shopNShip.completedRejected}</div>
                  <div className="text-sm text-gray-600">Completed/Rejected</div>
                </div>
              </div>
            </div>
          </div>

          {/* Assisted Purchase Card */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="bg-linear-to-r from-green-500 to-green-600 h-2"></div>
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Assisted Purchase</h3>
                    <p className="text-gray-600">We shop from Indian stores for you</p>
                  </div>
                </div>
                <Link
                  href="/dashboard/assisted-purchase/create-order"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Create Order
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{serviceStats.assistedPurchase.currentOrders}</div>
                  <div className="text-sm text-gray-600">Current Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{serviceStats.assistedPurchase.inProgress}</div>
                  <div className="text-sm text-gray-600">Order in Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{serviceStats.assistedPurchase.inShipment}</div>
                  <div className="text-sm text-gray-600">Orders in Shipment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{serviceStats.assistedPurchase.completedRejected}</div>
                  <div className="text-sm text-gray-600">Completed/Rejected</div>
                </div>
              </div>
            </div>
          </div>

          {/* International Shipment Card */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="bg-linear-to-r from-purple-500 to-purple-600 h-2"></div>
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Plane className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">International Shipment</h3>
                    <p className="text-gray-600">Ship packages worldwide</p>
                  </div>
                </div>
                <Link
                  href="/dashboard/international-shipment/create-order"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Create Order
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{serviceStats.internationalShipment.currentOrders}</div>
                  <div className="text-sm text-gray-600">Current Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{serviceStats.internationalShipment.inProgress}</div>
                  <div className="text-sm text-gray-600">Order in Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{serviceStats.internationalShipment.inShipment}</div>
                  <div className="text-sm text-gray-600">Orders in Shipment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{serviceStats.internationalShipment.completedRejected}</div>
                  <div className="text-sm text-gray-600">Completed/Rejected</div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-600 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/support" className="hover:text-blue-600">Support</Link>
          <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-blue-600">Terms & Conditions</Link>
        </div>
        <p>© 2024 – MyXBorder®</p>
      </div>
    </div>
  );
}