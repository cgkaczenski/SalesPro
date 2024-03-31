"use server";

import { db } from "@/lib/db";
import {
  leadFormSchema,
  leadIdSchema,
  leadStageSchema,
} from "@/lib/validations";
import { Lead } from "@prisma/client";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function fetchLeads(): Promise<Lead[]> {
  noStore();
  try {
    const leads = await db.lead.findMany({});
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

    const validLead = leadFormSchema.safeParse(data);
    if (!validLead.success) {
      return { message: "Invalid lead data" };
    }

    await db.lead.create({
      data: { ...validLead.data, stage: "New", ownerName: "John" },
    });
  } catch (error) {
    console.error(error);
    return { message: "Could not add lead. Please try again." };
  }

  revalidatePath("/app", "layout");
}

export async function editLead(id: Lead["id"], formData: FormData) {
  try {
    const data: Record<string, string> = Object.fromEntries(
      Array.from(formData.entries(), ([key, value]) => [key, String(value)])
    );

    const validLead = leadFormSchema.safeParse(data);
    const validLeadId = leadIdSchema.safeParse(id);
    if (!validLead.success || !validLeadId.success) {
      return { message: "Invalid lead data" };
    }

    await db.lead.update({
      where: {
        id,
      },
      data: validLead.data,
    });
  } catch (error) {
    console.error(error);
    return { message: "Could not edit lead. Please try again." };
  }

  revalidatePath("/app", "layout");
}

export async function updateStage(id: Lead["id"], formData: FormData) {
  try {
    const data: Record<string, string> = Object.fromEntries(
      Array.from(formData.entries(), ([key, value]) => [key, String(value)])
    );

    const validLeadStage = leadStageSchema.safeParse(data);
    const validLeadId = leadIdSchema.safeParse(id);
    if (!validLeadStage.success || !validLeadId.success) {
      return { message: "Invalid lead data" };
    }

    await db.lead.update({
      where: {
        id,
      },
      data: {
        stage: data.stage,
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Could not update stage. Please try again." };
  }

  revalidatePath("/app", "layout");
}
