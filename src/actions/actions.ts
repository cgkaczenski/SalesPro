"use server";

import prisma from "@/lib/db";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function fetchLeads() {
  noStore();
  try {
    const leads = await prisma.lead.findMany({});
    return leads;
  } catch (error) {
    throw new Error("Failed to fetch lead data");
  }
}

export async function addLead(formData: FormData) {
  try {
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
  } catch (error) {
    console.error(error);
    return { message: "Could not add lead. Please try again." };
  }

  revalidatePath("/app", "layout");
}

export async function editLead(id: string, formData: FormData) {
  try {
    const data: Record<string, string> = Object.fromEntries(
      Array.from(formData.entries(), ([key, value]) => [key, String(value)])
    );

    await prisma.lead.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        amount: Number(data.amount),
        title: data.title,
        company: data.company,
        modifiedDate: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Could not edit lead. Please try again." };
  }

  revalidatePath("/app", "layout");
}

export async function updateStage(id: string, formData: FormData) {
  try {
    const data: Record<string, string> = Object.fromEntries(
      Array.from(formData.entries(), ([key, value]) => [key, String(value)])
    );

    await prisma.lead.update({
      where: {
        id,
      },
      data: {
        stage: data.stage,
        modifiedDate: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Could not update stage. Please try again." };
  }

  revalidatePath("/app", "layout");
}
