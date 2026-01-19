"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Icon } from "@/app/register/form";
import { useState } from "react";
import { useAuth } from "../providers/authProvider";
const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormType = z.infer<typeof loginSchema>;

const fieldOrder: (keyof LoginFormType)[] = ["email", "password"];
const Form = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [status, setStatus] = useState("");
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
      await login(data);

      toast.success("Login Successful");

      router.push("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Invalid email or password");
    }
  };

  const onError = (errors: any) => {
    for (const field of fieldOrder) {
      const error = errors[field];
      if (error?.message) {
        toast.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
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
          <Icon
            icon={<Lock />}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            error={errors.email ? true : false}
          />
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
        <div className="text-right text-sm mt-2 text-blue-500">
          <Link href={"/forget-password"}>Forgot Password?</Link>
        </div>
      </div>

      <Button
        isLoading={isSubmitting}
        variant={status === "error" ? "destructive" : "default"}
        className={`w-full h-11 text-lg`}
        onClick={handleSubmit(onSubmit, onError)}
      >
        Log in
      </Button>

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
  );
};

export default Form;
