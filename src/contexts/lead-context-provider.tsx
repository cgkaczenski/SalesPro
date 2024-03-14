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

  const handleAddLead = (
    newLead: Partial<Lead> & {
      name: string;
      email: string;
      amount: number;
      title: string;
      company: string;
    }
  ) => {
    const completeLead: Lead = {
      id: Math.random().toString(),
      stage: "New",
      ownerName: "John",
      createdDate: new Date(),
      modifiedDate: new Date(),
      ...newLead,
    };

    setLeads((prevLeads) => [...prevLeads, completeLead]);
  };

  const handleEditLead = (
    leadId: string,
    editedLead: Partial<Lead> & { name: string; email: string }
  ) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              ...editedLead,
            }
          : lead
      )
    );
  };

  const handleUpdateStage = (id: string, stage: string) => {
    if (stage !== "Closed Won" && stage !== "Closed Lost") {
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === id
            ? {
                ...lead,
                stage,
              }
            : lead
        )
      );
    } else {
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
      setSelectedLeadId(null);
    }
  };

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
