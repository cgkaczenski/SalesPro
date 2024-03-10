"use client";

import H1 from "@/components/H1";
import { useRouter, useSearchParams } from "next/navigation";

export default function SecondaryNav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "alltime";

  const secondaryNavigation = [
    { name: "All-time", href: "alltime" },
    { name: "Last 30 days", href: "recent" },
  ];

  const handleClick = (href: string) => {
    const params = new URLSearchParams(searchParams);
    if (href === "recent") {
      params.set("filter", href);
    } else {
      params.delete("filter");
    }
    router.push(`/app/dashboard?${params.toString()}`);
  };

  return (
    <header className="pb-4 pt-6 sm:pb-6">
      <div className="mx-auto flex lex-wrap items-center gap-6 sm:flex-nowrap px-4">
        <H1>Leads</H1>
        <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
          {secondaryNavigation.map((item) => (
            <p
              key={item.name}
              className={`cursor-pointer ${
                currentFilter === item.href ? "text-green-600" : "text-gray-700"
              }`}
              onClick={() => handleClick(item.href)}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>
    </header>
  );
}
