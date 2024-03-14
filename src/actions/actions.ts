"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addLead(formData: FormData) {
  const data: Record<string, string> = Object.fromEntries(
    Array.from(formData.entries(), ([key, value]) => [key, String(value)])
  );

  await prisma.lead.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      amount: Number(data.amount),
      title: data.title,
      company: data.company,
      stage: "New",
      createdDate: new Date(),
      modifiedDate: new Date(),
      ownerName: "John",
      notes: "",
    },
  });

  revalidatePath("/app", "layout");
}
