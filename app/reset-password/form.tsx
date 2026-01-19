"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Icon } from "@/app/register/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Lock } from "lucide-react";
const formSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type FormType = z.infer<typeof formSchema>;
const fieldOrder: (keyof FormType)[] = ["password", "confirmPassword"];
const Form = ({ token }: { token: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: FormType) => {
    try {
      const res = await axios.post("/api/user/auth/reset-password", {
        token,
        password: data.password,
      });
      if (res.status === 200) {
        toast.success("Password reset successfully. You can now log in.");
      }
    } catch (error: any) {
      const message = error.response?.data?.error || "Something went wrong";
      toast.error(message);
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
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">New Password</label>
        <div className="relative">
          <Icon
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            error={errors.password ? true : false}
            icon={<Lock />}
          />
          <Input
            type="password"
            {...register("password")}
            placeholder="*******"
            className={`pl-10 ${
              errors.password &&
              "focus:border-red-500 focus:outline-red-500 border-red-200/60 bg-red-500/10 placeholder:text-red-700"
            }`}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <Icon
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            error={errors.confirmPassword ? true : false}
            icon={<Lock />}
          />
          <Input
            type="password"
            placeholder="*******"
            className={`pl-10 ${
              errors.confirmPassword &&
              "focus:border-red-500 focus:outline-red-500 border-red-200/60 bg-red-500/10 placeholder:text-red-700"
            }`}
            {...register("confirmPassword")}
          />
        </div>
      </div>

      <Button isLoading={isSubmitting} className="w-full">
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
};

export default Form;
