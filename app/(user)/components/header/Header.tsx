import { cookies } from "next/headers";
import Logo from "@/app/components/logo";
import Navlinks from "./Navlinks";
import NavBtns from "./NavBtns";
import Link from "next/link";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export default async function Header() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  let isLoggedIn = false;
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };
      user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });
      if (user) isLoggedIn = true;
    } catch (err) {
      isLoggedIn = false;
    }
  }

  return (
    <header className="container py-4 flex justify-between items-center">
      <Link href={"/"}>
        <Logo />
      </Link>
      <div>
        <Navlinks isLoggedIn={isLoggedIn} />
      </div>
      <div>
        <NavBtns isLoggedIn={isLoggedIn} user={user} />
      </div>
    </header>
  );
}
