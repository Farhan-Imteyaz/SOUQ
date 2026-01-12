import { AppSidebar } from "./components/sidebar/app-sidebar";
import Header from "./components/sidebar/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import "@/app/globals.css";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="w-[calc(100vw-var(--sidebar-width))] ml-auto">
        {/* Static sidebar */}
        <AppSidebar />

        {/* Main content */}
        <main className="">
          <Header />
          <div className=" p-8 bg-slate-50 ">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
