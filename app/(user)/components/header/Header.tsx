"use client";
import { useState, useEffect } from "react";
import Logo from "@/app/components/logo";
import Navlinks from "./Navlinks";
import NavBtns from "./NavBtns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (pathName === "/dashboard") {
      setIsDark(true);
    }
  }, [pathName]);

  return (
    <motion.header
      initial={{
        background: "hsla(79 0% 100% / 0)",
      }}
      animate={{
        background: scrolled
          ? "hsla(79 0% 100% / 0.36)"
          : "hsla(79 0% 100% / 0)",
      }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn(" py-3 fixed h-fit inset-0 backdrop-blur-lg z-50 ")}
    >
      <nav className="container  flex justify-between items-center">
        <Link href={"/"}>
          <Logo
            className={`transition-colors duration-300 ${
              isDark || scrolled ? "text-black!" : "text-white!"
            }`}
          />
        </Link>
        <div>
          <Navlinks isDark={isDark} scrolled={scrolled} />
        </div>
        <div>
          <NavBtns isDark={isDark} scrolled={scrolled} />
        </div>
      </nav>
    </motion.header>
  );
}
