import { MarketingHeader } from "@/components/marketing-header";
import AppFooter from "@/components/app-footer";
import { HeroSection } from "@/components/hero-section";
import { Pricing } from "@/components/pricing";

export default function Home() {
  return (
    <main>
      <MarketingHeader />
      <HeroSection />
      <Pricing />
      <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppFooter />
      </div>
    </main>
  );
}
