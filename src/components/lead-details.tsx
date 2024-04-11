"use client";

import { useLeadContext } from "@/hooks/use-lead-context";
import LeadButton from "./lead-button";
import DialogMenu from "./dialog-menu";
import SalesPath from "@/components/sales-path";
import { UserIcon } from "@heroicons/react/20/solid";
import { Lead } from "@prisma/client";
import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import { toast } from "sonner";

export default function LeadDetails() {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toastIdRef = useRef<string | number | null>(null);
  const leadContext = useLeadContext();
  if (!leadContext) {
    throw new Error("useLeadContext must be used within a LeadContextProvider");
  }
  const { selectedLead, handleEditNote } = leadContext;

  const onChange = (content: string) => {
    if (content !== selectedLead!.notes) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (!toastIdRef.current) {
        toastIdRef.current = toast.loading("Saving...");
      }
      timeoutRef.current = setTimeout(() => {
        if (toastIdRef.current) {
          toast.dismiss(toastIdRef.current);
          toastIdRef.current = null;
        }
        const updatePromise = handleEditNote(selectedLead!.id, content);
      }, 3000);
    }
  };

  return (
    <section className="flex flex-col h-full w-full">
      {!selectedLead ? (
        <EmptyView />
      ) : (
        <>
          <TopBar lead={selectedLead} />
          <StagePath />
          <Notes />
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
        <div className="mt-4">
          <LeadButton actionType="add" />
        </div>
      </div>
    );
  }

  function TopBar({ lead }: { lead: Lead }) {
    return (
      <div className="relative flex items-center bg-white px-8 py-5 border-b border-light">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold leading-7">{lead.name}</h2>
          <p className="text-base text-gray-500">{lead.email}</p>
        </div>
        <div className="flex items-center space-x-2">
          <LeadButton actionType="updateStage">Change Stage</LeadButton>
          <DialogMenu />
        </div>
      </div>
    );
  }

  function StagePath() {
    return (
      <div className="px-8 py-5">
        <SalesPath />
      </div>
    );
  }

  function Notes() {
    return (
      <section className="flex-1 flex-grow bg-white py-5 rounded-md mb-9 mx-8 border border-light">
        <Editor onChange={onChange} initialContent={selectedLead!.notes} />
      </section>
    );
  }
}
