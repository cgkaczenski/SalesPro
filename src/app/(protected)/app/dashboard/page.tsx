import SecondaryNav from "@/components/SecondaryNav";
import Stats from "@/components/Stats";
import SearchForm from "@/components/SearchForm";
import LeadList from "@/components/LeadList";
import LeadDetails from "@/components/LeadDetails";
import ContentBlock from "@/components/ContentBlock";
import LeadButton from "@/components/LeadButton";

export default async function Page() {
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <SecondaryNav />
        <Stats />
      </div>

      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[700px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>

        <div className="relative md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <ContentBlock>
            <LeadList />
            <div className="absolute bottom-4 right-11 md:right-2">
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
