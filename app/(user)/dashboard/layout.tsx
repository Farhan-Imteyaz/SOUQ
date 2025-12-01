"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Package,
  Home,
  ShoppingBag,
  Store,
  Tag,
  HelpCircle,
  Calculator,
  BookOpen,
  User,
  ChevronRight,
  LogOut,
  Menu,
  X,
  ShoppingCart,
  Plane,
} from "lucide-react";
import { useRouter } from "next/navigation";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Shop & Ship", href: "/dashboard/shop-n-ship", icon: ShoppingCart },
    {
      name: "Assisted Purchase",
      href: "/dashboard/assisted-purchase",
      icon: ShoppingBag,
    },
    {
      name: "International Shipment",
      href: "/dashboard/international-shipment",
      icon: Plane,
    },
    { name: "Indian Stores", href: "#", icon: Store },
    { name: "Store Offers", href: "#", icon: Tag },
    { name: "Coupons Available", href: "#", icon: Tag },
  ];

  const helpLinks = [
    { name: "Prohibited Items", href: "/prohibited-items", icon: Package },
    { name: "FAQ", href: "/faq", icon: HelpCircle },
    { name: "Shipping Calculator", href: "/calculator", icon: Calculator },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Guide", href: "/guide", icon: BookOpen },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const router = useRouter();

  const handleLogout = async () => {
    closeMobileMenu();

    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login"); // redirect to login
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white 
        flex-shrink-0 overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        {/* Close button for mobile */}
        <button
          onClick={closeMobileMenu}
          className="lg:hidden absolute top-4 right-4 p-2 text-white hover:bg-gray-700 rounded-lg"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={closeMobileMenu}
          >
            <Package className="h-8 w-8 text-blue-400" />
            <div>
              <div className="text-xl font-bold">ParcelForward</div>
              <div className="text-xs text-gray-400">parcelforward.com</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="text-xs font-semibold text-gray-400 mb-3 px-4">
              HELP
            </div>
            <div className="space-y-1">
              {helpLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* User Stuff */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="text-xs font-semibold text-gray-400 mb-3 px-4">
              YOUR STUFF
            </div>
            <Link
              href="/dashboard/profile"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="font-medium">Profile Settings</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:w-auto">
        {/* Top Header */}
        <header className="bg-white border-b px-4 lg:px-8 py-4 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Home className="h-4 w-4" />
            <ChevronRight className="h-4 w-4 hidden sm:block" />
            <span className="font-semibold text-gray-900 hidden sm:block">
              {pathname === "/dashboard"
                ? "Home"
                : pathname.split("/").pop()?.replace("-", " ").toUpperCase()}
            </span>
          </div>

          {/* Back Link */}
          <Link
            href="/"
            className="text-blue-600 hover:underline text-xs sm:text-sm font-semibold"
          >
            <span className="hidden sm:inline">← Back to Website</span>
            <span className="sm:hidden">← Home</span>
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
