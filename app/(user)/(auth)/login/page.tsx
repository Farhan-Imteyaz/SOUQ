"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Icon } from "@/app/register/form";
const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormType = z.infer<typeof loginSchema>;

const fieldOrder: (keyof LoginFormType)[] = ["email", "password"];

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      const res = await axios.post("/api/user/login", data, {
        withCredentials: true,
      });

      console.log("Login Success:", res.data);

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login Error:", error);
    }
  };

  const onError = (errors: any) => {
    for (const field of fieldOrder) {
      const error = errors[field];
      if (error?.message) {
        toast.error(error.message, {
          className:
            "border !border-red-500/10 !bg-red-500/30 backdrop-blur-lg",
        });
      }
    }
  };

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

            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-5"
            >
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </Label>
                <div className="relative">
                  <Icon
                    icon={<Mail />}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                    error={errors.email ? true : false}
                  />
                  <Input
                    type="email"
                    {...register("email")}
                    required
                    className={`pl-10 ${
                      errors.email &&
                      "focus:border-red-500 focus:outline-red-500 border-red-200/60 bg-red-500/10 placeholder:text-red-700"
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    {...register("password")}
                    className={`pl-10 ${
                      errors.password &&
                      "focus:border-red-500 focus:outline-red-500 border-red-200/60 bg-red-500/10 placeholder:text-red-700"
                    }`}
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <Button className={"w-full h-11"}>Log in</Button>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Create account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
