"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarClock,
  LayoutDashboard,
  LogOut,
  MonitorSmartphone,
  Settings,
  Shield,
} from "lucide-react";
import { signOut } from "@/lib/auth";
import { useAuth } from "@/components/auth/auth-provider";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/insights", label: "Insights", icon: BarChart3 },
  { href: "/dashboard/blocklists", label: "Blocklists", icon: Shield },
  { href: "/dashboard/schedules", label: "Schedules", icon: CalendarClock },
  { href: "/dashboard/devices", label: "Devices", icon: MonitorSmartphone },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="flex h-full w-full flex-col border-r border-gray-200 bg-[#ececef] md:w-60">
      <div className="border-b border-gray-200 px-5 py-5">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src="/pauseward.png"
              alt="Pauseward"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Pauseward</p>
            <p className="text-xs text-gray-500">Web dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          Focus
        </p>
        {NAV_ITEMS.slice(0, 2).map((item) => (
          <SidebarLink key={item.href} item={item} activePath={pathname} />
        ))}
        <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          Blocking
        </p>
        {NAV_ITEMS.slice(2, 4).map((item) => (
          <SidebarLink key={item.href} item={item} activePath={pathname} />
        ))}
        <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          Account
        </p>
        {NAV_ITEMS.slice(4).map((item) => (
          <SidebarLink key={item.href} item={item} activePath={pathname} />
        ))}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <p className="truncate text-xs text-gray-500">{user?.email}</p>
        <button
          type="button"
          onClick={() => signOut()}
          className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-700"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({
  item,
  activePath,
}: {
  item: (typeof NAV_ITEMS)[number];
  activePath: string;
}) {
  const active = item.exact ? activePath === item.href : activePath.startsWith(item.href);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-black/10 font-semibold text-gray-900"
          : "text-gray-700 hover:bg-black/5"
      }`}
    >
      <Icon className="h-4 w-4" />
      {item.label}
    </Link>
  );
}
