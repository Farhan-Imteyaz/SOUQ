import Link from "next/link";
import Image from "next/image";
const CTA = () => {
  return (
    <section className="container overflow-hidden relative  max-w-5xl py-16 rounded-lg mb-10">
      <Image
        src={"/cta.svg"}
        fill
        className={"w-full object-cover h-full absolute inset-0 "}
        alt={"cta"}
      />

      <div className="relative z-10 justify-center text-slate-800 items-center flex flex-col gap-4">
        <h2 className="text-4xl  font-bold">Ready to Start Shopping?</h2>
        <p className="text-center font-semibold">
          Join thousands of happy customers shipping from India to worldwide
          destinations
        </p>
        <Link
          href="/register"
          className="px-5 rounded-lg bg-white text-blue-900 py-2"
        >
          Create Free Account
        </Link>
      </div>
    </section>
  );
};

export default CTA;
