import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="bg-gradient-to-r from-orange-300 via-yellow-500 to-green-400 opacity-60 h-[600px] w-full absolute top-0 -z-10 rounded-br-md rounded-bl-md" />
      <Header />
      <Hero />
    </main>
  );
}
