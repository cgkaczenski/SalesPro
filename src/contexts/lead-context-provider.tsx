"use client";

import { addLead, editLead, updateStage, deleteLead } from "@/actions/actions";
import { createContext, useState, useMemo, useOptimistic } from "react";
import { Lead } from "@/types/lead";
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
  selectedLeadId: Lead["id"] | null;
  handleChangeLeadId: (id: Lead["id"]) => void;
  handleAddLead: (formData: FormData) => Promise<{ message: string } | null>;
  handleEditLead: (
    leadId: Lead["id"],
    formData: FormData
  ) => Promise<{ message: string } | null>;
  handleUpdateStage: (
    leadId: Lead["id"],
    formData: FormData
  ) => Promise<{ message: string } | null>;
  handleDeleteLead: (leadId: Lead["id"]) => void;
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
  const [selectedLeadId, setSelectedLeadId] = useState<Lead["id"] | null>(null);
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
        case "delete":
          return state.filter((lead) => lead.id !== payload);
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

  const handleChangeLeadId = (id: Lead["id"]) => {
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

  const handleEditLead = async (leadId: Lead["id"], formData: FormData) => {
    setOptimisticLeads({ action: "edit", payload: { leadId, formData } });
    const error = await editLead(leadId, formData);
    if (error) {
      toast.warning(error.message);
      return error;
    }
    return null;
  };

  const handleUpdateStage = async (leadId: Lead["id"], formData: FormData) => {
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

  const handleDeleteLead = async (leadId: Lead["id"]) => {
    setOptimisticLeads({ action: "delete", payload: leadId });
    const error = await deleteLead(leadId);
    if (error) {
      toast.warning(error.message);
      return;
    }
    setSelectedLeadId(null);
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
        handleDeleteLead,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}
