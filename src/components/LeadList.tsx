"use client";
import { useLeadContext, useSearchContext } from "@/lib/hooks";
import { useMemo } from "react";
import { cn, formatCurrency } from "@/lib/utils";

export default function LeadList() {
  const leadContext = useLeadContext();
  if (!leadContext) {
    throw new Error("useLeadContext must be used within a LeadContextProvider");
  }
  const { leads, selectedLeadId, handleChangeLeadId } = leadContext;

  const searchContext = useSearchContext();
  if (!searchContext) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }
  const { searchQuery } = searchContext;

  const filteredLeads = useMemo(
    () =>
      leads.filter((lead) =>
        lead?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [leads, searchQuery]
  );

  return (
    <ul className="bg-white border-b border-light">
      {filteredLeads.map((lead) => (
        <li key={lead.id}>
          <button
            onClick={() => handleChangeLeadId(lead.id)}
            className={cn(
              "flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-slate-100 focus:bg-slate-100 transition",
              { "bg-slate-100": selectedLeadId === lead.id }
            )}
          >
            <div className="flex-1 text-left">
              <p className="font-medium">{lead.name}</p>
              <p className="text-gray-500">{lead.company}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="font-medium">{formatCurrency(lead.amount)}</p>
              <p className="text-gray-500">{lead.stage}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
