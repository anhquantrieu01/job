
import JobFilter from "@/components/JobFilter"
import { prisma } from "@/lib/prisma"
import JobListWrapper from "@/components/jobs/JobListWrapper"
import { Suspense } from "react"
import JobListSkeleton from "@/components/jobs/JobListSkeleton"
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    cursorId?: string
    search?: string
    locationId?: string
    jobType?: string
  }>
}) {
  const params = await searchParams


  const locations = await prisma.location.findMany({
    orderBy: { name: "asc" },
  })

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Jobs</h1>

      <JobFilter locations={locations} />

      <Suspense fallback={<JobListSkeleton />}>
        <JobListWrapper
          cursorId={params.cursorId}
          search={params.search?.trim()}
          locationId={params.locationId}
          jobType={params.jobType}
        />
      </Suspense>
    </div>
  )
}