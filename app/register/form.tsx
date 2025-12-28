"use client";
import React from "react";
import { Mail, Lock, User, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
const countries = [
  { id: "US", label: "United States" },
  { id: "GB", label: "United Kingdom" },
  { id: "CA", label: "Canada" },
  { id: "AU", label: "Australia" },
  { id: "AE", label: "United Arab Emirates" },
  { id: "SG", label: "Singapore" },
  { id: "MY", label: "Malaysia" },
  { id: "NZ", label: "New Zealand" },
  { id: "other", label: "Other" },
];

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    country: z.string().min(1, "Please select a country"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormType = z.infer<typeof registerSchema>;
const fieldOrder: (keyof SignupFormType)[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "country",
  "password",
  "confirmPassword",
  "terms",
];

export const Form = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<SignupFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const watchedValues = useWatch({ control });

  const onSubmit = async (data: SignupFormType) => {
    const { confirmPassword, terms, ...payload } = data;
    try {
      const res = await axios.post("/api/user/register", payload);

      if (res.status === 201) {
        toast.success("Account created successfully!", {
          className:
            "border !border-green-500/10 !bg-green-500/60 backdrop-blur-lg",
        });
        router.push("/login");
      }
    } catch (error: any) {
      const message = error.response?.data?.error || "Something went wrong";

      toast.error(message, {
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
            "border !border-red-500/10 !bg-red-500/30 backdrop-blur-lg",
        });
      }
    }
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <Icon
              icon={<User />}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              error={errors.firstName ? true : false}
            />
            <Input
              id="firstName"
              {...register("firstName")}
              placeholder="John"
              className={`pl-10 ${
                errors.firstName &&
                "focus:border-red-500 focus:outline-red-500 border-red-200/60 bg-red-500/10 placeholder:text-red-700"
              }`}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <div className="relative">
            <Icon
              icon={<User />}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              error={errors.lastName ? true : false}
            />

            <Input
              id="lastName"
              {...register("lastName")}
              placeholder="Doe"
              className={`pl-10 ${
                errors.lastName &&
                "focus:border-red-500 focus:outline-red-500 border-red-200/60 bg-red-500/10 placeholder:text-red-700"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Icon
            icon={<Mail />}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            error={errors.email ? true : false}
          />

          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="john@example.com"
            className={`pl-10 ${
              errors.email &&
              "focus:border-red-500 focus:outline-red-500 border-red-200/60 bg-red-500/10 placeholder:text-red-700"
            }`}
          />
        </div>
      </div>

      {/* Phone + Country */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Icon
              icon={<Phone />}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              error={errors.phone ? true : false}
            />
            <Input
              id="phone"
              {...register("phone")}
              placeholder="+1 234 567 8900"
              className={`pl-10 ${
                errors.phone &&
                "focus:border-red-500 focus:outline-red-500 border-red-200/60 bg-red-500/10 placeholder:text-red-700"
              }`}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Select
            value={watchedValues.country}
            onValueChange={(value) => setValue("country", value)}
          >
            <SelectTrigger
              id="country"
              className={cn(
                "border rounded-md px-3 py-2",
                errors.country && !watchedValues.country
                  ? "border-red-500 bg-red-500/10 text-red-700"
                  : "border-gray-300 bg-transparent text-gray-700",
                "focus:outline-none focus:ring-1 focus:ring-primary"
              )}
            >
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Icon
            icon={<Lock />}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            error={errors.password ? true : false}
          />
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Create a strong password"
            className={`pl-10 ${
              errors.password &&
              "focus:border-red-500 focus:outline-red-500 border-red-200/60 bg-red-500/10 placeholder:text-red-700"
            }`}
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Icon
            icon={<Lock />}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            error={errors.confirmPassword ? true : false}
          />
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm password"
            className={`pl-10 ${
              errors.confirmPassword &&
              "focus:border-red-500 focus:outline-red-500 border-red-200/60 bg-red-500/10 placeholder:text-red-700"
            }`}
          />
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={watchedValues.terms}
          className={errors.terms ? "accent-red-700" : "accent-primary"}
          onCheckedChange={(checked) => setValue("terms", !!checked)}
        />
        <Label
          htmlFor="terms"
          className={`text-sm ${
            errors.terms && "text-red-700!"
          } font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
        >
          I agree to the Terms and Privacy Policy
        </Label>
      </div>

      <Button
        onClick={handleSubmit(onSubmit, onError)}
        isLoading={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>

      <p className="text-center text-gray-600">
        Already have an account?{" "}
        <Link
          href={"/login"}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Form;

interface IconProps {
  icon: React.ReactNode;
  className?: string;
  error?: boolean;
}

export const Icon: React.FC<IconProps> = ({ icon, className, error }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        error ? "text-red-700!" : "",
        className
      )}
    >
      {icon}
    </span>
  );
};
