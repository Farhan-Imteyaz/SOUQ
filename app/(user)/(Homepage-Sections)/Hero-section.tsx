"use client";
import Link from "next/link";
const HeroSection = () => {
  return (
    <section className="relative h-[90vh] overflow-hidden ">
      <img
        src={
          "https://ramp.com/_next/static/media/hero-gradient-bg.11b28ffd.webp"
        }
        alt="hero-image"
        className="absolute scale-[1.3] top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex justify-between items-center container min-h-full">
        <div>
          <h4 className="text-white mb-2">2k+ Sucessfull orders</h4>
          <h1 className="text-7xl font-regular tracking-tighter text-slate-100">
            Shop From India,
            <br /> Ship Worldwide
          </h1>
          <p className="max-w-lg mt-2 text-white">
            Get your Indian virtual address and shop from Amazon India,
            Flipkart, Myntra and more. We handle consolidation, repackaging and
            international shipping.
          </p>
          <div className="flex mt-4 gap-3 ">
            <Link
              href="/register"
              className="bg-yellow-300 border rounded border-transparent px-4 py-[.4rem]"
            >
              Get Started Free
            </Link>
            <Link
              href="/how-it-works"
              className="border border-white rounded px-4 py-[.4rem] text-white"
            >
              See How It Works
            </Link>
          </div>
        </div>
        <div className="w-[650px]">
          <img
            className="w-full h-full object-conatain"
            src={
              "https://t3.ftcdn.net/jpg/12/40/90/00/360_F_1240900075_qvnnjnSH8gCtSPDKesUD0U56AFEkgkw1.jpg"
            }
            alt="hero-truck"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

const ScrolDown = () => {
  const scrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <button
      onClick={scrollDown}
      className="absolute right-5 top-0 transition-all duration-300 hover:bg-white hover:text-black cursor-pointer px-3 rounded-full border py-[.2rem] text-white text-xs z-10"
    >
      SCROLL DOWN
      <svg
        className="arrows absolute top-1/2 -translate-y-1/2 -left-7"
        width="60"
        height="72"
        viewBox="0 0 60 72"
        fill="none"
      >
        <path className="a1" d="M0 0 L30 32 L60 0" />
        <path className="a2" d="M0 20 L30 52 L60 20" />
        <path className="a3" d="M0 40 L30 72 L60 40" />
      </svg>
    </button>
  );
};
