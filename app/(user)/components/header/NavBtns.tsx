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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import axios from "axios";
const NavBtns = ({ isLoggedIn, user }: { isLoggedIn: boolean; user: any }) => {
  const router = useRouter();
  const Logout = async () => {
    try {
      const res = await axios.post("/api/user/auth/logout");
      if (res.status === 200) {
        toast.success("Logged out successfully", {
          className:
            "!bg-green-600/60 border !border-green-500/10 !text-white backdrop-blur-xl",
        });
        router.push("/");
        router.refresh();
        return;
      }
      toast.error("Something went wrong", {
        className:
          "!bg-red-600/60 border !border-red-500/10 !text-white backdrop-blur-xl",
      });
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong", {
        className:
          "!bg-red-600/60 border !border-red-500/10 !text-white backdrop-blur-xl",
      });
    }
  };
  return (
    <div className="flex gap-4">
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center group gap-2 border border-slate-300 data-[state=open]:bg-slate-200 hover:bg-slate-200 rounded-lg p-1">
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
              onSelect={Logout}
            >
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link href="/login">
            <Button className={"bg-blue-500 text-blue-50"}>Log in</Button>
          </Link>
          <Link href="/register">
            <Button
              className={"border border-blue-500 bg-transparent text-blue-800"}
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
