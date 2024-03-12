"use client";

import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useLeadContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export default function LeadList() {
  const leadContext = useLeadContext();
  if (!leadContext) {
    throw new Error("useLeadContext must be used within a LeadContextProvider");
  }
  const { leads, selectedLeadId, handleChangeLeadId } = leadContext;

  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {leads.map((lead) => (
        <li key={lead.id}>
          <button
            onClick={() => handleChangeLeadId(lead.id)}
            className={cn(
              "flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-slate-100 focus:bg-slate-100 transition",
              { "bg-slate-100": selectedLeadId === lead.id }
            )}
          >
            {lead.imageUrl ? (
              <Image
                src={lead.imageUrl}
                alt={lead.name}
                className="rounded-full"
                width={45}
                height={45}
              />
            ) : (
              <UserCircleIcon
                className="text-gray-300"
                aria-hidden="true"
                width={45}
                height={45}
              />
            )}
            <p className="font-semibold flex items-center">{lead.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
