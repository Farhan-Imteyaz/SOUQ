"use client";
import { useState, useEffect } from "react";
import Logo from "@/app/components/logo";
import Navlinks from "./Navlinks";
import NavBtns from "./NavBtns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useAuth } from "@/app/providers/authProvider";
export default function Header() {
  const { isLoggedIn, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
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
              scrolled ? "text-black!" : "text-white!"
            }`}
          />
        </Link>
        <div>
          <Navlinks scrolled={scrolled} isLoggedIn={isLoggedIn} />
        </div>
        <div>
          <NavBtns scrolled={scrolled} isLoggedIn={isLoggedIn} user={user} />
        </div>
      </nav>
    </motion.header>
  );
}
