import { getJobs } from "@/lib/jobs"
import JobListClient from "./JobListClient"

export default async function JobListWrapper({
  cursorId,
  search,
  locationId,
  jobType,
  limit,
  showPagination = true,
}: {
  cursorId?: string
  search?: string
  locationId?: string
  jobType?: string
  limit?: number
  showPagination?: boolean
}) {
  const { jobs, nextCursor } = await getJobs({
    cursorId,
    search,
    locationId,
    jobType,
  })

  // ✅ áp dụng limit
  const finalJobs = limit ? jobs.slice(0, limit) : jobs

  return (
    <JobListClient
      key={`${search}-${locationId}-${jobType}`}
      initialJobs={finalJobs}
      initialCursor={showPagination ? nextCursor : undefined}
      search={search}
      locationId={locationId}
      jobType={jobType}
    />
  )
}