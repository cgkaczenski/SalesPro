import BackgroundPattern from "@/components/BackgroundPattern";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import LeadContextProvider from "@/contexts/lead-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import { Lead } from "@/lib/types";

//todo: replace with real data
const data = [
  {
    id: "1",
    name: "Chris",
    email: "test@gmail.com",
    stage: "Nurturing",
    company: "ABC Tech",
    title: "CEO",
    amount: 10000,
    ownerName: "John",
    createdDate: new Date("2024-03-02"),
    modifiedDate: new Date("2024-03-02"),
    notes: "Need to follow up.",
  },
  {
    id: "2",
    name: "Morgan",
    email: "test2@gmail.com",
    stage: "New",
    company: "Amco Company",
    title: "CTO",
    amount: 15000,
    ownerName: "John",
    createdDate: new Date("2024-03-010"),
    modifiedDate: new Date("2024-03-10"),
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: "3",
    name: "Joe",
    email: "test3@gmail.com",
    stage: "Proposal",
    company: "Old Tech Company",
    title: "Marketing Manager",
    amount: 45000,
    ownerName: "John",
    createdDate: new Date("2023-12-02"),
    modifiedDate: new Date("2023-12-02"),
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
        <SearchContextProvider>
          <LeadContextProvider data={data}>{children}</LeadContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </div>
  );
}
