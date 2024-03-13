"use client";

import Image from "next/image";
import { UserCircleIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { useLeadContext } from "@/lib/hooks";
import { Lead } from "@/lib/types";
import LeadButton from "./LeadButton";

export default function LeadDetails() {
  const leadContext = useLeadContext();
  if (!leadContext) {
    throw new Error("useLeadContext must be used within a LeadContextProvider");
  }
  const { selectedLead, handleCloseSelectedLead } = leadContext;
  return (
    <section className="flex flex-col h-full w-full">
      {!selectedLead ? (
        <EmptyView />
      ) : (
        <>
          <TopBar lead={selectedLead} />
          <OtherInfo lead={selectedLead} />
          <Notes lead={selectedLead} />
        </>
      )}
    </section>
  );

  function EmptyView() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <UserGroupIcon className="h-12 w-12 text-gray-400" />
        <h2 className="mt-4 text-base font-semibold leading-6 text-gray-900 text-center">
          Select a lead to view details
        </h2>
      </div>
    );
  }

  function TopBar({ lead }: { lead: Lead }) {
    return (
      <div className="flex items-center bg-white px-8 py-5 border-b border-light">
        {lead.imageUrl ? (
          <Image
            src={lead.imageUrl}
            alt="selected lead image"
            className="h-[75px] w-[75px] rounded-full object-cover"
            width={75}
            height={75}
          />
        ) : (
          <UserCircleIcon
            className="text-gray-300"
            aria-hidden="true"
            width={75}
            height={75}
          />
        )}
        <h2 className="text-3xl font-semibold leading-7 ml-5">{lead?.name}</h2>
        <div className="ml-auto space-x-2">
          <LeadButton actionType="edit">Edit</LeadButton>
          <LeadButton actionType="close">Close</LeadButton>
        </div>
      </div>
    );
  }

  function OtherInfo({ lead }: { lead: Lead }) {
    return (
      <div className="flex justify-around py-10 px-5 text-center">
        <div>
          <h3 className="text-[13px] font-medium uppercase text-zinc-700">
            Stage
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{lead?.stage}</p>
        </div>
        <div>
          <h3 className="text-[13px] font-medium uppercase text-zinc-700">
            Email
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{lead?.email}</p>
        </div>
      </div>
    );
  }

  function Notes({ lead }: { lead: Lead }) {
    return (
      <section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light">
        {lead?.notes}
      </section>
    );
  }
}
