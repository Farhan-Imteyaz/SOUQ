'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, Mail, Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner'; // ✅ Import toast

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ✅ Use await so we wait for response
      const res = await axios.post('/api/user/login', formData, { withCredentials: true });

      console.log("Login Success:", res.data);

      toast.success("Logged in successfully 🎉"); // ✅ Success toast

      setIsLoading(false);

      router.push('/dashboard');

    } catch (error: any) {
      console.error("Login Error:", error);

      toast.error(
        error?.response?.data?.message || "Something went wrong"
      ); // ✅ Error toast

      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">ParcelForward</span>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">New to ParcelForward?</span>
            <Link href="/register" className="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <div className="hidden md:block">
            <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Access your packages, shipping history, and Indian virtual address
            </p>
            {/* ... your benefit items ... */}
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2"></h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {/* ✅ TEST TOAST BUTTON (Optional) */}
            <button
              type="button"
              onClick={() => toast.success("Toast is working ✅")}
              className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Test Toast
            </button>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  'Sign In to Dashboard'
                )}
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600">
                Don't have an account?{' '}
                <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                  Create account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
