import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Lead } from "@/lib/types";

const leads = [
  {
    id: "1",
    name: "Chris",
    email: "test@gmail.com",
    phone: "",
    stage: "Proposal",
    ownerName: "John",
    imageUrl: "",
    createdDate: "2024-03-02",
    modifiedDate: "2024-03-02",
    notes: "Need to follow up.",
  },
  {
    id: "2",
    name: "Morgan",
    email: "test@gmail.com",
    phone: "",
    stage: "New",
    ownerName: "John",
    imageUrl:
      "https://iiqmtmasbwanbmwctrbs.supabase.co/storage/v1/object/public/avatars/photo-1472099645785-5658abf4ff4e.avif",
    createdDate: "2024-03-10",
    modifiedDate: "2024-03-10",
    notes: "Motivated buyer.",
  },
  {
    id: "3",
    name: "Joe",
    email: "test@gmail.com",
    phone: "",
    stage: "Stale",
    ownerName: "John",
    imageUrl: "",
    createdDate: "2023-10-02",
    modifiedDate: "2023-03-02",
    notes: "Hasn't been responding to calls.",
  },
] as Lead[];

export default function LeadList() {
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {leads.map((lead) => (
        <li key={lead.id}>
          <button className="flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-slate-100 focus:bg-slate-100 transition">
            {lead.imageUrl ? (
              <Image
                src={lead.imageUrl}
                alt={lead.name}
                className="rounded-full"
                width={45}
                height={45}
              />
            ) : (
              <UserCircleIcon
                className="text-gray-300"
                aria-hidden="true"
                width={45}
                height={45}
              />
            )}
            <p className="font-semibold flex items-center">{lead.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
