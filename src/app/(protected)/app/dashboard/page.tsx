import SecondaryNav from "@/components/secondary-nav";
import Statistics from "@/components/statistics";
import SearchForm from "@/components/search-form";
import LeadList from "@/components/lead-list";
import LeadDetails from "@/components/lead-details";
import ContentBlock from "@/components/content-block";
import LeadButton from "@/components/lead-button";

export default async function Page() {
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <SecondaryNav />
        <Statistics />
      </div>

      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[700px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>

        <div className="relative md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1 items-center">
          <ContentBlock className="relative flex flex-col">
            <div className="flex-grow overflow-y-auto">
              <LeadList />
            </div>
            <div className="sticky bottom-0 right-0 p-4">
              <LeadButton actionType="add" />
            </div>
          </ContentBlock>
        </div>

        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <LeadDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
