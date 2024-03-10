import BackgroundPattern from "@/components/BackgroundPattern";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
}
