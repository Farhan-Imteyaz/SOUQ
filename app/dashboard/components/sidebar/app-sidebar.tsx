"use client";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Tag,
  Gift,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Logo from "@/app/components/logo";
import "@/app/globals.css";
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },

  {
    title: "Shipments",
    url: "",
    icon: Calendar,
  },
  {
    title: "Shop N Ship",
    url: "/dashboard/shop-n-ship",
    icon: ShoppingCart,
  },
  {
    title: "Assisted Shop N Ship",
    url: "/dashboard/assisted-shop-n-ship",
    icon: ShoppingCart,
  },
  {
    title: "International Shipment",
    url: "/dashboard/international-shipment",
    icon: ShoppingCart,
  },
  {
    title: "Personal Shopper",
    url: "#",
    icon: Search,
  },
  {
    title: "Indian Store",
    url: "#",
    icon: Tag,
  },
];
const footerItems = [
  {
    title: "Terms of Service",
    url: "#",
    icon: Gift,
  },
  {
    title: "Privacy Policy",
    url: "#",
    icon: Gift,
  },
  {
    title: "Shipping Policy",
    url: "#",
    icon: Gift,
  },
];
export function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar
      variant="inset"
      className="w-[var(--sidebar-width)] bg-gray-900 sidebar-width"
    >
      <SidebarContent className="bg-gray-900">
        <SidebarHeader className=" ">
          <Logo className="text-white flex justify-center" />
        </SidebarHeader>
        <SidebarSeparator className="bg-slate-600! my-3" />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size={"lg"}
                    className={`${
                      path.toLowerCase() === item.url.toLowerCase()
                        ? "bg-sidebar text-slate-900"
                        : "text-slate-100"
                    }`}
                  >
                    <Link href={item.url} className="flex  items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter className="mt-auto!">
          <SidebarMenu>
            {footerItems.map((item) => (
              <SidebarMenuItem key={item.title} className="">
                <SidebarMenuButton asChild size={"lg"}>
                  <Link
                    href={item.url}
                    className="flex text-slate-50  items-center gap-2"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
