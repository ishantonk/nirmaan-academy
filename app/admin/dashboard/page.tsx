import { adminNavItems } from "@/config/admin-nav";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {adminNavItems
          .filter((item) => item.slug !== "dashboard")
          .map((item, idx) => (
            <Link key={idx} href={item.slug}>
              <div className="card card-side bg-base-100 shadow-xl">
                <div className="flex justify-center items-center p-4">
                  {item.icon && <item.icon className="size-6" />}
                </div>
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
