import { getResendClient } from "./resend";
import { emailTemplates, EmailType } from "@/emails";
import { ComponentProps } from "react";

type EmailProps<T extends EmailType> = ComponentProps<
  (typeof emailTemplates)[T]["component"]
>;

type SendEmailParams<T extends EmailType> = {
  to: string;
  type: T;
  props: EmailProps<T>;
};

export async function sendEmail<T extends EmailType>({
  to,
  type,
  props,
}: SendEmailParams<T>) {
  const { component: Component, subject } = emailTemplates[type];
  const resend = getResendClient();
  return resend.emails.send({
    from: "Souqza <no-reply@souqza.com>",
    to,
    subject,
    react: <Component {...(props as any)} />,
  });
}
