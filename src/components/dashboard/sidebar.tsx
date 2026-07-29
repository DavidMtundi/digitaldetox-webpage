"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  CalendarClock,
  LayoutDashboard,
  LogOut,
  MonitorSmartphone,
  Settings,
  Shield,
  CreditCard,
} from "lucide-react";
import { signOut } from "@/lib/auth";
import { useAuth } from "@/components/auth/auth-provider";
import ThemeToggle from "@/components/theme-toggle";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/insights", label: "Insights", icon: BarChart3 },
  { href: "/dashboard/blocklists", label: "Blocklists", icon: Shield },
  { href: "/dashboard/schedules", label: "Schedules", icon: CalendarClock },
  { href: "/dashboard/devices", label: "Devices", icon: MonitorSmartphone },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.replace("/dashboard/login");
  }

  return (
    <aside className="dashboard-sidebar flex w-full shrink-0 flex-col border-r border-gray-200 bg-[#ececef] md:w-60 dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-200 px-5 py-5 dark:border-gray-800">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src="/pauseward.png"
                alt="Pauseward"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="dashboard-sidebar-title truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                Pauseward
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Web dashboard</p>
            </div>
          </div>
          <ThemeToggle className="!h-9 !w-9 shrink-0" />
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

      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
        <button
          type="button"
          onClick={() => void handleSignOut()}
          className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-emerald-400"
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
      className={`dashboard-nav-link flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "dashboard-nav-link--active bg-black/10 font-semibold text-gray-900 dark:bg-emerald-950/60 dark:text-emerald-300"
          : "text-gray-700 hover:bg-black/5 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
      }`}
    >
      <Icon className="h-4 w-4" />
      {item.label}
    </Link>
  );
}
