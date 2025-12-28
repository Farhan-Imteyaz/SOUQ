import { Form } from "./form";
import Image from "next/image";

export default async function RegisterPage() {
  return (
    <div className="grid grid-cols-1 bg-slate-100 lg:grid-cols-2 gap-5">
      {/* Left Side - Benefits */}
      <div className="hidden md:block  min-h-screen p-2 rounded-xl  h-full">
        <div className="w-full h-full relative overflow-hidden rounded-xl">
          <Image
            fill
            src={
              "https://images.unsplash.com/photo-1573376670774-4427757f7963?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={"blurry background"}
            className="rounded-xl object-cover"
          />
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="container flex  flex-col items-center justify-center ">
        <div className="text-center max-w-lg mb-8">
          <h2 className="text-3xl tracking-tighter font-semibold mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600">
            Start your international shopping journey
          </p>
        </div>
        <Form />
      </div>
    </div>
  );
}
