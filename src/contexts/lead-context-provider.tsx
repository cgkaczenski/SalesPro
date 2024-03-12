"use client";

import { createContext, useState } from "react";
import { Lead } from "@/lib/types";

type LeadContextProviderProps = {
  data: Lead[];
  children: React.ReactNode;
};

type TLeadContext = {
  leads: Lead[];
  selectedLead: Lead | undefined;
  numberOfLeads: number;
  selectedLeadId: string | null;
  handleChangeLeadId: (id: string) => void;
};

export const LeadContext = createContext<TLeadContext | null>(null);

export default function LeadContextProvider({
  data,
  children,
}: LeadContextProviderProps) {
  const [leads, setLeads] = useState(data);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const selectedLead = leads.find((lead) => lead.id === selectedLeadId);
  const numberOfLeads = leads.length;

  const handleChangeLeadId = (id: string) => {
    setSelectedLeadId(id);
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        selectedLead,
        numberOfLeads,
        selectedLeadId,
        handleChangeLeadId,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}
