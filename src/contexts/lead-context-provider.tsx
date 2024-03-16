"use client";

import { createContext, useState, useMemo } from "react";
import { Lead } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeadContextProviderContent data={leads}>
        {children}
      </LeadContextProviderContent>
    </Suspense>
  );
}

function LeadContextProviderContent({
  data: leads,
  children,
}: LeadContextProviderProps) {
  const searchParams = useSearchParams();
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const filteredLeads = useMemo(() => {
    const filter = searchParams.get("filter");
    if (filter === "closed") {
      return leads.filter(
        (lead) => lead.stage === "Closed Won" || lead.stage === "Closed Lost"
      );
    } else {
      return leads.filter(
        (lead) => lead.stage !== "Closed Won" && lead.stage !== "Closed Lost"
      );
    }
  }, [leads, searchParams]);

  const selectedLead = filteredLeads.find((lead) => lead.id === selectedLeadId);
  const numberOfLeads = filteredLeads.length;

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
        leads: filteredLeads,
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
