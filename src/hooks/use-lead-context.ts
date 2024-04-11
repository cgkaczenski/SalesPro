import { useContext } from "react";
import { LeadContext } from "@/contexts/lead-context-provider";

export function useLeadContext() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error("useLeadContext must be used within a LeadContextProvider");
  }
  return context;
}
