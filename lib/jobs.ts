/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "./prisma";
import { redis } from "./redis";

const PAGE_SIZE = 6;

async function getCacheVersion() {
  const v = await redis.get("jobs:version");
  if (!v) {
    await redis.set("jobs:version", "1");
    return 1;
  }
  return Number(v);
}

type GetJobsParams = {
  cursorId?: string;
  search?: string;
  locationId?: string;
  jobType?: string;
};

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

type JobsResult = {
  jobs: JobResponse[];
  nextCursor?: string;
};

export async function getJobs({
  cursorId,
  search,
  locationId,
  jobType,
}: GetJobsParams): Promise<JobsResult> {
  const version = await getCacheVersion();

  // ✅ normalize cache key
  const cacheKey = `jobs:v${version}:${JSON.stringify({
    cursorId: cursorId || null,
    search: search || null,
    locationId: locationId || null,
    jobType: jobType || null,
  })}`;

  const cached = await redis.get<JobsResult>(cacheKey);
  if (cached) return cached;

  const where: string[] = [`j."isActive" = true`];
  const params: any[] = [];

  // ✅ FILTERS
  if (locationId) {
    params.push(locationId);
    where.push(`j."locationId" = $${params.length}`);
  }

  if (jobType) {
    params.push(jobType);
    where.push(`j."jobType" = $${params.length}`);
  }

  // ✅ SEARCH (fix unshift bug)
  if (search && search.trim() !== "") {
    params.push(search.trim());
    where.push(`
      (
        unaccent(j."title") ILIKE '%' || unaccent($${params.length}) || '%'
        OR unaccent(j."description") ILIKE '%' || unaccent($${params.length}) || '%'
      )
    `);
  }

  // ✅ CURSOR
  if (cursorId) {
    const lastJob = await prisma.job.findUnique({
      where: { id: cursorId },
      select: { createdAt: true, id: true },
    });

    if (lastJob) {
      params.push(lastJob.createdAt, lastJob.id);

      where.push(`
        (
          j."createdAt" < $${params.length - 1}
          OR (
            j."createdAt" = $${params.length - 1}
            AND j."id" < $${params.length}
          )
        )
      `);
    }
  }

  const rows = (await prisma.$queryRawUnsafe(
    `
  SELECT 
    j."id",
    j."title",
    j."description",
    j."companyId",
    j."locationId",
    j."jobType",
    j."salaryMin",
    j."salaryMax",
    j."currency",
    j."createdAt",
    j."slug",

    c."id" as "company_id",
    c."name" as "company_name",

    l."id" as "location_id",
    l."name" as "location_name"

  FROM "Job" j
  LEFT JOIN "Company" c ON j."companyId" = c."id"
  LEFT JOIN "Location" l ON j."locationId" = l."id"
  WHERE ${where.join(" AND ")}
  ORDER BY j."createdAt" DESC, j."id" DESC
  LIMIT $${params.length + 1}
  `,
    ...params,
    PAGE_SIZE,
  )) as any[];

  // ✅ map lại data cho đúng format
  const jobs = rows.map((row: any) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    jobType: row.jobType,
    salaryMin: row.salaryMin,
    salaryMax: row.salaryMax,
    currency: row.currency,
    createdAt: row.createdAt,
    slug: row.slug,
    company: {
      id: row.company_id,
      name: row.company_name,
    },

    location: row.location_id
      ? {
          id: row.location_id,
          name: row.location_name,
        }
      : null,
  }));

  const nextCursor =
    rows.length === PAGE_SIZE ? rows[rows.length - 1].id : undefined;

  const result: JobsResult = { jobs, nextCursor };

  // ✅ cache (TTL có thể adjust)
  await redis.set(cacheKey, result, { ex: 60 });

  return result;
}

export async function clearJobCache() {
  await redis.incr("jobs:version");
}
