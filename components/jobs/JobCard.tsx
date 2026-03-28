import { JobExpanded } from "@/types"
import Link from "next/link"

interface JobCardProps {
  job: JobExpanded
}

export default function JobCard({ job }: JobCardProps) {
  const formatSalary = () => {
    if (!job.salaryMin && !job.salaryMax) return "Salary not specified"
    if (job.salaryMin && job.salaryMax)
      return `${job.salaryMin} - ${job.salaryMax} ${job.currency}`
    if (job.salaryMin) return `From ${job.salaryMin} ${job.currency}`
    if (job.salaryMax) return `Up to ${job.salaryMax} ${job.currency}`
  }

  return (
    <Link href={`/jobs/${job.slug}`} className="block group">
      <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm 
        hover:shadow-lg hover:border-green-300 
        hover:-translate-y-1 transition-all duration-300">

        {/* Title */}
        <h2 className="font-semibold text-lg text-gray-800 
          group-hover:text-green-600 transition">
          {job.title}
        </h2>

        {/* Company */}
        <p className="text-sm text-gray-600 mt-1">
          {job.company.name}
        </p>

        {/* Location */}
        <p className="text-sm text-gray-500">
           {job.location?.name || "Remote"}
        </p>

        {/* Salary */}
        <p className="text-sm font-semibold text-green-600 mt-3">
           {formatSalary()}
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-4" />

        {/* Footer */}
        <div className="flex items-center justify-between">

          {/* Job type */}
          <span className="px-3 py-1 text-xs rounded-full 
            bg-green-100 text-green-700 font-medium 
            group-hover:bg-green-200 transition">
            {job.jobType}
          </span>

          {/* CTA */}
          <span className="text-sm text-gray-400 
            group-hover:text-green-600 font-medium transition">
            Xem
          </span>
        </div>
      </div>
    </Link>
  )
}