"use client";

import { adminNavItems } from "@/config/admin-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface AdminNavItemProps {
  items: typeof adminNavItems;
  parentSlug?: string;
}

function AdminNavList({ items, parentSlug }: AdminNavItemProps) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleOpen = (slug: string) => {
    setOpenItems((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  return (
    <ul className="menu space-y-2 w-full">
      {items.map((item) => {
        const slug = item.slug === "*" && parentSlug ? parentSlug : item.slug;
        const href = `/admin/${slug}`;
        const isActive = pathname === href || pathname.startsWith(href + "/");
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isOpen = openItems.includes(slug);

        return (
          <li key={slug}>
            {hasSubItems ? (
              <details open={isOpen}>
                <summary className={isActive ? "menu-active" : ""}>
                  {item.icon && <item.icon className="size-4 mr-2" />}
                  {item.title}
                </summary>
                <AdminNavList items={item.subItems!} parentSlug={slug} />
              </details>
            ) : (
              <Link href={href} className={isActive ? "menu-active" : ""}>
                {item.icon && <item.icon className="size-4 mr-2" />}
                {item.title}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function AdminSidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-base-300 p-4 h-screen overflow-auto scrollbar scrollbar scrollbar-track-base-200">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <AdminNavList items={adminNavItems} />
    </aside>
  );
}

export function AdminMobileSidebar() {
  return (
    <div className="drawer-side">
      <label htmlFor="sidebar" className="drawer-overlay"></label>
      <aside className="menu p-4 w-64 bg-base-300 text-base-content">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <AdminNavList items={adminNavItems} />
      </aside>
    </div>
  );
}
