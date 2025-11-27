'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Upload, FileText } from 'lucide-react';

// Types for our order data
interface OrderItem {
  id: string;
  itemType: string;
  itemName: string;
  onlineStore: string;
  onlineStoreOrderId: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

interface CreateOrderPayload {
  items: OrderItem[];
  remarks: string;
  files: File[];
  grandTotal: number;
}

export default function CreateOrderPage() {
  // State for form data
  const [items, setItems] = useState<OrderItem[]>([
    {
      id: '1',
      itemType: '',
      itemName: '',
      onlineStore: '',
      onlineStoreOrderId: '',
      color: '',
      size: '',
      quantity: 1,
      price: 0
    }
  ]);

  const [remarks, setRemarks] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate grand total
  const grandTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Add new item row
  const addItem = () => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      itemType: '',
      itemName: '',
      onlineStore: '',
      onlineStoreOrderId: '',
      color: '',
      size: '',
      quantity: 1,
      price: 0
    };
    setItems([...items, newItem]);
  };

  // Remove item row
  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // Update item field
  const updateItem = (id: string, field: keyof OrderItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    
    // Validate file count
    if (files.length + newFiles.length > 10) {
      alert('Maximum 10 files allowed');
      return;
    }

    // Validate file size (10MB total)
    const totalSize = [...files, ...newFiles].reduce((total, file) => total + file.size, 0);
    if (totalSize > 10 * 1024 * 1024) {
      alert('Total file size exceeds 10MB');
      return;
    }

    setFiles([...files, ...newFiles]);
  };

  // Remove file
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare payload for backend
      const payload: CreateOrderPayload = {
        items,
        remarks,
        files,
        grandTotal
      };

      console.log('Order Payload:', payload); // For debugging

      // Here you would send the payload to your backend
      // Example:
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Order created successfully!');
      
      // Reset form
      setItems([{
        id: '1',
        itemType: '',
        itemName: '',
        onlineStore: '',
        onlineStoreOrderId: '',
        color: '',
        size: '',
        quantity: 1,
        price: 0
      }]);
      setRemarks('');
      setFiles([]);
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Order</h1>
        <p className="text-gray-600">Add items from your favorite Indian stores</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Add Order Items Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add Order Item</h2>
          
          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Item Type*</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Item Name*</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Online Store*</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Order ID*</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Color</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Size</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Quantity*</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Price (NR)*</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <select
                        required
                        value={item.itemType}
                        onChange={(e) => updateItem(item.id, 'itemType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select type...</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="books">Books</option>
                        <option value="home">Home & Kitchen</option>
                        <option value="beauty">Beauty</option>
                        <option value="sports">Sports</option>
                        <option value="other">Other</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        required
                        value={item.itemName}
                        onChange={(e) => updateItem(item.id, 'itemName', e.target.value)}
                        placeholder="Enter item name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        required
                        value={item.onlineStore}
                        onChange={(e) => updateItem(item.id, 'onlineStore', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select store...</option>
                        <option value="amazon">Amazon</option>
                        <option value="flipkart">Flipkart</option>
                        <option value="myntra">Myntra</option>
                        <option value="nykaa">Nykaa</option>
                        <option value="ajio">Ajio</option>
                        <option value="firstcry">FirstCry</option>
                        <option value="other">Other</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        required
                        value={item.onlineStoreOrderId}
                        onChange={(e) => updateItem(item.id, 'onlineStoreOrderId', e.target.value)}
                        placeholder="Order ID"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.color}
                        onChange={(e) => updateItem(item.id, 'color', e.target.value)}
                        placeholder="Color"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.size}
                        onChange={(e) => updateItem(item.id, 'size', e.target.value)}
                        placeholder="Size"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        required
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Item Button */}
          <button
            type="button"
            onClick={addItem}
            className="mt-4 flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
          >
            <Plus className="h-4 w-4" />
            Add Another Item
          </button>
        </div>

        {/* Add Remark Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add Remark</h2>
          
          <div className="space-y-4">
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add any additional remarks or instructions..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attach Files (Optional)
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Click to browse files</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Total 10 files and 10 MB of size allowed
                  </p>
                </label>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024).toFixed(2)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grand Total and Actions */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-right sm:text-left">
              <div className="text-2xl font-bold text-gray-900">
                Grand Total: ₹ {grandTotal.toFixed(2)}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {items.length} item{items.length !== 1 ? 's' : ''} in order
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-center font-semibold transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || items.some(item => !item.itemType || !item.itemName || !item.onlineStore || !item.onlineStoreOrderId || !item.quantity || !item.price)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                {isSubmitting ? 'Creating Order...' : 'Create Order'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}