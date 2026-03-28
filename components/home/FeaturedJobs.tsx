import { Suspense } from "react"
import JobListWrapper from "../jobs/JobListWrapper"
import JobListSkeleton from "../jobs/JobListSkeleton"
import Link from "next/link"

export default function FeaturedJobsList() {
  return (
    <section className="py-14 bg-white">
      <div className="mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Việc làm nổi bật
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Những cơ hội tốt nhất được cập nhật hôm nay
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/jobs"
            className="text-sm font-medium text-green-600 hover:text-green-700 transition"
          >
            Xem tất cả
          </Link>
        </div>

        {/* Content */}
        <Suspense fallback={<JobListSkeleton />}>
          <JobListWrapper
            limit={6}        
            showPagination={false} 
          />
        </Suspense>

      </div>
    </section>
  )
}