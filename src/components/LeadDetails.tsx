"use client";

import { UserIcon } from "@heroicons/react/20/solid";
import { useLeadContext } from "@/lib/hooks";
import { Lead } from "@prisma/client";
import LeadButton from "./LeadButton";
import Path from "@/components/Path";

export default function LeadDetails() {
  const leadContext = useLeadContext();
  if (!leadContext) {
    throw new Error("useLeadContext must be used within a LeadContextProvider");
  }
  const { selectedLead } = leadContext;
  return (
    <section className="flex flex-col h-full w-full">
      {!selectedLead ? (
        <EmptyView />
      ) : (
        <>
          <TopBar lead={selectedLead} />
          <StagePath />
          <Notes lead={selectedLead} />
        </>
      )}
    </section>
  );

  function EmptyView() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <UserIcon className="h-12 w-12 text-gray-400" />
        <h2 className="mt-4 text-base font-semibold leading-6 text-gray-900 text-center">
          Select a lead to view details
        </h2>
      </div>
    );
  }

  function TopBar({ lead }: { lead: Lead }) {
    return (
      <div className="flex items-center bg-white px-8 py-5 border-b border-light">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold leading-7 ml-5">{lead.name}</h2>
          <p className="text-base text-gray-500 ml-5">{lead.email}</p>
        </div>
        <div className="flex-3 ml-auto space-x-1 pl-16">
          <LeadButton actionType="edit">Edit</LeadButton>
          <LeadButton actionType="updateStage">Change Stage</LeadButton>
        </div>
      </div>
    );
  }

  function StagePath() {
    return (
      <div className="px-8 py-5">
        <Path />
      </div>
    );
  }

  function Notes({ lead }: { lead: Lead }) {
    return (
      <section className="flex-1 flex-grow bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light">
        {lead.notes}
      </section>
    );
  }
}
