'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Upload, FileText } from 'lucide-react';

interface InternationalShipmentItem {
  id: string;
  itemType: string;
  itemName: string;
  quantity: number;
  pricePerItem: number;
  totalPrice: number;
}

interface InternationalShipmentPayload {
  orderType: string;
  courierType: string;
  clientOrderId: string;
  // Personal Details
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  medicalItems: boolean;
  // Indian Pick Up Address
  pickupFirstName: string;
  pickupLastName: string;
  pickupEmail: string;
  pickupCountry: string;
  pickupState: string;
  pickupCity: string;
  pickupStreetAddress1: string;
  pickupStreetAddress2: string;
  pickupPincode: string;
  pickupMobile: string;
  // Documents
  documents: File[];
  // Package Information
  noOfBoxes: number;
  weight: number;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  // Items
  items: InternationalShipmentItem[];
  // Destination Address
  destinationFirstName: string;
  destinationLastName: string;
  destinationMobileNumber: string;
  destinationCountry: string;
  destinationState: string;
  destinationCity: string;
  destinationStreetAddress1: string;
  destinationStreetAddress2: string;
  destinationPincode: string;
  // Remarks
  remarks: string;
  // Totals
  totalInvoiceValue: number;
}

export default function InternationalShipmentPage() {
  const [formData, setFormData] = useState<Omit<InternationalShipmentPayload, 'totalInvoiceValue' | 'items'>>({
    orderType: '',
    courierType: '',
    clientOrderId: '',
    // Personal Details
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    medicalItems: false,
    // Indian Pick Up Address
    pickupFirstName: '',
    pickupLastName: '',
    pickupEmail: '',
    pickupCountry: 'India',
    pickupState: '',
    pickupCity: '',
    pickupStreetAddress1: '',
    pickupStreetAddress2: '',
    pickupPincode: '',
    pickupMobile: '',
    // Documents
    documents: [],
    // Package Information
    noOfBoxes: 1,
    weight: 0.5,
    dimensions: {
      height: 1,
      width: 1,
      depth: 1
    },
    // Destination Address
    destinationFirstName: '',
    destinationLastName: '',
    destinationMobileNumber: '',
    destinationCountry: '',
    destinationState: '',
    destinationCity: '',
    destinationStreetAddress1: '',
    destinationStreetAddress2: '',
    destinationPincode: '',
    // Remarks
    remarks: ''
  });

  const [items, setItems] = useState<InternationalShipmentItem[]>([
    {
      id: '1',
      itemType: '',
      itemName: '',
      quantity: 1,
      pricePerItem: 0,
      totalPrice: 0
    }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate totals
  const totalInvoiceValue = items.reduce((total, item) => total + item.totalPrice, 0);

  // Update item and calculate total price
  const updateItem = (id: string, field: keyof InternationalShipmentItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Recalculate total price when quantity or pricePerItem changes
        if (field === 'quantity' || field === 'pricePerItem') {
          updatedItem.totalPrice = updatedItem.quantity * updatedItem.pricePerItem;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const addItem = () => {
    const newItem: InternationalShipmentItem = {
      id: Date.now().toString(),
      itemType: '',
      itemName: '',
      quantity: 1,
      pricePerItem: 0,
      totalPrice: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const file = selectedFiles[0];
    
    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB');
      return;
    }

    const newDocuments = [...formData.documents];
    newDocuments[index] = file;
    setFormData({ ...formData, documents: newDocuments });
  };

  const removeFile = (index: number) => {
    const newDocuments = [...formData.documents];
    newDocuments.splice(index, 1);
    setFormData({ ...formData, documents: newDocuments });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload: InternationalShipmentPayload = {
        ...formData,
        items,
        totalInvoiceValue
      };

      console.log('International Shipment Payload:', payload);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('International shipment created successfully!');
      
    } catch (error) {
      console.error('Error creating shipment:', error);
      alert('Failed to create shipment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const updateDimension = (dimension: 'height' | 'width' | 'depth', value: number) => {
    setFormData({
      ...formData,
      dimensions: {
        ...formData.dimensions,
        [dimension]: Math.max(1, value)
      }
    });
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">International Shipment</h1>
        <p className="text-gray-600">Create a new international shipment order</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Order Type & Courier Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Shipment Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order Type*</label>
              <select
                required
                value={formData.orderType}
                onChange={(e) => updateFormField('orderType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Please select order type</option>
                <option value="document">Document</option>
                <option value="parcel">Parcel</option>
                <option value="commercial">Commercial Goods</option>
                <option value="personal">Personal Effects</option>
              </select>
            </div>

            {/* Courier Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Courier Type* <span className="text-blue-600 text-sm">(click here for shipping rates)</span>
              </label>
              <select
                required
                value={formData.courierType}
                onChange={(e) => updateFormField('courierType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Courier Type</option>
                <option value="dhl">DHL Express</option>
                <option value="fedex">FedEx</option>
                <option value="ups">UPS</option>
                <option value="ems">EMS</option>
                <option value="standard">Standard International</option>
              </select>
            </div>

            {/* Client Order ID */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Order ID:</label>
              <input
                type="text"
                value={formData.clientOrderId}
                onChange={(e) => updateFormField('clientOrderId', e.target.value)}
                placeholder="Enter Reference Order ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name*:</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => updateFormField('firstName', e.target.value)}
                placeholder="Enter First Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name*:</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => updateFormField('lastName', e.target.value)}
                placeholder="Enter Last Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number*:</label>
              <div className="flex">
                <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                  <span className="text-gray-600">+91</span>
                </div>
                <input
                  type="tel"
                  required
                  value={formData.mobileNumber}
                  onChange={(e) => updateFormField('mobileNumber', e.target.value)}
                  placeholder="Mobile Number"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email*:</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => updateFormField('email', e.target.value)}
                placeholder="Enter Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.medicalItems}
                  onChange={(e) => updateFormField('medicalItems', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Medical Items</span>
              </label>
            </div>
          </div>
        </div>

        {/* Indian Pick Up Address */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Indian Pick Up Address</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name*:</label>
              <input
                type="text"
                required
                value={formData.pickupFirstName}
                onChange={(e) => updateFormField('pickupFirstName', e.target.value)}
                placeholder="First Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name*:</label>
              <input
                type="text"
                required
                value={formData.pickupLastName}
                onChange={(e) => updateFormField('pickupLastName', e.target.value)}
                placeholder="Last Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email*:</label>
              <input
                type="email"
                required
                value={formData.pickupEmail}
                onChange={(e) => updateFormField('pickupEmail', e.target.value)}
                placeholder="Enter Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country*:</label>
              <input
                type="text"
                disabled
                value={formData.pickupCountry}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State:</label>
              <input
                type="text"
                value={formData.pickupState}
                onChange={(e) => updateFormField('pickupState', e.target.value)}
                placeholder="Enter State"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City*:</label>
              <input
                type="text"
                required
                value={formData.pickupCity}
                onChange={(e) => updateFormField('pickupCity', e.target.value)}
                placeholder="Enter City"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address 1*:</label>
              <input
                type="text"
                required
                value={formData.pickupStreetAddress1}
                onChange={(e) => updateFormField('pickupStreetAddress1', e.target.value)}
                placeholder="Enter Street Address 1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address 2:</label>
              <input
                type="text"
                value={formData.pickupStreetAddress2}
                onChange={(e) => updateFormField('pickupStreetAddress2', e.target.value)}
                placeholder="Enter Street Address 2 (Optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pin code*:</label>
              <input
                type="text"
                required
                value={formData.pickupPincode}
                onChange={(e) => updateFormField('pickupPincode', e.target.value)}
                placeholder="Enter Pin code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile*:</label>
              <div className="flex">
                <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                  <span className="text-gray-600">+91</span>
                </div>
                <input
                  type="tel"
                  required
                  value={formData.pickupMobile}
                  onChange={(e) => updateFormField('pickupMobile', e.target.value)}
                  placeholder="Mobile Number"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Document*: {index === 1 ? '1st ID' : '2nd ID'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, index - 1)}
                    className="hidden"
                    id={`document-${index}`}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <label htmlFor={`document-${index}`} className="cursor-pointer block">
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-600">
                        {formData.documents[index - 1] ? formData.documents[index - 1].name : 'No file chosen'}
                      </span>
                    </div>
                  </label>
                  {formData.documents[index - 1] && (
                    <button
                      type="button"
                      onClick={() => removeFile(index - 1)}
                      className="mt-2 text-red-600 text-sm hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {index === 1 ? "Indian Govt. Id's 1" : "Indian Govt. Id's 2"} and it must be less than 2MB
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Package Information */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Package Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">No of Boxes*:</label>
              <input
                type="number"
                required
                min="1"
                value={formData.noOfBoxes}
                onChange={(e) => updateFormField('noOfBoxes', parseInt(e.target.value) || 1)}
                placeholder="Enter No of Boxes"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight of Package*:</label>
              <input
                type="number"
                required
                min="0.1"
                step="0.1"
                value={formData.weight}
                onChange={(e) => updateFormField('weight', parseFloat(e.target.value) || 0.5)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">In KG</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dimension of package (Optional):</label>
              <div className="space-y-2">
                {(['height', 'width', 'depth'] as const).map((dimension) => (
                  <div key={dimension} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 capitalize w-16">{dimension}(in CM):</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        type="button"
                        onClick={() => updateDimension(dimension, formData.dimensions[dimension] - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 min-w-12 text-center">{formData.dimensions[dimension]}</span>
                      <button
                        type="button"
                        onClick={() => updateDimension(dimension, formData.dimensions[dimension] + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Item Details</h2>
          
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Type*:</label>
                    <select
                      required
                      value={item.itemType}
                      onChange={(e) => updateItem(item.id, 'itemType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select item type</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="books">Books</option>
                      <option value="home">Home & Kitchen</option>
                      <option value="beauty">Beauty</option>
                      <option value="sports">Sports</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Name*</label>
                    <input
                      type="text"
                      required
                      value={item.itemName}
                      onChange={(e) => updateItem(item.id, 'itemName', e.target.value)}
                      placeholder="Enter item name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity*:</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      placeholder="Quantity"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (Per Item in INR)*:</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={item.pricePerItem}
                      onChange={(e) => updateItem(item.id, 'pricePerItem', parseFloat(e.target.value) || 0)}
                      placeholder="Price"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2 lg:col-span-4">
                    <div className="bg-white border border-gray-300 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Price*:</label>
                      <div className="text-xl font-bold text-gray-900">
                        ₹ {item.totalPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-6 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            <Plus className="h-5 w-5" />
            Add More Items
          </button>

          {/* Total Invoice Value */}
          <div className="mt-6 bg-white border border-gray-300 rounded-lg p-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total Invoice Value</span>
              <span className="text-2xl font-bold text-blue-600">₹ {totalInvoiceValue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Destination Address */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Destination Address</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name*:</label>
              <input
                type="text"
                required
                value={formData.destinationFirstName}
                onChange={(e) => updateFormField('destinationFirstName', e.target.value)}
                placeholder="First Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name*:</label>
              <input
                type="text"
                required
                value={formData.destinationLastName}
                onChange={(e) => updateFormField('destinationLastName', e.target.value)}
                placeholder="Last Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number*:</label>
              <div className="flex">
                <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                  <span className="text-gray-600">+</span>
                </div>
                <input
                  type="tel"
                  required
                  value={formData.destinationMobileNumber}
                  onChange={(e) => updateFormField('destinationMobileNumber', e.target.value)}
                  placeholder="Mobile Number"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country*:</label>
              <select
                required
                value={formData.destinationCountry}
                onChange={(e) => updateFormField('destinationCountry', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="AE">United Arab Emirates</option>
                <option value="SG">Singapore</option>
                <option value="MY">Malaysia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State:</label>
              <input
                type="text"
                value={formData.destinationState}
                onChange={(e) => updateFormField('destinationState', e.target.value)}
                placeholder="Enter State"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City*:</label>
              <input
                type="text"
                required
                value={formData.destinationCity}
                onChange={(e) => updateFormField('destinationCity', e.target.value)}
                placeholder="Enter City"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address 1*:</label>
              <input
                type="text"
                required
                value={formData.destinationStreetAddress1}
                onChange={(e) => updateFormField('destinationStreetAddress1', e.target.value)}
                placeholder="Enter Street Address 1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address 2:</label>
              <input
                type="text"
                value={formData.destinationStreetAddress2}
                onChange={(e) => updateFormField('destinationStreetAddress2', e.target.value)}
                placeholder="Enter Street Address 2"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pin code*:</label>
              <input
                type="text"
                required
                value={formData.destinationPincode}
                onChange={(e) => updateFormField('destinationPincode', e.target.value)}
                placeholder="Enter Pin code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Remarks */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Remarks</h2>
          <textarea
            value={formData.remarks}
            onChange={(e) => updateFormField('remarks', e.target.value)}
            placeholder="Remarks"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}