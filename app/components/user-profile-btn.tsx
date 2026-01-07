"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../providers/authProvider";
const UserProfileBtn = ({
  scrolled,
  isDark,
}: {
  scrolled: boolean;
  isDark: boolean;
}) => {
  const router = useRouter();
  const { logout, user } = useAuth();
  const accountMenuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      onSelect: (router: any) => router.push("/dashboard"),
    },
    {
      label: "Logout",
      icon: LogOut,
      onSelect: (router: any, logout: any) => logout(),
      danger: true,
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center group ${
          isDark || scrolled
            ? "text-black hover:bg-slate-200  data-[state=open]:bg-slate-200"
            : "text-white"
        } gap-2 rounded-lg p-1`}
      >
        <ProfileIcon name={user ? user.firstName : ""} />
        {user?.firstName}
        <ChevronDown size="14px" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {accountMenuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <DropdownMenuItem
              key={item.label}
              onSelect={() => item.onSelect(router, logout)}
              className={`flex items-center gap-2 ${
                item.danger ? "hover:bg-red-500! hover:text-red-50!" : ""
              }`}
            >
              <Icon size={16} />
              {item.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileBtn;
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
