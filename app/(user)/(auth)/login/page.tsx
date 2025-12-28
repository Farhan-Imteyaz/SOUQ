import Form from "./form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function Page() {
  
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
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
              <h2 className="text-3xl font-bold mb-2">
                Sign in to your account
              </h2>
            </div>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}
