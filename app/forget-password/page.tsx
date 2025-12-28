"use client";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { Icon } from "../register/form";
const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});
type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;
const fieldOrder: (keyof ForgotPasswordFormType)[] = ["email"];
export default function ForgotPasswordPage() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data: ForgotPasswordFormType) => {
    try {
      const res = await axios.post("/api/user/auth/forget-password", data, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Email Sucessfully Sent", {
          className:
            "border !border-green-500/10 !bg-green-500/60 backdrop-blur-lg",
        });
      }
    } catch (error: any) {
      toast.error(error.response.data.error, {
        className: "border !border-red-500/10 !bg-red-500/60 backdrop-blur-sm",
      });
    }
  };

  const onError = (errors: any) => {
    for (const field of fieldOrder) {
      const error = errors[field];
      if (error?.message) {
        toast.error(error.message, {
          className:
            "border !border-red-500/10 !bg-red-500/60 backdrop-blur-lg",
        });
      }
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Check your email
            </h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to{" "}
              <span className="font-semibold">{""}</span>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Didn't receive the email? Check your spam folder or{" "}
              <button
                onClick={() => setEmailSent(false)}
                className="text-blue-600 hover:underline"
              >
                try again
              </button>
            </p>
            <Link href="/login">
              <Button className="w-full ">Back to Login</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-2">
                <Icon
                  icon={<Mail />}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  error={errors.email ? true : false}
                />
                <Input
                  type="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  className={`pl-10 ${
                    errors.email && "border-red-500 bg-red-500/10"
                  }`}
                />
              </div>
            </div>

            <Button isLoading={isSubmitting} className="w-full">
              Send Reset Link
            </Button>

            <div className="text-center w-full flex border rounded-md justify-center items-center h-9">
              <Link href="/login" className="text-sm text-black  w-full  ">
                Back to Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
