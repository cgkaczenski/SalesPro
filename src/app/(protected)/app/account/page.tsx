import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/H1";

export default async function Page() {
  return (
    <main>
      <H1 className="my-8 text-white">Account Settings</H1>

      <ContentBlock className="h-[500px] flex flex-col gap-3 justify-center items-center">
        <p>Logged in as ...</p>
      </ContentBlock>
    </main>
  );
}
