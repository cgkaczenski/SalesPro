"use client";

import { addLead, editLead, updateStage } from "@/actions/actions";
import { createContext, useState, useMemo, useOptimistic } from "react";
import { Lead } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";

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
  handleAddLead: (formData: FormData) => Promise<{ message: string } | null>;
  handleEditLead: (
    leadId: string,
    formData: FormData
  ) => Promise<{ message: string } | null>;
  handleUpdateStage: (
    leadId: string,
    formData: FormData
  ) => Promise<{ message: string } | null>;
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
  data,
  children,
}: LeadContextProviderProps) {
  const searchParams = useSearchParams();
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [optimisticLeads, setOptimisticLeads] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random().toString() }];
        case "edit":
          return state.map((lead) => {
            if (lead.id === payload.id) {
              return { ...lead, ...payload.newLeadData };
            }
            return lead;
          });
        default:
          return state;
      }
    }
  );

  const filteredLeads = useMemo(() => {
    const filter = searchParams.get("filter");
    if (filter === "closed") {
      return optimisticLeads.filter(
        (lead) => lead.stage === "Closed Won" || lead.stage === "Closed Lost"
      );
    } else {
      return optimisticLeads.filter(
        (lead) => lead.stage !== "Closed Won" && lead.stage !== "Closed Lost"
      );
    }
  }, [optimisticLeads, searchParams]);

  const selectedLead = filteredLeads.find((lead) => lead.id === selectedLeadId);
  const numberOfLeads = filteredLeads.length;

  const handleChangeLeadId = (id: string) => {
    setSelectedLeadId(id);
  };

  const handleAddLead = async (formData: FormData) => {
    setOptimisticLeads({ action: "add", payload: formData });
    const error = await addLead(formData);
    if (error) {
      toast.warning(error.message);
      return error;
    }
    return null;
  };

  const handleEditLead = async (leadId: string, formData: FormData) => {
    setOptimisticLeads({ action: "edit", payload: { leadId, formData } });
    const error = await editLead(leadId, formData);
    if (error) {
      toast.warning(error.message);
      return error;
    }
    return null;
  };

  const handleUpdateStage = async (leadId: string, formData: FormData) => {
    setOptimisticLeads({
      action: "updateStage",
      payload: { leadId, formData },
    });
    const error = await updateStage(leadId, formData);
    if (error) {
      toast.warning(error.message);
      return error;
    }
    return null;
  };

  return (
    <LeadContext.Provider
      value={{
        leads: filteredLeads,
        selectedLead,
        numberOfLeads,
        selectedLeadId,
        handleChangeLeadId,
        handleAddLead,
        handleEditLead,
        handleUpdateStage,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}
