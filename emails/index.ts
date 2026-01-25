import ResetPasswordEmail from "./templates/reset-password";
import SignupSuccessEmail from "./templates/signup-success";
import ResetPasswordSuccessEmail from "./templates/reset-password-success";
import CreateOrderEmail from "./templates/create-order";
export const emailTemplates = {
  resetPassword: {
    subject: "Reset your password",
    component: ResetPasswordEmail,
  },
  signupSuccess: {
    subject: "Welcome to Souqza",
    component: SignupSuccessEmail,
  },
  resetPasswordSuccess: {
    subject: "Password Reset Successful",
    component: ResetPasswordSuccessEmail,
  },
  createOrder: {
    subject: "New Order Created",
    component: CreateOrderEmail,
  },
} as const;

export type EmailType = keyof typeof emailTemplates;
