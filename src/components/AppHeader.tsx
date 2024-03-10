"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
  },
  {
    label: "Account",
    path: "/app/account",
  },
];

export default function AppHeader() {
  const activePathname = usePathname();
  return (
    <header className="flex justify-between items-center border-b border-black/10 py-2 h-16">
      <Link href="/app/dashboard" aria-label="Home">
        <Logo className="h-8 ml-4 w-auto" />
      </Link>
      <nav>
        <ul className="flex gap-2 text-sm ">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  "text-black/70 rounded-md px-3 py-2 hover:bg-green-400 hover:text-white focus:bg-green-600/70 focus:text-white transition",
                  {
                    "bg-green-600/70 text-white": route.path === activePathname,
                  }
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
