"use client";

import { useLeadContext } from "@/lib/hooks";

export default function Stats() {
  const leadContext = useLeadContext();

  if (!leadContext) {
    return <div>Loading...</div>;
  }

  const { numberOfLeads } = leadContext;

  return (
    <section className="text-center text-slate-100/90">
      <p className="text-2xl font-bold leading-6">{numberOfLeads}</p>
      <p className="opacity-80">current leads</p>
    </section>
  );
}
