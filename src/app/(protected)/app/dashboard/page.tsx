import SecondaryNav from "@/components/SecondaryNav";
import Stats from "@/components/Stats";

export default function Page() {
  return (
    <main>
      <div className="flex items-center justify-between text-black py-8">
        <SecondaryNav />
        <Stats />
      </div>
    </main>
  );
}
