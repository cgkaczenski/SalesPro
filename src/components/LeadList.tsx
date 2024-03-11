import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function LeadList() {
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      <li>
        <button className="flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-slate-100 focus:bg-slate-100 transition">
          <UserCircleIcon
            className="text-gray-300"
            aria-hidden="true"
            width={45}
            height={45}
          />
          <p className="font-semibold flex items-center">Chris</p>
        </button>
      </li>
      <li>
        <button className="flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-slate-100 focus:bg-slate-100 transition">
          <UserCircleIcon
            className="text-gray-300"
            aria-hidden="true"
            width={45}
            height={45}
          />
          <p className="font-semibold flex items-center">Ben</p>
        </button>
      </li>
    </ul>
  );
}
