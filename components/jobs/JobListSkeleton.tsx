// components/jobs/JobListSkeleton.tsx
import JobCardSkeleton from "./JobCardSkeleton"

export default function JobListSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  )
}