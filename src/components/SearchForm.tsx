"use client";

export default function SearchForm() {
  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white rounded-md px-5 outline-none transition focus:bg-white hover:bg-white/80 placeholder:text-black/30"
        placeholder="Search leads"
        type="search"
        value={""}
        onChange={(e) => console.log(e)}
      />
    </form>
  );
}
