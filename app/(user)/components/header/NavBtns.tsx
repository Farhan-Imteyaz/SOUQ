"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserProfileBtn from "@/app/components/user-profile-btn";

import { useAuth } from "@/app/providers/authProvider";

const NavBtns = ({
  scrolled,
  isDark,
}: {
  scrolled: boolean;
  isDark: boolean;
}) => {
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="flex gap-4">
      {isLoggedIn && user ? (
        <UserProfileBtn isDark={isDark} scrolled={scrolled} />
      ) : (
        <>
          <Link href="/login" prefetch={false}>
            <Button className={"bg-yellow-300  text-black"}>Log in</Button>
          </Link>
          <Link href="/register" prefetch={false}>
            <Button
              className={`border transition-colors duration-300  bg-transparent  ${
                isDark || scrolled
                  ? "text-black! border-black!"
                  : "border-blue-50 text-blue-50"
              }`}
            >
              Create a free account
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavBtns;
