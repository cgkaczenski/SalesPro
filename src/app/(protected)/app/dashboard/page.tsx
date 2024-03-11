import SecondaryNav from "@/components/SecondaryNav";
import Stats from "@/components/Stats";
import SearchForm from "@/components/SearchForm";
import LeadList from "@/components/LeadList";
import LeadDetails from "@/components/LeadDetails";

export default function Page() {
  return (
    <main>
      <div className="flex items-center justify-between text-black py-8">
        <SecondaryNav />
        <Stats />
      </div>
      <div>
        <SearchForm />
        <LeadList />
        <LeadDetails />
      </div>
    </main>
  );
}
