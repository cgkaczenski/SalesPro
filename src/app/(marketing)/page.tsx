import { Header } from "@/components/Header";
import AppFooter from "@/components/AppFooter";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/pricing";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Pricing />
      <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppFooter />
      </div>
    </main>
  );
}
