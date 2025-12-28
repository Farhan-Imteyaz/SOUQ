import React from "react";
import Logo from "@/app/components/logo";
import Navlinks from "./Navlinks";
import NavBtns from "./NavBtns";
import Link from "next/link";
const Header = () => {
  return (
    <header className="container py-4 flex justify-between items-center">
      <Link href={'/'}>
        <Logo />
      </Link>
      <div>
        <Navlinks />
      </div>
      <div>
        <NavBtns />
      </div>
    </header>
  );
};

export default Header;
