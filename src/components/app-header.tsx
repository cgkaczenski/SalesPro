"use client";
import Link from "next/link";
import { AppLogo } from "@/components/app-logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton } from "@/components/auth/user-button";

const routes = [
  { label: "Dashboard", path: "/app/dashboard" },
  { label: "Account", path: "/app/account" },
];

export default function AppHeader() {
  const activePathname = usePathname();

  return (
    <header className="flex justify-between items-center border-b border-slate-100/90 py-2 h-16">
      <Link href="/app/dashboard" aria-label="Home">
        <AppLogo variant="dark" className="h-8 ml-4 w-auto" />
      </Link>
      <nav className="bg-secondary flex items-center justify-end p-4 rounded-xl w-[600px] shadow-sm">
        <div className="flex">
          {routes.map((route) => (
            <li className="list-none mx-2" key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  "text-slate-100/90 rounded-md px-3 py-2 hover:bg-green-400/90 hover:text-white focus:bg-green-500/90 focus:text-white transition",
                  {
                    "bg-green-500/90 text-white": route.path === activePathname,
                  }
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </div>
        <div className="ml-4">
          <UserButton />
        </div>
      </nav>
    </header>
  );
}
