"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/app/providers/authProvider";
const VirtualAddress = () => {
  const { user } = useAuth();
  const userName = user?.firstName || "User";
  const addressFields = [
    {
      name: "name",
      label: "Name",
      value: userName,
      container: "input" as const,
    },
    {
      name: "address1",
      label: "Address Line 1",
      value: "IndianShoppre Pvt Ltd, SG-7A0-473727, #218/190, Outer Ring Road",
      container: "textarea" as const,
    },
    {
      name: "address2",
      label: "Address Line 2",
      value: "Agara, Sector 1, H.S.R. Layout,",
      container: "input" as const,
    },
    {
      name: "landmark",
      label: "Landmark",
      value: "Near Hindustan Furnishing & Furniture",
      container: "textarea" as const,
    },
    {
      name: "city",
      label: "City",
      value: "Bengaluru",
      container: "input" as const,
    },
    {
      name: "state",
      label: "State / Province",
      value: "Karnataka",
      container: "input" as const,
    },
    {
      name: "pincode",
      label: "Pincode",
      value: "560102",
      container: "input" as const,
    },
    {
      name: "phone",
      label: "Delivery Phone Number",
      value: "9148357733",
      container: "input" as const,
    },
  ];

  return (
    <Card className="shadow-none border-slate-400/30!">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-reddit">
          Your Indian Virtual Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {addressFields.map((field) => (
          <FormField
            container={field.container}
            key={field.name}
            label={field.label}
            value={field.value}
          />
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Need Help?</Button>
      </CardFooter>
    </Card>
  );
};

export default VirtualAddress;

type FormFieldProps = {
  label: string;
  id?: string;
  value: string;
  container: "input" | "textarea";
};

function FormField({ label, id, value, container }: FormFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied to clipboard`);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };
  return (
    <div className="space-y-1">
      <Label htmlFor={inputId}>{label}</Label>
      <div className="relative mt-0.5">
        {container !== "input" ? (
          <Textarea
            readOnly
            id={inputId}
            value={value}
            className="pr-12 bg-slate-50 shadow-none resize-none"
          />
        ) : (
          <Input
            readOnly
            id={inputId}
            value={value}
            className="pr-12 shadow-none bg-slate-50"
          />
        )}
        <Button
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
          className="absolute p-1.5! hover:bg-slate-200/80! h-fit! bg-transparent shadow-none border-none right-3 top-1/2 -translate-y-1/2"
        >
          <Copy className="size-5" />
        </Button>
      </div>
    </div>
  );
}
