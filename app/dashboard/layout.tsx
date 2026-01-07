import { AppSidebar } from "./components/sidebar/app-sidebar";
import Header from "./components/sidebar/header";
import { SidebarProvider } from "@/components/ui/sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Static sidebar */}
        <AppSidebar />

        {/* Main content */}
        <div className="ml-65">
          <Header />
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
