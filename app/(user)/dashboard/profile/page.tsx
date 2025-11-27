'use client';

import { useState } from 'react';
import { User, Phone, Mail, Edit2, Shield, Bell, Package } from 'lucide-react';

interface UserProfile {
  uniqueId: string;
  referredCode: string;
  primaryMobile: string;
  primaryEmail: string;
  firstName: string;
  lastName: string;
  whatsappNumber: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  // User profile data - would come from backend
  const [userProfile, setUserProfile] = useState<UserProfile>({
    uniqueId: 'US833423',
    referredCode: 'US833423',
    primaryMobile: '988203864084',
    primaryEmail: 'bookend.forthong@gmail.com',
    firstName: 'Backend',
    lastName: '',
    whatsappNumber: ''
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);

  // Handle profile updates
  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: keyof PasswordData, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    try {
      // Prepare payload for backend
      const profilePayload = {
        profile: userProfile
      };

      console.log('Profile Update Payload:', profilePayload);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      alert('Profile updated successfully!');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  // Change password
  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters long!');
      return;
    }

    try {
      // Prepare payload for backend
      const passwordPayload = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      };

      console.log('Password Change Payload:', passwordPayload);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsChangingPassword(false);
      alert('Password changed successfully!');
      
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password. Please check your current password.');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - User Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Basic Info Card */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Account Information</h2>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{totalOrders}</div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Unique ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unique ID</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-300 rounded-lg">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">{userProfile.uniqueId}</span>
                </div>
              </div>

              {/* Referred Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Referred Code</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-300 rounded-lg">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">{userProfile.referredCode}</span>
                </div>
              </div>

              {/* Primary Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Mobile Number</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-300 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">{userProfile.primaryMobile}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  To change primary mobile number please contact support.
                </p>
              </div>

              {/* Primary Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Email</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-300 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">{userProfile.primaryEmail}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
              >
                <Edit2 className="h-4 w-4" />
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={userProfile.firstName}
                  onChange={(e) => handleProfileChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter First Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={userProfile.lastName}
                  onChange={(e) => handleProfileChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter Last Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              {/* WhatsApp Number */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number*
                </label>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-medium">
                      +91
                    </div>
                  </div>
                  <input
                    type="tel"
                    value={userProfile.whatsappNumber}
                    onChange={(e) => handleProfileChange('whatsappNumber', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter WhatsApp Number"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Change Password Card */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
              <button
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors"
              >
                <Shield className="h-4 w-4" />
                {isChangingPassword ? 'Cancel' : 'Change Password'}
              </button>
            </div>

            {isChangingPassword && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleChangePassword}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                <span className="text-sm font-medium">Order Updates</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                <span className="text-sm font-medium">Shipment Tracking</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm font-medium">Promotional Offers</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                <span className="text-sm font-medium">Account Alerts</span>
              </label>
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Login</span>
                <span className="text-sm font-medium">Today, 10:30 AM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Account Created</span>
                <span className="text-sm font-medium">Jan 15, 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">2FA Enabled</span>
                <span className="text-sm font-medium text-red-600">No</span>
              </div>
            </div>
          </div>

          {/* Support Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Need Help?</h3>
            <p className="text-sm opacity-90 mb-4">
              Contact our support team for any account-related issues.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91-900000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@my.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}