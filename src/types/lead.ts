import { Lead as PrismaLead } from "@prisma/client";

export type Lead = PrismaLead & {
  user: {
    name: string | null;
  };
};
