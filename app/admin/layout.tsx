import { AdminMobileSidebar, AdminSidebar } from "@/components/admin/sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <main className="flex h-screen">
      <AdminSidebar />

      <div className="drawer lg:hidden">
        <input id="sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar bg-base-300">
            <label htmlFor="sidebar" className="btn btn-primary drawer-button">
              ☰
            </label>
            <div className="flex-1 px-2 mx-2">Admin Dashboard</div>
          </div>
          {/* Main content */}
          <div className="p-6">{children}</div>
        </div>
        <AdminMobileSidebar />
      </div>
      <div className="flex-1 p-6 hidden lg:block">{children}</div>
    </main>
  );
}
