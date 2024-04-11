import BackgroundPattern from "@/components/BackgroundPattern";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { Toaster } from "@/components/ui/sonner";
import LeadContextProvider from "@/contexts/lead-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import { fetchLeads } from "@/actions/actions";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let data;
  try {
    data = await fetchLeads();
  } catch (error) {
    return (
      <div className="relative bg-gray-800/10 min-h-screen">
        <BackgroundPattern />
        <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen">
          <AppHeader />
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl font-bold text-gray-800">
              Failed to fetch data. Please try again.
            </p>
          </div>
          <AppFooter />
        </div>
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="relative bg-gray-800/10 min-h-screen">
      <BackgroundPattern />
      <div className="flex flex-col mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <LeadContextProvider data={data}>{children}</LeadContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
