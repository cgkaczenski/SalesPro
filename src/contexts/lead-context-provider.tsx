"use client";

import { createContext, useState } from "react";
import { Lead } from "@/lib/types";

type LeadContextProviderProps = {
  data: Lead[];
  children: React.ReactNode;
};

type TLeadContext = {
  leads: Lead[];
  selectedLeadId: string | null;
};

export const LeadContext = createContext<TLeadContext | null>(null);

export default function LeadContextProvider({
  data,
  children,
}: LeadContextProviderProps) {
  const [leads, setLeads] = useState(data);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  return (
    <LeadContext.Provider value={{ leads, selectedLeadId }}>
      {children}
    </LeadContext.Provider>
  );
}
