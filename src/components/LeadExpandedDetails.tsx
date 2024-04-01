"use client";

import { useLeadContext } from "@/lib/hooks";
import { formatCurrency } from "@/lib/utils";

export default function LeadExpandedDetails() {
  const leadContext = useLeadContext();
  if (!leadContext) {
    throw new Error("useLeadContext must be used within a LeadContextProvider");
  }
  const { selectedLead } = leadContext;
  if (!selectedLead) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-h-screen overflow-y-auto">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Lead Details
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          All the details about the lead
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="bg-gray-50 px-4 py-3 sm:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {selectedLead.name}
            </dd>
          </div>
          <div className="bg-white px-4 py-3 sm:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {selectedLead.email}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phone
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {selectedLead.phone ?? "N/A"}
            </dd>
          </div>
          <div className="bg-white px-4 py-3 sm:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Amount
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {formatCurrency(selectedLead.amount)}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Stage
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {selectedLead.stage}
            </dd>
          </div>
          <div className="bg-white px-4 py-3 sm:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Title
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {selectedLead.title}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Company
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {selectedLead.company}
            </dd>
          </div>
          <div className="bg-white px-4 py-3 sm:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Created date
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {selectedLead.createdDate.toLocaleDateString()}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Last Modified date
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {selectedLead.modifiedDate.toLocaleDateString()}
            </dd>
          </div>
          <div className="bg-white px-4 py-3 sm:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Owner name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {selectedLead.user.name}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
