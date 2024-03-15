import BackgroundPattern from "@/components/BackgroundPattern";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { Toaster } from "@/components/ui/sonner";
import LeadContextProvider from "@/contexts/lead-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import prisma from "@/lib/db";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await prisma.lead.findMany({
    where: {
      stage: {
        not: {
          in: ["Closed Won", "Closed Lost"],
        },
      },
    },
  });

  return (
    <div className="relative bg-gray-800/10 min-h-screen">
      <BackgroundPattern />
      <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen">
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
