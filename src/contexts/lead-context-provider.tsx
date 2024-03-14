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
  handleAddLead: (
    newLead: Partial<Lead> & {
      name: string;
      email: string;
      amount: number;
      title: string;
      company: string;
    }
  ) => void;
  handleEditLead: (
    leadId: string,
    editedLead: Partial<Lead> & { name: string; email: string }
  ) => void;
  handleUpdateStage: (id: string, stage: string) => void;
};

export const LeadContext = createContext<TLeadContext | null>(null);

export default function LeadContextProvider({
  data: leads,
  children,
}: LeadContextProviderProps) {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const selectedLead = leads.find((lead) => lead.id === selectedLeadId);
  const numberOfLeads = leads.length;

  const handleChangeLeadId = (id: string) => {
    setSelectedLeadId(id);
  };

  const handleAddLead = (
    newLead: Partial<Lead> & {
      name: string;
      email: string;
      amount: number;
      title: string;
      company: string;
    }
  ) => {};

  const handleEditLead = (
    leadId: string,
    editedLead: Partial<Lead> & { name: string; email: string }
  ) => {};

  const handleUpdateStage = (id: string, stage: string) => {};

  return (
    <LeadContext.Provider
      value={{
        leads,
        selectedLead,
        numberOfLeads,
        selectedLeadId,
        handleChangeLeadId,
        handleUpdateStage,
        handleAddLead,
        handleEditLead,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}
