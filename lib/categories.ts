import { JobCategory } from "@/generated/prisma/client"
import { redis } from "./redis"
import { prisma } from "./prisma"


type CategoryWithCount = JobCategory & {
  _count: {
    jobs: number
  }
}
export async function getCategories(): Promise<CategoryWithCount[]> {
  const cacheKey = "categories"

  const cached = await redis.get<CategoryWithCount[]>(cacheKey)
  if (cached) return cached

 const categories = await prisma.jobCategory.findMany({
  include: {
    _count: {
      select: {
        jobs: true,
      },
    },
  },
});

  await redis.set(cacheKey, categories, { ex: 3600 })

  return categories
}

export async function clearJobCache() {
  await redis.del("categories");
}