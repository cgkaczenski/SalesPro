"use server";

import { db } from "@/lib/db";
import {
  leadFormSchema,
  leadIdSchema,
  leadStageSchema,
} from "@/lib/validations";
import { Lead } from "@/types/lead";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { currentUser } from "@/lib/auth";

export async function fetchLeads(): Promise<Lead[]> {
  noStore();
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  try {
    const leads = await db.lead.findMany({
      where: { userId: user.id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return leads;
  } catch (error) {
    throw new Error("Failed to fetch lead data");
  }
}

export async function addLead(formData: FormData) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  try {
    const data: Record<string, string> = Object.fromEntries(
      Array.from(formData.entries(), ([key, value]) => [key, String(value)])
    );

    const validLead = leadFormSchema.safeParse(data);
    if (!validLead.success) {
      return { message: "Invalid lead data" };
    }
    await db.lead.create({
      data: {
        ...validLead.data,
        stage: "New",
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Could not add lead. Please try again." };
  }

  revalidatePath("/app", "layout");
}

export async function editLead(id: Lead["id"], formData: FormData) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  try {
    const data: Record<string, string> = Object.fromEntries(
      Array.from(formData.entries(), ([key, value]) => [key, String(value)])
    );

    const validLead = leadFormSchema.safeParse(data);
    const validLeadId = leadIdSchema.safeParse(id);
    if (!validLead.success || !validLeadId.success) {
      return { message: "Invalid lead data" };
    }

    const lead = await getLeadById(validLeadId.data);
    if (!lead) {
      return { message: "Lead not found" };
    }
    if (lead.userId !== user.id) {
      return { message: "Unauthorized" };
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
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  try {
    const data: Record<string, string> = Object.fromEntries(
      Array.from(formData.entries(), ([key, value]) => [key, String(value)])
    );

    const validLeadStage = leadStageSchema.safeParse(data);
    const validLeadId = leadIdSchema.safeParse(id);
    if (!validLeadStage.success || !validLeadId.success) {
      return { message: "Invalid lead data" };
    }

    const lead = await getLeadById(validLeadId.data);
    if (!lead) {
      return { message: "Lead not found" };
    }
    if (lead.userId !== user.id) {
      return { message: "Unauthorized" };
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

async function getLeadById(id: Lead["id"]) {
  const lead = await db.lead.findUnique({
    where: {
      id: id,
    },
  });
  return lead;
}

export async function deleteLead(id: Lead["id"]) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  const validLeadId = leadIdSchema.safeParse(id);
  if (!validLeadId.success) {
    return { message: "Invalid lead data" };
  }

  const lead = await getLeadById(validLeadId.data);
  if (!lead) {
    return { message: "Lead not found" };
  }
  if (lead.userId !== user.id) {
    return { message: "Unauthorized" };
  }

  try {
    await db.lead.delete({
      where: {
        id: validLeadId.data,
      },
    });
  } catch (error) {
    return {
      message: "Could not delete pet.",
    };
  }

  revalidatePath("/app", "layout");
}
