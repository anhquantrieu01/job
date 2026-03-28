import {
  Prisma
} from "@/generated/prisma/client";

export type JobExpanded = Prisma.JobGetPayload<{
  include: {
    category: true,
    company: true,
    location: true
  };
}>;