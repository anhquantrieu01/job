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

type JobResponse = {
  id: string;
  title: string;
  description: string;
  jobType: string;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string;
  createdAt: Date;
  slug: string;
  company: {
    id: string;
    name: string;
  };
  location: {
    id: string;
    name: string;
  } | null;
};

export type JobsResult = {
  jobs: JobResponse[];
  nextCursor?: string;
};