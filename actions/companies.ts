"use server";

import { prisma } from "@/lib/prisma";

export async function getTopCompanies() {
  return await prisma.company.findMany({
    take: 5,
    orderBy: {
      jobs: {
        _count: "desc",
      },
    },
    include: {
      _count: {
        select: {
          jobs: true,
        },
      },
    },
  });
}