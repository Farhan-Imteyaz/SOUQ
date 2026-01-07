"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/app/providers/authProvider";
import { ChevronDown } from "lucide-react";

const NavBtns = ({
  scrolled,
  isDark,
}: {
  scrolled: boolean;
  isDark: boolean;
}) => {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <div className="flex gap-4">
      {isLoggedIn && user ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`flex items-center group ${
              isDark || scrolled
                ? "text-black hover:bg-slate-200 data-[state=open]:bg-slate-200"
                : "text-white"
            } gap-2 border border-slate-300   rounded-lg p-1`}
          >
            <ProfileIcon name={user.firstName} />
            {user.firstName}
            <span className="">
              <ChevronDown size={"14px"} />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <LayoutDashboard />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:bg-red-500! hover:text-red-50! flex  items-center gap-2"
              onSelect={logout}
            >
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link href="/login">
            <Button className={"bg-yellow-300  text-black"}>Log in</Button>
          </Link>
          <Link href="/register">
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
const COLORS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
];
const getColorFromChar = (char: string) => {
  const code = char.charCodeAt(0); // A = 65
  return COLORS[code % COLORS.length];
};
const ProfileIcon = ({ name }: { name: string }) => {
  const char = name.charAt(0).toUpperCase();
  const bgColor = getColorFromChar(char);

  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${bgColor}`}
    >
      {char}
    </div>
  );
};
