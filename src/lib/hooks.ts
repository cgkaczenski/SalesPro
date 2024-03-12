import { useContext } from "react";
import { LeadContext } from "@/contexts/lead-context-provider";
import { SearchContext } from "@/contexts/search-context-provider";

export function useLeadContext() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error("useLeadContext must be used within a LeadContextProvider");
  }
  return context;
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }
  return context;
}
