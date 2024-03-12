"use client";

import { useSearchContext } from "@/lib/hooks";

export default function SearchForm() {
  const searchContext = useSearchContext();

  if (!searchContext) {
    return <div>Loading...</div>;
  }

  const { searchQuery, handleChangeSearchQuery } = searchContext;

  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white rounded-md px-5 outline-none transition focus:bg-white hover:bg-white/80 placeholder:text-black/30"
        placeholder="Search leads"
        type="search"
        value={searchQuery}
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
      />
    </form>
  );
}
