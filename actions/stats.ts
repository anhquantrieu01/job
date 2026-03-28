"use server";

import { prisma } from "@/lib/prisma";

export async function getStats() {
  const [jobs, companies, users] = await Promise.all([
    prisma.job.count(),
    prisma.company.count(),
    prisma.user.count({
      where: {
        role: "USER",
      },
    }),
  ]);

  return {
    jobs,
    companies,
    users,
  };
}