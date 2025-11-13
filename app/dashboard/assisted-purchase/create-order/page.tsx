'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';

interface AssistedPurchaseItem {
  id: string;
  itemUrl: string;
  localStoreName: string;
  size: string;
  color: string;
  itemType: string;
  quantity: number;
  itemName: string;
  singleItemPrice: number;
}

interface AssistedPurchasePayload {
  items: AssistedPurchaseItem[];
  remarks: string;
  grandTotal: number;
}

export default function AssistedPurchasePage() {
  const [items, setItems] = useState<AssistedPurchaseItem[]>([
    {
      id: '1',
      itemUrl: '',
      localStoreName: '',
      size: '',
      color: '',
      itemType: '',
      quantity: 1,
      itemName: '',
      singleItemPrice: 0
    }
  ]);

  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate totals
  const grandTotal = items.reduce((total, item) => total + (item.singleItemPrice * item.quantity), 0);

  const addItem = () => {
    const newItem: AssistedPurchaseItem = {
      id: Date.now().toString(),
      itemUrl: '',
      localStoreName: '',
      size: '',
      color: '',
      itemType: '',
      quantity: 1,
      itemName: '',
      singleItemPrice: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof AssistedPurchaseItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload: AssistedPurchasePayload = {
        items,
        remarks,
        grandTotal
      };

      console.log('Assisted Purchase Payload:', payload);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Assisted Purchase order created successfully!');
      
      // Reset form
      setItems([{
        id: '1',
        itemUrl: '',
        localStoreName: '',
        size: '',
        color: '',
        itemType: '',
        quantity: 1,
        itemName: '',
        singleItemPrice: 0
      }]);
      setRemarks('');
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assisted Purchase</h1>
        <p className="text-gray-600">We'll purchase items on your behalf from Indian stores</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Add Order Items Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add Order Item</h2>
          <p className="text-gray-600 mb-6">Which are these details 😊</p>
          
          {/* Items List */}
          <div className="space-y-6">
            {items.map((item, index) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-900">Item {index + 1}</h3>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Item URL / Local Store Name */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item URL* / Local Store Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={item.itemUrl || item.localStoreName}
                      onChange={(e) => {
                        // You can decide which field to update based on input
                        if (e.target.value.includes('http')) {
                          updateItem(item.id, 'itemUrl', e.target.value);
                          updateItem(item.id, 'localStoreName', '');
                        } else {
                          updateItem(item.id, 'localStoreName', e.target.value);
                          updateItem(item.id, 'itemUrl', '');
                        }
                      }}
                      placeholder="Enter Item URL / Local Store Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Size and Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <input
                      type="text"
                      value={item.size}
                      onChange={(e) => updateItem(item.id, 'size', e.target.value)}
                      placeholder="Enter Size"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <input
                      type="text"
                      value={item.color}
                      onChange={(e) => updateItem(item.id, 'color', e.target.value)}
                      placeholder="Enter Color"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Item Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Type*</label>
                    <select
                      required
                      value={item.itemType}
                      onChange={(e) => updateItem(item.id, 'itemType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Please select item type</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="books">Books</option>
                      <option value="home">Home & Kitchen</option>
                      <option value="beauty">Beauty</option>
                      <option value="sports">Sports</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity*</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      placeholder="Enter Quantity"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Item Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Name*</label>
                    <input
                      type="text"
                      required
                      value={item.itemName}
                      onChange={(e) => updateItem(item.id, 'itemName', e.target.value)}
                      placeholder="Enter Item name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Single Item Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Single Item Price (NR)*</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={item.singleItemPrice}
                      onChange={(e) => updateItem(item.id, 'singleItemPrice', parseFloat(e.target.value) || 0)}
                      placeholder="Enter Item Price"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Total Price for this item */}
                  <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-300 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Price*</label>
                      <div className="text-2xl font-bold text-gray-900">
                        ₹ {(item.singleItemPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add More Item Button */}
          <button
            type="button"
            onClick={addItem}
            className="mt-6 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            <Plus className="h-5 w-5" />
            Add More Item
          </button>
        </div>

        {/* Add Remark Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add Remark</h2>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Add any additional remarks or special instructions..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        {/* Grand Total and Actions */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-gray-900">
                Grand Total: ₹ {grandTotal.toFixed(2)}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {items.length} item{items.length !== 1 ? 's' : ''} • Assisted Purchase Service
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-center font-semibold transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || items.some(item => 
                  (!item.itemUrl && !item.localStoreName) || 
                  !item.itemType || 
                  !item.quantity || 
                  !item.itemName || 
                  !item.singleItemPrice
                )}
                className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg transition-colors"
              >
                {isSubmitting ? 'Processing...' : 'NEXT'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}