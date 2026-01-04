import Link from "next/link";
import Logo from "../components/logo";
import Form from "./form";
export default async function Page() {
  return (
    <div className="min-h-screen flex relative items-center justify-center ">
      <div className="absolute top-5 left-14">
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <div className="container  mx-auto px-4 py-12">
        <div className="max-w-lg  mx-auto">
          {/* Right Side - Login Form */}
          <div className="bg-white border border-slate-200/70 rounded-2xl shadow-sm p-8 ">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-reddit font-semibold mb-2">
                Welcome to Souqza
              </h2>
            </div>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}
