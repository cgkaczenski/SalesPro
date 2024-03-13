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
  handleCloseSelectedLead: (id: string) => void;
  handleAddLead: (
    newLead: Partial<Lead> & { name: string; email: string }
  ) => void;
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

  const handleCloseSelectedLead = (id: string) => {
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
    setSelectedLeadId(null);
  };

  const handleAddLead = (
    newLead: Partial<Lead> & { name: string; email: string }
  ) => {
    const completeLead: Lead = {
      id: Math.random().toString(),
      stage: "New",
      ownerName: "John",
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      ...newLead,
    };

    setLeads((prevLeads) => [...prevLeads, completeLead]);
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        selectedLead,
        numberOfLeads,
        selectedLeadId,
        handleChangeLeadId,
        handleCloseSelectedLead,
        handleAddLead,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}
