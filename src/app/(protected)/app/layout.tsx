import BackgroundPattern from "@/components/BackgroundPattern";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import LeadContextProvider from "@/contexts/lead-context-provider";
import { Lead } from "@/lib/types";

//todo: replace with real data
const data = [
  {
    id: "1",
    name: "Chris",
    email: "test@gmail.com",
    phone: "",
    stage: "Proposal",
    ownerName: "John",
    imageUrl: "",
    createdDate: "2024-03-02",
    modifiedDate: "2024-03-02",
    notes: "Need to follow up.",
  },
  {
    id: "2",
    name: "Morgan",
    email: "test2@gmail.com",
    phone: "",
    stage: "New",
    ownerName: "John",
    imageUrl:
      "https://iiqmtmasbwanbmwctrbs.supabase.co/storage/v1/object/public/avatars/photo-1472099645785-5658abf4ff4e.avif",
    createdDate: "2024-03-10",
    modifiedDate: "2024-03-10",
    notes: "Motivated buyer.",
  },
  {
    id: "3",
    name: "Joe",
    email: "test3@gmail.com",
    phone: "",
    stage: "Stale",
    ownerName: "John",
    imageUrl: "",
    createdDate: "2023-10-02",
    modifiedDate: "2023-03-02",
    notes: "Hasn't been responding to calls.",
  },
] as Lead[];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-gray-800/10 min-h-screen">
      <BackgroundPattern />
      <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen">
        <AppHeader />
        <LeadContextProvider data={data}>{children}</LeadContextProvider>
        <AppFooter />
      </div>
    </div>
  );
}
